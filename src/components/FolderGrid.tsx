"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  FolderPlus,
  MoreHorizontal,
  Trash2,
  Pencil,
  Check,
  LayoutGrid,
  List,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import ConfirmDialog from "./ConfirmDialog";

const PALETTE = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#06b6d4",
];

export default function FolderGrid() {
  const { state, dispatch, addFolder, deleteFolder, updateFolder } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(PALETTE[0]);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [deleteCandidate, setDeleteCandidate] = useState<{
    id: string;
    name: string;
    total: number;
  } | null>(null);
  const newInputRef = useRef<HTMLInputElement>(null);

  const taskCounts = useMemo(() => {
    const counts: Record<
      string,
      { total: number; pending: number; done: number }
    > = {};
    state.tasks.forEach((t) => {
      if (!counts[t.folderId])
        counts[t.folderId] = { total: 0, pending: 0, done: 0 };
      counts[t.folderId].total++;
      if (t.completed || t.status === "done") counts[t.folderId].done++;
      else counts[t.folderId].pending++;
    });
    return counts;
  }, [state.tasks]);

  function openFolder(folderId: string) {
    dispatch({ type: "SET_ACTIVE_FOLDER", payload: folderId });
    dispatch({ type: "SET_VIEW_MODE", payload: "list" });
  }

  function handleAddFolder() {
    if (!newName.trim()) return;
    addFolder(newName.trim(), undefined, newColor);
    setNewName("");
    setNewColor(PALETTE[0]);
    setShowNew(false);
  }

  function handleCancelNewFolder() {
    setNewName("");
    setNewColor(PALETTE[0]);
    setShowNew(false);
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };
  const cardVariant = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22 } },
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Folders
          </h1>
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {state.folders.filter((f) => f.id !== "inbox").length} folder
            {state.folders.filter((f) => f.id !== "inbox").length !== 1 ?
              "s"
            : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Layout toggle */}
          <div
            className="flex items-center gap-0.5 p-1 rounded-xl"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <button
              onClick={() => setLayout("grid")}
              className="p-1.5 rounded-lg transition-all"
              style={{
                background:
                  layout === "grid" ? "var(--color-background)" : "transparent",
                color:
                  layout === "grid" ?
                    "var(--color-accent)"
                  : "var(--color-text-tertiary)",
              }}
              title="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setLayout("list")}
              className="p-1.5 rounded-lg transition-all"
              style={{
                background:
                  layout === "list" ? "var(--color-background)" : "transparent",
                color:
                  layout === "list" ?
                    "var(--color-accent)"
                  : "var(--color-text-tertiary)",
              }}
              title="List view"
            >
              <List size={14} />
            </button>
          </div>
          <button
            onClick={() => {
              setShowNew(true);
              setTimeout(() => newInputRef.current?.focus(), 50);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <FolderPlus size={15} />
            New Folder
          </button>
        </div>
      </div>

      {/* New folder form */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <div
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <input
                ref={newInputRef}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddFolder();
                  if (e.key === "Escape") handleCancelNewFolder();
                }}
                placeholder="Folder name…"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--color-text-primary)" }}
              />
              <div className="flex items-center gap-1.5">
                {PALETTE.map((c) => (
                  <button
                    key={c}
                    onClick={() => setNewColor(c)}
                    className="w-5 h-5 rounded-full transition-transform hover:scale-110"
                    style={{
                      background: c,
                      outline: newColor === c ? `2px solid ${c}` : "none",
                      outlineOffset: 2,
                    }}
                  />
                ))}
              </div>
              <button
                onClick={handleAddFolder}
                disabled={!newName.trim()}
                className="p-1.5 rounded-lg disabled:opacity-40 transition"
                style={{
                  background: "var(--color-accent-light)",
                  color: "var(--color-accent)",
                }}
              >
                <Check size={14} />
              </button>
              <button
                onClick={handleCancelNewFolder}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Folder grid / list */}
      <motion.div
        key={layout}
        variants={container}
        initial="hidden"
        animate="show"
        className={
          layout === "grid" ?
            "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          : "flex flex-col gap-2"
        }
      >
        {state.folders
          .filter((f) => f.id !== "inbox")
          .map((folder) => {
            const counts = taskCounts[folder.id] ?? {
              total: 0,
              pending: 0,
              done: 0,
            };
            const progress =
              counts.total > 0 ?
                Math.round((counts.done / counts.total) * 100)
              : 0;
            const color = folder.color || "#6366f1";

            if (layout === "list") {
              return (
                <motion.div
                  key={folder.id}
                  variants={cardVariant}
                  className="relative group"
                >
                  <button
                    onClick={() => openFolder(folder.id)}
                    className="w-full text-left rounded-xl px-4 py-3 flex items-center gap-4 transition-all duration-200 hover:opacity-90"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${color}20` }}
                    >
                      <FolderOpen size={16} style={{ color }} />
                    </div>

                    {/* Name */}
                    {renamingId === folder.id ?
                      <input
                        autoFocus
                        value={renameVal}
                        onChange={(e) => setRenameVal(e.target.value)}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === "Enter") {
                            if (renameVal.trim())
                              updateFolder(folder.id, {
                                name: renameVal.trim(),
                              });
                            setRenamingId(null);
                          }
                          if (e.key === "Escape") setRenamingId(null);
                        }}
                        onBlur={() => {
                          if (renameVal.trim())
                            updateFolder(folder.id, { name: renameVal.trim() });
                          setRenamingId(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-sm font-medium bg-transparent outline-none border-b"
                        style={{
                          color: "var(--color-text-primary)",
                          borderColor: "var(--color-accent)",
                        }}
                      />
                    : <span
                        className="flex-1 text-sm font-medium truncate"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {folder.name}
                      </span>
                    }

                    {/* Progress bar */}
                    <div
                      className="w-24 h-1.5 rounded-full overflow-hidden shrink-0"
                      style={{ background: "var(--color-border)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>

                    <span
                      className="text-xs shrink-0 w-20 text-right"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {counts.pending} pending
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuId(menuId === folder.id ? null : folder.id);
                      }}
                      className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {menuId === folder.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setMenuId(null)}
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.92, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.92, y: -4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute top-10 right-2 z-20 w-40 rounded-xl overflow-hidden shadow-xl"
                          style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRenamingId(folder.id);
                              setRenameVal(folder.name);
                              setMenuId(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors"
                            style={{ color: "var(--color-text-secondary)" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "var(--color-accent-light)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <Pencil size={12} /> Rename
                          </button>
                          <div
                            className="flex items-center gap-1.5 px-4 py-2 overflow-x-auto"
                            style={{
                              borderTop: "1px solid var(--color-border)",
                            }}
                          >
                            {PALETTE.map((c) => (
                              <button
                                key={c}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateFolder(folder.id, { color: c });
                                  setMenuId(null);
                                }}
                                className="w-4 h-4 rounded-full shrink-0 transition-transform hover:scale-110"
                                style={{
                                  background: c,
                                  outline:
                                    folder.color === c ?
                                      `2px solid ${c}`
                                    : "none",
                                  outlineOffset: 2,
                                }}
                              />
                            ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteCandidate({
                                id: folder.id,
                                name: folder.name,
                                total: taskCounts[folder.id]?.total ?? 0,
                              });
                              setMenuId(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors"
                            style={{ color: "var(--color-danger)" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(239,68,68,0.08)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }

            // Grid card
            return (
              <motion.div
                key={folder.id}
                variants={cardVariant}
                className="relative group"
              >
                <button
                  onClick={() => openFolder(folder.id)}
                  className="w-full text-left rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {/* Folder icon + menu trigger */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${color}20` }}
                    >
                      <FolderOpen size={20} style={{ color }} />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuId(menuId === folder.id ? null : folder.id);
                      }}
                      className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>

                  {/* Name */}
                  {renamingId === folder.id ?
                    <input
                      autoFocus
                      value={renameVal}
                      onChange={(e) => setRenameVal(e.target.value)}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === "Enter") {
                          if (renameVal.trim())
                            updateFolder(folder.id, { name: renameVal.trim() });
                          setRenamingId(null);
                        }
                        if (e.key === "Escape") setRenamingId(null);
                      }}
                      onBlur={() => {
                        if (renameVal.trim())
                          updateFolder(folder.id, { name: renameVal.trim() });
                        setRenamingId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full text-sm font-semibold bg-transparent outline-none border-b mb-2"
                      style={{
                        color: "var(--color-text-primary)",
                        borderColor: "var(--color-accent)",
                      }}
                    />
                  : <p
                      className="text-sm font-semibold truncate mb-1"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {folder.name}
                    </p>
                  }

                  {/* Counts */}
                  <p
                    className="text-xs mb-3"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {counts.pending} pending · {counts.done} done
                  </p>

                  {/* Progress bar */}
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--color-border)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {menuId === folder.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setMenuId(null)}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute top-12 right-2 z-20 w-40 rounded-xl overflow-hidden shadow-xl"
                        style={{
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRenamingId(folder.id);
                            setRenameVal(folder.name);
                            setMenuId(null);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors"
                          style={{ color: "var(--color-text-secondary)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "var(--color-accent-light)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          <Pencil size={12} />
                          Rename
                        </button>
                        <div
                          className="flex items-center gap-1.5 px-4 py-2 overflow-x-auto"
                          style={{ borderTop: "1px solid var(--color-border)" }}
                        >
                          {PALETTE.map((c) => (
                            <button
                              key={c}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateFolder(folder.id, { color: c });
                                setMenuId(null);
                              }}
                              className="w-4 h-4 rounded-full shrink-0 transition-transform hover:scale-110"
                              style={{
                                background: c,
                                outline:
                                  folder.color === c ?
                                    `2px solid ${c}`
                                  : "none",
                                outlineOffset: 2,
                              }}
                            />
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteCandidate({
                              id: folder.id,
                              name: folder.name,
                              total: taskCounts[folder.id]?.total ?? 0,
                            });
                            setMenuId(null);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors"
                          style={{ color: "var(--color-danger)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(239,68,68,0.08)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
      </motion.div>

      {state.folders.filter((f) => f.id !== "inbox").length === 0 && (
        <div
          className="mt-16 text-center"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <FolderOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No folders yet. Create one to get started!</p>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteCandidate}
        title="Delete Folder"
        message={
          deleteCandidate ?
            `Delete \"${deleteCandidate.name}\"?${deleteCandidate.total > 0 ? ` This will also remove ${deleteCandidate.total} task${deleteCandidate.total === 1 ? "" : "s"} in this folder.` : ""}`
          : ""
        }
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteCandidate(null)}
        onConfirm={() => {
          if (!deleteCandidate) return;
          deleteFolder(deleteCandidate.id);
          setDeleteCandidate(null);
        }}
      />
    </div>
  );
}
