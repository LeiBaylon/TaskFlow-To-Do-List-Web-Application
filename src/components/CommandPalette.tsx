'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Command, Plus, Sun, Moon, Hash, CheckSquare,
  Inbox, LayoutList, Kanban, Timer, X,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { parseTaskInput } from '@/lib/nlp';

interface CommandItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
  category: string;
  action: () => void;
}

export default function CommandPalette() {
  const { state, dispatch, addTask } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = useMemo<CommandItem[]>(() => {
    const cmds: CommandItem[] = [];

    // Quick add task
    if (query.trim()) {
      cmds.push({
        id: 'add-task',
        icon: <Plus size={16} />,
        label: `Add task: "${query}"`,
        description: 'Create a new task with NLP parsing',
        category: 'Actions',
        action: () => {
          const parsed = parseTaskInput(query);
          if (parsed.title) {
            addTask({
              title: parsed.title,
              completed: false,
              priority: parsed.priority,
              dueDate: parsed.dueDate,
              dueTime: parsed.dueTime,
              tags: parsed.tags,
              folderId: state.activeFolderId,
              parentId: null,
              status: 'todo',
            });
          }
          close();
        },
      });
    }

    // Navigation
    state.folders.forEach(f => {
      cmds.push({
        id: `nav-${f.id}`,
        icon: f.id === 'inbox' ? <Inbox size={16} /> : <Hash size={16} />,
        label: f.name,
        description: 'Go to folder',
        category: 'Navigation',
        action: () => {
          dispatch({ type: 'SET_ACTIVE_FOLDER', payload: f.id });
          close();
        },
      });
    });

    // Views
    cmds.push({
      id: 'view-list',
      icon: <LayoutList size={16} />,
      label: 'List View',
      description: 'Switch to list view',
      category: 'Views',
      action: () => { dispatch({ type: 'SET_VIEW_MODE', payload: 'list' }); close(); },
    });
    cmds.push({
      id: 'view-kanban',
      icon: <Kanban size={16} />,
      label: 'Board View',
      description: 'Switch to kanban board',
      category: 'Views',
      action: () => { dispatch({ type: 'SET_VIEW_MODE', payload: 'kanban' }); close(); },
    });

    // Theme
    cmds.push({
      id: 'theme-light',
      icon: <Sun size={16} />,
      label: 'Light Theme',
      category: 'Appearance',
      action: () => { dispatch({ type: 'SET_THEME', payload: 'light' }); close(); },
    });
    cmds.push({
      id: 'theme-dark',
      icon: <Moon size={16} />,
      label: 'Dark Theme',
      category: 'Appearance',
      action: () => { dispatch({ type: 'SET_THEME', payload: 'dark' }); close(); },
    });

    // Tasks search
    state.tasks
      .filter(t => !t.completed && t.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)
      .forEach(t => {
        cmds.push({
          id: `task-${t.id}`,
          icon: <CheckSquare size={16} />,
          label: t.title,
          description: `in ${state.folders.find(f => f.id === t.folderId)?.name || 'Inbox'}`,
          category: 'Tasks',
          action: () => {
            dispatch({ type: 'SET_ACTIVE_FOLDER', payload: t.folderId });
            close();
          },
        });
      });

    return cmds;
  }, [query, state.folders, state.tasks, state.activeFolderId, addTask, dispatch]);

  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(c =>
      c.label.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const categories = useMemo(() => {
    const cats: Record<string, CommandItem[]> = {};
    filteredCommands.forEach(c => {
      if (!cats[c.category]) cats[c.category] = [];
      cats[c.category].push(c);
    });
    return cats;
  }, [filteredCommands]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (state.commandPaletteOpen) {
      inputRef.current?.focus();
      setQuery('');
    }
  }, [state.commandPaletteOpen]);

  const close = () => dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      filteredCommands[selectedIndex].action();
    }
  };

  if (!state.commandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
        onClick={close}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ borderColor: 'var(--color-border)' }}>
            <Search size={16} style={{ color: 'var(--color-text-tertiary)' }} />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search tasks, commands, or add a new task..."
              className="flex-1 bg-transparent text-sm"
              style={{ color: 'var(--color-text-primary)' }}
            />
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono"
              style={{ background: 'var(--color-background)', color: 'var(--color-text-tertiary)', border: '1px solid var(--color-border)' }}>
              esc
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[40vh] overflow-y-auto py-2">
            {Object.entries(categories).map(([cat, items]) => (
              <div key={cat}>
                <div className="px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider"
                  style={{ color: 'var(--color-text-tertiary)' }}>
                  {cat}
                </div>
                {items.map((item, i) => {
                  const globalIdx = filteredCommands.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                      style={{
                        background: selectedIndex === globalIdx ? 'var(--color-surface-hover)' : 'transparent',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <span style={{ color: 'var(--color-text-tertiary)' }}>{item.icon}</span>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.description && (
                        <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                          {item.description}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
            {filteredCommands.length === 0 && (
              <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                No results found
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
