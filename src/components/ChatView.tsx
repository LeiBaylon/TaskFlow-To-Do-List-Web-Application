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
  }[];
}

function groupMessages(messages: NormalizedMsg[]): MessageGroup[] {
  return messages.reduce<MessageGroup[]>((acc, msg) => {
    const last = acc[acc.length - 1];
    if (last && last.senderId === msg.senderId) {
      last.items.push({
        id: msg.id,
        text: msg.text,
        createdAt: msg.createdAt,
        attachment: msg.attachment,
      });
    } else {
      acc.push({
        senderId: msg.senderId,
        senderName: msg.senderName,
        senderPhotoURL: msg.senderPhotoURL,
        items: [
          {
            id: msg.id,
            text: msg.text,
            createdAt: msg.createdAt,
            attachment: msg.attachment,
          },
        ],
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
  const { state, sendMessage, openDm, closeDm, sendDm } = useApp();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUserId = state.user?.uid;
  const isDm = state.activeDmUserId !== null;

  // Normalize group messages to common shape
  const normalizedGroupMsgs: NormalizedMsg[] = useMemo(
    () =>
      state.workspaceMessages.map((m) => ({
        id: m.id,
        text: m.text,
        createdAt: m.createdAt,
        senderId: m.userId,
        senderName: m.userName,
        senderPhotoURL: m.userPhotoURL,
        attachment: m.attachment,
      })),
    [state.workspaceMessages],
  );

  const normalizedDmMsgs: NormalizedMsg[] = useMemo(
    () =>
      state.dmMessages.map((m) => ({
        id: m.id,
        text: m.text,
        createdAt: m.createdAt,
        senderId: m.senderId,
        senderName: m.senderName,
        senderPhotoURL: m.senderPhotoURL,
        attachment: m.attachment,
      })),
    [state.dmMessages],
  );

  const allMsgs = isDm ? normalizedDmMsgs : normalizedGroupMsgs;

  // Apply filter
  const filteredMsgs = useMemo(() => {
    if (filter === "all") return allMsgs;
    return allMsgs.filter((m) => {
      if (filter === "images") return m.attachment?.type === "image";
      if (filter === "files") return m.attachment?.type === "file";
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
    if (!text.trim()) return;
    if (isDm) sendDm(text);
    else sendMessage(text);
    setText("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Reset so re-uploading same file works
    e.target.value = "";

    setUploading(true);
    try {
      const result = await uploadChatFile(file);
      const attachment: ChatAttachment = {
        url: result.url,
        name: file.name,
        type: result.type,
        size: file.size,
      };
      if (isDm) sendDm("", attachment);
      else sendMessage("", attachment);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
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
    <div className="flex h-full gap-3 max-w-5xl mx-auto">
      {/* Conversation list sidebar */}
      <div
        className="w-56 shrink-0 rounded-xl flex flex-col overflow-hidden"
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
            onClick={() => closeDm()}
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
                  onClick={() => openDm(member.uid)}
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
                      className="rounded-full"
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
      <div className="flex-1 flex min-w-0 relative overflow-hidden">
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
                    onClick={() => closeDm()}
                    className="p-1 rounded-md hover:opacity-70 transition-opacity sm:hidden"
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
                      className="rounded-full"
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
                          className="rounded-full"
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
                      className={`flex flex-col gap-0.5 max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}
                    >
                      <span
                        className="text-xs font-medium mb-0.5 px-1"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {isOwn ? "You" : group.senderName}
                      </span>
                      {group.items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-2xl text-sm overflow-hidden"
                          style={{
                            background:
                              isOwn ? "var(--color-accent)" : "var(--color-surface)",
                            color: isOwn ? "#fff" : "var(--color-text)",
                            borderBottomRightRadius: isOwn ? 6 : undefined,
                            borderBottomLeftRadius: !isOwn ? 6 : undefined,
                          }}
                        >
                          {/* Attachment rendering */}
                          {item.attachment?.type === "image" && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxUrl(item.attachment!.url);
                              }}
                              className="block w-full text-left"
                            >
                              <img
                                src={item.attachment.url}
                                alt={item.attachment.name}
                                className="max-w-full max-h-60 rounded-t-2xl object-cover cursor-pointer"
                                style={{ display: "block" }}
                              />
                            </button>
                          )}
                          {item.attachment?.type === "file" && (
                            <a
                              href={item.attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 hover:opacity-80 transition-opacity"
                              style={{
                                borderBottom:
                                  item.text ?
                                    `1px solid ${isOwn ? "rgba(255,255,255,0.15)" : "var(--color-border)"}`
                                  : undefined,
                              }}
                            >
                              <FileText size={18} className="shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">
                                  {item.attachment.name}
                                </div>
                                {item.attachment.size != null && (
                                  <div className="text-[10px] opacity-60">
                                    {formatSize(item.attachment.size)}
                                  </div>
                                )}
                              </div>
                              <Download
                                size={14}
                                className="shrink-0 opacity-60"
                              />
                            </a>
                          )}

                          {/* Text content */}
                          {item.text && (
                            <div className="px-3 py-2">
                              <RichText text={item.text} isOwn={isOwn} />
                            </div>
                          )}

                          {/* Timestamp */}
                          <div
                            className="px-3 pb-1.5 text-[10px] opacity-60"
                            style={{
                              color:
                                isOwn ? "#ffffffcc" : (
                                  "var(--color-text-secondary)"
                                ),
                            }}
                          >
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })
            }
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            className="flex items-center gap-2 mt-3 p-2 rounded-xl"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* File upload */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.csv,.json,.xml,.md"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="p-2 rounded-lg transition-all hover:opacity-80 disabled:opacity-30"
              style={{ color: "var(--color-text-secondary)" }}
              title="Attach file or image"
            >
              {uploading ?
                <Loader2 size={18} className="animate-spin" />
              : <Paperclip size={18} />}
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
              disabled={!text.trim()}
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

        {/* Filter sidebar from right */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="shrink-0 overflow-hidden ml-3"
            >
              <div
                className="h-full rounded-xl flex flex-col"
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
                            style={{ border: "1px solid var(--color-border)" }}
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
