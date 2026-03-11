"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  BarChart3,
  Plus,
  CheckSquare,
  LayoutList,
  Kanban,
  CalendarDays,
  ChevronLeft,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";
import KanbanBoard from "@/components/KanbanBoard";
import CalendarView from "@/components/CalendarView";
import DashboardView from "@/components/DashboardView";
import FolderGrid from "@/components/FolderGrid";
import CommandPalette from "@/components/CommandPalette";
import FocusMode from "@/components/FocusMode";
import ProductivityPanel from "@/components/ProductivityPanel";
import TaskModal from "@/components/TaskModal";
import LandingPage from "@/components/LandingPage";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { ThemeMode } from "@/lib/types";

export default function Home() {
  const { state, dispatch, openTaskModal, updateTask, undo, redo } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [kanbanSelectMode, setKanbanSelectMode] = useState(false);
  const [listSelectMode, setListSelectMode] = useState(false);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const inInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      const hasModal = !!state.taskModal;
      const hasPalette = state.commandPaletteOpen;
      const hasFocus = !!state.focusTaskId;

      // Shortcuts that work even in overlays
      if (e.key === "Escape") {
        if (hasPalette) return; // handled by CommandPalette
        if (hasModal) return; // handled by TaskModal
        if (hasFocus) {
          dispatch({ type: "SET_FOCUS_TASK", payload: null });
          e.preventDefault();
          return;
        }
        if (showStats) {
          setShowStats(false);
          e.preventDefault();
          return;
        }
        if (sidebarOpen) {
          setSidebarOpen(false);
          e.preventDefault();
          return;
        }
        return;
      }

      // Block all other shortcuts when typing in inputs or overlays are open
      if (inInput || hasModal || hasPalette || hasFocus) return;

      const mod = e.metaKey || e.ctrlKey;

      // --- Modifier shortcuts (Cmd/Ctrl + key) ---
      if (mod) {
        switch (e.key) {
          // Cmd/Ctrl+Z — Undo
          case "z":
            if (e.shiftKey) {
              e.preventDefault();
              redo();
              return;
            }
            e.preventDefault();
            undo();
            return;
          // Ctrl+Y — Redo (Windows-friendly)
          case "y":
            e.preventDefault();
            redo();
            return;
          // Cmd+N — New task
          case "n":
            e.preventDefault();
            openTaskModal({ mode: "add" });
            return;
          // Cmd+B — Toggle stats panel
          case "b":
            e.preventDefault();
            setShowStats((s) => !s);
            return;
          // Cmd+\\ — Toggle sidebar (mobile)
          case "\\":
            e.preventDefault();
            setSidebarOpen((s) => !s);
            return;
          // Cmd+1/2/3/4/5 — Switch views
          case "1":
            e.preventDefault();
            dispatch({ type: "SET_VIEW_MODE", payload: "dashboard" });
            return;
          case "2":
            e.preventDefault();
            dispatch({ type: "SET_VIEW_MODE", payload: "folders" });
            return;
          case "3":
            e.preventDefault();
            dispatch({ type: "SET_VIEW_MODE", payload: "list" });
            return;
          case "4":
            e.preventDefault();
            dispatch({ type: "SET_VIEW_MODE", payload: "kanban" });
            return;
          case "5":
            e.preventDefault();
            dispatch({ type: "SET_VIEW_MODE", payload: "calendar" });
            return;
        }

        // Cmd+Shift shortcuts
        if (e.shiftKey) {
          switch (e.key) {
            // Cmd+Shift+T — Cycle theme
            case "T":
            case "t": {
              e.preventDefault();
              const modes: ThemeMode[] = ["light", "dark", "system"];
              const idx = modes.indexOf(state.theme);
              dispatch({ type: "SET_THEME", payload: modes[(idx + 1) % 3] });
              return;
            }
          }
        }
        return;
      }

      // --- Non-modifier shortcuts (single key) ---
      switch (e.key) {
        // N — New task
        case "n":
          e.preventDefault();
          openTaskModal({ mode: "add" });
          return;
        // / — Open command palette (search)
        case "/":
          e.preventDefault();
          dispatch({ type: "TOGGLE_COMMAND_PALETTE" });
          return;
        // D — Dashboard view
        case "d":
          e.preventDefault();
          dispatch({ type: "SET_VIEW_MODE", payload: "dashboard" });
          return;
        // F — Folders view
        case "f":
          e.preventDefault();
          dispatch({ type: "SET_VIEW_MODE", payload: "folders" });
          return;
        // L — List view
        case "l":
          e.preventDefault();
          dispatch({ type: "SET_VIEW_MODE", payload: "list" });
          return;
        // B — Board/Kanban view
        case "b":
          e.preventDefault();
          dispatch({ type: "SET_VIEW_MODE", payload: "kanban" });
          return;
        // C — Calendar view
        case "c":
          e.preventDefault();
          dispatch({ type: "SET_VIEW_MODE", payload: "calendar" });
          return;
        // I — Go to Inbox
        case "i":
          e.preventDefault();
          dispatch({ type: "SET_ACTIVE_FOLDER", payload: "inbox" });
          if (state.viewMode === "dashboard")
            dispatch({ type: "SET_VIEW_MODE", payload: "list" });
          return;
        // S — Toggle stats panel
        case "s":
          e.preventDefault();
          setShowStats((s) => !s);
          return;
        // T — Cycle theme
        case "t":
          e.preventDefault();
          const modes: ThemeMode[] = ["light", "dark", "system"];
          const idx = modes.indexOf(state.theme);
          dispatch({ type: "SET_THEME", payload: modes[(idx + 1) % 3] });
          return;
        // ? — Show keyboard shortcuts help
        case "?":
          e.preventDefault();
          setShowShortcuts((prev) => !prev);
          return;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    state.taskModal,
    state.commandPaletteOpen,
    state.focusTaskId,
    state.viewMode,
    state.theme,
    showStats,
    sidebarOpen,
    dispatch,
    openTaskModal,
    undo,
    redo,
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const taskId = event.active.data.current?.taskId;
    if (taskId) setDraggingTaskId(taskId);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setDraggingTaskId(null);
      const { active, over } = event;
      if (!over) return;

      const taskId = active.data.current?.taskId;
      const folderId = over.data.current?.folderId;

      if (taskId && folderId) {
        updateTask(taskId, { folderId });
      }
    },
    [updateTask],
  );

  const draggingTask =
    draggingTaskId ? state.tasks.find((t) => t.id === draggingTaskId) : null;

  // Show landing page for unauthenticated users
  if (!state.user) {
    return (
      <LandingPage
        onGetStarted={() => {
          // Trigger sign in from Sidebar
          dispatch({ type: "SET_VIEW_MODE", payload: "dashboard" });
        }}
      />
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="flex h-dvh overflow-hidden"
        style={{ background: "var(--color-background)" }}
      >
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed z-40 md:relative md:z-0 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
          {/* Top bar */}
          <header
            className="flex flex-wrap items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 border-b shrink-0"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            {/* Mobile menu */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-1.5 rounded-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {sidebarOpen ?
                <X size={18} />
              : <Menu size={18} />}
            </button>

            {/* Back to folders (task views) */}
            {(state.viewMode === "list" ||
              state.viewMode === "kanban" ||
              state.viewMode === "calendar") &&
              state.activeFolderId !== "inbox" && (
                <button
                  onClick={() =>
                    dispatch({ type: "SET_VIEW_MODE", payload: "folders" })
                  }
                  className="flex items-center justify-center p-1.5 rounded-lg transition-opacity hover:opacity-70"
                  style={{ color: "var(--color-text-tertiary)" }}
                  title="Back to folders"
                >
                  <ChevronLeft size={15} />
                </button>
              )}

            {/* Search */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_COMMAND_PALETTE" })}
              className="order-3 md:order-0 basis-full md:basis-auto flex items-center gap-2 flex-1 md:max-w-md px-3 py-1.5 rounded-xl text-sm transition-colors"
              style={{
                background: "var(--color-background)",
                color: "var(--color-text-tertiary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <Search size={14} />
              <span className="flex-1 text-left">Search or type</span>
              <kbd
                className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                /
              </kbd>
            </button>

            <div className="hidden md:block flex-1" />

            {/* Select button (kanban view only) */}
            {state.viewMode === "kanban" && (
              <button
                onClick={() => setKanbanSelectMode((m) => !m)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                style={{
                  background:
                    kanbanSelectMode ?
                      "var(--color-accent)"
                    : "var(--color-surface)",
                  color:
                    kanbanSelectMode ? "white" : "var(--color-text-secondary)",
                  border:
                    kanbanSelectMode ? "none" : "1px solid var(--color-border)",
                }}
              >
                <CheckSquare size={14} />
                <span className="hidden sm:inline">
                  {kanbanSelectMode ? "Done" : "Select"}
                </span>
              </button>
            )}

            {/* Add Task */}
            <button
              onClick={() => openTaskModal({ mode: "add" })}
              className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
              title="Add Task (N)"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Task</span>
            </button>

            {/* Stats toggle */}
            <button
              onClick={() => setShowStats(!showStats)}
              className="p-2 rounded-xl transition-colors"
              style={{
                color:
                  showStats ?
                    "var(--color-accent)"
                  : "var(--color-text-tertiary)",
                background:
                  showStats ? "var(--color-accent-light)" : "transparent",
              }}
              title="Toggle Stats (S)"
            >
              <BarChart3 size={18} />
            </button>
          </header>

          {/* Content area */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6">
              {state.viewMode === "dashboard" && <DashboardView />}
              {state.viewMode === "folders" && <FolderGrid />}
              {(state.viewMode === "list" ||
                state.viewMode === "kanban" ||
                state.viewMode === "calendar") && (
                <div className="flex flex-col h-full">
                  {/* Floating view switcher nav */}
                  <div className="mb-5 mx-auto w-full max-w-140">
                    {/* Floating view switcher nav */}
                    <div
                      className="w-full flex items-center gap-1 p-1 rounded-2xl relative"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                      }}
                    >
                      {(
                        [
                          {
                            mode: "list" as const,
                            icon: <LayoutList size={14} />,
                            label: "List",
                          },
                          {
                            mode: "kanban" as const,
                            icon: <Kanban size={14} />,
                            label: "Board",
                          },
                          {
                            mode: "calendar" as const,
                            icon: <CalendarDays size={14} />,
                            label: "Cal",
                          },
                        ] as const
                      ).map(({ mode, icon, label }) => {
                        const active = state.viewMode === mode;
                        return (
                          <button
                            key={mode}
                            onClick={() =>
                              dispatch({ type: "SET_VIEW_MODE", payload: mode })
                            }
                            className="relative flex-1 min-w-0 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-sm font-medium z-10 transition-colors duration-150"
                            style={{
                              color:
                                active ?
                                  "var(--color-text-primary)"
                                : "var(--color-text-tertiary)",
                            }}
                          >
                            {active && (
                              <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 rounded-xl"
                                style={{
                                  background: "var(--color-background)",
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 35,
                                }}
                              />
                            )}
                            <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                              {icon}
                              <span className="hidden sm:inline">{label}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Task views */}
                  {state.viewMode === "list" && (
                    <TaskList
                      selectMode={listSelectMode}
                      onToggleSelectMode={() => setListSelectMode((m) => !m)}
                    />
                  )}
                  {state.viewMode === "kanban" && (
                    <KanbanBoard
                      selectMode={kanbanSelectMode}
                      onToggleSelectMode={() => setKanbanSelectMode(false)}
                    />
                  )}
                  {state.viewMode === "calendar" && <CalendarView />}
                </div>
              )}
            </div>

            {/* Stats panel */}
            {showStats && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-l overflow-y-auto p-4 shrink-0 min-h-0 hidden lg:block"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <ProductivityPanel />
              </motion.div>
            )}
          </div>
        </main>

        {/* Overlays */}
        <CommandPalette />
        <FocusMode />
        <TaskModal />

        {/* Keyboard shortcuts help modal */}
        {showShortcuts && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg mx-4 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="p-1 rounded-lg hover:opacity-70"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="px-5 py-4 max-h-[70vh] overflow-y-auto space-y-5">
                {[
                  {
                    title: "General",
                    shortcuts: [
                      { keys: ["N"], desc: "New task" },
                      { keys: ["⌘", "K"], desc: "Command palette" },
                      { keys: ["/"], desc: "Search" },
                      { keys: ["S"], desc: "Toggle stats panel" },
                      { keys: ["T"], desc: "Cycle theme" },
                      { keys: ["?"], desc: "Show this help" },
                      { keys: ["Esc"], desc: "Close panel / overlay" },
                    ],
                  },
                  {
                    title: "Navigation",
                    shortcuts: [
                      { keys: ["D"], desc: "Dashboard" },
                      { keys: ["L"], desc: "List view" },
                      { keys: ["B"], desc: "Board view" },
                      { keys: ["C"], desc: "Calendar view" },
                      { keys: ["I"], desc: "Go to Inbox" },
                    ],
                  },
                  {
                    title: "With modifier",
                    shortcuts: [
                      { keys: ["⌘", "N"], desc: "New task" },
                      { keys: ["⌘", "1-4"], desc: "Switch views" },
                      { keys: ["⌘", "B"], desc: "Toggle stats" },
                      { keys: ["⌘", "\\"], desc: "Toggle sidebar" },
                      { keys: ["⌘", "⇧", "T"], desc: "Cycle theme" },
                    ],
                  },
                  {
                    title: "In Task Modal",
                    shortcuts: [
                      { keys: ["⌘", "↵"], desc: "Save task" },
                      { keys: ["Esc"], desc: "Close modal" },
                    ],
                  },
                ].map((section) => (
                  <div key={section.title}>
                    <h3
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {section.title}
                    </h3>
                    <div className="space-y-1.5">
                      {section.shortcuts.map((s) => (
                        <div
                          key={s.desc}
                          className="flex items-center justify-between py-1"
                        >
                          <span
                            className="text-sm"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {s.desc}
                          </span>
                          <div className="flex items-center gap-1">
                            {s.keys.map((k, i) => (
                              <kbd
                                key={i}
                                className="px-2 py-0.5 rounded text-xs font-mono min-w-6 text-center"
                                style={{
                                  background: "var(--color-background)",
                                  border: "1px solid var(--color-border)",
                                  color: "var(--color-text-secondary)",
                                }}
                              >
                                {k}
                              </kbd>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Drag overlay */}
        <DragOverlay>
          {draggingTask ?
            <div
              className="px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
              style={{
                background: "var(--color-surface)",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-accent)",
              }}
            >
              {draggingTask.title}
            </div>
          : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
