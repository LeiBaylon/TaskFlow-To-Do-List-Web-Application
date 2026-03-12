"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UserPlus,
  Crown,
  Shield,
  Eye,
  Users as UsersIcon,
  ChevronDown,
  Trash2,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useApp } from "../store/AppContext";
import type { WorkspaceRole, WorkspaceMember } from "../lib/types";

interface MembersPanelProps {
  open: boolean;
  onClose: () => void;
}

const ROLE_OPTIONS: { value: WorkspaceRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
  { value: "viewer", label: "Viewer" },
];

function roleIcon(role: WorkspaceRole) {
  switch (role) {
    case "owner":
      return <Crown size={11} />;
    case "admin":
      return <Shield size={11} />;
    case "viewer":
      return <Eye size={11} />;
    default:
      return <UsersIcon size={11} />;
  }
}

function roleColor(role: WorkspaceRole) {
  switch (role) {
    case "owner":
      return "#eab308";
    case "admin":
      return "#8b5cf6";
    case "viewer":
      return "var(--color-text-tertiary)";
    default:
      return "var(--color-accent)";
  }
}

export default function MembersPanel({ open, onClose }: MembersPanelProps) {
  const {
    state,
    inviteToWorkspace,
    removeMemberAction,
    updateMemberRoleAction,
    leaveWorkspace,
  } = useApp();

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<WorkspaceRole>("member");
  const [inviting, setInviting] = useState(false);
  const [inviteMsg, setInviteMsg] = useState<string | null>(null);
  const [roleDropdownUid, setRoleDropdownUid] = useState<string | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  const wsId = state.activeWorkspaceId;
  const members = state.workspaceMembers;
  const currentMember = members.find((m) => m.uid === state.user?.uid);
  const canManage =
    currentMember?.role === "owner" || currentMember?.role === "admin";
  const isOwner = currentMember?.role === "owner";
  const activeWs = state.workspaces.find((w) => w.workspaceId === wsId);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInvite = async () => {
    if (!inviteEmail.trim() || !wsId || inviting) return;
    if (!isValidEmail(inviteEmail.trim())) {
      setInviteMsg("Please enter a valid email address");
      setTimeout(() => setInviteMsg(null), 3000);
      return;
    }
    // Check if already a member
    if (
      members.some((m) => m.email.toLowerCase() === inviteEmail.toLowerCase())
    ) {
      setInviteMsg("Already a member");
      setTimeout(() => setInviteMsg(null), 3000);
      return;
    }
    setInviting(true);
    try {
      const { isRegisteredEmail } = await import("../lib/firestore");
      const { getFirestore } = await import("firebase/firestore");
      const registered = await isRegisteredEmail(
        getFirestore(),
        inviteEmail.trim(),
      );
      if (!registered) {
        setInviteMsg("No account found with this email");
        setTimeout(() => setInviteMsg(null), 3000);
        setInviting(false);
        return;
      }
      await inviteToWorkspace(wsId, inviteEmail.trim(), inviteRole);
      setInviteMsg("Invitation sent!");
      setInviteEmail("");
      setTimeout(() => setInviteMsg(null), 3000);
    } catch {
      setInviteMsg("Failed to send invitation");
      setTimeout(() => setInviteMsg(null), 3000);
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (uid: string) => {
    if (!wsId) return;
    await removeMemberAction(wsId, uid);
    setConfirmRemove(null);
  };

  const handleRoleChange = async (uid: string, role: WorkspaceRole) => {
    if (!wsId) return;
    await updateMemberRoleAction(wsId, uid, role);
    setRoleDropdownUid(null);
  };

  const handleLeave = async () => {
    if (!wsId) return;
    await leaveWorkspace(wsId);
    onClose();
  };

  const getInitials = (name: string) =>
    name
      .split(/[\s@]+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");

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
            className="relative w-110 max-h-[85vh] rounded-2xl shadow-2xl flex flex-col"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b shrink-0"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{activeWs?.emoji || "📁"}</span>
                <div>
                  <h2
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {activeWs?.name || "Workspace"}
                  </h2>
                  <p
                    className="text-[10px]"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {members.length} member{members.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg transition-opacity hover:opacity-70"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {/* Invite */}
              {canManage && (
                <div className="space-y-2">
                  <label
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    Invite someone
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Email address"
                      type="email"
                      className="flex-1 px-3 py-2 rounded-xl text-xs"
                      style={{
                        background: "var(--color-bg)",
                        color: "var(--color-text)",
                        border: "1px solid var(--color-border)",
                        outline: "none",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-accent)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-border)")
                      }
                      onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                    />
                    <select
                      value={inviteRole}
                      onChange={(e) =>
                        setInviteRole(e.target.value as WorkspaceRole)
                      }
                      className="px-2 py-2 rounded-xl text-xs"
                      style={{
                        background: "var(--color-bg)",
                        color: "var(--color-text)",
                        border: "1px solid var(--color-border)",
                        outline: "none",
                      }}
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
                    <button
                      onClick={handleInvite}
                      disabled={!inviteEmail.trim() || inviting}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-white disabled:opacity-40 transition-opacity"
                      style={{ background: "var(--color-accent)" }}
                    >
                      <UserPlus size={14} />
                    </button>
                  </div>
                  {inviteMsg && (
                    <p
                      className="text-[10px] font-medium"
                      style={{
                        color:
                          inviteMsg.includes("sent") ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {inviteMsg}
                    </p>
                  )}
                </div>
              )}

              {/* Members list */}
              <div className="space-y-1">
                <label
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Members
                </label>
                <div className="space-y-0.5">
                  {members.map((member) => (
                    <MemberRow
                      key={member.uid}
                      member={member}
                      canManage={canManage}
                      isSelf={member.uid === state.user?.uid}
                      roleDropdownOpen={roleDropdownUid === member.uid}
                      onToggleRoleDropdown={() =>
                        setRoleDropdownUid(
                          roleDropdownUid === member.uid ? null : member.uid,
                        )
                      }
                      onRoleChange={(role) =>
                        handleRoleChange(member.uid, role)
                      }
                      confirmRemove={confirmRemove === member.uid}
                      onConfirmRemove={() => setConfirmRemove(member.uid)}
                      onCancelRemove={() => setConfirmRemove(null)}
                      onRemove={() => handleRemove(member.uid)}
                      getInitials={getInitials}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer — Leave workspace */}
            {currentMember && !isOwner && (
              <div
                className="px-6 py-3 border-t shrink-0"
                style={{ borderColor: "var(--color-border)" }}
              >
                {!showLeaveConfirm ?
                  <button
                    onClick={() => setShowLeaveConfirm(true)}
                    className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
                    style={{ color: "#ef4444" }}
                  >
                    <LogOut size={12} />
                    Leave workspace
                  </button>
                : <div className="flex items-center gap-2">
                    <p className="text-xs flex-1" style={{ color: "#ef4444" }}>
                      Leave this workspace?
                    </p>
                    <button
                      onClick={handleLeave}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-medium text-white"
                      style={{ background: "#ef4444" }}
                    >
                      Leave
                    </button>
                    <button
                      onClick={() => setShowLeaveConfirm(false)}
                      className="px-2.5 py-1 rounded-lg text-[10px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      Cancel
                    </button>
                  </div>
                }
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Member row sub-component ─────────────

interface MemberRowProps {
  member: WorkspaceMember;
  canManage: boolean;
  isSelf: boolean;
  roleDropdownOpen: boolean;
  onToggleRoleDropdown: () => void;
  onRoleChange: (role: WorkspaceRole) => void;
  confirmRemove: boolean;
  onConfirmRemove: () => void;
  onCancelRemove: () => void;
  onRemove: () => void;
  getInitials: (name: string) => string;
}

function MemberRow({
  member,
  canManage,
  isSelf,
  roleDropdownOpen,
  onToggleRoleDropdown,
  onRoleChange,
  confirmRemove,
  onConfirmRemove,
  onCancelRemove,
  onRemove,
  getInitials,
}: MemberRowProps) {
  const canEdit = canManage && member.role !== "owner" && !isSelf;

  return (
    <div
      className="flex items-center gap-2.5 px-2 py-2 rounded-xl transition-colors"
      style={{ color: "var(--color-text)" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--color-bg)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Avatar */}
      {member.photoURL ?
        <Image
          src={member.photoURL}
          alt={member.displayName}
          width={32}
          height={32}
          className="rounded-full shrink-0"
        />
      : <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
          style={{
            background: "var(--color-accent-light)",
            color: "var(--color-accent)",
          }}
        >
          {getInitials(member.displayName || member.email)}
        </div>
      }

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">
          {member.displayName || member.email}
          {isSelf && (
            <span
              className="ml-1 text-[10px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              (you)
            </span>
          )}
        </p>
        <p
          className="text-[10px] truncate"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {member.email}
        </p>
      </div>

      {/* Role badge / dropdown */}
      <div className="relative shrink-0">
        {confirmRemove ?
          <div className="flex items-center gap-1">
            <button
              onClick={onRemove}
              className="px-2 py-1 rounded-md text-[10px] font-medium text-white"
              style={{ background: "#ef4444" }}
            >
              Remove
            </button>
            <button
              onClick={onCancelRemove}
              className="px-2 py-1 rounded-md text-[10px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Cancel
            </button>
          </div>
        : <div className="flex items-center gap-1">
            <button
              onClick={canEdit ? onToggleRoleDropdown : undefined}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-colors"
              style={{
                color: roleColor(member.role),
                background: `${roleColor(member.role)}12`,
                cursor: canEdit ? "pointer" : "default",
              }}
            >
              {roleIcon(member.role)}
              <span className="capitalize">{member.role}</span>
              {canEdit && <ChevronDown size={9} />}
            </button>
            {canEdit && (
              <button
                onClick={onConfirmRemove}
                className="p-1 rounded-md transition-opacity hover:opacity-70"
                style={{ color: "var(--color-text-tertiary)" }}
                title="Remove member"
              >
                <Trash2 size={11} />
              </button>
            )}

            {/* Role dropdown */}
            <AnimatePresence>
              {roleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-1 z-10 rounded-lg shadow-lg overflow-hidden"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onRoleChange(opt.value)}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-[10px] text-left transition-colors"
                      style={{
                        color:
                          member.role === opt.value ?
                            "var(--color-accent)"
                          : "var(--color-text)",
                        background:
                          member.role === opt.value ?
                            "var(--color-accent-light)"
                          : "transparent",
                      }}
                      onMouseEnter={(e) =>
                        member.role !== opt.value &&
                        (e.currentTarget.style.background = "var(--color-bg)")
                      }
                      onMouseLeave={(e) =>
                        member.role !== opt.value &&
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        }
      </div>
    </div>
  );
}
