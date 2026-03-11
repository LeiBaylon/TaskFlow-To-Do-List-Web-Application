"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Flag,
  Clock,
  Check,
  Trash2,
  CalendarDays,
  Pencil,
  Play,
  FolderOpen,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { getPriorityColor, getPriorityLabel } from "@/lib/nlp";
import type { Task, Priority } from "@/lib/types";
import confetti from "canvas-confetti";
import ContextMenu, { useContextMenu, type MenuEntry } from "./ContextMenu";

// ─── Helpers ──────────────────────────────
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay();
  const days: (Date | null)[] = [];

  // Leading blanks
  for (let i = 0; i < startDay; i++) {
    const d = new Date(year, month, -(startDay - 1 - i));
    days.push(d);
  }

  // Month days
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  // Trailing blanks to fill the 6-row grid
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

// ─── Micro-task chip shown inside a calendar cell ─────
function TaskChip({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const { state, updateTask, dispatch, openTaskModal } = useApp();
  const { menu, handleContextMenu, closeMenu } = useContextMenu();

  const contextMenuItems: MenuEntry[] = [
    {
      id: "toggle",
      label: task.completed ? "Mark incomplete" : "Mark complete",
      icon: <Check size={14} />,
      action: () => {
        onToggle();
        closeMenu();
      },
    },
    {
      id: "edit",
      label: "Edit task",
      icon: <Pencil size={14} />,
      action: () => {
        openTaskModal({ mode: "edit", task });
        closeMenu();
      },
    },
    {
      id: "focus",
      label: "Focus mode",
      icon: <Play size={14} />,
      disabled: task.completed,
      action: () => {
        dispatch({ type: "SET_FOCUS_TASK", payload: task.id });
        closeMenu();
      },
    },
    { id: "div1", type: "divider" },
    {
      id: "priority",
      label: "Set priority",
      icon: <Flag size={14} />,
      children: ([1, 2, 3, 4] as Priority[]).map((p) => ({
        id: `priority-${p}`,
        label: getPriorityLabel(p),
        icon: <Flag size={12} style={{ color: getPriorityColor(p) }} />,
        action: () => {
          updateTask(task.id, { priority: p });
          closeMenu();
        },
      })),
    },
    {
      id: "move-folder",
      label: "Move to folder",
      icon: <FolderOpen size={14} />,
      children: state.folders.map((f) => ({
        id: `folder-${f.id}`,
        label: f.name,
        disabled: f.id === task.folderId,
        action: () => {
          updateTask(task.id, { folderId: f.id });
          closeMenu();
        },
      })),
    },
    { id: "div2", type: "divider" },
    {
      id: "delete",
      label: "Delete task",
      icon: <Trash2 size={14} />,
      danger: true,
      action: () => {
        onDelete();
        closeMenu();
      },
    },
  ];

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        className="group/chip flex items-center gap-1 pl-1 pr-1.5 py-0.5 rounded-md text-[10px] leading-tight font-medium truncate cursor-default transition-colors"
        style={{
          background:
            task.completed ?
              "var(--color-surface-hover)"
            : `${getPriorityColor(task.priority)}12`,
          color:
            task.completed ?
              "var(--color-text-tertiary)"
            : getPriorityColor(task.priority),
        }}
        onContextMenu={handleContextMenu}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="w-3 h-3 rounded-full border shrink-0 flex items-center justify-center transition-all"
          style={{
            borderColor:
              task.completed ?
                "var(--color-success)"
              : getPriorityColor(task.priority),
            background: task.completed ? "var(--color-success)" : "transparent",
            borderWidth: "1.5px",
          }}
        >
          {task.completed && (
            <Check size={7} className="text-white" strokeWidth={3} />
          )}
        </button>
        <span
          className={`truncate ${task.completed ? "line-through opacity-50" : ""}`}
        >
          {task.title}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-auto opacity-0 group-hover/chip:opacity-60 hover:opacity-100! transition-opacity shrink-0"
        >
          <Trash2 size={9} />
        </button>
      </motion.div>

      <AnimatePresence>
        {menu && (
          <ContextMenu
            x={menu.x}
            y={menu.y}
            items={contextMenuItems}
            onClose={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Day detail panel (appears when you click a day) ──
function DayDetail({
  date,
  tasks,
  onClose,
}: {
  date: Date;
  tasks: Task[];
  onClose: () => void;
}) {
  const { toggleTask, deleteTask, state, openTaskModal } = useApp();
  const incomplete = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);
  const dateLabel = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleToggle = (id: string, wasCompleted: boolean) => {
    if (!wasCompleted) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.65 },
        colors: ["#6366f1", "#8b5cf6", "#a78bfa"],
        disableForReducedMotion: true,
      });
    }
    toggleTask(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="rounded-2xl p-4 w-full max-w-sm"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-sm font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {dateLabel}
        </h3>
        <button
          onClick={onClose}
          className="text-xs px-2 py-1 rounded-lg transition-colors"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          ✕
        </button>
      </div>

      {/* Add task button */}
      <button
        onClick={() =>
          openTaskModal({
            mode: "add",
            defaults: {
              dueDate: toDateKey(date),
              folderId: state.activeFolderId,
            },
          })
        }
        className="w-full flex items-center justify-center gap-1.5 text-xs font-medium px-2.5 py-2 rounded-xl mb-3 transition-all hover:opacity-80"
        style={{
          background: "var(--color-accent)",
          color: "white",
        }}
      >
        <Plus size={13} />
        Add task
      </button>

      {/* Tasks */}
      <div className="space-y-1.5 max-h-[40vh] overflow-y-auto">
        {incomplete.length === 0 && completed.length === 0 && (
          <p
            className="text-xs text-center py-4"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            No tasks for this day
          </p>
        )}
        <AnimatePresence mode="popLayout">
          {incomplete.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2 p-2 rounded-xl transition-colors"
              style={{ background: "var(--color-background)" }}
            >
              <button
                onClick={() => handleToggle(task.id, task.completed)}
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                style={{
                  borderColor: getPriorityColor(task.priority),
                }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-medium truncate"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {task.dueTime && (
                    <span
                      className="text-[10px] flex items-center gap-0.5"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      <Clock size={8} /> {task.dueTime}
                    </span>
                  )}
                  {task.priority < 4 && (
                    <span
                      className="text-[10px]"
                      style={{ color: getPriorityColor(task.priority) }}
                    >
                      <Flag size={8} className="inline" />{" "}
                      {getPriorityLabel(task.priority)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 rounded-md opacity-40 hover:opacity-100 transition-opacity"
              >
                <Trash2 size={11} style={{ color: "var(--color-danger)" }} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {completed.length > 0 && (
          <>
            <p
              className="text-[10px] font-medium uppercase tracking-wider pt-2 px-1"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Completed ({completed.length})
            </p>
            {completed.map((task) => (
              <motion.div
                key={task.id}
                layout
                className="flex items-center gap-2 p-2 rounded-xl opacity-50"
                style={{ background: "var(--color-background)" }}
              >
                <button
                  onClick={() => handleToggle(task.id, task.completed)}
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{
                    borderColor: "var(--color-success)",
                    background: "var(--color-success)",
                  }}
                >
                  <Check size={8} className="text-white" strokeWidth={3} />
                </button>
                <p
                  className="text-xs font-medium truncate line-through"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {task.title}
                </p>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Calendar View ───────────────────
export default function CalendarView() {
  const { state, toggleTask, deleteTask, addTask, openTaskModal } = useApp();
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [direction, setDirection] = useState(0); // -1 for prev, +1 for next
  const {
    menu: dayMenu,
    handleContextMenu: handleDayContextMenu,
    closeMenu: closeDayMenu,
  } = useContextMenu();
  const [contextDay, setContextDay] = useState<Date | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const calendarDays = useMemo(
    () => getCalendarDays(year, month),
    [year, month],
  );

  // Build a map of dateKey -> tasks for quick lookup
  const tasksByDate = useMemo(() => {
    const map: Record<string, Task[]> = {};
    state.tasks
      .filter(
        (t) => t.folderId === state.activeFolderId && !t.parentId && t.dueDate,
      )
      .forEach((t) => {
        const key = t.dueDate!;
        if (!map[key]) map[key] = [];
        map[key].push(t);
      });
    // Sort each day's tasks: incomplete first, then by priority
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return a.priority - b.priority;
      }),
    );
    return map;
  }, [state.tasks, state.activeFolderId]);

  const selectedTasks = useMemo(() => {
    if (!selectedDate) return [];
    return tasksByDate[toDateKey(selectedDate)] || [];
  }, [selectedDate, tasksByDate]);

  const goToPrev = () => {
    setDirection(-1);
    setViewDate(new Date(year, month - 1, 1));
  };
  const goToNext = () => {
    setDirection(1);
    setViewDate(new Date(year, month + 1, 1));
  };
  const goToToday = () => {
    setDirection(
      today.getMonth() > month || today.getFullYear() > year ? 1 : -1,
    );
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const handleToggle = (id: string, wasCompleted: boolean) => {
    if (!wasCompleted) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.65 },
        colors: ["#6366f1", "#8b5cf6", "#a78bfa"],
        disableForReducedMotion: true,
      });
    }
    toggleTask(id);
  };

  const activeFolder = state.folders.find((f) => f.id === state.activeFolderId);

  const dayContextMenuItems = useMemo((): MenuEntry[] => {
    if (!contextDay) return [];
    const dateKey = toDateKey(contextDay);
    return [
      {
        id: "add-task",
        label: "Add task here",
        icon: <Plus size={14} />,
        action: () => {
          openTaskModal({
            mode: "add",
            defaults: { dueDate: dateKey, folderId: state.activeFolderId },
          });
          closeDayMenu();
        },
      },
      {
        id: "select-day",
        label: "View day details",
        icon: <CalendarDays size={14} />,
        action: () => {
          setSelectedDate(contextDay);
          closeDayMenu();
        },
      },
    ];
  }, [contextDay, state.activeFolderId, addTask, closeDayMenu]);

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            {activeFolder?.name || "Calendar"}
          </h1>
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Calendar view
          </p>
        </div>
      </div>

      <div className="flex gap-5 items-start flex-col lg:flex-row">
        {/* Calendar grid */}
        <div className="flex-1 min-w-0">
          {/* Month navigation */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={goToPrev}
              className="p-1.5 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <ChevronLeft size={18} />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={`${year}-${month}`}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-semibold min-w-45 text-center"
                style={{ color: "var(--color-text-primary)" }}
              >
                {MONTHS[month]} {year}
              </motion.h2>
            </AnimatePresence>

            <button
              onClick={goToNext}
              className="p-1.5 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <ChevronRight size={18} />
            </button>

            <button
              onClick={goToToday}
              className="ml-2 text-xs font-medium px-3 py-1 rounded-lg transition-colors"
              style={{
                background: "var(--color-accent-light)",
                color: "var(--color-accent)",
              }}
            >
              Today
            </button>
          </div>

          {/* Day-of-week header */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-[11px] font-medium py-1.5"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${year}-${month}`}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-7 gap-px rounded-2xl overflow-hidden"
              style={{ background: "var(--color-border)" }}
            >
              {calendarDays.map((date, i) => {
                if (!date) return <div key={i} />;
                const isCurrentMonth = date.getMonth() === month;
                const isToday = isSameDay(date, today);
                const isSelected =
                  selectedDate && isSameDay(date, selectedDate);
                const dateKey = toDateKey(date);
                const dayTasks = tasksByDate[dateKey] || [];
                const incompleteTasks = dayTasks.filter((t) => !t.completed);
                const completedCount = dayTasks.filter(
                  (t) => t.completed,
                ).length;

                return (
                  <motion.div
                    key={dateKey}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedDate(isSelected ? null : date)}
                    onContextMenu={(e) => {
                      setContextDay(date);
                      handleDayContextMenu(e);
                    }}
                    className="min-h-22.5 p-1.5 cursor-pointer transition-colors relative"
                    style={{
                      background:
                        isSelected ?
                          "var(--color-accent-light)"
                        : "var(--color-surface)",
                      opacity: isCurrentMonth ? 1 : 0.35,
                    }}
                  >
                    {/* Day number */}
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                          isToday ? "text-white" : ""
                        }`}
                        style={{
                          background:
                            isToday ? "var(--color-accent)" : "transparent",
                          color:
                            isToday ? "white"
                            : isSelected ? "var(--color-accent)"
                            : "var(--color-text-primary)",
                        }}
                      >
                        {date.getDate()}
                      </span>
                      {dayTasks.length > 0 && (
                        <span
                          className="text-[9px] font-medium px-1 rounded"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          {incompleteTasks.length > 0 && incompleteTasks.length}
                          {completedCount > 0 && (
                            <span style={{ color: "var(--color-success)" }}>
                              {incompleteTasks.length > 0 ? "+" : ""}
                              {completedCount}✓
                            </span>
                          )}
                        </span>
                      )}
                    </div>

                    {/* Task chips (show max 3) */}
                    <div className="space-y-0.5">
                      <AnimatePresence>
                        {dayTasks.slice(0, 3).map((task) => (
                          <TaskChip
                            key={task.id}
                            task={task}
                            onToggle={() =>
                              handleToggle(task.id, task.completed)
                            }
                            onDelete={() => deleteTask(task.id)}
                          />
                        ))}
                      </AnimatePresence>
                      {dayTasks.length > 3 && (
                        <p
                          className="text-[9px] font-medium px-1"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          +{dayTasks.length - 3} more
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Selected day detail panel */}
        <AnimatePresence>
          {selectedDate && (
            <DayDetail
              date={selectedDate}
              tasks={selectedTasks}
              onClose={() => setSelectedDate(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Day cell context menu */}
      <AnimatePresence>
        {dayMenu && (
          <ContextMenu
            x={dayMenu.x}
            y={dayMenu.y}
            items={dayContextMenuItems}
            onClose={closeDayMenu}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
