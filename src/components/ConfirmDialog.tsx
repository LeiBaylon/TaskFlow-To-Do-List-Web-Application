"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-90 bg-black/45"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-91 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-md rounded-2xl p-5"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--glass-shadow)",
              }}
            >
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="text-sm mt-2 leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {message}
              </p>
              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  onClick={onCancel}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{
                    background:
                      danger ? "var(--color-danger)" : "var(--color-accent)",
                  }}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
