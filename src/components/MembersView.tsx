"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
import { useApp } from "@/store/AppContext";
import { isRegisteredEmail } from "@/lib/firestore";
import { db } from "@/lib/firebase";
import type { WorkspaceRole, WorkspaceMember } from "@/lib/types";

const ROLE_OPTIONS: { value: WorkspaceRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
  { value: "viewer", label: "Viewer" },
];

const INVITE_MESSAGE_TIMEOUT_MS = 3000;

function roleIcon(role: WorkspaceRole) {
  switch (role) {
    case "owner":
      return <Crown size={12} />;
    case "admin":
      return <Shield size={12} />;
    case "viewer":
      return <Eye size={12} />;
    default:
      return <UsersIcon size={12} />;
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

export default function MembersView() {
  const {
    state,
    inviteToWorkspace,
    removeMemberAction,
    updateMemberRoleAction,
    leaveWorkspace,
    deleteWorkspaceAction,
  } = useApp();

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<WorkspaceRole>("member");
  const [inviting, setInviting] = useState(false);
  const [inviteMsg, setInviteMsg] = useState<string | null>(null);
  const [roleDropdownUid, setRoleDropdownUid] = useState<string | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteWorkspaceName, setDeleteWorkspaceName] = useState("");
  const [deletingWorkspace, setDeletingWorkspace] = useState(false);

  const wsId = state.activeWorkspaceId;
  const members = state.workspaceMembers;
  const currentMember = members.find((m) => m.uid === state.user?.uid);
  const canManage =
    currentMember?.role === "owner" || currentMember?.role === "admin";
  const isOwner = currentMember?.role === "owner";
  const activeWs = state.workspaces.find((w) => w.workspaceId === wsId);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showInviteMessage = (message: string) => {
    setInviteMsg(message);
    setTimeout(() => setInviteMsg(null), INVITE_MESSAGE_TIMEOUT_MS);
  };

  const handleInvite = async () => {
    const trimmedEmail = inviteEmail.trim();
    const normalizedEmail = trimmedEmail.toLowerCase();

    if (!trimmedEmail || !wsId || inviting) return;
    if (!isValidEmail(trimmedEmail)) {
      showInviteMessage("Please enter a valid email address");
      return;
    }
    if (members.some((m) => m.email.toLowerCase() === normalizedEmail)) {
      showInviteMessage("Already a member");
      return;
    }
    setInviting(true);
    try {
      if (!db) throw new Error("Firestore unavailable");
      const registered = await isRegisteredEmail(db, trimmedEmail);
      if (!registered) {
        showInviteMessage("No account found with this email");
        setInviting(false);
        return;
      }
      await inviteToWorkspace(wsId, trimmedEmail, inviteRole);
      showInviteMessage("Invitation sent!");
      setInviteEmail("");
    } catch {
      showInviteMessage("Failed to send invitation");
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
  };

  const handleDeleteWorkspace = async () => {
    if (!wsId || !activeWs || deletingWorkspace) return;
    if (deleteWorkspaceName !== activeWs.name) return;

    setDeletingWorkspace(true);
    try {
      await deleteWorkspaceAction(wsId);
      setShowDeleteConfirm(false);
      setDeleteWorkspaceName("");
    } catch (err) {
      console.error("Failed to delete workspace:", err);
      alert("Failed to delete workspace. Please try again.");
    } finally {
      setDeletingWorkspace(false);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(/[\s@]+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");

  if (!wsId) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-3"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        <UsersIcon size={40} strokeWidth={1.5} />
        <p className="text-sm">Select a workspace to manage members</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{activeWs?.emoji || "📁"}</span>
        <div>
          <h1
            className="text-lg font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {activeWs?.name || "Workspace"} — Members
          </h1>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {members.length} member{members.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Invite */}
      {canManage && (
        <div
          className="rounded-2xl p-4 space-y-2"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
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
              className="flex-1 px-3 py-2 rounded-xl text-sm"
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
              onKeyDown={(e) => e.key === "Enter" && handleInvite()}
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as WorkspaceRole)}
              className="px-2 py-2 rounded-xl text-sm"
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
              className="px-4 py-2 rounded-xl text-sm font-medium text-white disabled:opacity-40 transition-opacity"
              style={{ background: "var(--color-accent)" }}
            >
              <UserPlus size={16} />
            </button>
          </div>
          {inviteMsg && (
            <p
              className="text-xs font-medium"
              style={{
                color: inviteMsg.includes("sent") ? "#22c55e" : "#ef4444",
              }}
            >
              {inviteMsg}
            </p>
          )}
        </div>
      )}

      {/* Members list */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          className="px-4 py-3 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <label
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Members
          </label>
        </div>
        <div
          className="divide-y"
          style={{ borderColor: "var(--color-border)" }}
        >
          {members.map((member) => (
            <MemberRow
              key={member.uid}
              member={member}
              canManage={canManage}
              isOwner={isOwner}
              isSelf={member.uid === state.user?.uid}
              roleDropdownOpen={roleDropdownUid === member.uid}
              onToggleRoleDropdown={() =>
                setRoleDropdownUid(
                  roleDropdownUid === member.uid ? null : member.uid,
                )
              }
              onRoleChange={(role) => handleRoleChange(member.uid, role)}
              confirmRemove={confirmRemove === member.uid}
              onConfirmRemove={() => setConfirmRemove(member.uid)}
              onCancelRemove={() => setConfirmRemove(null)}
              onRemove={() => handleRemove(member.uid)}
              getInitials={getInitials}
            />
          ))}
        </div>
      </div>

      {/* Leave workspace */}
      {currentMember && !isOwner && (
        <div
          className="rounded-2xl p-4"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          {!showLeaveConfirm ?
            <button
              onClick={() => setShowLeaveConfirm(true)}
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              style={{ color: "#ef4444" }}
            >
              <LogOut size={14} />
              Leave workspace
            </button>
          : <div className="flex items-center gap-3">
              <p className="text-sm flex-1" style={{ color: "#ef4444" }}>
                Leave this workspace?
              </p>
              <button
                onClick={handleLeave}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                style={{ background: "#ef4444" }}
              >
                Leave
              </button>
              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                Cancel
              </button>
            </div>
          }
        </div>
      )}

      {isOwner && activeWs && (
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{
            background: "var(--color-surface)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <div>
            <h2 className="text-sm font-semibold" style={{ color: "#ef4444" }}>
              Danger Zone
            </h2>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Deleting a workspace permanently removes its tasks, folders, chat,
              invites, and member access.
            </p>
          </div>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "#ef4444" }}
            >
              <Trash2 size={14} />
              Delete workspace
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-xs" style={{ color: "#ef4444" }}>
                Type <strong>{activeWs.name}</strong> to confirm permanent deletion.
              </p>
              <input
                value={deleteWorkspaceName}
                onChange={(e) => setDeleteWorkspaceName(e.target.value)}
                placeholder={activeWs.name}
                className="w-full px-3 py-2 rounded-xl text-sm"
                style={{
                  background: "var(--color-bg)",
                  color: "var(--color-text)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  outline: "none",
                }}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeleteWorkspace}
                  disabled={
                    deletingWorkspace || deleteWorkspaceName !== activeWs.name
                  }
                  className="px-3 py-2 rounded-xl text-sm font-medium text-white disabled:opacity-40 transition-opacity"
                  style={{ background: "#ef4444" }}
                >
                  {deletingWorkspace ? "Deleting..." : "Delete permanently"}
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteWorkspaceName("");
                  }}
                  className="px-3 py-2 rounded-xl text-sm"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Member row sub-component ─────────────

interface MemberRowProps {
  member: WorkspaceMember;
  canManage: boolean;
  isOwner: boolean;
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
  isOwner,
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
  const canEdit =
    canManage &&
    member.role !== "owner" &&
    !isSelf &&
    (isOwner || member.role !== "admin");

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 transition-colors"
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
          width={36}
          height={36}
          className="rounded-full shrink-0"
        />
      : <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
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
        <p className="text-sm font-medium truncate">
          {member.displayName || member.email}
          {isSelf && (
            <span
              className="ml-1 text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              (you)
            </span>
          )}
        </p>
        <p
          className="text-xs truncate"
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
              className="px-2.5 py-1 rounded-md text-xs font-medium text-white"
              style={{ background: "#ef4444" }}
            >
              Kick
            </button>
            <button
              onClick={onCancelRemove}
              className="px-2.5 py-1 rounded-md text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Cancel
            </button>
          </div>
        : <div className="flex items-center gap-1">
            <button
              onClick={canEdit ? onToggleRoleDropdown : undefined}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
              style={{
                color: roleColor(member.role),
                background: `${roleColor(member.role)}12`,
                cursor: canEdit ? "pointer" : "default",
              }}
            >
              {roleIcon(member.role)}
              <span className="capitalize">{member.role}</span>
              {canEdit && <ChevronDown size={10} />}
            </button>
            {canEdit && (
              <button
                onClick={onConfirmRemove}
                className="p-1 rounded-md transition-opacity hover:opacity-70"
                style={{ color: "var(--color-text-tertiary)" }}
                title="Kick member"
              >
                <Trash2 size={12} />
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
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left transition-colors"
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
