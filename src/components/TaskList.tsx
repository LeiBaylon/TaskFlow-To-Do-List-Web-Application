"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SortAsc,
  SortDesc,
  CheckCheck,
  Search,
  X,
  Inbox,
  Save,
  Trash2,
  FolderOpen,
  Check,
  CheckSquare,
  ChevronDown,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import TaskItem from "./TaskItem";

type SortField = "order" | "priority" | "dueDate" | "title";
type StatusFilter =
  | "all"
  | "todo"
  | "in-progress"
  | "done"
  | "overdue"
  | "today"
  | "upcoming";

interface SavedView {
  id: string;
  name: string;
  sortField: SortField;
  sortAsc: boolean;
  statusFilter: StatusFilter;
  priorityFilter: "all" | "1" | "2" | "3" | "4";
}

export default function TaskList({
  selectMode = false,
  onToggleSelectMode,
}: {
  selectMode?: boolean;
  onToggleSelectMode?: () => void;
}) {
  const { state, dispatch, updateTask, deleteTask } = useApp();
  const [sortField, setSortField] = useState<SortField>("order");
  const [sortAsc, setSortAsc] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [localSearch, setLocalSearch] = useState(state.searchQuery);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "1" | "2" | "3" | "4"
  >("all");
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [savedViews, setSavedViews] = useState<SavedView[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(
        localStorage.getItem("zenflow-saved-views") || "[]",
      ) as SavedView[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (statusFilter === "done") {
      setShowCompleted(true);
    }
  }, [statusFilter]);

  const filteredTasks = useMemo(() => {
    let tasks = state.tasks.filter(
      (t) => t.folderId === state.activeFolderId && !t.parentId,
    );

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (statusFilter !== "all") {
      tasks = tasks.filter((t) => {
        if (statusFilter === "todo") return t.status === "todo" && !t.completed;
        if (statusFilter === "in-progress")
          return t.status === "in-progress" && !t.completed;
        if (statusFilter === "done") return t.completed || t.status === "done";
        if (statusFilter === "today") return t.dueDate === today;
        if (statusFilter === "upcoming")
          return !!t.dueDate && t.dueDate > today;
        if (statusFilter === "overdue") {
          if (!t.dueDate || t.completed) return false;
          const due = new Date(
            `${t.dueDate}T${t.dueTime || "23:59"}:00`,
          ).getTime();
          return due < Date.now();
        }
        return true;
      });
    }

    if (priorityFilter !== "all") {
      tasks = tasks.filter((t) => String(t.priority) === priorityFilter);
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    const isDoneTask = (t: (typeof tasks)[0]) =>
      t.completed || t.status === "done";

    const incomplete = tasks.filter((t) => !isDoneTask(t));
    const completed = tasks.filter((t) => isDoneTask(t));

    const sortFn = (a: (typeof tasks)[0], b: (typeof tasks)[0]) => {
      let cmp = 0;
      switch (sortField) {
        case "priority":
          cmp = a.priority - b.priority;
          break;
        case "dueDate":
          const da = a.dueDate || "9999";
          const db = b.dueDate || "9999";
          cmp = da.localeCompare(db);
          break;
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        default:
          cmp = a.order - b.order;
      }
      return sortAsc ? cmp : -cmp;
    };

    incomplete.sort(sortFn);
    completed.sort(sortFn);

    return { incomplete, completed };
  }, [
    state.tasks,
    state.activeFolderId,
    state.searchQuery,
    statusFilter,
    priorityFilter,
    sortField,
    sortAsc,
  ]);

  const visibleTaskIds = useMemo(
    () =>
      [...filteredTasks.incomplete, ...filteredTasks.completed].map(
        (t) => t.id,
      ),
    [filteredTasks],
  );

  const selectedVisibleCount = useMemo(
    () => selectedTaskIds.filter((id) => visibleTaskIds.includes(id)).length,
    [selectedTaskIds, visibleTaskIds],
  );

  const persistViews = (views: SavedView[]) => {
    setSavedViews(views);
    localStorage.setItem("zenflow-saved-views", JSON.stringify(views));
  };

  const saveCurrentView = () => {
    const name = window.prompt("Save current view as:");
    if (!name?.trim()) return;
    const view: SavedView = {
      id: crypto.randomUUID(),
      name: name.trim(),
      sortField,
      sortAsc,
      statusFilter,
      priorityFilter,
    };
    persistViews([view, ...savedViews].slice(0, 10));
  };

  const applyView = (view: SavedView) => {
    setSortField(view.sortField);
    setSortAsc(view.sortAsc);
    setStatusFilter(view.statusFilter);
    setPriorityFilter(view.priorityFilter);
  };

  const toggleSelect = (taskId: string, checked: boolean) => {
    setSelectedTaskIds((prev) =>
      checked ?
        [...new Set([...prev, taskId])]
      : prev.filter((id) => id !== taskId),
    );
  };

  const selectAllVisible = () => setSelectedTaskIds(visibleTaskIds);
  const clearSelection = () => setSelectedTaskIds([]);

  const bulkComplete = () => {
    selectedTaskIds.forEach((id) =>
      updateTask(id, {
        completed: true,
        status: "done",
        completedAt: new Date().toISOString(),
      }),
    );
    clearSelection();
  };

  const bulkDelete = () => {
    if (!window.confirm(`Delete ${selectedTaskIds.length} selected task(s)?`))
      return;
    selectedTaskIds.forEach((id) => deleteTask(id));
    clearSelection();
  };

  const bulkMoveToInbox = () => {
    selectedTaskIds.forEach((id) => updateTask(id, { folderId: "inbox" }));
    clearSelection();
  };

  const activeFolder = state.folders.find((f) => f.id === state.activeFolderId);
  const totalTasks =
    filteredTasks.incomplete.length + filteredTasks.completed.length;

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            {activeFolder?.name || "Tasks"}
          </h1>
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {filteredTasks.incomplete.length} remaining
            {totalTasks > 0 ?
              ` · ${filteredTasks.completed.length} completed`
            : ""}
          </p>
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-1">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            className="text-xs px-2 py-1.5 rounded-lg border appearance-none cursor-pointer"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            <option value="order">Manual</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
          </select>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {sortAsc ?
              <SortAsc size={14} />
            : <SortDesc size={14} />}
          </button>
        </div>
      </div>

      {/* Search tasks */}
      <div className="mb-4 relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--color-text-tertiary)" }}
        />
        <input
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            dispatch({ type: "SET_SEARCH", payload: e.target.value });
          }}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm transition-colors"
          style={{
            background: "var(--color-surface)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border)",
          }}
        />
        {localSearch && (
          <button
            onClick={() => {
              setLocalSearch("");
              dispatch({ type: "SET_SEARCH", payload: "" });
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:opacity-70"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters + Saved views */}
      <div className="mb-4 flex items-center gap-2 text-xs">
        {/* Select mode toggle (list view only) */}
        <button
          onClick={() => onToggleSelectMode?.()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all hover:opacity-80 shrink-0"
          style={{
            background:
              selectMode ? "var(--color-accent)" : "var(--color-surface)",
            color: selectMode ? "white" : "var(--color-text-secondary)",
            border: selectMode ? "none" : "1px solid var(--color-border)",
          }}
        >
          <CheckSquare size={12} />
          {selectMode ? "Done" : "Select"}
        </button>

        {/* Status filter */}
        <div
          className="relative flex items-center rounded-lg"
          style={{
            background:
              statusFilter !== "all" ?
                "rgba(99,102,241,0.1)"
              : "var(--color-surface)",
            border:
              statusFilter !== "all" ?
                "1px solid var(--color-accent)"
              : "1px solid var(--color-border)",
          }}
        >
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none pl-3 pr-7 py-2 font-medium cursor-pointer focus:outline-none bg-transparent"
            style={{
              color:
                statusFilter !== "all" ?
                  "var(--color-accent)"
                : "var(--color-text-secondary)",
            }}
          >
            <option value="all">All statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="overdue">Overdue</option>
          </select>
          <ChevronDown
            size={11}
            className="absolute right-2 pointer-events-none"
            style={{
              color:
                statusFilter !== "all" ?
                  "var(--color-accent)"
                : "var(--color-text-tertiary)",
            }}
          />
        </div>

        {/* Priority filter */}
        <div
          className="relative flex items-center rounded-lg"
          style={{
            background:
              priorityFilter !== "all" ?
                "rgba(99,102,241,0.1)"
              : "var(--color-surface)",
            border:
              priorityFilter !== "all" ?
                "1px solid var(--color-accent)"
              : "1px solid var(--color-border)",
          }}
        >
          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value as "all" | "1" | "2" | "3" | "4")
            }
            className="appearance-none pl-3 pr-7 py-2 font-medium cursor-pointer focus:outline-none bg-transparent"
            style={{
              color:
                priorityFilter !== "all" ?
                  "var(--color-accent)"
                : "var(--color-text-secondary)",
            }}
          >
            <option value="all">All priorities</option>
            <option value="1">Urgent</option>
            <option value="2">High</option>
            <option value="3">Medium</option>
            <option value="4">Low</option>
          </select>
          <ChevronDown
            size={11}
            className="absolute right-2 pointer-events-none"
            style={{
              color:
                priorityFilter !== "all" ?
                  "var(--color-accent)"
                : "var(--color-text-tertiary)",
            }}
          />
        </div>

        {/* Saved views dropdown */}
        {savedViews.length > 0 && (
          <div
            className="relative flex items-center rounded-lg"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <select
              defaultValue=""
              onChange={(e) => {
                const view = savedViews.find((v) => v.id === e.target.value);
                if (view) applyView(view);
                e.currentTarget.value = "";
              }}
              className="appearance-none pl-3 pr-7 py-2 font-medium cursor-pointer focus:outline-none bg-transparent"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <option value="">Saved views</option>
              {savedViews.map((view) => (
                <option key={view.id} value={view.id}>
                  {view.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={11}
              className="absolute right-2 pointer-events-none"
              style={{ color: "var(--color-text-tertiary)" }}
            />
          </div>
        )}

        {/* Save View */}
        <button
          onClick={saveCurrentView}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-opacity hover:opacity-70 shrink-0"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          <Save size={11} />
          Save View
        </button>
      </div>

      {/* Bulk actions toolbar — animated, only shows when items are selected in selectMode */}
      <AnimatePresence>
        {selectMode && selectedVisibleCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl flex-wrap"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-accent)",
            }}
          >
            <div
              className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg"
              style={{
                background: "rgba(99,102,241,0.15)",
                color: "var(--color-accent)",
              }}
            >
              <CheckSquare size={13} />
              {selectedVisibleCount} selected
            </div>

            <div
              className="w-px h-5"
              style={{ background: "var(--color-border)" }}
            />

            <button
              onClick={selectAllVisible}
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{
                background: "var(--color-surface-hover)",
                color: "var(--color-text-secondary)",
              }}
            >
              Select all
            </button>

            <div
              className="w-px h-5"
              style={{ background: "var(--color-border)" }}
            />

            <button
              onClick={bulkComplete}
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}
            >
              <CheckCheck size={11} />
              Complete
            </button>

            <button
              onClick={bulkMoveToInbox}
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{
                background: "rgba(99,102,241,0.12)",
                color: "var(--color-accent)",
              }}
            >
              <FolderOpen size={11} />
              Move to Inbox
            </button>

            <button
              onClick={bulkDelete}
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
            >
              <Trash2 size={11} />
              Delete
            </button>

            <div className="flex-1" />

            <button
              onClick={() => {
                clearSelection();
                onToggleSelectMode?.();
              }}
              className="p-1.5 rounded-lg transition-all hover:opacity-70"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task list */}
      <div className="space-y-0.5">
        <AnimatePresence mode="popLayout">
          {filteredTasks.incomplete.map((task) => {
            const isSelected = selectedTaskIds.includes(task.id);
            return (
              <div
                key={task.id}
                className="flex items-center gap-2 rounded-xl transition-all"
                style={
                  isSelected ?
                    {
                      background: "rgba(99,102,241,0.06)",
                      outline: "1.5px solid var(--color-accent)",
                      outlineOffset: "0px",
                    }
                  : {}
                }
                onClick={
                  selectMode ?
                    () => toggleSelect(task.id, !isSelected)
                  : undefined
                }
              >
                {selectMode && (
                  <div
                    className="ml-2 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all cursor-pointer"
                    style={{
                      background:
                        isSelected ? "var(--color-accent)" : "transparent",
                      border:
                        isSelected ?
                          "2px solid var(--color-accent)"
                        : "2px solid var(--color-border)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(task.id, !isSelected);
                    }}
                  >
                    {isSelected && (
                      <Check size={10} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <TaskItem task={task} />
                </div>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredTasks.incomplete.length === 0 &&
        filteredTasks.completed.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div
              className="mb-3 flex justify-center"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              <Inbox size={40} strokeWidth={1.5} />
            </div>
            <p
              className="font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              All clear. Time to zen.
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Press{" "}
              <kbd
                className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                /
              </kbd>{" "}
              to add a task
            </p>
          </motion.div>
        )}

      {/* Completed section */}
      {filteredTasks.completed.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 px-1 py-2 text-sm font-medium transition-colors"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <CheckCheck size={14} />
            {filteredTasks.completed.length} completed
            <motion.span
              animate={{ rotate: showCompleted ? 180 : 0 }}
              className="text-[10px]"
            >
              ▼
            </motion.span>
          </button>
          <AnimatePresence>
            {showCompleted && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-0.5"
              >
                {filteredTasks.completed.map((task) => {
                  const isSelected = selectedTaskIds.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className="flex items-center gap-2 rounded-xl transition-all"
                      style={
                        isSelected ?
                          {
                            background: "rgba(99,102,241,0.06)",
                            outline: "1.5px solid var(--color-accent)",
                            outlineOffset: "0px",
                          }
                        : {}
                      }
                      onClick={
                        selectMode ?
                          () => toggleSelect(task.id, !isSelected)
                        : undefined
                      }
                    >
                      {selectMode && (
                        <div
                          className="ml-2 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all cursor-pointer"
                          style={{
                            background:
                              isSelected ?
                                "var(--color-accent)"
                              : "transparent",
                            border:
                              isSelected ?
                                "2px solid var(--color-accent)"
                              : "2px solid var(--color-border)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelect(task.id, !isSelected);
                          }}
                        >
                          {isSelected && (
                            <Check
                              size={10}
                              className="text-white"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <TaskItem task={task} />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
