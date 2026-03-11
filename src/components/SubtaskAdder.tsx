'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Check } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import type { Priority } from '@/lib/types';

export default function SubtaskAdder({ parentId }: { parentId: string }) {
  const { addTask, state } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask({
      title: title.trim(),
      completed: false,
      priority: 4 as Priority,
      dueDate: null,
      dueTime: null,
      tags: [],
      folderId: state.activeFolderId,
      parentId,
      status: 'todo',
    });
    setTitle('');
  };

  return (
    <div className="ml-10 mt-1">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <input
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleAdd();
                if (e.key === 'Escape') { setIsOpen(false); setTitle(''); }
              }}
              placeholder="Add subtask..."
              className="flex-1 px-2 py-1 text-xs rounded-lg bg-transparent"
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            />
            <button onClick={handleAdd} className="p-1 rounded-md" style={{ color: 'var(--color-success)' }}>
              <Check size={14} />
            </button>
            <button onClick={() => { setIsOpen(false); setTitle(''); }} className="p-1 rounded-md"
              style={{ color: 'var(--color-text-tertiary)' }}>
              <X size={14} />
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 text-[11px] py-1 transition-colors"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            <Plus size={12} /> Add subtask
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}
