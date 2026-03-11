"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Flag,
  Calendar,
  Clock,
  Tag,
  FolderOpen,
  AlertCircle,
  Sparkles,
  ChevronDown,
  AlignLeft,
  CircleDot,
  Repeat,
  Bell,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { getPriorityColor, getPriorityLabel } from "@/lib/nlp";
import type { Priority, Task } from "@/lib/types";

const PRIORITY_OPTIONS: Priority[] = [1, 2, 3, 4];

export default function TaskModal() {
  const { state, addTask, updateTask, closeTaskModal } = useApp();
  const modal = state.taskModal;

  const isEdit = modal?.mode === "edit";
  const existingTask = modal?.task;
  const defaults = modal?.defaults;

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(4);
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [recurrence, setRecurrence] = useState<Task["recurrence"]>("none");
  const [reminderMinutes, setReminderMinutes] = useState<number | null>(null);
  const [folderId, setFolderId] = useState("inbox");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [parentId, setParentId] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens/changes
  useEffect(() => {
    if (!modal) return;

    if (isEdit && existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description || "");
      setPriority(existingTask.priority);
      setDueDate(existingTask.dueDate || "");
      setDueTime(existingTask.dueTime || "");
      setStatus(existingTask.status);
      setRecurrence(existingTask.recurrence || "none");
      setReminderMinutes(existingTask.reminderMinutes ?? null);
      setFolderId(existingTask.folderId);
      setTags([...existingTask.tags]);
      setParentId(existingTask.parentId ?? null);
    } else {
      setTitle(defaults?.title || "");
      setDescription(defaults?.description || "");
      setPriority(defaults?.priority || 4);
      setDueDate(defaults?.dueDate || "");
      setDueTime(defaults?.dueTime || "");
      setStatus(defaults?.status || "todo");
      setRecurrence(defaults?.recurrence || "none");
      setReminderMinutes(defaults?.reminderMinutes ?? null);
      setFolderId(defaults?.folderId || state.activeFolderId);
      setTags(defaults?.tags ? [...defaults.tags] : []);
      setParentId(defaults?.parentId ?? null);
    }

    // Focus title input after mount
    setTimeout(() => titleRef.current?.focus(), 50);
  }, [modal]);

  if (!modal) return null;

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === ",") && tagsInput.trim()) {
      e.preventDefault();
      const tag = tagsInput.trim().replace(/^#/, "");
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
      }
      setTagsInput("");
    }
    if (e.key === "Backspace" && !tagsInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      titleRef.current?.focus();
      return;
    }

    const isDone = status === "done";

    if (isEdit && existingTask) {
      const nextCompletedAt =
        isDone ? existingTask.completedAt || new Date().toISOString() : null;

      updateTask(existingTask.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || null,
        dueTime: dueTime || null,
        recurrence,
        reminderMinutes,
        completed: isDone,
        completedAt: nextCompletedAt,
        status,
        folderId,
        tags,
      });
    } else {
      const completedAt = isDone ? new Date().toISOString() : null;
      addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: isDone,
        completedAt,
        priority,
        dueDate: dueDate || null,
        dueTime: dueTime || null,
        recurrence,
        reminderMinutes,
        tags,
        folderId,
        parentId,
        status,
      });
    }

    closeTaskModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeTaskModal();
    }
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const parentTask =
    parentId ? state.tasks.find((t) => t.id === parentId) : null;

  return (
    <AnimatePresence>
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={closeTaskModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent top bar */}
            <div
              className="h-1 w-full"
              style={{
                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
              }}
            />

            {/* Header */}
            <div className="flex items-center gap-3 px-6 pt-5 pb-1">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
                }}
              >
                <Sparkles size={16} style={{ color: "var(--color-accent)" }} />
              </div>
              <div className="flex-1">
                <h2
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {isEdit ? "Edit Task" : "New Task"}
                </h2>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {isEdit ?
                    "Update your task details"
                  : "What do you need to get done?"}
                </p>
              </div>
              <button
                onClick={closeTaskModal}
                className="p-2 rounded-xl transition-all hover:scale-105"
                style={{
                  color: "var(--color-text-tertiary)",
                  background: "var(--color-background)",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Parent task indicator */}
            {parentTask && (
              <div
                className="mx-6 mt-3 px-3 py-2 rounded-xl text-xs flex items-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
                  color: "var(--color-accent)",
                }}
              >
                <AlertCircle size={12} />
                <span className="opacity-70">Subtask of</span>
                <span className="font-semibold">{parentTask.title}</span>
              </div>
            )}

            {/* Form */}
            <div className="px-6 pt-4 pb-2 space-y-1">
              {/* Title */}
              <input
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.metaKey && !e.ctrlKey)
                    e.preventDefault();
                }}
                placeholder="Task title..."
                className="w-full text-lg font-semibold bg-transparent outline-none placeholder:font-normal"
                style={{ color: "var(--color-text-primary)" }}
              />

              {/* Description */}
              <div className="flex items-start gap-2.5 pt-1">
                <AlignLeft
                  size={14}
                  className="mt-2 shrink-0"
                  style={{ color: "var(--color-text-tertiary)", opacity: 0.5 }}
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description..."
                  rows={2}
                  className="w-full text-sm bg-transparent outline-none resize-none leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                />
              </div>
            </div>

            {/* Divider */}
            <div
              className="mx-6 h-px"
              style={{ background: "var(--color-border)" }}
            />

            {/* Options grid */}
            <div className="px-6 py-4 space-y-4">
              {/* Priority */}
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${getPriorityColor(priority)}12` }}
                >
                  <Flag
                    size={13}
                    style={{ color: getPriorityColor(priority) }}
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-1">
                  {PRIORITY_OPTIONS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all"
                      style={{
                        background:
                          priority === p ?
                            `${getPriorityColor(p)}15`
                          : "var(--color-background)",
                        color:
                          priority === p ?
                            getPriorityColor(p)
                          : "var(--color-text-tertiary)",
                        border:
                          priority === p ?
                            `1.5px solid ${getPriorityColor(p)}50`
                          : "1.5px solid transparent",
                        transform: priority === p ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      {getPriorityLabel(p)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time row */}
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background:
                      dueDate ?
                        "rgba(99,102,241,0.1)"
                      : "var(--color-background)",
                  }}
                >
                  <Calendar
                    size={13}
                    style={{
                      color:
                        dueDate ?
                          "var(--color-accent)"
                        : "var(--color-text-tertiary)",
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1 relative">
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl outline-none transition-all"
                      style={{
                        background: "var(--color-background)",
                        color:
                          dueDate ?
                            "var(--color-text-primary)"
                          : "var(--color-text-tertiary)",
                        border: "1.5px solid var(--color-border)",
                      }}
                    />
                    {dueDate && (
                      <button
                        onClick={() => setDueDate("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:opacity-70"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock
                      size={13}
                      style={{
                        color:
                          dueTime ?
                            "var(--color-accent)"
                          : "var(--color-text-tertiary)",
                      }}
                    />
                    <input
                      type="time"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                      className="text-xs px-2.5 py-2 rounded-xl outline-none transition-all"
                      style={{
                        background: "var(--color-background)",
                        color:
                          dueTime ?
                            "var(--color-text-primary)"
                          : "var(--color-text-tertiary)",
                        border: "1.5px solid var(--color-border)",
                      }}
                    />
                    {dueTime && (
                      <button
                        onClick={() => setDueTime("")}
                        className="p-0.5 rounded-full hover:opacity-70"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Recurrence */}
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background:
                      recurrence !== "none" ?
                        "rgba(99,102,241,0.1)"
                      : "var(--color-background)",
                  }}
                >
                  <Repeat
                    size={13}
                    style={{
                      color:
                        recurrence !== "none" ?
                          "var(--color-accent)"
                        : "var(--color-text-tertiary)",
                    }}
                  />
                </div>
                <select
                  value={recurrence || "none"}
                  onChange={(e) =>
                    setRecurrence(e.target.value as Task["recurrence"])
                  }
                  className="flex-1 text-xs px-3 py-2 rounded-xl outline-none"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-primary)",
                    border: "1.5px solid var(--color-border)",
                  }}
                >
                  <option value="none">No repeat</option>
                  <option value="daily">Repeat daily</option>
                  <option value="weekly">Repeat weekly</option>
                  <option value="monthly">Repeat monthly</option>
                </select>
              </div>

              {/* Reminder */}
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background:
                      reminderMinutes != null ?
                        "rgba(99,102,241,0.1)"
                      : "var(--color-background)",
                  }}
                >
                  <Bell
                    size={13}
                    style={{
                      color:
                        reminderMinutes != null ?
                          "var(--color-accent)"
                        : "var(--color-text-tertiary)",
                    }}
                  />
                </div>
                <select
                  value={
                    reminderMinutes == null ? "none" : String(reminderMinutes)
                  }
                  onChange={async (e) => {
                    const next =
                      e.target.value === "none" ? null : Number(e.target.value);
                    setReminderMinutes(next);
                    if (
                      next != null &&
                      typeof Notification !== "undefined" &&
                      Notification.permission === "default"
                    ) {
                      await Notification.requestPermission();
                    }
                  }}
                  className="flex-1 text-xs px-3 py-2 rounded-xl outline-none"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-primary)",
                    border: "1.5px solid var(--color-border)",
                  }}
                >
                  <option value="none">No reminder</option>
                  <option value="5">5 minutes before</option>
                  <option value="15">15 minutes before</option>
                  <option value="30">30 minutes before</option>
                  <option value="60">1 hour before</option>
                  <option value="1440">1 day before</option>
                </select>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background:
                      status === "done" ?
                        "rgba(16,185,129,0.1)"
                      : "var(--color-background)",
                  }}
                >
                  <CircleDot
                    size={13}
                    style={{
                      color:
                        status === "done" ?
                          "var(--color-success)"
                        : "var(--color-text-tertiary)",
                    }}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  {(["todo", "in-progress", "done"] as const).map((s) => {
                    const active = status === s;
                    const label =
                      s === "in-progress" ? "In Progress"
                      : s === "todo" ? "To Do"
                      : "Done";
                    const color =
                      s === "done" ? "var(--color-success)"
                      : s === "in-progress" ? "var(--color-warning)"
                      : "var(--color-accent)";
                    return (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all"
                        style={{
                          background:
                            active ? `${color}15` : "var(--color-background)",
                          color: active ? color : "var(--color-text-tertiary)",
                          border:
                            active ?
                              `1.5px solid ${color}50`
                            : "1.5px solid transparent",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Folder */}
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "var(--color-background)" }}
                >
                  <FolderOpen
                    size={13}
                    style={{ color: "var(--color-text-tertiary)" }}
                  />
                </div>
                <div className="relative">
                  <select
                    value={folderId}
                    onChange={(e) => setFolderId(e.target.value)}
                    className="text-xs px-3 py-2 pr-7 rounded-xl outline-none cursor-pointer appearance-none transition-all"
                    style={{
                      background: "var(--color-background)",
                      color: "var(--color-text-primary)",
                      border: "1.5px solid var(--color-border)",
                    }}
                  >
                    {state.folders.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={11}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "var(--color-text-tertiary)" }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background:
                      tags.length > 0 ?
                        "rgba(99,102,241,0.1)"
                      : "var(--color-background)",
                  }}
                >
                  <Tag
                    size={13}
                    style={{
                      color:
                        tags.length > 0 ?
                          "var(--color-accent)"
                        : "var(--color-text-tertiary)",
                    }}
                  />
                </div>
                <div
                  className="flex-1 flex flex-wrap items-center gap-1.5 min-h-9 px-3 py-1.5 rounded-xl transition-all"
                  style={{
                    background: "var(--color-background)",
                    border: "1.5px solid var(--color-border)",
                  }}
                >
                  {tags.map((tag) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))",
                        color: "var(--color-accent)",
                      }}
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:opacity-70 ml-0.5"
                      >
                        <X size={9} />
                      </button>
                    </motion.span>
                  ))}
                  <input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder={tags.length ? "" : "Add tags..."}
                    className="flex-1 min-w-15 text-xs bg-transparent outline-none"
                    style={{ color: "var(--color-text-primary)" }}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{
                background: "var(--color-background)",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <div
                className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-lg"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-text-tertiary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <kbd className="font-mono">⌘</kbd>
                <span>+</span>
                <kbd className="font-mono">↵</kbd>
                <span className="ml-1">{isEdit ? "save" : "add"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={closeTaskModal}
                  className="px-4 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
                  style={{
                    color: "var(--color-text-secondary)",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    opacity: title.trim() ? 1 : 0.4,
                    boxShadow:
                      title.trim() ? "0 4px 14px rgba(99,102,241,0.4)" : "none",
                  }}
                >
                  {isEdit ? "Save Changes" : "Add Task"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
