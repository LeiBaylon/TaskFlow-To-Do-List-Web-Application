"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageCircle,
  ArrowLeft,
  Hash,
  Paperclip,
  ImageIcon,
  FileText,
  Link2,
  X,
  Download,
  Loader2,
  SlidersHorizontal,
  Pencil,
  Trash2,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";
import { useApp } from "@/store/AppContext";
import { uploadChatFile } from "@/lib/cloudinary";
import type { ChatAttachment } from "@/lib/types";

// ─── URL detection ───
const URL_REGEX = /https?:\/\/[^\s<>"')\]]+/gi;

function hasLink(text: string): boolean {
  return URL_REGEX.test(text);
}

function resetRegex() {
  URL_REGEX.lastIndex = 0;
}

// ─── Filter types ───
type FilterType = "all" | "images" | "files" | "links";

// ─── Shared message shape ───
interface NormalizedMsg {
  id: string;
  text: string;
  createdAt: string;
  senderId: string;
  senderName: string;
  senderPhotoURL: string;
  attachment?: ChatAttachment;
  attachments?: ChatAttachment[];
  editedAt?: string;
  deletedFor?: string[];
  deletedForEveryone?: boolean;
}

interface MessageGroup {
  senderId: string;
  senderName: string;
  senderPhotoURL: string;
  items: {
    id: string;
    text: string;
    createdAt: string;
    attachment?: ChatAttachment;
    attachments?: ChatAttachment[];
    editedAt?: string;
    deletedForEveryone?: boolean;
  }[];
}

interface StagedFile {
  id: string;
  file: File;
  preview?: string;
  uploading: boolean;
  uploaded?: ChatAttachment;
  error?: boolean;
}

function groupMessages(messages: NormalizedMsg[]): MessageGroup[] {
  return messages.reduce<MessageGroup[]>((acc, msg) => {
    const last = acc[acc.length - 1];
    const item = {
      id: msg.id,
      text: msg.text,
      createdAt: msg.createdAt,
      attachment: msg.attachment,
      attachments: msg.attachments,
      editedAt: msg.editedAt,
      deletedForEveryone: msg.deletedForEveryone,
    };
    if (last && last.senderId === msg.senderId) {
      last.items.push(item);
    } else {
      acc.push({
        senderId: msg.senderId,
        senderName: msg.senderName,
        senderPhotoURL: msg.senderPhotoURL,
        items: [item],
      });
    }
    return acc;
  }, []);
}

// ─── Render text with clickable links ───
function RichText({ text, isOwn }: { text: string; isOwn: boolean }) {
  if (!text) return null;
  resetRegex();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const url = match[0];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline break-all"
        style={{ color: isOwn ? "#ffffffdd" : "var(--color-accent)" }}
      >
        {url}
      </a>,
    );
    lastIndex = URL_REGEX.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <>{parts}</>;
}

// ─── Filter bar ───
const FILTER_OPTIONS: {
  key: FilterType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: "images", label: "Images", icon: <ImageIcon size={14} /> },
  { key: "files", label: "Files", icon: <FileText size={14} /> },
  { key: "links", label: "Links", icon: <Link2 size={14} /> },
];

export default function ChatView() {
  const { state, sendMessage, openDm, closeDm, sendDm, editMessage, deleteMessageForMe, deleteMessageForEveryone } = useApp();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
  const [contextMenu, setContextMenu] = useState<{ msgId: string; isOwn: boolean; x: number; y: number } | null>(null);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ msgId: string; mode: "me" | "everyone" } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const currentUserId = state.user?.uid;
  const isDm = state.activeDmUserId !== null;

  // Normalize group messages to common shape
  const normalizedGroupMsgs: NormalizedMsg[] = useMemo(
    () =>
      state.workspaceMessages
        .filter((m) => !m.deletedFor?.includes(currentUserId || ""))
        .map((m) => ({
          id: m.id,
          text: m.text,
          createdAt: m.createdAt,
          senderId: m.userId,
          senderName: m.userName,
          senderPhotoURL: m.userPhotoURL,
          attachment: m.attachment,
          attachments: m.attachments,
          editedAt: m.editedAt,
          deletedFor: m.deletedFor,
          deletedForEveryone: m.deletedForEveryone,
        })),
    [state.workspaceMessages, currentUserId],
  );

  const normalizedDmMsgs: NormalizedMsg[] = useMemo(
    () =>
      state.dmMessages
        .filter((m) => !m.deletedFor?.includes(currentUserId || ""))
        .map((m) => ({
          id: m.id,
          text: m.text,
          createdAt: m.createdAt,
          senderId: m.senderId,
          senderName: m.senderName,
          senderPhotoURL: m.senderPhotoURL,
          attachment: m.attachment,
          attachments: m.attachments,
          editedAt: m.editedAt,
          deletedFor: m.deletedFor,
          deletedForEveryone: m.deletedForEveryone,
        })),
    [state.dmMessages, currentUserId],
  );

  const allMsgs = isDm ? normalizedDmMsgs : normalizedGroupMsgs;

  // Apply filter
  const filteredMsgs = useMemo(() => {
    if (filter === "all") return allMsgs;
    return allMsgs.filter((m) => {
      const allAttach = [...(m.attachment ? [m.attachment] : []), ...(m.attachments || [])];
      if (filter === "images") return allAttach.some((a) => a.type === "image");
      if (filter === "files") return allAttach.some((a) => a.type === "file");
      if (filter === "links") {
        resetRegex();
        return hasLink(m.text);
      }
      return true;
    });
  }, [allMsgs, filter]);

  const grouped = useMemo(() => groupMessages(filteredMsgs), [filteredMsgs]);

  // Sidebar collections
  const sidebarImages = useMemo(
    () => allMsgs.filter((m) => m.attachment?.type === "image"),
    [allMsgs],
  );
  const sidebarFiles = useMemo(
    () => allMsgs.filter((m) => m.attachment?.type === "file"),
    [allMsgs],
  );
  const sidebarLinks = useMemo(() => {
    const result: { msg: NormalizedMsg; urls: string[] }[] = [];
    for (const m of allMsgs) {
      resetRegex();
      const urls: string[] = [];
      let match: RegExpExecArray | null;
      while ((match = URL_REGEX.exec(m.text)) !== null) urls.push(match[0]);
      if (urls.length > 0) result.push({ msg: m, urls });
    }
    return result;
  }, [allMsgs]);

  const [sidebarTab, setSidebarTab] = useState<"images" | "files" | "links">(
    "images",
  );

  // Other members (for DM list)
  const otherMembers = useMemo(
    () => state.workspaceMembers.filter((m) => m.uid !== currentUserId),
    [state.workspaceMembers, currentUserId],
  );

  // DM target
  const dmTarget = useMemo(
    () => state.workspaceMembers.find((m) => m.uid === state.activeDmUserId),
    [state.workspaceMembers, state.activeDmUserId],
  );

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMsgs.length]);

  // Focus on conversation change
  useEffect(() => {
    inputRef.current?.focus();
  }, [state.activeDmUserId]);

  // Reset filter on conversation change
  useEffect(() => {
    setFilter("all");
    setFilterOpen(false);
  }, [state.activeDmUserId]);

  const handleSend = () => {
    const hasText = text.trim().length > 0;
    const uploadedFiles = stagedFiles.filter((f) => f.uploaded);
    if (!hasText && uploadedFiles.length === 0) return;
    const attachments = uploadedFiles.map((f) => f.uploaded!);
    if (isDm) sendDm(text, undefined, attachments.length > 0 ? attachments : undefined);
    else sendMessage(text, undefined, attachments.length > 0 ? attachments : undefined);
    setText("");
    setStagedFiles([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    e.target.value = "";

    const newStaged: StagedFile[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      uploading: true,
    }));
    setStagedFiles((prev) => [...prev, ...newStaged]);

    // Upload each file in parallel
    for (const staged of newStaged) {
      try {
        const result = await uploadChatFile(staged.file);
        const attachment: ChatAttachment = {
          url: result.url,
          name: staged.file.name,
          type: result.type,
          size: staged.file.size,
        };
        setStagedFiles((prev) =>
          prev.map((f) => f.id === staged.id ? { ...f, uploading: false, uploaded: attachment } : f)
        );
      } catch {
        setStagedFiles((prev) =>
          prev.map((f) => f.id === staged.id ? { ...f, uploading: false, error: true } : f)
        );
      }
    }
  };

  const removeStagedFile = (id: string) => {
    setStagedFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleContextMenu = (e: React.MouseEvent, msgId: string, isOwn: boolean) => {
    e.preventDefault();
    setContextMenu({ msgId, isOwn, x: e.clientX, y: e.clientY });
  };

  const handleEdit = (msgId: string, currentText: string) => {
    setEditingMsgId(msgId);
    setEditText(currentText);
    setContextMenu(null);
    setTimeout(() => editInputRef.current?.focus(), 50);
  };

  const handleEditSave = () => {
    if (editingMsgId && editText.trim()) {
      editMessage(editingMsgId, editText);
    }
    setEditingMsgId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditingMsgId(null);
    setEditText("");
  };

  if (!state.activeWorkspaceId) {
    return (
      <div className="flex flex-col items-center justify-center h-full opacity-60 gap-3">
        <MessageCircle size={48} />
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Select a workspace to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-0 md:gap-3 max-w-5xl mx-auto">
      {/* Conversation list sidebar */}
      <div
        className={`${mobileShowChat ? "hidden" : "flex"} md:flex w-full md:w-56 shrink-0 rounded-xl flex-col overflow-hidden`}
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wider"
          style={{
            color: "var(--color-text-secondary)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          Conversations
        </div>

        <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
          {/* Group chat */}
          <button
            onClick={() => {
              closeDm();
              setMobileShowChat(true);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-all"
            style={{
              background: !isDm ? "var(--color-accent-light)" : "transparent",
              color: !isDm ? "var(--color-accent)" : "var(--color-text)",
            }}
          >
            <Hash size={16} />
            <span className="flex-1 text-left font-medium">Group Chat</span>
          </button>

          {/* DM list */}
          {otherMembers.length > 0 && (
            <>
              <div
                className="px-2.5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Direct Messages
              </div>
              {otherMembers.map((member) => (
                <button
                  key={member.uid}
                  onClick={() => {
                    openDm(member.uid);
                    setMobileShowChat(true);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-all"
                  style={{
                    background:
                      state.activeDmUserId === member.uid ?
                        "var(--color-accent-light)"
                      : "transparent",
                    color:
                      state.activeDmUserId === member.uid ?
                        "var(--color-accent)"
                      : "var(--color-text)",
                  }}
                >
                  {member.photoURL ?
                    <Image
                      src={member.photoURL}
                      alt={member.displayName}
                      width={20}
                      height={20}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  : <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ background: "var(--color-accent)" }}
                    >
                      {member.displayName.charAt(0).toUpperCase()}
                    </div>
                  }
                  <span className="flex-1 text-left truncate">
                    {member.displayName || member.email}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Main chat area */}
      <div
        className={`${mobileShowChat ? "flex" : "hidden"} md:flex flex-1 min-w-0 relative overflow-hidden`}
      >
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header + filter bar */}
          <div
            className="flex flex-col rounded-xl mb-3"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              {isDm ?
                <>
                  <button
                    onClick={() => {
                      closeDm();
                      setMobileShowChat(false);
                    }}
                    className="p-1 rounded-md hover:opacity-70 transition-opacity md:hidden"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  {dmTarget?.photoURL ?
                    <Image
                      src={dmTarget.photoURL}
                      alt={dmTarget.displayName}
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  : <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "var(--color-accent)" }}
                    >
                      {(dmTarget?.displayName || "?").charAt(0).toUpperCase()}
                    </div>
                  }
                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {dmTarget?.displayName || "Direct Message"}
                  </h2>
                  <button
                    onClick={() => setFilterOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ml-auto"
                    style={{
                      background:
                        filter !== "all" ?
                          "var(--color-accent)"
                        : "var(--color-bg)",
                      color:
                        filter !== "all" ? "#fff" : (
                          "var(--color-text-secondary)"
                        ),
                      border: `1px solid ${filter !== "all" ? "var(--color-accent)" : "var(--color-border)"}`,
                    }}
                  >
                    <SlidersHorizontal size={13} />
                    {filter !== "all" ?
                      FILTER_OPTIONS.find((f) => f.key === filter)?.label
                    : "Media"}
                  </button>
                  {filter !== "all" && (
                    <button
                      onClick={() => setFilter("all")}
                      className="p-1 rounded-full hover:opacity-70 transition-opacity"
                      style={{ color: "var(--color-text-secondary)" }}
                      title="Clear filter"
                    >
                      <X size={14} />
                    </button>
                  )}
                </>
              : <>
                  <button
                    onClick={() => setMobileShowChat(false)}
                    className="p-1 rounded-md hover:opacity-70 transition-opacity md:hidden"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <Hash size={20} style={{ color: "var(--color-accent)" }} />
                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    Group Chat
                  </h2>
                  <button
                    onClick={() => setFilterOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ml-auto"
                    style={{
                      background:
                        filter !== "all" ?
                          "var(--color-accent)"
                        : "var(--color-bg)",
                      color:
                        filter !== "all" ? "#fff" : (
                          "var(--color-text-secondary)"
                        ),
                      border: `1px solid ${filter !== "all" ? "var(--color-accent)" : "var(--color-border)"}`,
                    }}
                  >
                    <SlidersHorizontal size={13} />
                    {filter !== "all" ?
                      FILTER_OPTIONS.find((f) => f.key === filter)?.label
                    : "Media"}
                  </button>
                  {filter !== "all" && (
                    <button
                      onClick={() => setFilter("all")}
                      className="p-1 rounded-full hover:opacity-70 transition-opacity"
                      style={{ color: "var(--color-text-secondary)" }}
                      title="Clear filter"
                    >
                      <X size={14} />
                    </button>
                  )}
                </>
              }
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 min-h-0 overflow-y-auto rounded-xl p-4 space-y-4"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {filteredMsgs.length === 0 ?
              <div className="flex flex-col items-center justify-center h-full opacity-50 gap-2">
                {filter !== "all" ?
                  <>
                    {filter === "images" && <ImageIcon size={36} />}
                    {filter === "files" && <FileText size={36} />}
                    {filter === "links" && <Link2 size={36} />}
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      No {filter} found in this conversation
                    </p>
                    <button
                      onClick={() => setFilter("all")}
                      className="text-xs underline"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Show all messages
                    </button>
                  </>
                : <>
                    <MessageCircle size={36} />
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {isDm ?
                        `Start a private conversation with ${dmTarget?.displayName || "this member"}`
                      : "No messages yet. Start the conversation!"}
                    </p>
                  </>
                }
              </div>
            : grouped.map((group) => {
                const isOwn = group.senderId === currentUserId;
                return (
                  <div
                    key={group.items[0].id}
                    className={`flex gap-2.5 ${isOwn ? "flex-row-reverse" : ""}`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {group.senderPhotoURL ?
                        <Image
                          src={group.senderPhotoURL}
                          alt={group.senderName}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      : <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: "var(--color-accent)" }}
                        >
                          {group.senderName.charAt(0).toUpperCase()}
                        </div>
                      }
                    </div>
                    <div
                      className={`flex flex-col gap-0.5 max-w-[85%] md:max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}
                    >
                      <span
                        className="text-xs font-medium mb-0.5 px-1"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {isOwn ? "You" : group.senderName}
                      </span>
                      {group.items.map((item) => {
                        // Deleted for everyone — show placeholder
                        if (item.deletedForEveryone) {
                          return (
                            <div
                              key={item.id}
                              className="rounded-2xl text-sm px-3 py-2 italic opacity-50"
                              style={{
                                background: "var(--color-surface-hover)",
                                color: "var(--color-text-secondary)",
                              }}
                            >
                              This message was deleted
                            </div>
                          );
                        }

                        // Collect all attachments (backward compat: single + array)
                        const allAttachments: ChatAttachment[] = [
                          ...(item.attachment ? [item.attachment] : []),
                          ...(item.attachments || []),
                        ];

                        return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-2xl text-sm overflow-hidden relative group/msg"
                          style={{
                            background:
                              isOwn ?
                                "var(--color-accent)"
                              : "var(--color-surface-hover)",
                            color: isOwn ? "#fff" : "var(--color-text)",
                            borderBottomRightRadius: isOwn ? 6 : undefined,
                            borderBottomLeftRadius: !isOwn ? 6 : undefined,
                          }}
                          onContextMenu={(e) => handleContextMenu(e, item.id, isOwn)}
                        >
                          {/* Message action button */}
                          <button
                            onClick={(e) => handleContextMenu(e, item.id, isOwn)}
                            className="absolute top-1 right-1 p-0.5 rounded opacity-0 group-hover/msg:opacity-70 hover:opacity-100! transition-opacity"
                            style={{ color: isOwn ? "#ffffffcc" : "var(--color-text-tertiary)" }}
                          >
                            <MoreVertical size={14} />
                          </button>

                          {/* Attachment rendering */}
                          {allAttachments.map((att, idx) =>
                            att.type === "image" ? (
                              <button
                                key={idx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLightboxUrl(att.url);
                                }}
                                className="block w-full text-left"
                              >
                                <img
                                  src={att.url}
                                  alt={att.name}
                                  className="max-w-full max-h-60 rounded-t-2xl object-cover cursor-pointer"
                                  style={{ display: "block" }}
                                />
                              </button>
                            ) : (
                              <a
                                key={idx}
                                href={att.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 hover:opacity-80 transition-opacity"
                                style={{
                                  borderBottom:
                                    (item.text || idx < allAttachments.length - 1) ?
                                      `1px solid ${isOwn ? "rgba(255,255,255,0.15)" : "var(--color-border)"}`
                                    : undefined,
                                }}
                              >
                                <FileText size={18} className="shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium truncate">
                                    {att.name}
                                  </div>
                                  {att.size != null && (
                                    <div className="text-[10px] opacity-60">
                                      {formatSize(att.size)}
                                    </div>
                                  )}
                                </div>
                                <Download
                                  size={14}
                                  className="shrink-0 opacity-60"
                                />
                              </a>
                            ),
                          )}

                          {/* Text content or edit mode */}
                          {editingMsgId === item.id ? (
                            <div className="px-2 py-1.5 flex gap-1.5">
                              <input
                                ref={editInputRef}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleEditSave();
                                  if (e.key === "Escape") handleEditCancel();
                                }}
                                className="flex-1 px-2 py-1 rounded text-sm outline-none"
                                style={{
                                  background: isOwn ? "rgba(255,255,255,0.2)" : "var(--color-bg)",
                                  color: isOwn ? "#fff" : "var(--color-text)",
                                }}
                              />
                              <button onClick={handleEditSave} className="text-xs font-medium px-2 py-1 rounded" style={{ background: isOwn ? "rgba(255,255,255,0.2)" : "var(--color-accent-light)", color: isOwn ? "#fff" : "var(--color-accent)" }}>Save</button>
                              <button onClick={handleEditCancel} className="text-xs px-2 py-1 rounded opacity-70 hover:opacity-100">Cancel</button>
                            </div>
                          ) : item.text ? (
                            <div className="px-3 py-2">
                              <RichText text={item.text} isOwn={isOwn} />
                            </div>
                          ) : null}

                          {/* Timestamp + edited indicator */}
                          <div
                            className="px-3 pb-1.5 text-[10px] opacity-60 flex items-center gap-1"
                            style={{
                              color:
                                isOwn ? "#ffffffcc" : (
                                  "var(--color-text-secondary)"
                                ),
                            }}
                          >
                            {item.editedAt && <span className="italic">edited</span>}
                            {item.editedAt && <span>·</span>}
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            }
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            className="mt-3 rounded-xl"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Staged files preview */}
            {stagedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 px-3 pt-3">
                {stagedFiles.map((sf) => (
                  <div
                    key={sf.id}
                    className="relative group/staged rounded-lg overflow-hidden"
                    style={{
                      background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {sf.preview ? (
                      <img src={sf.preview} alt={sf.file.name} className="w-16 h-16 object-cover" />
                    ) : (
                      <div className="w-16 h-16 flex flex-col items-center justify-center gap-1 px-1">
                        <FileText size={16} style={{ color: "var(--color-text-tertiary)" }} />
                        <span className="text-[8px] truncate w-full text-center" style={{ color: "var(--color-text-secondary)" }}>{sf.file.name}</span>
                      </div>
                    )}
                    {sf.uploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Loader2 size={16} className="animate-spin text-white" />
                      </div>
                    )}
                    {sf.error && (
                      <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                        <X size={16} className="text-white" />
                      </div>
                    )}
                    <button
                      onClick={() => removeStagedFile(sf.id)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover/staged:opacity-100 transition-opacity"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 p-2">
              {/* File upload */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.csv,.json,.xml,.md"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-lg transition-all hover:opacity-80"
                style={{ color: "var(--color-text-secondary)" }}
                title="Attach files or images"
              >
                <Paperclip size={18} />
              </button>

              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isDm ?
                    `Message ${dmTarget?.displayName || ""}...`
                  : "Type a message..."
                }
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: "var(--color-bg)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border)",
                }}
                maxLength={2000}
              />
              <button
                onClick={handleSend}
                disabled={!text.trim() && stagedFiles.filter((f) => f.uploaded).length === 0}
                className="p-2.5 rounded-lg transition-all disabled:opacity-30"
                style={{
                  background: "var(--color-accent)",
                  color: "#fff",
                }}
                title="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Context menu */}
          {contextMenu && (
            <>
              <div className="fixed inset-0 z-9998" onClick={() => setContextMenu(null)} />
              <div
                className="fixed z-9999 rounded-lg shadow-lg py-1 min-w-40"
                style={{
                  top: contextMenu.y,
                  left: contextMenu.x,
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {contextMenu.isOwn && (
                  <button
                    onClick={() => {
                      const msgs = isDm ? normalizedDmMsgs : normalizedGroupMsgs;
                      const msg = msgs.find((m) => m.id === contextMenu.msgId);
                      if (msg) handleEdit(contextMenu.msgId, msg.text);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--color-text)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <Pencil size={14} /> Edit message
                  </button>
                )}
                <button
                  onClick={() => {
                    setDeleteConfirm({ msgId: contextMenu.msgId, mode: "me" });
                    setContextMenu(null);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--color-text)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Trash2 size={14} /> Delete for me
                </button>
                {contextMenu.isOwn && (
                  <button
                    onClick={() => {
                      setDeleteConfirm({ msgId: contextMenu.msgId, mode: "everyone" });
                      setContextMenu(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--color-danger)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <Trash2 size={14} /> Delete for everyone
                  </button>
                )}
              </div>
            </>
          )}

          {/* Delete confirmation dialog */}
          {deleteConfirm && (
            <>
              <div className="fixed inset-0 z-9998 bg-black/40" onClick={() => setDeleteConfirm(null)} />
              <div
                className="fixed z-9999 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-5 w-80 shadow-xl"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--color-text)" }}>
                  {deleteConfirm.mode === "everyone" ? "Delete for everyone?" : "Delete for you?"}
                </h3>
                <p className="text-xs mb-4" style={{ color: "var(--color-text-secondary)" }}>
                  {deleteConfirm.mode === "everyone"
                    ? "This message will be removed for all participants."
                    : "This message will only be hidden for you."}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={{ background: "var(--color-bg)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (deleteConfirm.mode === "everyone") deleteMessageForEveryone(deleteConfirm.msgId);
                      else deleteMessageForMe(deleteConfirm.msgId);
                      setDeleteConfirm(null);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors"
                    style={{ background: deleteConfirm.mode === "everyone" ? "var(--color-danger)" : "var(--color-accent)" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Filter sidebar from right */}
        <AnimatePresence>
          {filterOpen && (
            <>
              {/* Mobile overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 md:hidden"
                onClick={() => setFilterOpen(false)}
              />
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="fixed right-0 top-0 h-full z-50 overflow-hidden md:relative md:z-auto md:shrink-0 md:ml-3"
              >
                <div
                  className="h-full rounded-none md:rounded-xl flex flex-col"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    minWidth: 280,
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-3 pt-3 pb-2">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Media & Links
                    </span>
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="p-0.5 rounded hover:opacity-70 transition-opacity"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Pill tab navbar */}
                  <div
                    className="flex mx-3 mb-3 rounded-full p-1 gap-0.5"
                    style={{ background: "var(--color-bg)" }}
                  >
                    {FILTER_OPTIONS.map((f) => (
                      <button
                        key={f.key}
                        onClick={() =>
                          setSidebarTab(f.key as "images" | "files" | "links")
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-medium transition-all"
                        style={{
                          background:
                            sidebarTab === f.key ?
                              "var(--color-accent)"
                            : "transparent",
                          color:
                            sidebarTab === f.key ?
                              "#fff"
                            : "var(--color-text-secondary)",
                        }}
                      >
                        {f.icon}
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-3">
                    {sidebarTab === "images" &&
                      (sidebarImages.length === 0 ?
                        <p
                          className="text-xs text-center py-6 opacity-50"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          No images shared yet
                        </p>
                      : <div className="grid grid-cols-2 gap-2">
                          {sidebarImages.map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setLightboxUrl(m.attachment!.url)}
                              className="block rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                              style={{
                                border: "1px solid var(--color-border)",
                              }}
                            >
                              <img
                                src={m.attachment!.url}
                                alt={m.attachment!.name}
                                className="w-full h-24 object-cover"
                              />
                            </button>
                          ))}
                        </div>)}

                    {sidebarTab === "files" &&
                      (sidebarFiles.length === 0 ?
                        <p
                          className="text-xs text-center py-6 opacity-50"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          No files shared yet
                        </p>
                      : <div className="flex flex-col gap-2">
                          {sidebarFiles.map((m) => (
                            <a
                              key={m.id}
                              href={m.attachment!.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 rounded-lg hover:opacity-80 transition-opacity"
                              style={{
                                background: "var(--color-bg)",
                                border: "1px solid var(--color-border)",
                              }}
                            >
                              <FileText
                                size={16}
                                className="shrink-0"
                                style={{ color: "var(--color-accent)" }}
                              />
                              <div className="flex-1 min-w-0">
                                <div
                                  className="text-xs font-medium truncate"
                                  style={{ color: "var(--color-text)" }}
                                >
                                  {m.attachment!.name}
                                </div>
                                {m.attachment!.size != null && (
                                  <div
                                    className="text-[10px]"
                                    style={{
                                      color: "var(--color-text-secondary)",
                                    }}
                                  >
                                    {formatSize(m.attachment!.size)}
                                  </div>
                                )}
                              </div>
                              <Download
                                size={12}
                                className="shrink-0"
                                style={{ color: "var(--color-text-secondary)" }}
                              />
                            </a>
                          ))}
                        </div>)}

                    {sidebarTab === "links" &&
                      (sidebarLinks.length === 0 ?
                        <p
                          className="text-xs text-center py-6 opacity-50"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          No links shared yet
                        </p>
                      : <div className="flex flex-col gap-2">
                          {sidebarLinks.map(({ msg, urls }) =>
                            urls.map((url, i) => (
                              <a
                                key={`${msg.id}-${i}`}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-2 rounded-lg hover:opacity-80 transition-opacity"
                                style={{
                                  background: "var(--color-bg)",
                                  border: "1px solid var(--color-border)",
                                }}
                              >
                                <Link2
                                  size={14}
                                  className="shrink-0"
                                  style={{ color: "var(--color-accent)" }}
                                />
                                <div className="flex-1 min-w-0">
                                  <div
                                    className="text-xs truncate"
                                    style={{ color: "var(--color-accent)" }}
                                  >
                                    {url}
                                  </div>
                                  <div
                                    className="text-[10px]"
                                    style={{
                                      color: "var(--color-text-secondary)",
                                    }}
                                  >
                                    Shared by {msg.senderName}
                                  </div>
                                </div>
                              </a>
                            )),
                          )}
                        </div>)}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setLightboxUrl(null)}
          >
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxUrl}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
