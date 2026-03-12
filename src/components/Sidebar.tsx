"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Inbox,
  FolderOpen,
  Flame,
  LogIn,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Settings2,
  Users,
  MessageCircle,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDroppable } from "@dnd-kit/core";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

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

export default function Sidebar({
  onCreateWorkspace,
}: {
  onCreateWorkspace: () => void;
}) {
  const { state, dispatch } = useApp();
  const [collapsed, setCollapsed] = useState(false);

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

  const handleSignIn = async () => {
    if (!auth || !googleProvider) return;
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {}
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

      {/* Workspace switcher */}
      {state.user && (
        <div className={collapsed ? "px-2 pb-1" : "px-3 pb-1"}>
          <WorkspaceSwitcher
            collapsed={collapsed}
            onCreateWorkspace={onCreateWorkspace}
          />
        </div>
      )}

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

            {/* Collapsed chat button */}
            {state.activeWorkspaceId && (
              <button
                onClick={() =>
                  dispatch({ type: "SET_VIEW_MODE", payload: "chat" })
                }
                className="p-2.5 rounded-lg transition-all"
                style={{
                  color:
                    state.viewMode === "chat" ?
                      "var(--color-accent)"
                    : "var(--color-text-secondary)",
                  background:
                    state.viewMode === "chat" ?
                      "var(--color-accent-light)"
                    : "transparent",
                }}
                title="Chat"
              >
                <MessageCircle size={18} />
              </button>
            )}

            {/* Collapsed members button */}
            {state.activeWorkspaceId && (
              <button
                onClick={() =>
                  dispatch({ type: "SET_VIEW_MODE", payload: "members" })
                }
                className="p-2.5 rounded-lg transition-all"
                style={{
                  color:
                    state.viewMode === "members" ?
                      "var(--color-accent)"
                    : "var(--color-text-secondary)",
                  background:
                    state.viewMode === "members" ?
                      "var(--color-accent-light)"
                    : "transparent",
                }}
                title="Members"
              >
                <Users size={18} />
              </button>
            )}
          </nav>

          {/* Collapsed bottom: settings */}
          <div
            className="p-2 border-t flex flex-col items-center gap-1"
            style={{ borderColor: "var(--color-border)" }}
          >
            <button
              onClick={() =>
                dispatch({ type: "SET_VIEW_MODE", payload: "settings" })
              }
              className="p-2 rounded-lg transition-all"
              style={{
                color:
                  state.viewMode === "settings" ?
                    "var(--color-accent)"
                  : "var(--color-text-tertiary)",
                background:
                  state.viewMode === "settings" ?
                    "var(--color-accent-light)"
                  : "transparent",
              }}
              title="Settings"
            >
              <Settings2 size={16} />
            </button>
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

            {/* Chat button — only when in a workspace */}
            {state.activeWorkspaceId && (
              <button
                onClick={() =>
                  dispatch({ type: "SET_VIEW_MODE", payload: "chat" })
                }
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
                style={{
                  background:
                    state.viewMode === "chat" ?
                      "var(--color-accent-light)"
                    : "transparent",
                  color:
                    state.viewMode === "chat" ?
                      "var(--color-accent)"
                    : "var(--color-text-secondary)",
                }}
              >
                <MessageCircle size={16} />
                <span className="flex-1 text-left">Chat</span>
              </button>
            )}

            {/* Members button — only when in a workspace */}
            {state.activeWorkspaceId && (
              <button
                onClick={() =>
                  dispatch({ type: "SET_VIEW_MODE", payload: "members" })
                }
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
                style={{
                  background:
                    state.viewMode === "members" ?
                      "var(--color-accent-light)"
                    : "transparent",
                  color:
                    state.viewMode === "members" ?
                      "var(--color-accent)"
                    : "var(--color-text-secondary)",
                }}
              >
                <Users size={16} />
                <span className="flex-1 text-left">Members</span>
                <span className="text-xs font-medium opacity-70">
                  {state.workspaceMembers.length}
                </span>
              </button>
            )}
          </nav>

          {/* Bottom bar */}
          <div
            className="p-3 border-t space-y-1"
            style={{ borderColor: "var(--color-border)" }}
          >
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
              <button
                onClick={() =>
                  dispatch({ type: "SET_VIEW_MODE", payload: "settings" })
                }
                className="p-2 rounded-lg transition-colors"
                style={{
                  color:
                    state.viewMode === "settings" ?
                      "var(--color-accent)"
                    : "var(--color-text-secondary)",
                  background:
                    state.viewMode === "settings" ?
                      "var(--color-accent-light)"
                    : "transparent",
                }}
                title="Settings"
              >
                <Settings2 size={13} />
              </button>
              <div className="flex-1" />
              {!state.user && (
                <button
                  onClick={handleSignIn}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "var(--color-text-tertiary)" }}
                  title="Sign in with Google"
                >
                  <LogIn size={14} />
                </button>
              )}
            </div>
          </div>
        </>
      }
    </motion.aside>
  );
}
