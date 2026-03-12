"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";

interface LogoutConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutConfirmModal({
  open,
  onConfirm,
  onCancel,
}: LogoutConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.45)" }}
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15 }}
            className="relative w-85 rounded-2xl p-6 shadow-xl"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "var(--color-accent-light)" }}
              >
                <LogOut size={20} style={{ color: "var(--color-accent)" }} />
              </div>
              <div>
                <h3
                  className="text-base font-semibold mb-1"
                  style={{ color: "var(--color-text)" }}
                >
                  Sign out?
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Are you sure you want to sign out of your account?
                </p>
              </div>
              <div className="flex gap-2.5 w-full">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    background: "var(--color-bg)",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-colors"
                  style={{ background: "var(--color-accent)" }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
