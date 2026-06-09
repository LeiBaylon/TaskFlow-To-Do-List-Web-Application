(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ChatView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-client] (ecmascript) <export default as Paperclip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-client] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudinary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cloudinary.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// ─── URL detection ───
const URL_REGEX = /https?:\/\/[^\s<>"')\]]+/gi;
function hasLink(text) {
    return URL_REGEX.test(text);
}
function resetRegex() {
    URL_REGEX.lastIndex = 0;
}
function groupMessages(messages) {
    return messages.reduce((acc, msg)=>{
        const last = acc[acc.length - 1];
        const item = {
            id: msg.id,
            text: msg.text,
            createdAt: msg.createdAt,
            attachment: msg.attachment,
            attachments: msg.attachments,
            editedAt: msg.editedAt,
            deletedForEveryone: msg.deletedForEveryone
        };
        if (last && last.senderId === msg.senderId) {
            last.items.push(item);
        } else {
            acc.push({
                senderId: msg.senderId,
                senderName: msg.senderName,
                senderPhotoURL: msg.senderPhotoURL,
                items: [
                    item
                ]
            });
        }
        return acc;
    }, []);
}
// ─── Render text with clickable links ───
function RichText({ text, isOwn }) {
    if (!text) return null;
    resetRegex();
    const parts = [];
    let lastIndex = 0;
    let match;
    while((match = URL_REGEX.exec(text)) !== null){
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        const url = match[0];
        parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "underline break-all",
            style: {
                color: isOwn ? "#ffffffdd" : "var(--color-accent)"
            },
            children: url
        }, match.index, false, {
            fileName: "[project]/src/components/ChatView.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this));
        lastIndex = URL_REGEX.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: parts
    }, void 0, false);
}
_c = RichText;
// ─── Filter bar ───
const FILTER_OPTIONS = [
    {
        key: "images",
        label: "Images",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/ChatView.tsx",
            lineNumber: 145,
            columnNumber: 43
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        key: "files",
        label: "Files",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/ChatView.tsx",
            lineNumber: 146,
            columnNumber: 41
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        key: "links",
        label: "Links",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/ChatView.tsx",
            lineNumber: 147,
            columnNumber: 41
        }, ("TURBOPACK compile-time value", void 0))
    }
];
function ChatView() {
    _s();
    const { state, sendMessage, openDm, closeDm, sendDm, editMessage, deleteMessageForMe, deleteMessageForEveryone } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [filterOpen, setFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lightboxUrl, setLightboxUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mobileShowChat, setMobileShowChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stagedFiles, setStagedFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [contextMenu, setContextMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingMsgId, setEditingMsgId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editText, setEditText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [deleteConfirm, setDeleteConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const editInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentUserId = state.user?.uid;
    const isDm = state.activeDmUserId !== null;
    // Normalize group messages to common shape
    const normalizedGroupMsgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatView.useMemo[normalizedGroupMsgs]": ()=>state.workspaceMessages.filter({
                "ChatView.useMemo[normalizedGroupMsgs]": (m)=>!m.deletedFor?.includes(currentUserId || "")
            }["ChatView.useMemo[normalizedGroupMsgs]"]).map({
                "ChatView.useMemo[normalizedGroupMsgs]": (m)=>({
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
                        deletedForEveryone: m.deletedForEveryone
                    })
            }["ChatView.useMemo[normalizedGroupMsgs]"])
    }["ChatView.useMemo[normalizedGroupMsgs]"], [
        state.workspaceMessages,
        currentUserId
    ]);
    const normalizedDmMsgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatView.useMemo[normalizedDmMsgs]": ()=>state.dmMessages.filter({
                "ChatView.useMemo[normalizedDmMsgs]": (m)=>!m.deletedFor?.includes(currentUserId || "")
            }["ChatView.useMemo[normalizedDmMsgs]"]).map({
                "ChatView.useMemo[normalizedDmMsgs]": (m)=>({
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
                        deletedForEveryone: m.deletedForEveryone
                    })
            }["ChatView.useMemo[normalizedDmMsgs]"])
    }["ChatView.useMemo[normalizedDmMsgs]"], [
        state.dmMessages,
        currentUserId
    ]);
    const allMsgs = isDm ? normalizedDmMsgs : normalizedGroupMsgs;
    // Apply filter
    const filteredMsgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatView.useMemo[filteredMsgs]": ()=>{
            if (filter === "all") return allMsgs;
            return allMsgs.filter({
                "ChatView.useMemo[filteredMsgs]": (m)=>{
                    const allAttach = [
                        ...m.attachment ? [
                            m.attachment
                        ] : [],
                        ...m.attachments || []
                    ];
                    if (filter === "images") return allAttach.some({
                        "ChatView.useMemo[filteredMsgs]": (a)=>a.type === "image"
                    }["ChatView.useMemo[filteredMsgs]"]);
                    if (filter === "files") return allAttach.some({
                        "ChatView.useMemo[filteredMsgs]": (a)=>a.type === "file"
                    }["ChatView.useMemo[filteredMsgs]"]);
                    if (filter === "links") {
                        resetRegex();
                        return hasLink(m.text);
                    }
                    return true;
                }
            }["ChatView.useMemo[filteredMsgs]"]);
        }
    }["ChatView.useMemo[filteredMsgs]"], [
        allMsgs,
        filter
    ]);
    const grouped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatView.useMemo[grouped]": ()=>groupMessages(filteredMsgs)
    }["ChatView.useMemo[grouped]"], [
        filteredMsgs
    ]);
    // Sidebar collections
    const sidebarImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatView.useMemo[sidebarImages]": ()=>allMsgs.filter({
                "ChatView.useMemo[sidebarImages]": (m)=>m.attachment?.type === "image"
            }["ChatView.useMemo[sidebarImages]"])
    }["ChatView.useMemo[sidebarImages]"], [
        allMsgs
    ]);
    const sidebarFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatView.useMemo[sidebarFiles]": ()=>allMsgs.filter({
                "ChatView.useMemo[sidebarFiles]": (m)=>m.attachment?.type === "file"
            }["ChatView.useMemo[sidebarFiles]"])
    }["ChatView.useMemo[sidebarFiles]"], [
        allMsgs
    ]);
    const sidebarLinks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatView.useMemo[sidebarLinks]": ()=>{
            const result = [];
            for (const m of allMsgs){
                resetRegex();
                const urls = [];
                let match;
                while((match = URL_REGEX.exec(m.text)) !== null)urls.push(match[0]);
                if (urls.length > 0) result.push({
                    msg: m,
                    urls
                });
            }
            return result;
        }
    }["ChatView.useMemo[sidebarLinks]"], [
        allMsgs
    ]);
    const [sidebarTab, setSidebarTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("images");
    // Other members (for DM list)
    const otherMembers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatView.useMemo[otherMembers]": ()=>state.workspaceMembers.filter({
                "ChatView.useMemo[otherMembers]": (m)=>m.uid !== currentUserId
            }["ChatView.useMemo[otherMembers]"])
    }["ChatView.useMemo[otherMembers]"], [
        state.workspaceMembers,
        currentUserId
    ]);
    // DM target
    const dmTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatView.useMemo[dmTarget]": ()=>state.workspaceMembers.find({
                "ChatView.useMemo[dmTarget]": (m)=>m.uid === state.activeDmUserId
            }["ChatView.useMemo[dmTarget]"])
    }["ChatView.useMemo[dmTarget]"], [
        state.workspaceMembers,
        state.activeDmUserId
    ]);
    // Auto-scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatView.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatView.useEffect"], [
        filteredMsgs.length
    ]);
    // Focus on conversation change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatView.useEffect": ()=>{
            inputRef.current?.focus();
        }
    }["ChatView.useEffect"], [
        state.activeDmUserId
    ]);
    // Reset filter on conversation change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatView.useEffect": ()=>{
            setFilter("all");
            setFilterOpen(false);
        }
    }["ChatView.useEffect"], [
        state.activeDmUserId
    ]);
    const handleSend = ()=>{
        const hasText = text.trim().length > 0;
        const uploadedFiles = stagedFiles.filter((f)=>f.uploaded);
        if (!hasText && uploadedFiles.length === 0) return;
        const attachments = uploadedFiles.map((f)=>f.uploaded);
        if (isDm) sendDm(text, undefined, attachments.length > 0 ? attachments : undefined);
        else sendMessage(text, undefined, attachments.length > 0 ? attachments : undefined);
        setText("");
        setStagedFiles([]);
        inputRef.current?.focus();
    };
    const handleKeyDown = (e)=>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    const handleFileSelect = async (e)=>{
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        e.target.value = "";
        const newStaged = files.map((file)=>({
                id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                file,
                preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
                uploading: true
            }));
        setStagedFiles((prev)=>[
                ...prev,
                ...newStaged
            ]);
        // Upload each file in parallel
        for (const staged of newStaged){
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudinary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadChatFile"])(staged.file);
                const attachment = {
                    url: result.url,
                    name: staged.file.name,
                    type: result.type,
                    size: staged.file.size
                };
                setStagedFiles((prev)=>prev.map((f)=>f.id === staged.id ? {
                            ...f,
                            uploading: false,
                            uploaded: attachment
                        } : f));
            } catch  {
                setStagedFiles((prev)=>prev.map((f)=>f.id === staged.id ? {
                            ...f,
                            uploading: false,
                            error: true
                        } : f));
            }
        }
    };
    const removeStagedFile = (id)=>{
        setStagedFiles((prev)=>{
            const file = prev.find((f)=>f.id === id);
            if (file?.preview) URL.revokeObjectURL(file.preview);
            return prev.filter((f)=>f.id !== id);
        });
    };
    const handleContextMenu = (e, msgId, isOwn)=>{
        e.preventDefault();
        setContextMenu({
            msgId,
            isOwn,
            x: e.clientX,
            y: e.clientY
        });
    };
    const handleEdit = (msgId, currentText)=>{
        setEditingMsgId(msgId);
        setEditText(currentText);
        setContextMenu(null);
        setTimeout(()=>editInputRef.current?.focus(), 50);
    };
    const handleEditSave = ()=>{
        if (editingMsgId && editText.trim()) {
            editMessage(editingMsgId, editText);
        }
        setEditingMsgId(null);
        setEditText("");
    };
    const handleEditCancel = ()=>{
        setEditingMsgId(null);
        setEditText("");
    };
    if (!state.activeWorkspaceId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full opacity-60 gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                    size: 48
                }, void 0, false, {
                    fileName: "[project]/src/components/ChatView.tsx",
                    lineNumber: 372,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    style: {
                        color: "var(--color-text-secondary)"
                    },
                    children: "Select a workspace to start chatting"
                }, void 0, false, {
                    fileName: "[project]/src/components/ChatView.tsx",
                    lineNumber: 373,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ChatView.tsx",
            lineNumber: 371,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full gap-0 md:gap-3 max-w-5xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${mobileShowChat ? "hidden" : "flex"} md:flex w-full md:w-56 shrink-0 rounded-xl flex-col overflow-hidden`,
                style: {
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-2.5 text-xs font-semibold uppercase tracking-wider",
                        style: {
                            color: "var(--color-text-secondary)",
                            borderBottom: "1px solid var(--color-border)"
                        },
                        children: "Conversations"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatView.tsx",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-1.5 space-y-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    closeDm();
                                    setMobileShowChat(true);
                                },
                                className: "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-all",
                                style: {
                                    background: !isDm ? "var(--color-accent-light)" : "transparent",
                                    color: !isDm ? "var(--color-accent)" : "var(--color-text)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 text-left font-medium",
                                        children: "Group Chat"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 414,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatView.tsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this),
                            otherMembers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-2.5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider",
                                        style: {
                                            color: "var(--color-text-secondary)"
                                        },
                                        children: "Direct Messages"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 420,
                                        columnNumber: 15
                                    }, this),
                                    otherMembers.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                openDm(member.uid);
                                                setMobileShowChat(true);
                                            },
                                            className: "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-all",
                                            style: {
                                                background: state.activeDmUserId === member.uid ? "var(--color-accent-light)" : "transparent",
                                                color: state.activeDmUserId === member.uid ? "var(--color-accent)" : "var(--color-text)"
                                            },
                                            children: [
                                                member.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: member.photoURL,
                                                    alt: member.displayName,
                                                    width: 20,
                                                    height: 20,
                                                    className: "w-5 h-5 rounded-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white",
                                                    style: {
                                                        background: "var(--color-accent)"
                                                    },
                                                    children: member.displayName.charAt(0).toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex-1 text-left truncate",
                                                    children: member.displayName || member.email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, member.uid, true, {
                                            fileName: "[project]/src/components/ChatView.tsx",
                                            lineNumber: 427,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatView.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatView.tsx",
                lineNumber: 383,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${mobileShowChat ? "flex" : "hidden"} md:flex flex-1 min-w-0 relative overflow-hidden`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col rounded-xl mb-3",
                                style: {
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-4 py-3",
                                    children: isDm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    closeDm();
                                                    setMobileShowChat(false);
                                                },
                                                className: "p-1 rounded-md hover:opacity-70 transition-opacity md:hidden",
                                                style: {
                                                    color: "var(--color-text-secondary)"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 486,
                                                columnNumber: 19
                                            }, this),
                                            dmTarget?.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: dmTarget.photoURL,
                                                alt: dmTarget.displayName,
                                                width: 28,
                                                height: 28,
                                                className: "w-7 h-7 rounded-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 497,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white",
                                                style: {
                                                    background: "var(--color-accent)"
                                                },
                                                children: (dmTarget?.displayName || "?").charAt(0).toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 504,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-base font-semibold",
                                                style: {
                                                    color: "var(--color-text)"
                                                },
                                                children: dmTarget?.displayName || "Direct Message"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 511,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilterOpen((v)=>!v),
                                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ml-auto",
                                                style: {
                                                    background: filter !== "all" ? "var(--color-accent)" : "var(--color-bg)",
                                                    color: filter !== "all" ? "#fff" : "var(--color-text-secondary)",
                                                    border: `1px solid ${filter !== "all" ? "var(--color-accent)" : "var(--color-border)"}`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                        size: 13
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 21
                                                    }, this),
                                                    filter !== "all" ? FILTER_OPTIONS.find((f)=>f.key === filter)?.label : "Media"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 517,
                                                columnNumber: 19
                                            }, this),
                                            filter !== "all" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilter("all"),
                                                className: "p-1 rounded-full hover:opacity-70 transition-opacity",
                                                style: {
                                                    color: "var(--color-text-secondary)"
                                                },
                                                title: "Clear filter",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 538,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setMobileShowChat(false),
                                                className: "p-1 rounded-md hover:opacity-70 transition-opacity md:hidden",
                                                style: {
                                                    color: "var(--color-text-secondary)"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 554,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 549,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                                                size: 20,
                                                style: {
                                                    color: "var(--color-accent)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 556,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-base font-semibold",
                                                style: {
                                                    color: "var(--color-text)"
                                                },
                                                children: "Group Chat"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 557,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilterOpen((v)=>!v),
                                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ml-auto",
                                                style: {
                                                    background: filter !== "all" ? "var(--color-accent)" : "var(--color-bg)",
                                                    color: filter !== "all" ? "#fff" : "var(--color-text-secondary)",
                                                    border: `1px solid ${filter !== "all" ? "var(--color-accent)" : "var(--color-border)"}`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                        size: 13
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 578,
                                                        columnNumber: 21
                                                    }, this),
                                                    filter !== "all" ? FILTER_OPTIONS.find((f)=>f.key === filter)?.label : "Media"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 563,
                                                columnNumber: 19
                                            }, this),
                                            filter !== "all" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilter("all"),
                                                className: "p-1 rounded-full hover:opacity-70 transition-opacity",
                                                style: {
                                                    color: "var(--color-text-secondary)"
                                                },
                                                title: "Clear filter",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 584,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatView.tsx",
                                    lineNumber: 483,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatView.tsx",
                                lineNumber: 476,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-h-0 overflow-y-auto rounded-xl p-4 space-y-4",
                                style: {
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)"
                                },
                                children: [
                                    filteredMsgs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center justify-center h-full opacity-50 gap-2",
                                        children: filter !== "all" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                filter === "images" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                                                    size: 36
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 610,
                                                    columnNumber: 45
                                                }, this),
                                                filter === "files" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    size: 36
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 611,
                                                    columnNumber: 44
                                                }, this),
                                                filter === "links" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                    size: 36
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 612,
                                                    columnNumber: 44
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    style: {
                                                        color: "var(--color-text-secondary)"
                                                    },
                                                    children: [
                                                        "No ",
                                                        filter,
                                                        " found in this conversation"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 613,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setFilter("all"),
                                                    className: "text-xs underline",
                                                    style: {
                                                        color: "var(--color-accent)"
                                                    },
                                                    children: "Show all messages"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 619,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                    size: 36
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 628,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    style: {
                                                        color: "var(--color-text-secondary)"
                                                    },
                                                    children: isDm ? `Start a private conversation with ${dmTarget?.displayName || "this member"}` : "No messages yet. Start the conversation!"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 629,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 607,
                                        columnNumber: 15
                                    }, this) : grouped.map((group)=>{
                                        const isOwn = group.senderId === currentUserId;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex gap-2.5 ${isOwn ? "flex-row-reverse" : ""}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "shrink-0 mt-0.5",
                                                    children: group.senderPhotoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: group.senderPhotoURL,
                                                        alt: group.senderName,
                                                        width: 32,
                                                        height: 32,
                                                        className: "w-8 h-8 rounded-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white",
                                                        style: {
                                                            background: "var(--color-accent)"
                                                        },
                                                        children: group.senderName.charAt(0).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 656,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 647,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `flex flex-col gap-0.5 max-w-[85%] md:max-w-[75%] ${isOwn ? "items-end" : "items-start"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-medium mb-0.5 px-1",
                                                            style: {
                                                                color: "var(--color-text-secondary)"
                                                            },
                                                            children: isOwn ? "You" : group.senderName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 23
                                                        }, this),
                                                        group.items.map((item)=>{
                                                            // Deleted for everyone — show placeholder
                                                            if (item.deletedForEveryone) {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded-2xl text-sm px-3 py-2 italic opacity-50",
                                                                    style: {
                                                                        background: "var(--color-surface-hover)",
                                                                        color: "var(--color-text-secondary)"
                                                                    },
                                                                    children: "This message was deleted"
                                                                }, item.id, false, {
                                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                                    lineNumber: 677,
                                                                    columnNumber: 29
                                                                }, this);
                                                            }
                                                            // Collect all attachments (backward compat: single + array)
                                                            const allAttachments = [
                                                                ...item.attachment ? [
                                                                    item.attachment
                                                                ] : [],
                                                                ...item.attachments || []
                                                            ];
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                initial: {
                                                                    opacity: 0,
                                                                    y: 8
                                                                },
                                                                animate: {
                                                                    opacity: 1,
                                                                    y: 0
                                                                },
                                                                className: "rounded-2xl text-sm overflow-hidden relative group/msg",
                                                                style: {
                                                                    background: isOwn ? "var(--color-accent)" : "var(--color-surface-hover)",
                                                                    color: isOwn ? "#fff" : "var(--color-text)",
                                                                    borderBottomRightRadius: isOwn ? 6 : undefined,
                                                                    borderBottomLeftRadius: !isOwn ? 6 : undefined
                                                                },
                                                                onContextMenu: (e)=>handleContextMenu(e, item.id, isOwn),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: (e)=>handleContextMenu(e, item.id, isOwn),
                                                                        className: "absolute top-1 right-1 p-0.5 rounded opacity-0 group-hover/msg:opacity-70 hover:opacity-100! transition-opacity",
                                                                        style: {
                                                                            color: isOwn ? "#ffffffcc" : "var(--color-text-tertiary)"
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                                                            size: 14
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                                            lineNumber: 719,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                                        lineNumber: 714,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    allAttachments.map((att, idx)=>att.type === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                setLightboxUrl(att.url);
                                                                            },
                                                                            className: "block w-full text-left",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                src: att.url,
                                                                                alt: att.name,
                                                                                className: "max-w-full max-h-60 rounded-t-2xl object-cover cursor-pointer",
                                                                                style: {
                                                                                    display: "block"
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                                lineNumber: 734,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, idx, false, {
                                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                                            lineNumber: 725,
                                                                            columnNumber: 31
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: att.url,
                                                                            target: "_blank",
                                                                            rel: "noopener noreferrer",
                                                                            className: "flex items-center gap-2 px-3 py-2 hover:opacity-80 transition-opacity",
                                                                            style: {
                                                                                borderBottom: item.text || idx < allAttachments.length - 1 ? `1px solid ${isOwn ? "rgba(255,255,255,0.15)" : "var(--color-border)"}` : undefined
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                                    size: 18,
                                                                                    className: "shrink-0"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                                                    lineNumber: 755,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex-1 min-w-0",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-sm font-medium truncate",
                                                                                            children: att.name
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                                                            lineNumber: 757,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        att.size != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-[10px] opacity-60",
                                                                                            children: formatSize(att.size)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                                                            lineNumber: 761,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                                                    lineNumber: 756,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                                    size: 14,
                                                                                    className: "shrink-0 opacity-60"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                                                    lineNumber: 766,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, idx, true, {
                                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                                            lineNumber: 742,
                                                                            columnNumber: 31
                                                                        }, this)),
                                                                    editingMsgId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-2 py-1.5 flex gap-1.5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                ref: editInputRef,
                                                                                value: editText,
                                                                                onChange: (e)=>setEditText(e.target.value),
                                                                                onKeyDown: (e)=>{
                                                                                    if (e.key === "Enter") handleEditSave();
                                                                                    if (e.key === "Escape") handleEditCancel();
                                                                                },
                                                                                className: "flex-1 px-2 py-1 rounded text-sm outline-none",
                                                                                style: {
                                                                                    background: isOwn ? "rgba(255,255,255,0.2)" : "var(--color-bg)",
                                                                                    color: isOwn ? "#fff" : "var(--color-text)"
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                                lineNumber: 777,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: handleEditSave,
                                                                                className: "text-xs font-medium px-2 py-1 rounded",
                                                                                style: {
                                                                                    background: isOwn ? "rgba(255,255,255,0.2)" : "var(--color-accent-light)",
                                                                                    color: isOwn ? "#fff" : "var(--color-accent)"
                                                                                },
                                                                                children: "Save"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                                lineNumber: 791,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: handleEditCancel,
                                                                                className: "text-xs px-2 py-1 rounded opacity-70 hover:opacity-100",
                                                                                children: "Cancel"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                                lineNumber: 792,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                                        lineNumber: 776,
                                                                        columnNumber: 29
                                                                    }, this) : item.text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-3 py-2",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RichText, {
                                                                            text: item.text,
                                                                            isOwn: isOwn
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                                            lineNumber: 796,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                                        lineNumber: 795,
                                                                        columnNumber: 29
                                                                    }, this) : null,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-3 pb-1.5 text-[10px] opacity-60 flex items-center gap-1",
                                                                        style: {
                                                                            color: isOwn ? "#ffffffcc" : "var(--color-text-secondary)"
                                                                        },
                                                                        children: [
                                                                            item.editedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "italic",
                                                                                children: "edited"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                                lineNumber: 810,
                                                                                columnNumber: 47
                                                                            }, this),
                                                                            item.editedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "·"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                                lineNumber: 811,
                                                                                columnNumber: 47
                                                                            }, this),
                                                                            new Date(item.createdAt).toLocaleTimeString([], {
                                                                                hour: "2-digit",
                                                                                minute: "2-digit"
                                                                            })
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                                        lineNumber: 801,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, item.id, true, {
                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 664,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, group.items[0].id, true, {
                                            fileName: "[project]/src/components/ChatView.tsx",
                                            lineNumber: 643,
                                            columnNumber: 19
                                        }, this);
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: bottomRef
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 825,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatView.tsx",
                                lineNumber: 599,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 rounded-xl",
                                style: {
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)"
                                },
                                children: [
                                    stagedFiles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2 px-3 pt-3",
                                        children: stagedFiles.map((sf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group/staged rounded-lg overflow-hidden",
                                                style: {
                                                    background: "var(--color-bg)",
                                                    border: "1px solid var(--color-border)"
                                                },
                                                children: [
                                                    sf.preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: sf.preview,
                                                        alt: sf.file.name,
                                                        className: "w-16 h-16 object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 849,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-16 h-16 flex flex-col items-center justify-center gap-1 px-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                size: 16,
                                                                style: {
                                                                    color: "var(--color-text-tertiary)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[8px] truncate w-full text-center",
                                                                style: {
                                                                    color: "var(--color-text-secondary)"
                                                                },
                                                                children: sf.file.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                lineNumber: 853,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 851,
                                                        columnNumber: 23
                                                    }, this),
                                                    sf.uploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-black/40 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            size: 16,
                                                            className: "animate-spin text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                            lineNumber: 858,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 857,
                                                        columnNumber: 23
                                                    }, this),
                                                    sf.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-red-500/30 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 16,
                                                            className: "text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                            lineNumber: 863,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 862,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeStagedFile(sf.id),
                                                        className: "absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover/staged:opacity-100 transition-opacity",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 10,
                                                            className: "text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                            lineNumber: 870,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 866,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, sf.id, true, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 840,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 838,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 p-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: fileInputRef,
                                                type: "file",
                                                multiple: true,
                                                className: "hidden",
                                                onChange: handleFileSelect,
                                                accept: "image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.csv,.json,.xml,.md"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 878,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>fileInputRef.current?.click(),
                                                className: "p-2 rounded-lg transition-all hover:opacity-80",
                                                style: {
                                                    color: "var(--color-text-secondary)"
                                                },
                                                title: "Attach files or images",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 892,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 886,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: inputRef,
                                                type: "text",
                                                value: text,
                                                onChange: (e)=>setText(e.target.value),
                                                onKeyDown: handleKeyDown,
                                                placeholder: isDm ? `Message ${dmTarget?.displayName || ""}...` : "Type a message...",
                                                className: "flex-1 px-3 py-2 rounded-lg text-sm outline-none",
                                                style: {
                                                    background: "var(--color-bg)",
                                                    color: "var(--color-text)",
                                                    border: "1px solid var(--color-border)"
                                                },
                                                maxLength: 2000
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 895,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSend,
                                                disabled: !text.trim() && stagedFiles.filter((f)=>f.uploaded).length === 0,
                                                className: "p-2.5 rounded-lg transition-all disabled:opacity-30",
                                                style: {
                                                    background: "var(--color-accent)",
                                                    color: "#fff"
                                                },
                                                title: "Send message",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                    lineNumber: 924,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 914,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 876,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatView.tsx",
                                lineNumber: 829,
                                columnNumber: 11
                            }, this),
                            contextMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fixed inset-0 z-9998",
                                        onClick: ()=>setContextMenu(null)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 932,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fixed z-9999 rounded-lg shadow-lg py-1 min-w-40",
                                        style: {
                                            top: contextMenu.y,
                                            left: contextMenu.x,
                                            background: "var(--color-surface)",
                                            border: "1px solid var(--color-border)"
                                        },
                                        children: [
                                            contextMenu.isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const msgs = isDm ? normalizedDmMsgs : normalizedGroupMsgs;
                                                    const msg = msgs.find((m)=>m.id === contextMenu.msgId);
                                                    if (msg) handleEdit(contextMenu.msgId, msg.text);
                                                },
                                                className: "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:opacity-80",
                                                style: {
                                                    color: "var(--color-text)"
                                                },
                                                onMouseEnter: (e)=>e.currentTarget.style.background = "var(--color-surface-hover)",
                                                onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 954,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Edit message"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 943,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setDeleteConfirm({
                                                        msgId: contextMenu.msgId,
                                                        mode: "me"
                                                    });
                                                    setContextMenu(null);
                                                },
                                                className: "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:opacity-80",
                                                style: {
                                                    color: "var(--color-text)"
                                                },
                                                onMouseEnter: (e)=>e.currentTarget.style.background = "var(--color-surface-hover)",
                                                onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Delete for me"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 957,
                                                columnNumber: 17
                                            }, this),
                                            contextMenu.isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setDeleteConfirm({
                                                        msgId: contextMenu.msgId,
                                                        mode: "everyone"
                                                    });
                                                    setContextMenu(null);
                                                },
                                                className: "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:opacity-80",
                                                style: {
                                                    color: "var(--color-danger)"
                                                },
                                                onMouseEnter: (e)=>e.currentTarget.style.background = "var(--color-surface-hover)",
                                                onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 980,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Delete for everyone"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 970,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 933,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            deleteConfirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fixed inset-0 z-9998 bg-black/40",
                                        onClick: ()=>setDeleteConfirm(null)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 990,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fixed z-9999 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-5 w-80 shadow-xl",
                                        style: {
                                            background: "var(--color-surface)",
                                            border: "1px solid var(--color-border)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-semibold mb-2",
                                                style: {
                                                    color: "var(--color-text)"
                                                },
                                                children: deleteConfirm.mode === "everyone" ? "Delete for everyone?" : "Delete for you?"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 995,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs mb-4",
                                                style: {
                                                    color: "var(--color-text-secondary)"
                                                },
                                                children: deleteConfirm.mode === "everyone" ? "This message will be removed for all participants." : "This message will only be hidden for you."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 998,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setDeleteConfirm(null),
                                                        className: "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                                        style: {
                                                            background: "var(--color-bg)",
                                                            color: "var(--color-text-secondary)",
                                                            border: "1px solid var(--color-border)"
                                                        },
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1004,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            if (deleteConfirm.mode === "everyone") deleteMessageForEveryone(deleteConfirm.msgId);
                                                            else deleteMessageForMe(deleteConfirm.msgId);
                                                            setDeleteConfirm(null);
                                                        },
                                                        className: "px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors",
                                                        style: {
                                                            background: deleteConfirm.mode === "everyone" ? "var(--color-danger)" : "var(--color-accent)"
                                                        },
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1011,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 1003,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 991,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatView.tsx",
                        lineNumber: 474,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: filterOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    className: "fixed inset-0 z-40 bg-black/40 md:hidden",
                                    onClick: ()=>setFilterOpen(false)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatView.tsx",
                                    lineNumber: 1033,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        width: 0,
                                        opacity: 0
                                    },
                                    animate: {
                                        width: 280,
                                        opacity: 1
                                    },
                                    exit: {
                                        width: 0,
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.2,
                                        ease: "easeInOut"
                                    },
                                    className: "fixed right-0 top-0 h-full z-50 overflow-hidden md:relative md:z-auto md:shrink-0 md:ml-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full rounded-none md:rounded-xl flex flex-col",
                                        style: {
                                            background: "var(--color-surface)",
                                            border: "1px solid var(--color-border)",
                                            minWidth: 280
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between px-3 pt-3 pb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-semibold uppercase tracking-wider",
                                                        style: {
                                                            color: "var(--color-text-secondary)"
                                                        },
                                                        children: "Media & Links"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1057,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setFilterOpen(false),
                                                        className: "p-0.5 rounded hover:opacity-70 transition-opacity",
                                                        style: {
                                                            color: "var(--color-text-secondary)"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                            lineNumber: 1068,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1063,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 1056,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex mx-3 mb-3 rounded-full p-1 gap-0.5",
                                                style: {
                                                    background: "var(--color-bg)"
                                                },
                                                children: FILTER_OPTIONS.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSidebarTab(f.key),
                                                        className: "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-medium transition-all",
                                                        style: {
                                                            background: sidebarTab === f.key ? "var(--color-accent)" : "transparent",
                                                            color: sidebarTab === f.key ? "#fff" : "var(--color-text-secondary)"
                                                        },
                                                        children: [
                                                            f.icon,
                                                            f.label
                                                        ]
                                                    }, f.key, true, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1078,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 1073,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-h-0 overflow-y-auto px-3 pb-3",
                                                children: [
                                                    sidebarTab === "images" && (sidebarImages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-center py-6 opacity-50",
                                                        style: {
                                                            color: "var(--color-text-secondary)"
                                                        },
                                                        children: "No images shared yet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-2",
                                                        children: sidebarImages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setLightboxUrl(m.attachment.url),
                                                                className: "block rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer",
                                                                style: {
                                                                    border: "1px solid var(--color-border)"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: m.attachment.url,
                                                                    alt: m.attachment.name,
                                                                    className: "w-full h-24 object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                                    lineNumber: 1122,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, m.id, false, {
                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                lineNumber: 1113,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 25
                                                    }, this)),
                                                    sidebarTab === "files" && (sidebarFiles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-center py-6 opacity-50",
                                                        style: {
                                                            color: "var(--color-text-secondary)"
                                                        },
                                                        children: "No files shared yet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1133,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-2",
                                                        children: sidebarFiles.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: m.attachment.url,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: "flex items-center gap-2 p-2 rounded-lg hover:opacity-80 transition-opacity",
                                                                style: {
                                                                    background: "var(--color-bg)",
                                                                    border: "1px solid var(--color-border)"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                        size: 16,
                                                                        className: "shrink-0",
                                                                        style: {
                                                                            color: "var(--color-accent)"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                                        lineNumber: 1152,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs font-medium truncate",
                                                                                style: {
                                                                                    color: "var(--color-text)"
                                                                                },
                                                                                children: m.attachment.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                                lineNumber: 1158,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            m.attachment.size != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-[10px]",
                                                                                style: {
                                                                                    color: "var(--color-text-secondary)"
                                                                                },
                                                                                children: formatSize(m.attachment.size)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                                lineNumber: 1165,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                                        lineNumber: 1157,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                        size: 12,
                                                                        className: "shrink-0",
                                                                        style: {
                                                                            color: "var(--color-text-secondary)"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                                        lineNumber: 1175,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, m.id, true, {
                                                                fileName: "[project]/src/components/ChatView.tsx",
                                                                lineNumber: 1141,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1139,
                                                        columnNumber: 25
                                                    }, this)),
                                                    sidebarTab === "links" && (sidebarLinks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-center py-6 opacity-50",
                                                        style: {
                                                            color: "var(--color-text-secondary)"
                                                        },
                                                        children: "No links shared yet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1186,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-2",
                                                        children: sidebarLinks.map(({ msg, urls })=>urls.map((url, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: url,
                                                                    target: "_blank",
                                                                    rel: "noopener noreferrer",
                                                                    className: "flex items-center gap-2 p-2 rounded-lg hover:opacity-80 transition-opacity",
                                                                    style: {
                                                                        background: "var(--color-bg)",
                                                                        border: "1px solid var(--color-border)"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                                            size: 14,
                                                                            className: "shrink-0",
                                                                            style: {
                                                                                color: "var(--color-accent)"
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                                            lineNumber: 1206,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 min-w-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-xs truncate",
                                                                                    style: {
                                                                                        color: "var(--color-accent)"
                                                                                    },
                                                                                    children: url
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                                                    lineNumber: 1212,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-[10px]",
                                                                                    style: {
                                                                                        color: "var(--color-text-secondary)"
                                                                                    },
                                                                                    children: [
                                                                                        "Shared by ",
                                                                                        msg.senderName
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                                                    lineNumber: 1218,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/ChatView.tsx",
                                                                            lineNumber: 1211,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, `${msg.id}-${i}`, true, {
                                                                    fileName: "[project]/src/components/ChatView.tsx",
                                                                    lineNumber: 1195,
                                                                    columnNumber: 31
                                                                }, this)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ChatView.tsx",
                                                        lineNumber: 1192,
                                                        columnNumber: 25
                                                    }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatView.tsx",
                                                lineNumber: 1102,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ChatView.tsx",
                                        lineNumber: 1047,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatView.tsx",
                                    lineNumber: 1040,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatView.tsx",
                        lineNumber: 1029,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatView.tsx",
                lineNumber: 471,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: lightboxUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.2
                    },
                    className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80",
                    onClick: ()=>setLightboxUrl(null),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setLightboxUrl(null),
                            className: "absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatView.tsx",
                                lineNumber: 1254,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatView.tsx",
                            lineNumber: 1250,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].img, {
                            initial: {
                                scale: 0.9,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 1
                            },
                            exit: {
                                scale: 0.9,
                                opacity: 0
                            },
                            src: lightboxUrl,
                            alt: "Preview",
                            className: "max-w-[90vw] max-h-[90vh] object-contain rounded-lg",
                            onClick: (e)=>e.stopPropagation()
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatView.tsx",
                            lineNumber: 1256,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ChatView.tsx",
                    lineNumber: 1242,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ChatView.tsx",
                lineNumber: 1240,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChatView.tsx",
        lineNumber: 381,
        columnNumber: 5
    }, this);
}
_s(ChatView, "Z0cIJ6RQ+Rdwe9807KZeiLlEVC4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c1 = ChatView;
function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "RichText");
__turbopack_context__.k.register(_c1, "ChatView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_ChatView_tsx_26905356._.js.map