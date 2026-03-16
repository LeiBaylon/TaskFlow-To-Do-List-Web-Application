"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Plus,
  Check,
  User,
  Users,
  Mail,
  Pencil,
} from "lucide-react";
import { useApp } from "@/store/AppContext";

export default function WorkspaceSwitcher({
  collapsed,
  onCreateWorkspace,
}: {
  collapsed?: boolean;
  onCreateWorkspace?: () => void;
}) {
  const {
    state,
    switchWorkspace,
    renameWorkspaceAction,
    acceptInvitationAction,
    declineInvitationAction,
  } = useApp();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState("");
  const renameInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (renamingId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renamingId]);

  const handleRenameSubmit = async (wsId: string) => {
    const trimmed = renameVal.trim();
    if (trimmed && trimmed !== state.workspaces.find((w) => w.workspaceId === wsId)?.name) {
      await renameWorkspaceAction(wsId, trimmed);
    }
    setRenamingId(null);
  };

  const activeWs = state.workspaces.find(
    (w) => w.workspaceId === state.activeWorkspaceId,
  );
  const isPersonal = !state.activeWorkspaceId;

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: collapsed ? 224 : rect.width,
      });
    }
  }, [collapsed]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handler);
      updatePosition();
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [open, updatePosition]);

  return (
    <>
      <div className="relative">
        {/* Trigger */}
        <button
          ref={triggerRef}
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 rounded-xl text-left transition-colors ${collapsed ? "justify-center p-2.5" : "w-full px-2.5 py-2"}`}
          style={{
            background: open ? "var(--color-accent-light)" : "transparent",
            color: "var(--color-text)",
          }}
          onMouseEnter={(e) => {
            if (!open)
              e.currentTarget.style.background = "var(--color-accent-light)";
          }}
          onMouseLeave={(e) => {
            if (!open) e.currentTarget.style.background = "transparent";
          }}
          title={
            collapsed ?
              isPersonal ?
                "Personal"
              : activeWs?.name
            : undefined
          }
        >
          <span className="text-base leading-none">
            {isPersonal ? "👤" : activeWs?.emoji || "📁"}
          </span>
          {!collapsed && (
            <>
              <span className="flex-1 text-xs font-medium truncate">
                {isPersonal ? "Personal" : activeWs?.name || "Workspace"}
              </span>
              <ChevronDown
                size={12}
                className="shrink-0 transition-transform"
                style={{
                  color: "var(--color-text-tertiary)",
                  transform: open ? "rotate(180deg)" : "none",
                }}
              />
            </>
          )}
        </button>

        {/* Dropdown — portalled to body to escape overflow clipping */}
        {mounted &&
          createPortal(
            <AnimatePresence>
              {open && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="fixed z-[9999] rounded-xl shadow-xl overflow-hidden"
                  style={{
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: dropdownPos.width,
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--glass-shadow)",
                  }}
                >
                  <div className="py-1.5">
                    {/* Section: Workspaces */}
                    <p
                      className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      Workspaces
                    </p>

                    {/* Personal */}
                    <button
                      onClick={() => {
                        switchWorkspace(null);
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors"
                      style={{
                        background:
                          isPersonal ?
                            "var(--color-accent-light)"
                          : "transparent",
                        color: "var(--color-text)",
                      }}
                      onMouseEnter={(e) =>
                        !isPersonal &&
                        (e.currentTarget.style.background =
                          "var(--color-accent-light)")
                      }
                      onMouseLeave={(e) =>
                        !isPersonal &&
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <User
                        size={14}
                        style={{ color: "var(--color-text-secondary)" }}
                      />
                      <span className="flex-1 text-xs font-medium">
                        Personal
                      </span>
                      {isPersonal && (
                        <Check
                          size={12}
                          style={{ color: "var(--color-accent)" }}
                        />
                      )}
                    </button>

                    {/* Workspace list */}
                    {state.workspaces.map((ws) => (
                      <div
                        key={ws.workspaceId}
                        className="group/ws w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors cursor-pointer"
                        style={{
                          background:
                            state.activeWorkspaceId === ws.workspaceId ?
                              "var(--color-accent-light)"
                            : "transparent",
                          color: "var(--color-text)",
                        }}
                        onMouseEnter={(e) =>
                          state.activeWorkspaceId !== ws.workspaceId &&
                          (e.currentTarget.style.background =
                            "var(--color-accent-light)")
                        }
                        onMouseLeave={(e) =>
                          state.activeWorkspaceId !== ws.workspaceId &&
                          (e.currentTarget.style.background = "transparent")
                        }
                        onClick={() => {
                          if (renamingId !== ws.workspaceId) {
                            switchWorkspace(ws.workspaceId);
                            setOpen(false);
                          }
                        }}
                      >
                        <span className="text-sm leading-none">{ws.emoji}</span>
                        <div className="flex-1 min-w-0">
                          {renamingId === ws.workspaceId ? (
                            <input
                              ref={renameInputRef}
                              value={renameVal}
                              onChange={(e) => setRenameVal(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleRenameSubmit(ws.workspaceId);
                                if (e.key === "Escape") setRenamingId(null);
                              }}
                              onBlur={() => handleRenameSubmit(ws.workspaceId)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full text-xs font-medium bg-transparent outline-none rounded px-1 py-0.5"
                              style={{
                                color: "var(--color-text)",
                                border: "1px solid var(--color-accent)",
                              }}
                            />
                          ) : (
                            <p className="text-xs font-medium truncate">
                              {ws.name}
                            </p>
                          )}
                          <div
                            className="flex items-center gap-1 mt-0.5"
                            style={{ color: "var(--color-text-tertiary)" }}
                          >
                            <Users size={9} />
                            <span className="text-[10px]">
                              {ws.memberCount}
                            </span>
                          </div>
                        </div>
                        {renamingId !== ws.workspaceId && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRenamingId(ws.workspaceId);
                              setRenameVal(ws.name);
                            }}
                            className="opacity-0 group-hover/ws:opacity-100 p-1 rounded-md transition-opacity"
                            style={{ color: "var(--color-text-tertiary)" }}
                            title="Rename workspace"
                          >
                            <Pencil size={10} />
                          </button>
                        )}
                        {state.activeWorkspaceId === ws.workspaceId && renamingId !== ws.workspaceId && (
                          <Check
                            size={12}
                            style={{ color: "var(--color-accent)" }}
                          />
                        )}
                      </div>
                    ))}

                    {/* Create workspace */}
                    <div
                      className="border-t my-1"
                      style={{ borderColor: "var(--color-border)" }}
                    />
                    <button
                      onClick={() => {
                        setOpen(false);
                        onCreateWorkspace?.();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors"
                      style={{ color: "var(--color-accent)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "var(--color-accent-light)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <Plus size={14} />
                      <span className="text-xs font-medium">New workspace</span>
                    </button>

                    {/* Invitations */}
                    {state.pendingInvitations.length > 0 && (
                      <>
                        <div
                          className="border-t my-1"
                          style={{ borderColor: "var(--color-border)" }}
                        />
                        <p
                          className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          <Mail size={10} />
                          Invitations ({state.pendingInvitations.length})
                        </p>
                        {state.pendingInvitations.map((inv) => (
                          <div key={inv.id} className="px-3 py-2 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {inv.workspaceEmoji}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p
                                  className="text-xs font-medium truncate"
                                  style={{ color: "var(--color-text)" }}
                                >
                                  {inv.workspaceName}
                                </p>
                                <p
                                  className="text-[10px] truncate"
                                  style={{
                                    color: "var(--color-text-tertiary)",
                                  }}
                                >
                                  from {inv.invitedByName} · {inv.role}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1.5 pl-6">
                              <button
                                onClick={async () => {
                                  await acceptInvitationAction(inv);
                                  setOpen(false);
                                }}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-medium text-white"
                                style={{ background: "var(--color-accent)" }}
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => declineInvitationAction(inv.id)}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-medium"
                                style={{
                                  color: "var(--color-text-tertiary)",
                                  background: "var(--color-bg)",
                                  border: "1px solid var(--color-border)",
                                }}
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </>
  );
}
