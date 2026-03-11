'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// ─── Types ────────────────────────────────
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  action?: () => void;
  children?: MenuItem[];
}

export interface MenuDivider {
  id: string;
  type: 'divider';
}

export type MenuEntry = MenuItem | MenuDivider;

function isDivider(entry: MenuEntry): entry is MenuDivider {
  return 'type' in entry && entry.type === 'divider';
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuEntry[];
  onClose: () => void;
}

// ─── Submenu component ────────────────────
function SubMenu({ item, parentRect }: { item: MenuItem; parentRect: DOMRect | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  useEffect(() => {
    if (!ref.current || !parentRect) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();

    let left = parentRect.width;
    let top = 0;

    // Flip left if it overflows the right edge
    if (parentRect.right + rect.width > window.innerWidth) {
      left = -rect.width;
    }
    // Flip up if it overflows bottom
    if (parentRect.top + top + rect.height > window.innerHeight) {
      top = -(rect.height - 32);
    }

    setPos({ left, top });
  }, [parentRect]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{ duration: 0.12 }}
      className="absolute z-[100] min-w-[180px] py-1.5 rounded-xl shadow-xl"
      style={{
        left: pos.left,
        top: pos.top,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {item.children?.map(child => (
        <MenuItemRow key={child.id} item={child} />
      ))}
    </motion.div>
  );
}

// ─── Single menu item row ─────────────────
function MenuItemRow({ item }: { item: MenuItem }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      ref={rowRef}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => { if (!hasChildren && item.action) item.action(); }}
        disabled={item.disabled}
        className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          color: item.danger ? 'var(--color-danger)' : 'var(--color-text-primary)',
          background: hovered ? 'var(--color-surface-hover)' : 'transparent',
        }}
      >
        {item.icon && (
          <span className="w-4 flex items-center justify-center shrink-0" style={{ opacity: 0.7 }}>
            {item.icon}
          </span>
        )}
        <span className="flex-1">{item.label}</span>
        {item.shortcut && (
          <span className="text-[11px] ml-4 opacity-40 font-mono">{item.shortcut}</span>
        )}
        {hasChildren && (
          <ChevronRight size={12} style={{ opacity: 0.4 }} />
        )}
      </button>

      {/* Submenu */}
      <AnimatePresence>
        {hovered && hasChildren && (
          <SubMenu item={item} parentRect={rowRef.current?.getBoundingClientRect() ?? null} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ContextMenu ─────────────────────
export default function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  // Adjust position so menu stays within viewport
  useEffect(() => {
    if (!menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    let nx = x;
    let ny = y;

    if (x + rect.width > window.innerWidth - 8) {
      nx = window.innerWidth - rect.width - 8;
    }
    if (y + rect.height > window.innerHeight - 8) {
      ny = window.innerHeight - rect.height - 8;
    }
    if (nx < 8) nx = 8;
    if (ny < 8) ny = 8;

    setPosition({ x: nx, y: ny });
  }, [x, y]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleScroll = () => onClose();

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className="fixed z-[9999] min-w-[200px] py-1.5 rounded-xl shadow-2xl"
      style={{
        left: position.x,
        top: position.y,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        backdropFilter: 'blur(20px)',
        transformOrigin: 'top left',
      }}
      onContextMenu={e => e.preventDefault()}
    >
      {items.map(entry => {
        if (isDivider(entry)) {
          return (
            <div
              key={entry.id}
              className="my-1 mx-2 h-px"
              style={{ background: 'var(--color-border)' }}
            />
          );
        }
        return <MenuItemRow key={entry.id} item={entry} />;
      })}
    </motion.div>,
    document.body
  );
}

// ─── Hook: useContextMenu ─────────────────
export function useContextMenu() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeMenu = useCallback(() => setMenu(null), []);

  return { menu, handleContextMenu, closeMenu };
}
