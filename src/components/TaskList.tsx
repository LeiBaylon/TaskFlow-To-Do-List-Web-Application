'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SortAsc, SortDesc, Filter, CheckCheck, Search, X } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import TaskItem from './TaskItem';

type SortField = 'order' | 'priority' | 'dueDate' | 'title';

export default function TaskList() {
  const { state, dispatch } = useApp();
  const [sortField, setSortField] = useState<SortField>('order');
  const [sortAsc, setSortAsc] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [localSearch, setLocalSearch] = useState(state.searchQuery);

  const filteredTasks = useMemo(() => {
    let tasks = state.tasks.filter(t =>
      t.folderId === state.activeFolderId && !t.parentId
    );

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    const incomplete = tasks.filter(t => !t.completed);
    const completed = tasks.filter(t => t.completed);

    const sortFn = (a: typeof tasks[0], b: typeof tasks[0]) => {
      let cmp = 0;
      switch (sortField) {
        case 'priority': cmp = a.priority - b.priority; break;
        case 'dueDate':
          const da = a.dueDate || '9999';
          const db = b.dueDate || '9999';
          cmp = da.localeCompare(db);
          break;
        case 'title': cmp = a.title.localeCompare(b.title); break;
        default: cmp = a.order - b.order;
      }
      return sortAsc ? cmp : -cmp;
    };

    incomplete.sort(sortFn);
    completed.sort(sortFn);

    return { incomplete, completed };
  }, [state.tasks, state.activeFolderId, state.searchQuery, sortField, sortAsc]);

  const activeFolder = state.folders.find(f => f.id === state.activeFolderId);
  const totalTasks = filteredTasks.incomplete.length + filteredTasks.completed.length;

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            {activeFolder?.name || 'Tasks'}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
            {filteredTasks.incomplete.length} remaining{totalTasks > 0 ? ` · ${filteredTasks.completed.length} completed` : ''}
          </p>
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-1">
          <select
            value={sortField}
            onChange={e => setSortField(e.target.value as SortField)}
            className="text-xs px-2 py-1.5 rounded-lg border appearance-none cursor-pointer"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
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
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {sortAsc ? <SortAsc size={14} /> : <SortDesc size={14} />}
          </button>
        </div>
      </div>

      {/* Search tasks */}
      <div className="mb-4 relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-tertiary)' }} />
        <input
          value={localSearch}
          onChange={e => { setLocalSearch(e.target.value); dispatch({ type: 'SET_SEARCH', payload: e.target.value }); }}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm transition-colors"
          style={{
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
          }}
        />
        {localSearch && (
          <button
            onClick={() => { setLocalSearch(''); dispatch({ type: 'SET_SEARCH', payload: '' }); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:opacity-70"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Task list */}
      <div className="space-y-0.5">
        <AnimatePresence mode="popLayout">
          {filteredTasks.incomplete.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredTasks.incomplete.length === 0 && filteredTasks.completed.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-4xl mb-3">🧘</div>
          <p className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>All clear. Time to zen.</p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
            Press <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>/</kbd> to add a task
          </p>
        </motion.div>
      )}

      {/* Completed section */}
      {filteredTasks.completed.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 px-1 py-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            <CheckCheck size={14} />
            {filteredTasks.completed.length} completed
            <motion.span animate={{ rotate: showCompleted ? 180 : 0 }} className="text-[10px]">
              ▼
            </motion.span>
          </button>
          <AnimatePresence>
            {showCompleted && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-0.5"
              >
                {filteredTasks.completed.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
