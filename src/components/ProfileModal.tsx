"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Camera,
  Check,
  AlertTriangle,
  LogOut,
  Shield,
  Pencil,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { auth } from "@/lib/firebase";
import { uploadProfilePhoto } from "@/lib/cloudinary";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  signOut,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { state } = useApp();
  const user = state.user;

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [uploading, setUploading] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync form fields when user changes or modal opens
  useEffect(() => {
    if (open && user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setNewPassword("");
      setCurrentPassword("");
      setMessage(null);
      setShowDeleteConfirm(false);
      setDeletePassword("");
      setEditingName(false);
      setEditingPhoto(false);
      setEditingPassword(false);
    }
  }, [open, user]);

  useEffect(() => {
    if (editingName) nameInputRef.current?.focus();
  }, [editingName]);

  if (!user) return null;

  const isGoogleUser = user.providerData.some(
    (p) => p.providerId === "google.com",
  );

  const flash = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSaveName = async () => {
    if (!auth?.currentUser) return;
    const trimmed = displayName.trim();
    if (!trimmed) {
      flash("error", "Name cannot be empty.");
      return;
    }
    if (trimmed === user.displayName) {
      setEditingName(false);
      return;
    }
    setSaving(true);
    try {
      await updateProfile(auth.currentUser, { displayName: trimmed });
      // Force reload to pick up changes in auth state
      await auth.currentUser.reload();
      flash("success", "Display name updated.");
      setEditingName(false);
    } catch {
      flash("error", "Could not update name.");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePhoto = async () => {
    if (!auth?.currentUser) return;
    const trimmed = photoURL.trim();
    if (trimmed === (user.photoURL || "")) {
      setEditingPhoto(false);
      return;
    }
    setSaving(true);
    try {
      await updateProfile(auth.currentUser, {
        photoURL: trimmed || null,
      });
      await auth.currentUser.reload();
      flash("success", "Photo URL updated.");
      setEditingPhoto(false);
    } catch {
      flash("error", "Could not update photo.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!auth?.currentUser) return;
    if (newPassword.length < 6) {
      flash("error", "New password must be at least 6 characters.");
      return;
    }
    if (isGoogleUser) {
      flash("error", "Password change is not available for Google accounts.");
      return;
    }
    if (!currentPassword) {
      flash("error", "Enter your current password to verify.");
      return;
    }
    setSaving(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email || "",
        currentPassword,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      flash("success", "Password changed successfully.");
      setNewPassword("");
      setCurrentPassword("");
      setEditingPassword(false);
    } catch {
      flash("error", "Could not change password. Check your current password.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!auth?.currentUser) return;
    setSaving(true);
    try {
      if (!isGoogleUser && deletePassword) {
        const credential = EmailAuthProvider.credential(
          user.email || "",
          deletePassword,
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
      }
      await deleteUser(auth.currentUser);
    } catch {
      flash(
        "error",
        "Could not delete account. You may need to sign in again.",
      );
      setShowDeleteConfirm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
    onClose();
  };

  const getInitials = () => {
    const name = user.displayName || user.email || "?";
    return name
      .split(/[\s@]+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() || "")
      .join("");
  };

  const joinedDate = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const settingsButtonStyle = {
    color: "var(--color-text-secondary)",
  };

  const settingsButtonHoverBg = "var(--color-accent-light)";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow:
                "0 24px 48px -12px rgba(0,0,0,0.25), 0 0 0 1px var(--color-border)",
            }}
          >
            {/* Header */}
            <div
              className="relative px-6 pt-6 pb-4 flex items-start justify-between"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative group">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-14 h-14 rounded-full object-cover"
                      style={{
                        border: "3px solid var(--color-accent)",
                      }}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{
                        background: "var(--color-accent-light)",
                        color: "var(--color-accent)",
                        border: "3px solid var(--color-accent)",
                      }}
                    >
                      {getInitials()}
                    </div>
                  )}
                  <button
                    onClick={() => setEditingPhoto((p) => !p)}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: "var(--color-accent)",
                      color: "white",
                    }}
                    title="Change photo"
                  >
                    <Camera size={12} />
                  </button>
                </div>

                <div className="min-w-0">
                  {editingName ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveName();
                          if (e.key === "Escape") {
                            setDisplayName(user.displayName || "");
                            setEditingName(false);
                          }
                        }}
                        className="text-base font-semibold px-2 py-0.5 rounded-md w-36"
                        style={{
                          background: "var(--color-bg)",
                          color: "var(--color-text)",
                          border: "1px solid var(--color-accent)",
                          outline: "none",
                        }}
                        disabled={saving}
                      />
                      <button
                        onClick={handleSaveName}
                        disabled={saving}
                        className="p-1 rounded-md transition-colors"
                        style={{
                          color: "var(--color-accent)",
                        }}
                        title="Save"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setDisplayName(user.displayName || "");
                          setEditingName(false);
                        }}
                        className="p-1 rounded-md transition-colors"
                        style={{ color: "var(--color-text-tertiary)" }}
                        title="Cancel"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <p
                        className="text-base font-semibold truncate"
                        style={{ color: "var(--color-text)" }}
                      >
                        {user.displayName || "No name set"}
                      </p>
                      <button
                        onClick={() => setEditingName(true)}
                        className="p-0.5 rounded transition-colors opacity-50 hover:opacity-100"
                        style={{ color: "var(--color-text-secondary)" }}
                        title="Edit name"
                      >
                        <Pencil size={12} />
                      </button>
                    </div>
                  )}
                  <p
                    className="text-xs truncate"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "var(--color-text-tertiary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "var(--color-accent-light)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Message */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    className="rounded-lg px-3 py-2 text-xs"
                    style={{
                      background:
                        message.type === "success"
                          ? "var(--color-success-bg, rgba(34,197,94,0.1))"
                          : "var(--color-error-bg, rgba(239,68,68,0.1))",
                      color:
                        message.type === "success"
                          ? "var(--color-success, #22c55e)"
                          : "var(--color-error, #ef4444)",
                      border: `1px solid ${
                        message.type === "success"
                          ? "var(--color-success-border, rgba(34,197,94,0.2))"
                          : "var(--color-error-border, rgba(239,68,68,0.2))"
                      }`,
                    }}
                  >
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Photo upload */}
              <AnimatePresence>
                {editingPhoto && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Profile Photo
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file || !auth?.currentUser) return;
                        if (file.size > 5 * 1024 * 1024) {
                          flash("error", "Image must be under 5 MB.");
                          e.target.value = "";
                          return;
                        }
                        setUploading(true);
                        try {
                          const url = await uploadProfilePhoto(file);
                          await updateProfile(auth.currentUser, { photoURL: url });
                          await auth.currentUser.reload();
                          setPhotoURL(url);
                          flash("success", "Profile photo updated.");
                          setEditingPhoto(false);
                        } catch {
                          flash("error", "Could not upload photo.");
                        } finally {
                          setUploading(false);
                          e.target.value = "";
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading || saving}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors"
                        style={{
                          background: "var(--color-accent)",
                          color: "white",
                          opacity: uploading ? 0.7 : 1,
                        }}
                      >
                        <Camera size={14} />
                        {uploading ? "Uploading..." : "Choose Photo"}
                      </button>
                      {user.photoURL && (
                        <button
                          onClick={async () => {
                            if (!auth?.currentUser) return;
                            setSaving(true);
                            try {
                              await updateProfile(auth.currentUser, { photoURL: "" });
                              await auth.currentUser.reload();
                              setPhotoURL("");
                              flash("success", "Photo removed.");
                              setEditingPhoto(false);
                            } catch {
                              flash("error", "Could not remove photo.");
                            } finally {
                              setSaving(false);
                            }
                          }}
                          disabled={saving}
                          className="px-3 py-2.5 rounded-lg text-xs font-medium transition-colors"
                          style={{
                            background: "var(--color-bg)",
                            color: "#ef4444",
                            border: "1px solid var(--color-border)",
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p
                      className="text-[10px] mt-1.5"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      PNG, JPG, WebP or GIF · Max 5 MB
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Account info */}
              <div className="space-y-3">
                <h3
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Account Info
                </h3>

                <div
                  className="rounded-xl p-3 space-y-2.5"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Mail
                      size={14}
                      style={{ color: "var(--color-text-tertiary)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[10px] uppercase tracking-wide"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        Email
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{ color: "var(--color-text)" }}
                      >
                        {user.email || "Not set"}
                      </p>
                    </div>
                    {user.emailVerified && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{
                          background:
                            "var(--color-success-bg, rgba(34,197,94,0.1))",
                          color: "var(--color-success, #22c55e)",
                        }}
                      >
                        Verified
                      </span>
                    )}
                  </div>

                  <div
                    className="h-px"
                    style={{ background: "var(--color-border)" }}
                  />

                  <div className="flex items-center gap-2.5">
                    <Shield
                      size={14}
                      style={{ color: "var(--color-text-tertiary)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[10px] uppercase tracking-wide"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        Sign-in method
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text)" }}
                      >
                        {isGoogleUser ? "Google" : "Email & Password"}
                      </p>
                    </div>
                  </div>

                  <div
                    className="h-px"
                    style={{ background: "var(--color-border)" }}
                  />

                  <div className="flex items-center gap-2.5">
                    <User
                      size={14}
                      style={{ color: "var(--color-text-tertiary)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[10px] uppercase tracking-wide"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        Member since
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text)" }}
                      >
                        {joinedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change password (email users only) */}
              {!isGoogleUser && (
                <div className="space-y-3">
                  <h3
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    Security
                  </h3>

                  {!editingPassword ? (
                    <button
                      onClick={() => setEditingPassword(true)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-colors"
                      style={{
                        background: "var(--color-bg)",
                        color: "var(--color-text-secondary)",
                        border: "1px solid var(--color-border)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "var(--color-accent-light)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "var(--color-bg)")
                      }
                    >
                      <Shield size={13} />
                      Change password
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current password"
                        className="w-full px-3 py-2 rounded-lg text-xs"
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
                        disabled={saving}
                      />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password (min 6 chars)"
                        className="w-full px-3 py-2 rounded-lg text-xs"
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
                        minLength={6}
                        disabled={saving}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleChangePassword}
                          disabled={saving}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            background: "var(--color-accent)",
                            color: "white",
                          }}
                        >
                          {saving ? "Saving..." : "Update password"}
                        </button>
                        <button
                          onClick={() => {
                            setEditingPassword(false);
                            setCurrentPassword("");
                            setNewPassword("");
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Danger zone */}
              <div className="space-y-3">
                <h3
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Actions
                </h3>

                <div className="space-y-1.5">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-colors"
                    style={{
                      background: "var(--color-bg)",
                      color: "var(--color-text-secondary)",
                      border: "1px solid var(--color-border)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "var(--color-accent-light)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "var(--color-bg)")
                    }
                  >
                    <LogOut size={13} />
                    Sign out
                  </button>

                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-colors"
                      style={{
                        background: "var(--color-bg)",
                        color: "#ef4444",
                        border: "1px solid var(--color-border)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(239,68,68,0.08)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "var(--color-bg)")
                      }
                    >
                      <AlertTriangle size={13} />
                      Delete account
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="rounded-xl p-3 space-y-2.5"
                      style={{
                        background: "rgba(239,68,68,0.06)",
                        border: "1px solid rgba(239,68,68,0.15)",
                      }}
                    >
                      <p className="text-xs" style={{ color: "#ef4444" }}>
                        <strong>This cannot be undone.</strong> Your account and
                        all data will be permanently deleted.
                      </p>
                      {!isGoogleUser && (
                        <input
                          type="password"
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          placeholder="Enter password to confirm"
                          className="w-full px-3 py-2 rounded-lg text-xs"
                          style={{
                            background: "var(--color-bg)",
                            color: "var(--color-text)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            outline: "none",
                          }}
                          disabled={saving}
                        />
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={handleDeleteAccount}
                          disabled={saving || (!isGoogleUser && !deletePassword)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-white disabled:opacity-50"
                          style={{ background: "#ef4444" }}
                        >
                          {saving ? "Deleting..." : "Delete permanently"}
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeletePassword("");
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
