"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Quote,
} from "lucide-react";
import { useApp } from "@/store/AppContext";

const DEFAULT_QUOTES = [
  {
    id: "1",
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    id: "2",
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    id: "3",
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    id: "4",
    text: "Small daily improvements are the key to staggering long-term results.",
    author: "",
  },
  {
    id: "5",
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
  },
  {
    id: "6",
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
];

interface QuoteItem {
  id: string;
  text: string;
  author: string;
}

export default function QuotesCarousel() {
  const { state, saveCustomQuotes } = useApp();
  const contextQuotes = state.customQuotes as QuoteItem[];
  const [quotes, setQuotes] = useState<QuoteItem[]>(DEFAULT_QUOTES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);

  // Sync from context
  useEffect(() => {
    if (contextQuotes && contextQuotes.length > 0) {
      setQuotes(contextQuotes);
    }
  }, [contextQuotes]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused) {
        setCurrentIndex((i) => (i + 1) % quotes.length);
      }
    }, 6000);
  }, [quotes.length, paused]);

  useEffect(() => {
    if (quotes.length > 1) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer, quotes.length]);

  const next = () => {
    setCurrentIndex((i) => (i + 1) % quotes.length);
    startTimer();
  };

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + quotes.length) % quotes.length);
    startTimer();
  };

  const startEdit = (q: QuoteItem) => {
    setEditingId(q.id);
    setEditText(q.text);
    setEditAuthor(q.author);
    setPaused(true);
  };

  const saveEdit = () => {
    if (!editingId || !editText.trim()) return;
    const updated = quotes.map((q) =>
      q.id === editingId ?
        { ...q, text: editText.trim(), author: editAuthor.trim() }
      : q,
    );
    setQuotes(updated);
    saveCustomQuotes(updated);
    setEditingId(null);
    setPaused(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setPaused(false);
  };

  const deleteQuote = (id: string) => {
    if (quotes.length <= 1) return;
    const updated = quotes.filter((q) => q.id !== id);
    setQuotes(updated);
    saveCustomQuotes(updated);
    setCurrentIndex((i) => Math.min(i, updated.length - 1));
    setEditingId(null);
    setPaused(false);
  };

  const addQuote = () => {
    if (!newText.trim()) return;
    const newQ: QuoteItem = {
      id: crypto.randomUUID(),
      text: newText.trim(),
      author: newAuthor.trim(),
    };
    const updated = [...quotes, newQ];
    setQuotes(updated);
    saveCustomQuotes(updated);
    setCurrentIndex(updated.length - 1);
    setNewText("");
    setNewAuthor("");
    setAdding(false);
  };

  const current = quotes[currentIndex];
  if (!current) return null;

  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!editingId && !adding) setPaused(false);
      }}
    >
      {/* Top-right edit/add buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        <button
          onClick={() => startEdit(current)}
          className="p-1.5 rounded-md hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-text-tertiary)" }}
          title="Edit quote"
        >
          <Pencil size={12} />
        </button>
        <button
          onClick={() => {
            setAdding(true);
            setPaused(true);
          }}
          className="p-1.5 rounded-md hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-text-tertiary)" }}
          title="Add quote"
        >
          <Plus size={12} />
        </button>
      </div>

      <div className="flex items-start justify-center gap-3 mb-3">
        <Quote
          size={20}
          style={{ color: "var(--color-accent)", opacity: 0.5 }}
          className="shrink-0 mt-0.5"
        />
        <div className="min-h-15 max-w-lg">
          <AnimatePresence mode="wait">
            {editingId === current.id ?
              <motion.div
                key="edit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm resize-none"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                  rows={2}
                  autoFocus
                />
                <input
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  placeholder="Author (optional)"
                  className="w-full rounded-lg px-3 py-1.5 text-xs"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={saveEdit}
                    className="p-1 rounded-md hover:opacity-80"
                    style={{ color: "var(--color-success)" }}
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-1 rounded-md hover:opacity-80"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    <X size={14} />
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => deleteQuote(current.id)}
                    className="p-1 rounded-md hover:opacity-80"
                    style={{ color: "var(--color-danger)" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            : <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <p
                  className="text-sm italic leading-relaxed cursor-pointer"
                  style={{ color: "var(--color-text-primary)" }}
                  onDoubleClick={() => startEdit(current)}
                  title="Double-click to edit"
                >
                  &ldquo;{current.text}&rdquo;
                </p>
                {current.author && (
                  <p
                    className="text-xs mt-2"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    — {current.author}
                  </p>
                )}
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-3"
          >
            <div
              className="space-y-2 pt-2 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter your quote..."
                className="w-full rounded-lg px-3 py-2 text-sm resize-none"
                style={{
                  background: "var(--color-background)",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--color-border)",
                }}
                rows={2}
                autoFocus
              />
              <input
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Author (optional)"
                className="w-full rounded-lg px-3 py-1.5 text-xs"
                style={{
                  background: "var(--color-background)",
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addQuote();
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={addQuote}
                  className="px-3 py-1 rounded-lg text-xs font-medium text-white"
                  style={{ background: "var(--color-accent)" }}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setAdding(false);
                    setNewText("");
                    setNewAuthor("");
                  }}
                  className="px-3 py-1 rounded-lg text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={prev}
          className="p-1 rounded-md hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <ChevronLeft size={14} />
        </button>
        <div className="flex gap-1">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                startTimer();
              }}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                background:
                  i === currentIndex ?
                    "var(--color-accent)"
                  : "var(--color-border)",
              }}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-1 rounded-md hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
