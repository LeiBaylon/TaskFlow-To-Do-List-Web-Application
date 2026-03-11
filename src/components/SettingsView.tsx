"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Download,
  Upload,
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  Shield,
  Database,
  Palette,
  LogOut,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import type { ThemeMode } from "@/lib/types";
import ProfileModal from "@/components/ProfileModal";

export default function SettingsView() {
  const { state, dispatch } = useApp();
  const importInputRef = useRef<HTMLInputElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const user = state.user;

  const themeOptions: { mode: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { mode: "light", icon: <Sun size={16} />, label: "Light" },
    { mode: "dark", icon: <Moon size={16} />, label: "Dark" },
    { mode: "system", icon: <Monitor size={16} />, label: "System" },
  ];

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
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
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
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
    } catch {
      window.alert("Import failed");
    } finally {
      e.target.value = "";
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const getInitials = () => {
    if (!user) return "?";
    const name = user.displayName || user.email || "?";
    return name
      .split(/[\s@]+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() || "")
      .join("");
  };

  const isGoogleUser = user?.providerData.some(
    (p) => p.providerId === "google.com",
  );

  return (
    <>
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Page header */}
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: "var(--color-text)" }}
          >
            Settings
          </h1>
          <p
            className="text-sm mb-8"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Manage your account, appearance, and data
          </p>

          <div className="space-y-6">
            {/* ─── Profile Section ─── */}
            {user && (
              <section>
                <h2
                  className="text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Profile
                </h2>
                <button
                  onClick={() => setProfileOpen(true)}
                  className="w-full rounded-xl p-4 flex items-center gap-4 transition-colors"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "var(--color-accent-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--color-surface)")
                  }
                >
                  {/* Avatar */}
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                      style={{ border: "2px solid var(--color-accent)" }}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shrink-0"
                      style={{
                        background: "var(--color-accent-light)",
                        color: "var(--color-accent)",
                        border: "2px solid var(--color-accent)",
                      }}
                    >
                      {getInitials()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0 text-left">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--color-text)" }}
                    >
                      {user.displayName || "No name set"}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {user.email}
                    </p>
                    <p
                      className="text-[10px] mt-0.5"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {isGoogleUser ? "Google account" : "Email & password"}{" "}
                      {user.emailVerified && "· Verified"}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    style={{ color: "var(--color-text-tertiary)" }}
                    className="shrink-0"
                  />
                </button>
              </section>
            )}

            {/* ─── Appearance ─── */}
            <section>
              <h2
                className="text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                <Palette size={12} />
                Appearance
              </h2>
              <div
                className="rounded-xl p-4"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  className="text-sm font-medium mb-3"
                  style={{ color: "var(--color-text)" }}
                >
                  Theme
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {themeOptions.map(({ mode, icon, label }) => (
                    <button
                      key={mode}
                      onClick={() =>
                        dispatch({ type: "SET_THEME", payload: mode })
                      }
                      className="flex flex-col items-center gap-2 px-3 py-3 rounded-xl text-xs font-medium transition-all"
                      style={{
                        background:
                          state.theme === mode
                            ? "var(--color-accent-light)"
                            : "var(--color-bg, var(--color-background))",
                        color:
                          state.theme === mode
                            ? "var(--color-accent)"
                            : "var(--color-text-secondary)",
                        border:
                          state.theme === mode
                            ? "2px solid var(--color-accent)"
                            : "1px solid var(--color-border)",
                      }}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── Data Management ─── */}
            <section>
              <h2
                className="text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                <Database size={12} />
                Data
              </h2>
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <input
                  ref={importInputRef}
                  type="file"
                  accept="application/json"
                  onChange={handleImportBackup}
                  className="hidden"
                />

                <button
                  onClick={handleExportBackup}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-colors text-left"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "var(--color-accent-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Download
                    size={16}
                    style={{ color: "var(--color-text-tertiary)" }}
                    className="shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium"
                      style={{ color: "var(--color-text)" }}
                    >
                      Export backup
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      Download all tasks and folders as JSON
                    </p>
                  </div>
                  {exportSuccess && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        background: "rgba(34,197,94,0.1)",
                        color: "#22c55e",
                      }}
                    >
                      Exported!
                    </span>
                  )}
                </button>

                <div
                  className="h-px mx-4"
                  style={{ background: "var(--color-border)" }}
                />

                <button
                  onClick={() => importInputRef.current?.click()}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-colors text-left"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "var(--color-accent-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Upload
                    size={16}
                    style={{ color: "var(--color-text-tertiary)" }}
                    className="shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium"
                      style={{ color: "var(--color-text)" }}
                    >
                      Import backup
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      Restore tasks and folders from a JSON file
                    </p>
                  </div>
                  {importSuccess && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        background: "rgba(34,197,94,0.1)",
                        color: "#22c55e",
                      }}
                    >
                      Imported!
                    </span>
                  )}
                </button>
              </div>

              <p
                className="text-[11px] mt-2 px-1"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {state.tasks.length} tasks · {state.folders.length} folders
              </p>
            </section>

            {/* ─── Account Actions ─── */}
            {user && (
              <section>
                <h2
                  className="text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  <Shield size={12} />
                  Account
                </h2>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-colors text-left"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "var(--color-accent-light)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <LogOut
                      size={16}
                      style={{ color: "var(--color-text-tertiary)" }}
                      className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-medium"
                        style={{ color: "var(--color-text)" }}
                      >
                        Sign out
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        Sign out of your account
                      </p>
                    </div>
                  </button>
                </div>
              </section>
            )}

            {/* Footer */}
            <p
              className="text-center text-[11px] pb-4"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              TaskFlow v1.0
            </p>
          </div>
        </motion.div>
      </div>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
