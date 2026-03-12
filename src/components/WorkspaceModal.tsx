"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useApp } from "@/store/AppContext";

const EMOJIS = [
  "🚀",
  "🎯",
  "🎨",
  "💡",
  "🔥",
  "⭐",
  "💼",
  "🏠",
  "📚",
  "🎵",
  "🏆",
  "💪",
  "🌟",
  "🎮",
  "🧪",
  "📊",
  "🛠️",
  "🌈",
  "🎉",
  "❤️",
  "🌍",
  "🧩",
  "📝",
  "🎪",
  "🔔",
  "🐾",
  "🍀",
  "⚡",
  "🏄",
  "🎭",
];

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
];

interface WorkspaceModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WorkspaceModal({ open, onClose }: WorkspaceModalProps) {
  const { createWorkspaceAction, switchWorkspace } = useApp();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🚀");
  const [color, setColor] = useState(COLORS[0]);
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || creating) return;
    setCreating(true);
    try {
      const wsId = await createWorkspaceAction(
        name.trim(),
        emoji,
        color,
        description.trim(),
      );
      switchWorkspace(wsId);
      onClose();
      setName("");
      setEmoji("🚀");
      setColor(COLORS[0]);
      setDescription("");
    } finally {
      setCreating(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="relative w-105 max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: "var(--color-border)" }}
            >
              <h2
                className="text-base font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                Create Workspace
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg transition-opacity hover:opacity-70"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Big emoji preview */}
              <div className="flex justify-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                  style={{
                    background: `${color}18`,
                    border: `2px solid ${color}40`,
                  }}
                >
                  {emoji}
                </div>
              </div>

              {/* Emoji picker */}
              <div>
                <label
                  className="block text-[11px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Choose an icon
                </label>
                <div className="grid grid-cols-10 gap-1">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => setEmoji(e)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all hover:scale-110"
                      style={{
                        background:
                          emoji === e ?
                            "var(--color-accent-light)"
                          : "transparent",
                        outline:
                          emoji === e ?
                            "2px solid var(--color-accent)"
                          : "none",
                        outlineOffset: -1,
                      }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Workspace name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Design Team, Marketing, etc."
                  maxLength={50}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm"
                  style={{
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-accent)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-border)")
                  }
                  autoFocus
                />
              </div>

              {/* Color */}
              <div>
                <label
                  className="block text-[11px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Color
                </label>
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className="w-8 h-8 rounded-full transition-all hover:scale-110"
                      style={{
                        background: c,
                        outline: color === c ? `3px solid ${c}` : "none",
                        outlineOffset: 2,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Description <span style={{ opacity: 0.5 }}>(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this workspace for?"
                  maxLength={200}
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm resize-none"
                  style={{
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-accent)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-border)")
                  }
                />
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 border-t flex justify-end"
              style={{ borderColor: "var(--color-border)" }}
            >
              <button
                onClick={handleCreate}
                disabled={!name.trim() || creating}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity disabled:opacity-40"
                style={{ background: color }}
              >
                {creating ? "Creating..." : "Create Workspace"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
