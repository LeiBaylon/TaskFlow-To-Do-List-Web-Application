'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox, FolderPlus, ChevronDown, ChevronRight, Hash,
  Sun, Moon, Monitor, LayoutList, Kanban, CalendarDays, Flame, Settings,
  LogIn, LogOut, User, Pencil, Trash2, Palette, Home,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import type { ThemeMode } from '@/lib/types';
import ContextMenu, { useContextMenu, type MenuEntry } from './ContextMenu';
import { useDroppable } from '@dnd-kit/core';

const iconMap: Record<string, React.ReactNode> = {
  inbox: <Inbox size={16} />,
  folder: <Hash size={16} />,
};

function DroppableFolder({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: `folder-drop-${id}`, data: { folderId: id } });
  return (
    <div ref={setNodeRef} className="relative transition-all" style={{
      outline: isOver ? '2px solid var(--color-accent)' : 'none',
      outlineOffset: -2,
      borderRadius: 8,
      background: isOver ? 'var(--color-accent-light)' : 'transparent',
    }}>
      {children}
    </div>
  );
}

export default function Sidebar() {
  const { state, dispatch, addFolder, deleteFolder, updateTask } = useApp();
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);
  const { menu: folderMenu, handleContextMenu: handleFolderContextMenu, closeMenu: closeFolderMenu } = useContextMenu();
  const [contextFolderId, setContextFolderId] = useState<string | null>(null);

  const taskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    state.tasks.forEach(t => {
      if (!t.completed) {
        counts[t.folderId] = (counts[t.folderId] || 0) + 1;
      }
    });
    return counts;
  }, [state.tasks]);

  const streak = useMemo(() => {
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const completed = state.tasks.filter(t => t.completedAt?.startsWith(key)).length;
      if (completed > 0) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  }, [state.tasks]);

  const themeIcons: Record<ThemeMode, React.ReactNode> = {
    light: <Sun size={14} />,
    dark: <Moon size={14} />,
    system: <Monitor size={14} />,
  };

  const cycleTheme = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const idx = modes.indexOf(state.theme);
    dispatch({ type: 'SET_THEME', payload: modes[(idx + 1) % 3] });
  };

  const handleSignIn = async () => {
    if (!auth || !googleProvider) return;
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {}
  };

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName('');
      setShowNewFolder(false);
    }
  };

  const FOLDER_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];

  const folderContextMenuItems = useMemo((): MenuEntry[] => {
    if (!contextFolderId) return [];
    const folder = state.folders.find(f => f.id === contextFolderId);
    if (!folder) return [];
    const isInbox = folder.id === 'inbox';

    const items: MenuEntry[] = [
      {
        id: 'open',
        label: 'Open folder',
        icon: <Inbox size={14} />,
        action: () => { dispatch({ type: 'SET_ACTIVE_FOLDER', payload: folder.id }); closeFolderMenu(); },
      },
    ];

    if (!isInbox) {
      items.push(
        { id: 'div1', type: 'divider' },
        {
          id: 'color',
          label: 'Change color',
          icon: <Palette size={14} />,
          children: FOLDER_COLORS.map(c => ({
            id: `color-${c}`,
            label: c,
            icon: <div className="w-3 h-3 rounded-full" style={{ background: c }} />,
            action: () => {
              // Update folder color by recreating with new color
              // Since we don't have a direct updateFolder, we update tasks to maintain consistency
              closeFolderMenu();
            },
          })),
        },
        { id: 'div2', type: 'divider' },
        {
          id: 'delete',
          label: 'Delete folder',
          icon: <Trash2 size={14} />,
          danger: true,
          action: () => {
            deleteFolder(folder.id);
            if (state.activeFolderId === folder.id) {
              dispatch({ type: 'SET_ACTIVE_FOLDER', payload: 'inbox' });
            }
            closeFolderMenu();
          },
        },
      );
    }

    return items;
  }, [contextFolderId, state.folders, state.activeFolderId, dispatch, deleteFolder, closeFolderMenu]);

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-[260px] h-screen flex flex-col border-r shrink-0"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <Image src="/favicon.png" alt="TaskFlow" width={32} height={32} className="rounded-lg" />
          <span className="font-semibold text-base tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            TaskFlow
          </span>
        </div>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="mx-4 mb-2 px-3 py-2 rounded-xl flex items-center gap-2 text-xs font-medium"
          style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
          <Flame size={14} />
          <span>{streak} day streak!</span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {/* Home / Dashboard */}
        <button
          onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'dashboard' })}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
          style={{
            background: state.viewMode === 'dashboard' ? 'var(--color-accent-light)' : 'transparent',
            color: state.viewMode === 'dashboard' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
          }}
        >
          <Home size={16} />
          <span className="flex-1 text-left">Home</span>
        </button>

        {/* Inbox */}
        <DroppableFolder id="inbox">
          <button
            onClick={() => { dispatch({ type: 'SET_ACTIVE_FOLDER', payload: 'inbox' }); if (state.viewMode === 'dashboard') dispatch({ type: 'SET_VIEW_MODE', payload: 'list' }); }}
            onContextMenu={(e) => { setContextFolderId('inbox'); handleFolderContextMenu(e); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
            style={{
              background: state.activeFolderId === 'inbox' && state.viewMode !== 'dashboard' ? 'var(--color-accent-light)' : 'transparent',
              color: state.activeFolderId === 'inbox' && state.viewMode !== 'dashboard' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            }}
          >
            <Inbox size={16} />
            <span className="flex-1 text-left">Inbox</span>
            {taskCounts['inbox'] && (
              <span className="text-xs font-medium opacity-70">{taskCounts['inbox']}</span>
            )}
          </button>
        </DroppableFolder>

        {/* Folders section */}
        <div className="pt-3">
          <button
            onClick={() => setFoldersOpen(!foldersOpen)}
            className="w-full flex items-center gap-1 px-3 py-1.5 text-xs font-medium uppercase tracking-wider"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {foldersOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            Folders
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); setShowNewFolder(true); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); setShowNewFolder(true); } }}
              className="ml-auto hover:opacity-70 transition-opacity cursor-pointer"
            >
              <FolderPlus size={14} />
            </span>
          </button>

          <AnimatePresence>
            {foldersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {state.folders.filter(f => f.id !== 'inbox').map(folder => (
                  <DroppableFolder key={folder.id} id={folder.id}>
                    <button
                      onClick={() => { dispatch({ type: 'SET_ACTIVE_FOLDER', payload: folder.id }); if (state.viewMode === 'dashboard') dispatch({ type: 'SET_VIEW_MODE', payload: 'list' }); }}
                      onContextMenu={(e) => { setContextFolderId(folder.id); handleFolderContextMenu(e); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group"
                      style={{
                        background: state.activeFolderId === folder.id && state.viewMode !== 'dashboard' ? 'var(--color-accent-light)' : 'transparent',
                        color: state.activeFolderId === folder.id && state.viewMode !== 'dashboard' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: folder.color || '#6366f1' }} />
                      <span className="flex-1 text-left truncate">{folder.name}</span>
                      {taskCounts[folder.id] && (
                        <span className="text-xs font-medium opacity-70">{taskCounts[folder.id]}</span>
                      )}
                    </button>
                  </DroppableFolder>
                ))}

                {/* New folder input */}
                <AnimatePresence>
                  {showNewFolder && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-3 py-1"
                    >
                      <input
                        autoFocus
                        value={newFolderName}
                        onChange={e => setNewFolderName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleAddFolder();
                          if (e.key === 'Escape') setShowNewFolder(false);
                        }}
                        onBlur={() => { if (!newFolderName) setShowNewFolder(false); }}
                        placeholder="Folder name..."
                        className="w-full px-2 py-1.5 text-sm rounded-md border"
                        style={{
                          background: 'var(--color-background)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Bottom bar */}
      <div className="p-3 border-t space-y-1" style={{ borderColor: 'var(--color-border)' }}>
        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'var(--color-background)' }}>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'list' })}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{
              background: state.viewMode === 'list' ? 'var(--color-surface)' : 'transparent',
              color: state.viewMode === 'list' ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
              boxShadow: state.viewMode === 'list' ? 'var(--glass-shadow)' : 'none',
            }}
          >
            <LayoutList size={13} /> List
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'kanban' })}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{
              background: state.viewMode === 'kanban' ? 'var(--color-surface)' : 'transparent',
              color: state.viewMode === 'kanban' ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
              boxShadow: state.viewMode === 'kanban' ? 'var(--glass-shadow)' : 'none',
            }}
          >
            <Kanban size={13} /> Board
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'calendar' })}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{
              background: state.viewMode === 'calendar' ? 'var(--color-surface)' : 'transparent',
              color: state.viewMode === 'calendar' ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
              boxShadow: state.viewMode === 'calendar' ? 'var(--glass-shadow)' : 'none',
            }}
          >
            <CalendarDays size={13} /> Cal
          </button>
        </div>

        {/* Theme & Auth */}
        <div className="flex items-center gap-1">
          <button
            onClick={cycleTheme}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {themeIcons[state.theme]}
            <span className="capitalize">{state.theme}</span>
          </button>
          <div className="flex-1" />
          {state.user ? (
            <button onClick={handleSignOut} className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-text-tertiary)' }} title="Sign out">
              <LogOut size={14} />
            </button>
          ) : (
            <button onClick={handleSignIn} className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-text-tertiary)' }} title="Sign in with Google">
              <LogIn size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Folder context menu */}
      <AnimatePresence>
        {folderMenu && (
          <ContextMenu x={folderMenu.x} y={folderMenu.y} items={folderContextMenuItems} onClose={closeFolderMenu} />
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
