'use client';

import React, { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext, DragOverlay, closestCorners,
  useSensor, useSensors, PointerSensor, KeyboardSensor,
  DragStartEvent, DragEndEvent, DragOverEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Flag, Calendar, GripVertical, Plus, Trash2, Pencil, Play, FolderOpen, ArrowRightLeft, CheckSquare, X, ArrowRight } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { getPriorityColor, getPriorityLabel, formatRelativeDate } from '@/lib/nlp';
import type { Task, Priority } from '@/lib/types';
import { useState } from 'react';
import ContextMenu, { useContextMenu, type MenuEntry } from './ContextMenu';

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: '#6366f1' },
  { id: 'in-progress', label: 'In Progress', color: '#f59e0b' },
  { id: 'done', label: 'Done', color: '#10b981' },
] as const;

function SortableTask({ task, isSelected, selectMode, onSelect }: { task: Task; isSelected: boolean; selectMode: boolean; onSelect: (id: string, e: React.MouseEvent) => void }) {
  const { state, toggleTask, updateTask, deleteTask, dispatch, addTask, openTaskModal } = useApp();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task', task },
  });
  const { menu, handleContextMenu, closeMenu } = useContextMenu();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const contextMenuItems: MenuEntry[] = [
    {
      id: 'toggle',
      label: task.completed ? 'Mark incomplete' : 'Mark complete',
      icon: <Check size={14} />,
      action: () => { toggleTask(task.id); closeMenu(); },
    },
    {
      id: 'edit',
      label: 'Edit task',
      icon: <Pencil size={14} />,
      action: () => { openTaskModal({ mode: 'edit', task }); closeMenu(); },
    },
    {
      id: 'focus',
      label: 'Focus mode',
      icon: <Play size={14} />,
      disabled: task.completed,
      action: () => { dispatch({ type: 'SET_FOCUS_TASK', payload: task.id }); closeMenu(); },
    },
    { id: 'div1', type: 'divider' },
    {
      id: 'priority',
      label: 'Set priority',
      icon: <Flag size={14} />,
      children: ([1, 2, 3, 4] as Priority[]).map(p => ({
        id: `priority-${p}`,
        label: getPriorityLabel(p),
        icon: <Flag size={12} style={{ color: getPriorityColor(p) }} />,
        action: () => { updateTask(task.id, { priority: p }); closeMenu(); },
      })),
    },
    {
      id: 'move-col',
      label: 'Move to column',
      icon: <ArrowRightLeft size={14} />,
      children: COLUMNS.map(col => ({
        id: `col-${col.id}`,
        label: col.label,
        disabled: (task.completed && col.id === 'done') || (!task.completed && task.status === col.id),
        action: () => {
          updateTask(task.id, {
            status: col.id as Task['status'],
            completed: col.id === 'done',
            completedAt: col.id === 'done' ? new Date().toISOString() : null,
          });
          closeMenu();
        },
      })),
    },
    {
      id: 'move-folder',
      label: 'Move to folder',
      icon: <FolderOpen size={14} />,
      children: state.folders.map(f => ({
        id: `folder-${f.id}`,
        label: f.name,
        disabled: f.id === task.folderId,
        action: () => { updateTask(task.id, { folderId: f.id }); closeMenu(); },
      })),
    },
    { id: 'div2', type: 'divider' },
    {
      id: 'delete',
      label: 'Delete task',
      icon: <Trash2 size={14} />,
      danger: true,
      action: () => { deleteTask(task.id); closeMenu(); },
    },
  ];

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={style}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isDragging ? 0.4 : 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="rounded-xl p-3 mb-2 cursor-pointer group"
        {...attributes}
        {...listeners}
        onClick={(e) => { if (selectMode) onSelect(task.id, e); }}
        onContextMenu={handleContextMenu}
      >
        <div className="rounded-xl p-3 transition-all duration-150"
          style={{
            background: 'var(--color-surface)',
            border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
            boxShadow: isSelected ? '0 0 0 1px var(--color-accent), 0 2px 8px rgba(99,102,241,0.15)' : 'none',
          }}>
          <div className="flex items-start gap-2">
            {/* Selection checkbox — only visible in select mode */}
            {selectMode && (
              <div
                className="mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all cursor-pointer"
                style={{
                  background: isSelected ? 'var(--color-accent)' : 'transparent',
                  border: isSelected ? '2px solid var(--color-accent)' : '2px solid var(--color-border)',
                }}
                onClick={(e) => { e.stopPropagation(); onSelect(task.id, e); }}
              >
                {isSelected && <Check size={10} className="text-white" strokeWidth={3} />}
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
              className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
              style={{
                borderColor: task.completed ? 'var(--color-success)' : getPriorityColor(task.priority),
                background: task.completed ? 'var(--color-success)' : 'transparent',
              }}
            >
              {task.completed && <Check size={9} className="text-white" strokeWidth={3} />}
            </button>
            <p className={`text-sm font-medium flex-1 ${task.completed ? 'line-through opacity-40' : ''}`}
              style={{ color: 'var(--color-text-primary)' }}>
              {task.title}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {task.priority < 4 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                style={{ background: `${getPriorityColor(task.priority)}15`, color: getPriorityColor(task.priority) }}>
                <Flag size={8} className="inline mr-0.5" />P{task.priority}
              </span>
            )}
            {task.dueDate && (
              <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                <Calendar size={8} className="inline mr-0.5" />
                {formatRelativeDate(task.dueDate)}
              </span>
            )}
            {task.tags.map(t => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full"
                style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)' }}>
                #{t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {menu && (
          <ContextMenu x={menu.x} y={menu.y} items={contextMenuItems} onClose={closeMenu} />
        )}
      </AnimatePresence>
    </>
  );
}

function DroppableColumn({ id, children }: { id: string; isOver?: boolean; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="rounded-2xl p-2 min-h-[200px] transition-colors"
      style={{
        background: isOver ? 'var(--color-surface-hover)' : 'var(--color-background)',
        border: isOver ? '2px dashed var(--color-accent)' : '2px dashed transparent',
      }}
    >
      {children}
    </div>
  );
}

export default function KanbanBoard({ selectMode, onToggleSelectMode }: { selectMode: boolean; onToggleSelectMode: () => void }) {
  const { state, updateTask, deleteTask, reorderTasks, addTask, openTaskModal } = useApp();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor),
  );

  const columnTasks = useMemo(() => {
    const tasks = state.tasks.filter(t => t.folderId === state.activeFolderId && !t.parentId);
    return {
      'todo': tasks.filter(t => t.status === 'todo' && !t.completed),
      'in-progress': tasks.filter(t => t.status === 'in-progress' && !t.completed),
      'done': tasks.filter(t => t.completed || t.status === 'done'),
    };
  }, [state.tasks, state.activeFolderId]);

  const handleSelect = useCallback((id: string, _e: React.MouseEvent) => {
    // In select mode, every click toggles the task selection
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    onToggleSelectMode();
  }, [onToggleSelectMode]);

  const moveSelectedTo = useCallback((colId: string) => {
    selectedIds.forEach(id => {
      updateTask(id, {
        status: colId as Task['status'],
        completed: colId === 'done',
        completedAt: colId === 'done' ? new Date().toISOString() : null,
      });
    });
    clearSelection();
  }, [selectedIds, updateTask, clearSelection]);

  const deleteSelected = useCallback(() => {
    selectedIds.forEach(id => deleteTask(id));
    clearSelection();
  }, [selectedIds, deleteTask, clearSelection]);

  const handleDragStart = (event: DragStartEvent) => {
    const dragId = event.active.id as string;
    setActiveId(dragId);
    // In select mode, if the dragged task isn't selected, add it
    if (selectMode && !selectedIds.has(dragId)) {
      setSelectedIds(prev => new Set(prev).add(dragId));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    // Determine the target column
    let targetColId: string | null = null;

    // Dropped on a column directly
    const colMatch = COLUMNS.find(c => c.id === over.id);
    if (colMatch) targetColId = colMatch.id;

    // Dropped on another task — use that task's column
    if (!targetColId) {
      const overTask = state.tasks.find(t => t.id === over.id);
      if (overTask) {
        targetColId = overTask.completed ? 'done' : overTask.status;
      }
    }

    if (!targetColId) return;

    // Move selected tasks (if in select mode) or just the dragged one
    const idsToMove = selectMode && selectedIds.size > 0 ? selectedIds : new Set([active.id as string]);
    idsToMove.forEach(id => {
      updateTask(id, {
        status: targetColId as Task['status'],
        completed: targetColId === 'done',
        completedAt: targetColId === 'done' ? new Date().toISOString() : null,
      });
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handled in dragEnd
  };

  const activeTask = state.tasks.find(t => t.id === activeId);
  const selectedCount = selectedIds.size;

  const handleQuickAdd = (status: Task['status']) => {
    openTaskModal({ mode: 'add', defaults: { status, folderId: state.activeFolderId } });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {/* Select mode toggle + Bulk actions toolbar */}
      <AnimatePresence>
        {selectedCount > 0 && selectMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl mx-2"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-accent)' }}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg"
              style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--color-accent)' }}>
              <CheckSquare size={13} />
              {selectedCount} selected
            </div>

            <div className="w-px h-5 mx-1" style={{ background: 'var(--color-border)' }} />

            {COLUMNS.map(col => (
              <button
                key={col.id}
                onClick={() => moveSelectedTo(col.id)}
                className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
                style={{ background: `${col.color}15`, color: col.color }}
              >
                <ArrowRight size={11} />
                {col.label}
              </button>
            ))}

            <div className="w-px h-5 mx-1" style={{ background: 'var(--color-border)' }} />

            <button
              onClick={deleteSelected}
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
            >
              <Trash2 size={11} />
              Delete
            </button>

            <div className="flex-1" />

            <button
              onClick={clearSelection}
              className="p-1.5 rounded-lg transition-all hover:opacity-70"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-full overflow-x-auto pb-4 px-2">
        {COLUMNS.map((col, index) => (
          <React.Fragment key={col.id}>
            {index > 0 && (
              <div className="w-px shrink-0 mx-2" style={{ background: 'var(--color-border)' }} />
            )}
          <div className="flex-1 min-w-[280px] max-w-[360px]">
            {/* Column header */}
            <div className="flex items-center gap-2 mb-3 px-2">
              <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {col.label}
              </h3>
              <span className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)' }}>
                {columnTasks[col.id]?.length || 0}
              </span>
            </div>

            {/* Column body */}
            <DroppableColumn id={col.id} isOver={false}>
              <SortableContext
                id={col.id}
                items={columnTasks[col.id]?.map(t => t.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <AnimatePresence mode="popLayout">
                  {columnTasks[col.id]?.map(task => (
                    <SortableTask key={task.id} task={task} isSelected={selectedIds.has(task.id)} selectMode={selectMode} onSelect={handleSelect} />
                  ))}
                </AnimatePresence>
              </SortableContext>

              {/* Quick add */}
              {col.id !== 'done' && (
                <button
                  onClick={() => handleQuickAdd(col.id as Task['status'])}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  <Plus size={14} /> Add task
                </button>
              )}
            </DroppableColumn>
          </div>
          </React.Fragment>
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <div className="rounded-xl p-3 shadow-2xl"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-accent)' }}>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {activeTask.title}
            </p>
            {selectedCount > 1 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: 'var(--color-accent)' }}>
                {selectedCount}
              </div>
            )}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
