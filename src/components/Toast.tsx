"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const icon =
    type === "success" ?
      <CheckCircle2 size={18} style={{ color: "#22c55e" }} />
    : <XCircle size={18} style={{ color: "#ef4444" }} />;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 14,
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          maxWidth: "90vw",
        }}
      >
        {icon}
        <span
          style={{
            color: "var(--color-text)",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {message}
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            display: "flex",
            color: "var(--color-text-tertiary)",
          }}
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
