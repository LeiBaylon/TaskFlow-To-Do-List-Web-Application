'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Calendar, Flag, Tag } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { parseTaskInput, getPriorityColor, getPriorityLabel } from '@/lib/nlp';
import type { Priority } from '@/lib/types';

export default function TaskInput() {
  const { state, addTask } = useApp();
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const parsed = value.trim() ? parseTaskInput(value) : null;

  const handleSubmit = () => {
    if (!value.trim()) return;
    const p = parseTaskInput(value);
    if (!p.title) return;

    addTask({
      title: p.title,
      completed: false,
      priority: p.priority,
      dueDate: p.dueDate,
      dueTime: p.dueTime,
      tags: p.tags,
      folderId: state.activeFolderId,
      parentId: null,
      status: 'todo',
    });
    setValue('');
  };

  // Focus input on / key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="relative">
      <motion.div
        layout
        className="relative rounded-2xl transition-all duration-200 overflow-hidden"
        style={{
          background: 'var(--color-surface)',
          border: `1.5px solid ${isFocused ? 'var(--color-accent)' : 'var(--color-border)'}`,
          boxShadow: isFocused ? '0 0 0 3px var(--color-accent-light)' : 'none',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <motion.div
            animate={{ rotate: value ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Plus size={18} style={{ color: value ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }} />
          </motion.div>
          <input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
            placeholder='Add a task... try "Gym tomorrow at 6pm !high #fitness"'
            className="flex-1 bg-transparent text-sm placeholder:opacity-50"
            style={{ color: 'var(--color-text-primary)' }}
          />
          {!isFocused && (
            <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium"
              style={{ background: 'var(--color-background)', color: 'var(--color-text-tertiary)', border: '1px solid var(--color-border)' }}>
              /
            </kbd>
          )}
        </div>

        {/* NLP preview */}
        <AnimatePresence>
          {parsed && value.trim() && isFocused && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 flex items-center gap-2 flex-wrap">
                <Sparkles size={12} style={{ color: 'var(--color-accent)' }} />
                {parsed.dueDate && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                    style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                    <Calendar size={10} />
                    {parsed.dueDate}{parsed.dueTime ? ` at ${parsed.dueTime}` : ''}
                  </span>
                )}
                {parsed.priority < 4 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                    style={{ background: `${getPriorityColor(parsed.priority)}20`, color: getPriorityColor(parsed.priority) }}>
                    <Flag size={10} />
                    {getPriorityLabel(parsed.priority)}
                  </span>
                )}
                {parsed.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                    style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' }}>
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
