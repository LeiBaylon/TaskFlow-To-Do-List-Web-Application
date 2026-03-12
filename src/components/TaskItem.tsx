"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";
import {
  Check,
  Flag,
  Calendar,
  Clock,
  ChevronDown,
  Trash2,
  GripVertical,
  Play,
  MoreHorizontal,
  Pencil,
  FolderOpen,
  Plus,
  ArrowRightLeft,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import {
  formatRelativeDate,
  getPriorityColor,
  getPriorityLabel,
} from "@/lib/nlp";
import type { Task, Priority } from "@/lib/types";
import confetti from "canvas-confetti";
import ContextMenu, { useContextMenu, type MenuEntry } from "./ContextMenu";
import { useDraggable } from "@dnd-kit/core";

interface TaskItemProps {
  task: Task;
  depth?: number;
}

function triggerCelebration() {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 },
    colors: ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"],
    disableForReducedMotion: true,
  });
}

export default function TaskItem({ task, depth = 0 }: TaskItemProps) {
  const {
    state,
    toggleTask,
    updateTask,
    deleteTask,
    dispatch,
    addTask,
    openTaskModal,
  } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [showActions, setShowActions] = useState(false);
  const { menu, handleContextMenu, closeMenu } = useContextMenu();

  const {
    attributes: dragAttributes,
    listeners: dragListeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: `task-drag-${task.id}`,
    data: { taskId: task.id },
  });

  const subtasks = state.tasks.filter((t) => t.parentId === task.id);
  const completedSubtasks = subtasks.filter((t) => t.completed).length;
  const hasSubtasks = subtasks.length > 0;

  // Swipe gesture values
  const x = useMotionValue(0);
  const bgLeft = useTransform(
    x,
    [0, 100],
    ["rgba(16,185,129,0)", "rgba(16,185,129,0.2)"],
  );
  const bgRight = useTransform(
    x,
    [-100, 0],
    ["rgba(239,68,68,0.2)", "rgba(239,68,68,0)"],
  );
  const checkOpacity = useTransform(x, [0, 80], [0, 1]);
  const trashOpacity = useTransform(x, [-80, 0], [1, 0]);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x > 80) {
        if (!task.completed) triggerCelebration();
        toggleTask(task.id);
      } else if (info.offset.x < -80) {
        deleteTask(task.id);
      }
    },
    [task.id, task.completed, toggleTask, deleteTask],
  );

  const handleToggle = () => {
    if (!task.completed) triggerCelebration();
    toggleTask(task.id);
  };

  const handleEditSubmit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      updateTask(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const startFocus = () => {
    dispatch({ type: "SET_FOCUS_TASK", payload: task.id });
  };

  const contextMenuItems = useMemo((): MenuEntry[] => {
    const items: MenuEntry[] = [
      {
        id: "toggle",
        label: task.completed ? "Mark incomplete" : "Mark complete",
        icon: <Check size={14} />,
        action: () => {
          handleToggle();
          closeMenu();
        },
      },
      {
        id: "edit",
        label: "Edit task",
        icon: <Pencil size={14} />,
        shortcut: "Dbl-click",
        action: () => {
          openTaskModal({ mode: "edit", task });
          closeMenu();
        },
      },
    ];

    if (!task.completed) {
      items.push({
        id: "focus",
        label: "Focus mode",
        icon: <Play size={14} />,
        action: () => {
          startFocus();
          closeMenu();
        },
      });
    }

    items.push(
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
        id: "status",
        label: "Set status",
        icon: <ArrowRightLeft size={14} />,
        children: [
          {
            id: "status-todo",
            label: "To Do",
            action: () => {
              updateTask(task.id, {
                status: "todo",
                completed: false,
                completedAt: null,
              });
              closeMenu();
            },
          },
          {
            id: "status-in-progress",
            label: "In Progress",
            action: () => {
              updateTask(task.id, {
                status: "in-progress",
                completed: false,
                completedAt: null,
              });
              closeMenu();
            },
          },
          {
            id: "status-done",
            label: "Done",
            action: () => {
              updateTask(task.id, {
                status: "done",
                completed: true,
                completedAt: new Date().toISOString(),
              });
              closeMenu();
            },
          },
        ],
      },
      {
        id: "move",
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
    );

    items.push(
      { id: "div2", type: "divider" },
      {
        id: "add-subtask",
        label: "Add subtask",
        icon: <Plus size={14} />,
        action: () => {
          openTaskModal({
            mode: "add",
            defaults: { parentId: task.id, folderId: task.folderId },
          });
          setIsExpanded(true);
          closeMenu();
        },
      },
      {
        id: "duplicate",
        label: "Duplicate task",
        icon: <MoreHorizontal size={14} />,
        action: () => {
          // Recursively duplicate task and all subtasks
          const duplicateWithSubtasks = (
            t: Task,
            newParentId: string | null,
          ) => {
            const newId = addTask({
              title: t.title,
              completed: false,
              recurrence: t.recurrence || "none",
              reminderMinutes: t.reminderMinutes ?? null,
              priority: t.priority,
              dueDate: t.dueDate ?? null,
              dueTime: t.dueTime ?? null,
              tags: [...t.tags],
              folderId: t.folderId,
              parentId: newParentId,
              status: "todo",
              description: t.description,
            });
            // Duplicate subtasks as children of the new task
            const children = state.tasks.filter((c) => c.parentId === t.id);
            children.forEach((child) => duplicateWithSubtasks(child, newId));
          };
          duplicateWithSubtasks(task, task.parentId ?? null);
          closeMenu();
        },
      },
      { id: "div3", type: "divider" },
      {
        id: "delete",
        label: "Delete task",
        icon: <Trash2 size={14} />,
        danger: true,
        action: () => {
          deleteTask(task.id);
          closeMenu();
        },
      },
    );

    return items;
  }, [
    task,
    state.folders,
    closeMenu,
    handleToggle,
    startFocus,
    updateTask,
    deleteTask,
    addTask,
    openTaskModal,
    setIsExpanded,
  ]);

  return (
    <div style={{ paddingLeft: depth * 24, opacity: isDragging ? 0.4 : 1 }}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
        className="relative group"
      >
        {/* Swipe backgrounds */}
        <motion.div
          className="absolute inset-0 rounded-xl flex items-center px-4"
          style={{ background: bgLeft }}
        >
          <motion.div style={{ opacity: checkOpacity }}>
            <Check size={18} className="text-emerald-500" />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-xl flex items-center justify-end px-4"
          style={{ background: bgRight }}
        >
          <motion.div style={{ opacity: trashOpacity }}>
            <Trash2 size={18} className="text-red-500" />
          </motion.div>
        </motion.div>

        {/* Main card */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          className="relative flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-100"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
          onDoubleClick={() => openTaskModal({ mode: "edit", task })}
          onContextMenu={handleContextMenu}
          style={{
            x,
            background:
              showActions ? "var(--color-surface-hover)" : "transparent",
          }}
        >
          {/* Drag handle */}
          <div
            ref={setDragRef}
            {...dragListeners}
            {...dragAttributes}
            className="opacity-0 group-hover:opacity-40 transition-opacity pt-0.5 cursor-grab active:cursor-grabbing"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <GripVertical size={14} />
          </div>

          {/* Subtask expand */}
          {hasSubtasks ?
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="pt-0.5"
            >
              <motion.div animate={{ rotate: isExpanded ? 0 : -90 }}>
                <ChevronDown
                  size={14}
                  style={{ color: "var(--color-text-tertiary)" }}
                />
              </motion.div>
            </button>
          : depth > 0 ?
            <div className="w-3.5" />
          : null}

          {/* Checkbox */}
          <button
            onClick={handleToggle}
            className="relative mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200"
            style={{
              borderColor:
                task.completed ?
                  "var(--color-success)"
                : getPriorityColor(task.priority),
              background:
                task.completed ? "var(--color-success)" : "transparent",
            }}
          >
            <AnimatePresence>
              {task.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <Check size={11} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {isEditing ?
              <input
                autoFocus
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditSubmit();
                  if (e.key === "Escape") setIsEditing(false);
                }}
                onBlur={handleEditSubmit}
                className="w-full bg-transparent text-sm font-medium"
                style={{ color: "var(--color-text-primary)" }}
              />
            : <p
                className={`text-sm font-medium leading-snug transition-all duration-200 ${task.completed ? "line-through opacity-40" : ""}`}
                style={{ color: "var(--color-text-primary)" }}
              >
                {task.title}
              </p>
            }

            {/* Meta row */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {task.dueDate && (
                <span
                  className="inline-flex items-center gap-1 text-[11px]"
                  style={{
                    color:
                      new Date(task.dueDate) < new Date() && !task.completed ?
                        "var(--color-danger)"
                      : "var(--color-text-tertiary)",
                  }}
                >
                  <Calendar size={10} />
                  {formatRelativeDate(task.dueDate)}
                  {task.dueTime && (
                    <>
                      <Clock size={10} className="ml-0.5" />
                      {task.dueTime}
                    </>
                  )}
                </span>
              )}
              {task.priority < 4 && (
                <span
                  className="inline-flex items-center gap-0.5 text-[11px]"
                  style={{ color: getPriorityColor(task.priority) }}
                >
                  <Flag size={10} />
                  {getPriorityLabel(task.priority)}
                </span>
              )}
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-1.5 py-0 rounded-full"
                  style={{
                    background: "var(--color-surface-hover)",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  #{tag}
                </span>
              ))}
              {hasSubtasks && (
                <span
                  className="text-[11px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {completedSubtasks}/{subtasks.length} subtasks
                </span>
              )}
              {task.assigneeName && (
                <span
                  className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0 rounded-full"
                  style={{
                    background: "var(--color-accent-light)",
                    color: "var(--color-accent)",
                  }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold shrink-0"
                    style={{
                      background: "var(--color-accent)",
                      color: "white",
                    }}
                  >
                    {task.assigneeName
                      .split(/[\s@]+/)
                      .slice(0, 2)
                      .map((w) => w[0]?.toUpperCase() || "")
                      .join("")}
                  </span>
                  {task.assigneeName.split(/[\s@]/)[0]}
                </span>
              )}
            </div>

            {/* Subtask progress bar */}
            {hasSubtasks && (
              <div
                className="mt-1.5 w-full max-w-30 h-1 rounded-full overflow-hidden"
                style={{ background: "var(--color-border)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--color-accent)" }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completedSubtasks / subtasks.length) * 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <AnimatePresence>
            {showActions && !task.completed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-0.5"
              >
                <button
                  onClick={startFocus}
                  className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  title="Focus mode"
                >
                  <Play
                    size={13}
                    style={{ color: "var(--color-text-tertiary)" }}
                  />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={13} style={{ color: "var(--color-danger)" }} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Subtasks */}
      <AnimatePresence>
        {isExpanded &&
          subtasks.map((st) => (
            <TaskItem key={st.id} task={st} depth={depth + 1} />
          ))}
      </AnimatePresence>

      {/* Context Menu */}
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
    </div>
  );
}
