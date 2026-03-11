'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, X, BarChart3, Plus, CheckSquare } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import Sidebar from '@/components/Sidebar';
import TaskList from '@/components/TaskList';
import KanbanBoard from '@/components/KanbanBoard';
import CalendarView from '@/components/CalendarView';
import DashboardView from '@/components/DashboardView';
import CommandPalette from '@/components/CommandPalette';
import FocusMode from '@/components/FocusMode';
import ProductivityPanel from '@/components/ProductivityPanel';
import TaskModal from '@/components/TaskModal';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export default function Home() {
  const { state, dispatch, openTaskModal, updateTask } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [kanbanSelectMode, setKanbanSelectMode] = useState(false);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const taskId = event.active.data.current?.taskId;
    if (taskId) setDraggingTaskId(taskId);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setDraggingTaskId(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.data.current?.taskId;
    const folderId = over.data.current?.folderId;

    if (taskId && folderId) {
      updateTask(taskId, { folderId });
    }
  }, [updateTask]);

  const draggingTask = draggingTaskId ? state.tasks.find(t => t.id === draggingTaskId) : null;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-background)' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed z-40 md:relative md:z-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 py-3 border-b shrink-0"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          {/* Mobile menu */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 rounded-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Search */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_COMMAND_PALETTE' })}
            className="flex items-center gap-2 flex-1 max-w-md px-3 py-1.5 rounded-xl text-sm transition-colors"
            style={{
              background: 'var(--color-background)',
              color: 'var(--color-text-tertiary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Search size={14} />
            <span className="flex-1 text-left">Search or press</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              ⌘K
            </kbd>
          </button>

          <div className="flex-1" />

          {/* Select button (kanban view only) */}
          {state.viewMode === 'kanban' && (
            <button
              onClick={() => setKanbanSelectMode(m => !m)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{
                background: kanbanSelectMode ? 'var(--color-accent)' : 'var(--color-surface)',
                color: kanbanSelectMode ? 'white' : 'var(--color-text-secondary)',
                border: kanbanSelectMode ? 'none' : '1px solid var(--color-border)',
              }}
            >
              <CheckSquare size={14} />
              <span className="hidden sm:inline">{kanbanSelectMode ? 'Done' : 'Select'}</span>
            </button>
          )}

          {/* Add Task */}
          <button
            onClick={() => openTaskModal({ mode: 'add' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Task</span>
          </button>

          {/* Stats toggle */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="p-2 rounded-xl transition-colors"
            style={{
              color: showStats ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
              background: showStats ? 'var(--color-accent-light)' : 'transparent',
            }}
          >
            <BarChart3 size={18} />
          </button>
        </header>

        {/* Content area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            {state.viewMode === 'dashboard' && <DashboardView />}
            {state.viewMode === 'list' && <TaskList />}
            {state.viewMode === 'kanban' && <KanbanBoard selectMode={kanbanSelectMode} onToggleSelectMode={() => setKanbanSelectMode(false)} />}
            {state.viewMode === 'calendar' && <CalendarView />}
          </div>

          {/* Stats panel */}
          {showStats && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l overflow-y-auto p-4 shrink-0 hidden lg:block"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
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

      {/* Drag overlay */}
      <DragOverlay>
        {draggingTask ? (
          <div className="px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
            style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-accent)' }}>
            {draggingTask.title}
          </div>
        ) : null}
      </DragOverlay>
    </div>
    </DndContext>
  );
}
