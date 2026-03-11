"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  FolderOpen,
  Sun,
  Moon,
  Monitor,
  Flame,
  LogIn,
  LogOut,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Download,
  Upload,
  Settings2,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import type { ThemeMode } from "@/lib/types";
import { useDroppable } from "@dnd-kit/core";

function DroppableFolder({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `folder-drop-${id}`,
    data: { folderId: id },
  });
  return (
    <div
      ref={setNodeRef}
      className="relative transition-all"
      style={{
        outline: isOver ? "2px solid var(--color-accent)" : "none",
        outlineOffset: -2,
        borderRadius: 8,
        background: isOver ? "var(--color-accent-light)" : "transparent",
      }}
    >
      {children}
    </div>
  );
}

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!settingsOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);
  const taskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    state.tasks.forEach((t) => {
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
      const key = d.toISOString().split("T")[0];
      const completed = state.tasks.filter((t) =>
        t.completedAt?.startsWith(key),
      ).length;
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
    const modes: ThemeMode[] = ["light", "dark", "system"];
    const idx = modes.indexOf(state.theme);
    dispatch({ type: "SET_THEME", payload: modes[(idx + 1) % 3] });
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

  const handleExportBackup = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      folders: state.folders,
      tasks: state.tasks,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `taskflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as {
        folders?: typeof state.folders;
        tasks?: typeof state.tasks;
      };
      if (!parsed.folders || !parsed.tasks) {
        window.alert("Invalid backup file");
        return;
      }
      dispatch({ type: "SET_FOLDERS", payload: parsed.folders });
      dispatch({ type: "SET_TASKS", payload: parsed.tasks });
      window.alert("Backup imported");
    } catch {
      window.alert("Import failed");
    } finally {
      e.target.value = "";
    }
  };


  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0, width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-dvh flex flex-col border-r shrink-0 overflow-hidden"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Logo + Collapse toggle */}
      <div
        className={`flex items-center ${collapsed ? "justify-center px-2 pt-4 pb-2" : "px-4 pt-5 pb-4"}`}
      >
        {collapsed ?
          <button
            onClick={() => setCollapsed(false)}
            className="transition-opacity hover:opacity-70"
          >
            <Image
              src="/favicon.png"
              alt="TaskFlow"
              width={36}
              height={36}
              className="rounded-lg"
            />
          </button>
        : <div className="flex items-center w-full gap-2">
            <Image
              src="/Logo.png"
              alt="TaskFlow"
              width={260}
              height={52}
              className="h-auto flex-1 min-w-0 object-contain object-left"
              priority
            />
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-md transition-colors hover:opacity-70 shrink-0"
              style={{ color: "var(--color-text-tertiary)" }}
              title="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>
        }
      </div>

      {/* Collapsed mode: icon-only nav */}
      {collapsed ?
        <>
          <nav className="flex-1 flex flex-col items-center gap-1 px-2 py-3">
            <button
              onClick={() =>
                dispatch({ type: "SET_VIEW_MODE", payload: "dashboard" })
              }
              className="p-2.5 rounded-lg transition-all"
              style={{
                background:
                  state.viewMode === "dashboard" ?
                    "var(--color-accent-light)"
                  : "transparent",
                color:
                  state.viewMode === "dashboard" ?
                    "var(--color-accent)"
                  : "var(--color-text-secondary)",
              }}
              title="Home"
            >
              <Home size={18} />
            </button>
            <button
              onClick={() => {
                dispatch({ type: "SET_ACTIVE_FOLDER", payload: "inbox" });
                if (
                  state.viewMode === "dashboard" ||
                  state.viewMode === "folders"
                )
                  dispatch({ type: "SET_VIEW_MODE", payload: "list" });
              }}
              className="p-2.5 rounded-lg transition-all"
              style={{
                background:
                  (
                    state.activeFolderId === "inbox" &&
                    state.viewMode !== "dashboard" &&
                    state.viewMode !== "folders"
                  ) ?
                    "var(--color-accent-light)"
                  : "transparent",
                color:
                  (
                    state.activeFolderId === "inbox" &&
                    state.viewMode !== "dashboard" &&
                    state.viewMode !== "folders"
                  ) ?
                    "var(--color-accent)"
                  : "var(--color-text-secondary)",
              }}
              title="Inbox"
            >
              <Inbox size={18} />
            </button>
            {/* Scrollable folder dots — max 7 visible */}
            <div
              className="overflow-y-auto flex flex-col items-center gap-1 w-full"
              style={{ maxHeight: "calc(7 * 44px)" }}
            >
              {state.folders
                .filter((f) => f.id !== "inbox")
                .map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => {
                      dispatch({
                        type: "SET_ACTIVE_FOLDER",
                        payload: folder.id,
                      });
                      if (state.viewMode === "dashboard")
                        dispatch({ type: "SET_VIEW_MODE", payload: "list" });
                    }}
                    className="p-2.5 rounded-lg transition-all"
                    style={{
                      background:
                        (
                          state.activeFolderId === folder.id &&
                          state.viewMode !== "dashboard"
                        ) ?
                          "var(--color-accent-light)"
                        : "transparent",
                      color:
                        (
                          state.activeFolderId === folder.id &&
                          state.viewMode !== "dashboard"
                        ) ?
                          "var(--color-accent)"
                        : "var(--color-text-secondary)",
                    }}
                    title={folder.name}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: folder.color || "#6366f1" }}
                    />
                  </button>
                ))}
            </div>
          </nav>

          {/* Collapsed bottom: settings */}
          <div
            className="p-2 border-t flex flex-col items-center gap-1"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setSettingsOpen((o) => !o)}
                className="p-2 rounded-lg transition-all"
                style={{
                  color:
                    settingsOpen ?
                      "var(--color-accent)"
                    : "var(--color-text-tertiary)",
                  background:
                    settingsOpen ? "var(--color-accent-light)" : "transparent",
                }}
                title="Settings"
              >
                <Settings2 size={16} />
              </button>
              <AnimatePresence>
                {settingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -6, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-0 left-full ml-2 w-52 rounded-xl overflow-hidden z-50"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      boxShadow: "var(--glass-shadow)",
                    }}
                  >
                    <div
                      className="px-4 py-2 text-xs font-semibold tracking-wide uppercase"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      Settings
                    </div>
                    <div
                      className="h-px"
                      style={{ background: "var(--color-border)" }}
                    />
                    <button
                      onClick={() => {
                        handleExportBackup();
                        setSettingsOpen(false);
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
                      <Download size={13} />
                      <span>Export backup</span>
                    </button>
                    <button
                      onClick={() => {
                        importInputRef.current?.click();
                        setSettingsOpen(false);
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
                      <Upload size={13} />
                      <span>Import backup</span>
                    </button>
                    <div
                      className="h-px mx-3"
                      style={{ background: "var(--color-border)" }}
                    />
                    <button
                      onClick={cycleTheme}
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
                      {themeIcons[state.theme]}
                      <span className="capitalize">{state.theme} mode</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setCollapsed(false)}
              className="p-2 rounded-lg transition-all"
              style={{ color: "var(--color-text-tertiary)" }}
              title="Expand sidebar"
            >
              <PanelLeftOpen size={16} />
            </button>
          </div>
        </>
      : <>
          {/* Nav */}
          <nav className="flex-1 overflow-y-auto flex flex-col px-3 py-2 space-y-0.5">
            {/* Home / Dashboard */}
            <button
              onClick={() =>
                dispatch({ type: "SET_VIEW_MODE", payload: "dashboard" })
              }
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
              style={{
                background:
                  state.viewMode === "dashboard" ?
                    "var(--color-accent-light)"
                  : "transparent",
                color:
                  state.viewMode === "dashboard" ?
                    "var(--color-accent)"
                  : "var(--color-text-secondary)",
              }}
            >
              <Home size={16} />
              <span className="flex-1 text-left">Home</span>
            </button>

            {/* Inbox */}
            <DroppableFolder id="inbox">
              <button
                onClick={() => {
                  dispatch({ type: "SET_ACTIVE_FOLDER", payload: "inbox" });
                  if (
                    state.viewMode === "dashboard" ||
                    state.viewMode === "folders"
                  )
                    dispatch({ type: "SET_VIEW_MODE", payload: "list" });
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
                style={{
                  background:
                    (
                      state.activeFolderId === "inbox" &&
                      state.viewMode !== "dashboard" &&
                      state.viewMode !== "folders"
                    ) ?
                      "var(--color-accent-light)"
                    : "transparent",
                  color:
                    (
                      state.activeFolderId === "inbox" &&
                      state.viewMode !== "dashboard" &&
                      state.viewMode !== "folders"
                    ) ?
                      "var(--color-accent)"
                    : "var(--color-text-secondary)",
                }}
              >
                <Inbox size={16} />
                <span className="flex-1 text-left">Inbox</span>
                {taskCounts["inbox"] && (
                  <span className="text-xs font-medium opacity-70">
                    {taskCounts["inbox"]}
                  </span>
                )}
              </button>
            </DroppableFolder>

            {/* Folders nav item */}
            <button
              onClick={() =>
                dispatch({ type: "SET_VIEW_MODE", payload: "folders" })
              }
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
              style={{
                background:
                  state.viewMode === "folders" ?
                    "var(--color-accent-light)"
                  : "transparent",
                color:
                  state.viewMode === "folders" ?
                    "var(--color-accent)"
                  : "var(--color-text-secondary)",
              }}
            >
              <FolderOpen size={16} />
              <span className="flex-1 text-left">Folders</span>
              {state.folders.filter((f) => f.id !== "inbox").length > 0 && (
                <span className="text-xs font-medium opacity-70">
                  {state.folders.filter((f) => f.id !== "inbox").length}
                </span>
              )}
            </button>
          </nav>

          {/* Bottom bar */}
          <div
            className="p-3 border-t space-y-1"
            style={{ borderColor: "var(--color-border)" }}
          >
            <input
              ref={importInputRef}
              type="file"
              accept="application/json"
              onChange={handleImportBackup}
              className="hidden"
            />

            {/* Streak */}
            {streak > 0 && (
              <div
                className="mb-2 px-3 py-2 rounded-xl flex items-center gap-2 text-xs font-medium"
                style={{
                  background: "var(--color-accent-light)",
                  color: "var(--color-accent)",
                }}
              >
                <Flame size={14} />
                <span>{streak} day streak!</span>
              </div>
            )}

            {/* Settings & Auth */}
            <div className="flex items-center gap-1">
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setSettingsOpen((o) => !o)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{
                    color:
                      settingsOpen ?
                        "var(--color-accent)"
                      : "var(--color-text-secondary)",
                    background:
                      settingsOpen ?
                        "var(--color-accent-light)"
                      : "transparent",
                  }}
                  title="Settings"
                >
                  <Settings2 size={13} />
                  <span>Settings</span>
                </button>
                <AnimatePresence>
                  {settingsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-0 mb-2 w-52 rounded-xl overflow-hidden z-50"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        boxShadow: "var(--glass-shadow)",
                      }}
                    >
                      <div
                        className="px-4 py-2 text-xs font-semibold tracking-wide uppercase"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        Settings
                      </div>
                      <div
                        className="h-px"
                        style={{ background: "var(--color-border)" }}
                      />
                      <button
                        onClick={() => {
                          handleExportBackup();
                          setSettingsOpen(false);
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
                        <Download size={13} />
                        <span>Export backup</span>
                      </button>
                      <button
                        onClick={() => {
                          importInputRef.current?.click();
                          setSettingsOpen(false);
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
                        <Upload size={13} />
                        <span>Import backup</span>
                      </button>
                      <div
                        className="h-px mx-3"
                        style={{ background: "var(--color-border)" }}
                      />
                      <button
                        onClick={cycleTheme}
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
                        {themeIcons[state.theme]}
                        <span className="capitalize">{state.theme} mode</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex-1" />
              {state.user ?
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "var(--color-text-tertiary)" }}
                  title="Sign out"
                >
                  <LogOut size={14} />
                </button>
              : <button
                  onClick={handleSignIn}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "var(--color-text-tertiary)" }}
                  title="Sign in with Google"
                >
                  <LogIn size={14} />
                </button>
              }
            </div>
          </div>
        </>
      }

    </motion.aside>
  );
}
