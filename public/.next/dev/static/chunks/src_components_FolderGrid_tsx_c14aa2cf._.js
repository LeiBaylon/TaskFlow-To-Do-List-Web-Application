(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/FolderGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FolderGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-open.js [app-client] (ecmascript) <export default as FolderOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-plus.js [app-client] (ecmascript) <export default as FolderPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ConfirmDialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const PALETTE = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#14b8a6",
    "#3b82f6",
    "#06b6d4"
];
function FolderGrid() {
    _s();
    const { state, dispatch, addFolder, deleteFolder, updateFolder } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [showNew, setShowNew] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newName, setNewName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newColor, setNewColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(PALETTE[0]);
    const [menuId, setMenuId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [renamingId, setRenamingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [renameVal, setRenameVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("grid");
    const [deleteCandidate, setDeleteCandidate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [assigningId, setAssigningId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const newInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const menuTriggerRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const [menuPos, setMenuPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        right: 0
    });
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FolderGrid.useEffect": ()=>{
            setMounted(true);
        }
    }["FolderGrid.useEffect"], []);
    const members = state.workspaceMembers;
    const currentMember = members.find((m)=>m.uid === state.user?.uid);
    const canManage = !!state.activeWorkspaceId && (currentMember?.role === "owner" || currentMember?.role === "admin");
    const isOwner = !state.activeWorkspaceId || currentMember?.role === "owner";
    const taskCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FolderGrid.useMemo[taskCounts]": ()=>{
            const counts = {};
            state.tasks.forEach({
                "FolderGrid.useMemo[taskCounts]": (t)=>{
                    if (!counts[t.folderId]) counts[t.folderId] = {
                        total: 0,
                        pending: 0,
                        done: 0
                    };
                    counts[t.folderId].total++;
                    if (t.completed || t.status === "done") counts[t.folderId].done++;
                    else counts[t.folderId].pending++;
                }
            }["FolderGrid.useMemo[taskCounts]"]);
            return counts;
        }
    }["FolderGrid.useMemo[taskCounts]"], [
        state.tasks
    ]);
    function openFolder(folderId) {
        dispatch({
            type: "SET_ACTIVE_FOLDER",
            payload: folderId
        });
        dispatch({
            type: "SET_VIEW_MODE",
            payload: "list"
        });
    }
    function handleAddFolder() {
        if (!newName.trim()) return;
        addFolder(newName.trim(), undefined, newColor);
        setNewName("");
        setNewColor(PALETTE[0]);
        setShowNew(false);
    }
    function handleCancelNewFolder() {
        setNewName("");
        setNewColor(PALETTE[0]);
        setShowNew(false);
    }
    function toggleAssignee(folderId, member) {
        const folder = state.folders.find((f)=>f.id === folderId);
        if (!folder) return;
        const current = folder.assignees || [];
        const exists = current.some((a)=>a.uid === member.uid);
        const next = exists ? current.filter((a)=>a.uid !== member.uid) : [
            ...current,
            {
                uid: member.uid,
                displayName: member.displayName,
                photoURL: member.photoURL
            }
        ];
        updateFolder(folderId, {
            assignees: next
        });
    }
    function getInitials(name) {
        return name.split(/[\s@]+/).slice(0, 2).map((w)=>w[0]?.toUpperCase() || "").join("");
    }
    const openMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FolderGrid.useCallback[openMenu]": (folderId)=>{
            const btn = menuTriggerRefs.current[folderId];
            if (btn) {
                const rect = btn.getBoundingClientRect();
                setMenuPos({
                    top: rect.bottom + 4,
                    right: window.innerWidth - rect.right
                });
            }
            setMenuId(menuId === folderId ? null : folderId);
        }
    }["FolderGrid.useCallback[openMenu]"], [
        menuId
    ]);
    const container = {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04
            }
        }
    };
    const cardVariant = {
        hidden: {
            opacity: 0,
            y: 16,
            scale: 0.96
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.22
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full min-h-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold",
                                style: {
                                    color: "var(--color-text-primary)"
                                },
                                children: "Folders"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FolderGrid.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm mt-0.5",
                                style: {
                                    color: "var(--color-text-tertiary)"
                                },
                                children: [
                                    state.folders.filter((f)=>f.id !== "inbox").length,
                                    " folder",
                                    state.folders.filter((f)=>f.id !== "inbox").length !== 1 ? "s" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FolderGrid.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FolderGrid.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-0.5 p-1 rounded-xl",
                                style: {
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLayout("grid"),
                                        className: "p-1.5 rounded-lg transition-all",
                                        style: {
                                            background: layout === "grid" ? "var(--color-background)" : "transparent",
                                            color: layout === "grid" ? "var(--color-accent)" : "var(--color-text-tertiary)"
                                        },
                                        title: "Grid view",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLayout("list"),
                                        className: "p-1.5 rounded-lg transition-all",
                                        style: {
                                            background: layout === "list" ? "var(--color-background)" : "transparent",
                                            color: layout === "list" ? "var(--color-accent)" : "var(--color-text-tertiary)"
                                        },
                                        title: "List view",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FolderGrid.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setShowNew(true);
                                    setTimeout(()=>newInputRef.current?.focus(), 50);
                                },
                                className: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition hover:opacity-90",
                                style: {
                                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__["FolderPlus"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 229,
                                        columnNumber: 13
                                    }, this),
                                    "New Folder"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FolderGrid.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FolderGrid.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FolderGrid.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-0 overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                height: 0
                            },
                            animate: {
                                opacity: 1,
                                height: "auto"
                            },
                            exit: {
                                opacity: 0,
                                height: 0
                            },
                            className: "overflow-hidden mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl p-4 flex items-center gap-3",
                                style: {
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: newInputRef,
                                        value: newName,
                                        onChange: (e)=>setNewName(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === "Enter") handleAddFolder();
                                            if (e.key === "Escape") handleCancelNewFolder();
                                        },
                                        placeholder: "Folder name…",
                                        className: "flex-1 bg-transparent text-sm outline-none",
                                        style: {
                                            color: "var(--color-text-primary)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 253,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: PALETTE.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setNewColor(c),
                                                className: "w-5 h-5 rounded-full transition-transform hover:scale-110",
                                                style: {
                                                    background: c,
                                                    outline: newColor === c ? `2px solid ${c}` : "none",
                                                    outlineOffset: 2
                                                }
                                            }, c, false, {
                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                lineNumber: 267,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddFolder,
                                        disabled: !newName.trim(),
                                        className: "p-1.5 rounded-lg disabled:opacity-40 transition",
                                        style: {
                                            background: "var(--color-accent-light)",
                                            color: "var(--color-accent)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                            lineNumber: 288,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 279,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCancelNewFolder,
                                        className: "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                        style: {
                                            background: "var(--color-background)",
                                            border: "1px solid var(--color-border)",
                                            color: "var(--color-text-secondary)"
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FolderGrid.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/FolderGrid.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/FolderGrid.tsx",
                        lineNumber: 238,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: container,
                        initial: "hidden",
                        animate: "show",
                        className: layout === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4" : "flex flex-col gap-2",
                        children: state.folders.filter((f)=>f.id !== "inbox").map((folder)=>{
                            const counts = taskCounts[folder.id] ?? {
                                total: 0,
                                pending: 0,
                                done: 0
                            };
                            const progress = counts.total > 0 ? Math.round(counts.done / counts.total * 100) : 0;
                            const color = folder.color || "#6366f1";
                            if (layout === "list") {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    variants: cardVariant,
                                    className: "relative group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            role: "button",
                                            tabIndex: 0,
                                            onClick: ()=>openFolder(folder.id),
                                            onKeyDown: (e)=>{
                                                if (e.key === "Enter" || e.key === " ") openFolder(folder.id);
                                            },
                                            className: "w-full text-left rounded-xl px-4 py-3 flex items-center gap-4 transition-all duration-200 hover:opacity-90 cursor-pointer",
                                            style: {
                                                background: "var(--color-surface)",
                                                border: "1px solid var(--color-border)"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                                    style: {
                                                        background: `${color}20`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"], {
                                                        size: 16,
                                                        style: {
                                                            color
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 21
                                                }, this),
                                                renamingId === folder.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    autoFocus: true,
                                                    value: renameVal,
                                                    onChange: (e)=>setRenameVal(e.target.value),
                                                    onKeyDown: (e)=>{
                                                        e.stopPropagation();
                                                        if (e.key === "Enter") {
                                                            if (renameVal.trim()) updateFolder(folder.id, {
                                                                name: renameVal.trim()
                                                            });
                                                            setRenamingId(null);
                                                        }
                                                        if (e.key === "Escape") setRenamingId(null);
                                                    },
                                                    onBlur: ()=>{
                                                        if (renameVal.trim()) updateFolder(folder.id, {
                                                            name: renameVal.trim()
                                                        });
                                                        setRenamingId(null);
                                                    },
                                                    onClick: (e)=>e.stopPropagation(),
                                                    className: "flex-1 text-sm font-medium bg-transparent outline-none border-b",
                                                    style: {
                                                        color: "var(--color-text-primary)",
                                                        borderColor: "var(--color-accent)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex-1 text-sm font-medium truncate",
                                                    style: {
                                                        color: "var(--color-text-primary)"
                                                    },
                                                    children: folder.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-24 h-1.5 rounded-full overflow-hidden shrink-0",
                                                    style: {
                                                        background: "var(--color-border)"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        className: "h-full rounded-full",
                                                        style: {
                                                            background: color
                                                        },
                                                        initial: {
                                                            width: 0
                                                        },
                                                        animate: {
                                                            width: `${progress}%`
                                                        },
                                                        transition: {
                                                            duration: 0.6,
                                                            ease: "easeOut"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs shrink-0 w-20 text-right",
                                                    style: {
                                                        color: "var(--color-text-tertiary)"
                                                    },
                                                    children: [
                                                        counts.pending,
                                                        " pending"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 21
                                                }, this),
                                                folder.assignees && folder.assignees.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex -space-x-1.5 shrink-0",
                                                    children: [
                                                        folder.assignees.slice(0, 3).map((a)=>a.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: a.photoURL,
                                                                alt: a.displayName,
                                                                width: 18,
                                                                height: 18,
                                                                className: "w-4.5 h-4.5 rounded-full ring-1 ring-(--color-surface) object-cover"
                                                            }, a.uid, false, {
                                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                                lineNumber: 423,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-4.5 h-4.5 rounded-full flex items-center justify-center text-[6px] font-bold ring-1 ring-(--color-surface)",
                                                                style: {
                                                                    background: "var(--color-accent)",
                                                                    color: "white"
                                                                },
                                                                children: getInitials(a.displayName)
                                                            }, a.uid, false, {
                                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                                lineNumber: 431,
                                                                columnNumber: 29
                                                            }, this)),
                                                        folder.assignees.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] ml-1",
                                                            style: {
                                                                color: "var(--color-text-tertiary)"
                                                            },
                                                            children: [
                                                                "+",
                                                                folder.assignees.length - 3
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    ref: (el)=>{
                                                        menuTriggerRefs.current[folder.id] = el;
                                                    },
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        openMenu(folder.id);
                                                    },
                                                    className: "p-1 rounded-lg transition-opacity shrink-0",
                                                    style: {
                                                        color: "var(--color-text-tertiary)"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                            lineNumber: 339,
                                            columnNumber: 19
                                        }, this),
                                        mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            children: menuId === folder.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "fixed inset-0 z-9998",
                                                        onClick: ()=>setMenuId(null)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 474,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            scale: 0.92,
                                                            y: -4
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            scale: 1,
                                                            y: 0
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            scale: 0.92,
                                                            y: -4
                                                        },
                                                        transition: {
                                                            duration: 0.12
                                                        },
                                                        className: "fixed z-9999 w-40 rounded-xl overflow-hidden shadow-xl",
                                                        style: {
                                                            top: menuPos.top,
                                                            right: menuPos.right,
                                                            background: "var(--color-surface)",
                                                            border: "1px solid var(--color-border)"
                                                        },
                                                        children: [
                                                            isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    setRenamingId(folder.id);
                                                                    setRenameVal(folder.name);
                                                                    setMenuId(null);
                                                                },
                                                                className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors",
                                                                style: {
                                                                    color: "var(--color-text-secondary)"
                                                                },
                                                                onMouseEnter: (e)=>e.currentTarget.style.background = "var(--color-accent-light)",
                                                                onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                                        lineNumber: 512,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    " Rename"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                                lineNumber: 492,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5 px-4 py-2 flex-wrap",
                                                                style: {
                                                                    borderTop: "1px solid var(--color-border)"
                                                                },
                                                                children: PALETTE.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: (e)=>{
                                                                            e.stopPropagation();
                                                                            updateFolder(folder.id, {
                                                                                color: c
                                                                            });
                                                                            setMenuId(null);
                                                                        },
                                                                        className: "w-4 h-4 rounded-full shrink-0 transition-transform hover:scale-110",
                                                                        style: {
                                                                            background: c,
                                                                            outline: folder.color === c ? `2px solid ${c}` : "none",
                                                                            outlineOffset: 2
                                                                        }
                                                                    }, c, false, {
                                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                                        lineNumber: 522,
                                                                        columnNumber: 35
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                                lineNumber: 515,
                                                                columnNumber: 31
                                                            }, this),
                                                            canManage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    setAssigningId(folder.id);
                                                                    setMenuId(null);
                                                                },
                                                                className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors",
                                                                style: {
                                                                    color: "var(--color-text-secondary)",
                                                                    borderTop: "1px solid var(--color-border)"
                                                                },
                                                                onMouseEnter: (e)=>e.currentTarget.style.background = "var(--color-accent-light)",
                                                                onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                                        lineNumber: 562,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    " Assign"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                                lineNumber: 542,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    setDeleteCandidate({
                                                                        id: folder.id,
                                                                        name: folder.name,
                                                                        total: taskCounts[folder.id]?.total ?? 0
                                                                    });
                                                                    setMenuId(null);
                                                                },
                                                                className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors",
                                                                style: {
                                                                    color: "var(--color-danger)"
                                                                },
                                                                onMouseEnter: (e)=>e.currentTarget.style.background = "rgba(239,68,68,0.08)",
                                                                onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                                        lineNumber: 586,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    " Delete"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                                lineNumber: 565,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                            lineNumber: 471,
                                            columnNumber: 23
                                        }, this), document.body)
                                    ]
                                }, folder.id, true, {
                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                    lineNumber: 334,
                                    columnNumber: 17
                                }, this);
                            }
                            // Grid card
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: cardVariant,
                                className: "relative group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        role: "button",
                                        tabIndex: 0,
                                        onClick: ()=>openFolder(folder.id),
                                        onKeyDown: (e)=>{
                                            if (e.key === "Enter" || e.key === " ") openFolder(folder.id);
                                        },
                                        className: "w-full text-left rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer",
                                        style: {
                                            background: "var(--color-surface)",
                                            border: "1px solid var(--color-border)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-xl flex items-center justify-center",
                                                        style: {
                                                            background: `${color}20`
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"], {
                                                            size: 20,
                                                            style: {
                                                                color
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                                            lineNumber: 625,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 621,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        ref: (el)=>{
                                                            menuTriggerRefs.current[folder.id] = el;
                                                        },
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            openMenu(folder.id);
                                                        },
                                                        className: "p-1 rounded-lg transition-opacity",
                                                        style: {
                                                            color: "var(--color-text-tertiary)"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                                            lineNumber: 638,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                lineNumber: 620,
                                                columnNumber: 19
                                            }, this),
                                            renamingId === folder.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                autoFocus: true,
                                                value: renameVal,
                                                onChange: (e)=>setRenameVal(e.target.value),
                                                onKeyDown: (e)=>{
                                                    e.stopPropagation();
                                                    if (e.key === "Enter") {
                                                        if (renameVal.trim()) updateFolder(folder.id, {
                                                            name: renameVal.trim()
                                                        });
                                                        setRenamingId(null);
                                                    }
                                                    if (e.key === "Escape") setRenamingId(null);
                                                },
                                                onBlur: ()=>{
                                                    if (renameVal.trim()) updateFolder(folder.id, {
                                                        name: renameVal.trim()
                                                    });
                                                    setRenamingId(null);
                                                },
                                                onClick: (e)=>e.stopPropagation(),
                                                className: "w-full text-sm font-semibold bg-transparent outline-none border-b mb-2",
                                                style: {
                                                    color: "var(--color-text-primary)",
                                                    borderColor: "var(--color-accent)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                lineNumber: 644,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold truncate mb-1",
                                                style: {
                                                    color: "var(--color-text-primary)"
                                                },
                                                children: folder.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                lineNumber: 669,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs mb-3",
                                                style: {
                                                    color: "var(--color-text-tertiary)"
                                                },
                                                children: [
                                                    counts.pending,
                                                    " pending · ",
                                                    counts.done,
                                                    " done"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                lineNumber: 678,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-1.5 rounded-full overflow-hidden",
                                                style: {
                                                    background: "var(--color-border)"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    className: "h-full rounded-full",
                                                    style: {
                                                        background: color
                                                    },
                                                    initial: {
                                                        width: 0
                                                    },
                                                    animate: {
                                                        width: `${progress}%`
                                                    },
                                                    transition: {
                                                        duration: 0.6,
                                                        ease: "easeOut"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                lineNumber: 686,
                                                columnNumber: 19
                                            }, this),
                                            folder.assignees && folder.assignees.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 mt-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex -space-x-1.5",
                                                        children: folder.assignees.slice(0, 4).map((a)=>a.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: a.photoURL,
                                                                alt: a.displayName,
                                                                width: 20,
                                                                height: 20,
                                                                className: "w-5 h-5 rounded-full ring-1 ring-(--color-surface) object-cover"
                                                            }, a.uid, false, {
                                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                                lineNumber: 705,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold ring-1 ring-(--color-surface)",
                                                                style: {
                                                                    background: "var(--color-accent)",
                                                                    color: "white"
                                                                },
                                                                children: getInitials(a.displayName)
                                                            }, a.uid, false, {
                                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                                lineNumber: 713,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 702,
                                                        columnNumber: 23
                                                    }, this),
                                                    folder.assignees.length > 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px]",
                                                        style: {
                                                            color: "var(--color-text-tertiary)"
                                                        },
                                                        children: [
                                                            "+",
                                                            folder.assignees.length - 4
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 726,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                lineNumber: 701,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 605,
                                        columnNumber: 17
                                    }, this),
                                    mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: menuId === folder.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "fixed inset-0 z-9998",
                                                    onClick: ()=>setMenuId(null)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0.92,
                                                        y: -4
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: 0
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        scale: 0.92,
                                                        y: -4
                                                    },
                                                    transition: {
                                                        duration: 0.12
                                                    },
                                                    className: "fixed z-9999 w-40 rounded-xl overflow-hidden shadow-xl",
                                                    style: {
                                                        top: menuPos.top,
                                                        right: menuPos.right,
                                                        background: "var(--color-surface)",
                                                        border: "1px solid var(--color-border)"
                                                    },
                                                    children: [
                                                        isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                setRenamingId(folder.id);
                                                                setRenameVal(folder.name);
                                                                setMenuId(null);
                                                            },
                                                            className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors",
                                                            style: {
                                                                color: "var(--color-text-secondary)"
                                                            },
                                                            onMouseEnter: (e)=>e.currentTarget.style.background = "var(--color-accent-light)",
                                                            onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                                    lineNumber: 779,
                                                                    columnNumber: 33
                                                                }, this),
                                                                "Rename"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                                            lineNumber: 761,
                                                            columnNumber: 31
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1.5 px-4 py-2 flex-wrap",
                                                            style: {
                                                                borderTop: "1px solid var(--color-border)"
                                                            },
                                                            children: PALETTE.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        updateFolder(folder.id, {
                                                                            color: c
                                                                        });
                                                                        setMenuId(null);
                                                                    },
                                                                    className: "w-4 h-4 rounded-full shrink-0 transition-transform hover:scale-110",
                                                                    style: {
                                                                        background: c,
                                                                        outline: folder.color === c ? `2px solid ${c}` : "none",
                                                                        outlineOffset: 2
                                                                    }
                                                                }, c, false, {
                                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                                    lineNumber: 790,
                                                                    columnNumber: 33
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                                            lineNumber: 783,
                                                            columnNumber: 29
                                                        }, this),
                                                        canManage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                setAssigningId(folder.id);
                                                                setMenuId(null);
                                                            },
                                                            className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors",
                                                            style: {
                                                                color: "var(--color-text-secondary)",
                                                                borderTop: "1px solid var(--color-border)"
                                                            },
                                                            onMouseEnter: (e)=>e.currentTarget.style.background = "var(--color-accent-light)",
                                                            onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                                    lineNumber: 830,
                                                                    columnNumber: 33
                                                                }, this),
                                                                " Assign"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                                            lineNumber: 810,
                                                            columnNumber: 31
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                setDeleteCandidate({
                                                                    id: folder.id,
                                                                    name: folder.name,
                                                                    total: taskCounts[folder.id]?.total ?? 0
                                                                });
                                                                setMenuId(null);
                                                            },
                                                            className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors",
                                                            style: {
                                                                color: "var(--color-danger)"
                                                            },
                                                            onMouseEnter: (e)=>e.currentTarget.style.background = "rgba(239,68,68,0.08)",
                                                            onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                                    lineNumber: 854,
                                                                    columnNumber: 31
                                                                }, this),
                                                                "Delete"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                                            lineNumber: 833,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 747,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 740,
                                        columnNumber: 21
                                    }, this), document.body)
                                ]
                            }, folder.id, true, {
                                fileName: "[project]/src/components/FolderGrid.tsx",
                                lineNumber: 600,
                                columnNumber: 15
                            }, this);
                        })
                    }, layout, false, {
                        fileName: "[project]/src/components/FolderGrid.tsx",
                        lineNumber: 307,
                        columnNumber: 7
                    }, this),
                    state.folders.filter((f)=>f.id !== "inbox").length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-16 text-center",
                        style: {
                            color: "var(--color-text-tertiary)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"], {
                                size: 40,
                                className: "mx-auto mb-3 opacity-30"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FolderGrid.tsx",
                                lineNumber: 873,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: "No folders yet. Create one to get started!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FolderGrid.tsx",
                                lineNumber: 874,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FolderGrid.tsx",
                        lineNumber: 869,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FolderGrid.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: !!deleteCandidate,
                title: "Delete Folder",
                message: deleteCandidate ? `Delete \"${deleteCandidate.name}\"?${deleteCandidate.total > 0 ? ` This will also remove ${deleteCandidate.total} task${deleteCandidate.total === 1 ? "" : "s"} in this folder.` : ""}` : "",
                confirmLabel: "Delete",
                danger: true,
                onCancel: ()=>setDeleteCandidate(null),
                onConfirm: ()=>{
                    if (!deleteCandidate) return;
                    deleteFolder(deleteCandidate.id);
                    setDeleteCandidate(null);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/FolderGrid.tsx",
                lineNumber: 879,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: assigningId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
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
                            className: "fixed inset-0 z-40",
                            style: {
                                background: "rgba(0,0,0,0.5)"
                            },
                            onClick: ()=>setAssigningId(null)
                        }, void 0, false, {
                            fileName: "[project]/src/components/FolderGrid.tsx",
                            lineNumber: 901,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.95,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.95,
                                y: 10
                            },
                            className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-80 rounded-2xl shadow-2xl overflow-hidden",
                            style: {
                                background: "var(--color-surface)",
                                border: "1px solid var(--color-border)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-4 py-3",
                                    style: {
                                        borderBottom: "1px solid var(--color-border)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-semibold",
                                            style: {
                                                color: "var(--color-text)"
                                            },
                                            children: "Assign Members"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                            lineNumber: 923,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setAssigningId(null),
                                            className: "p-1 rounded-lg transition-opacity hover:opacity-70",
                                            style: {
                                                color: "var(--color-text-tertiary)"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FolderGrid.tsx",
                                                lineNumber: 934,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                            lineNumber: 929,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                    lineNumber: 919,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-64 overflow-y-auto",
                                    children: members.map((m)=>{
                                        const folder = state.folders.find((f)=>f.id === assigningId);
                                        const isAssigned = folder?.assignees?.some((a)=>a.uid === m.uid) ?? false;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>toggleAssignee(assigningId, {
                                                    uid: m.uid,
                                                    displayName: m.displayName,
                                                    photoURL: m.photoURL
                                                }),
                                            className: "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                                            style: {
                                                background: isAssigned ? "var(--color-accent-light)" : "transparent"
                                            },
                                            onMouseEnter: (e)=>{
                                                if (!isAssigned) e.currentTarget.style.background = "var(--color-bg)";
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.background = isAssigned ? "var(--color-accent-light)" : "transparent";
                                            },
                                            children: [
                                                m.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: m.photoURL,
                                                    alt: m.displayName,
                                                    width: 28,
                                                    height: 28,
                                                    className: "w-7 h-7 rounded-full shrink-0 object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 973,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0",
                                                    style: {
                                                        background: "var(--color-accent)",
                                                        color: "white"
                                                    },
                                                    children: getInitials(m.displayName || m.email)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 980,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-medium truncate",
                                                            style: {
                                                                color: "var(--color-text)"
                                                            },
                                                            children: m.displayName || m.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                                            lineNumber: 991,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] truncate",
                                                            style: {
                                                                color: "var(--color-text-tertiary)"
                                                            },
                                                            children: m.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                                            lineNumber: 997,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 990,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-5 h-5 rounded-md flex items-center justify-center shrink-0",
                                                    style: {
                                                        background: isAssigned ? "var(--color-accent)" : "var(--color-bg)",
                                                        border: isAssigned ? "none" : "1.5px solid var(--color-border)"
                                                    },
                                                    children: isAssigned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        size: 12,
                                                        color: "white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                                        lineNumber: 1017,
                                                        columnNumber: 40
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                                    lineNumber: 1004,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, m.uid, true, {
                                            fileName: "[project]/src/components/FolderGrid.tsx",
                                            lineNumber: 945,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                    lineNumber: 937,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-3 flex justify-end",
                                    style: {
                                        borderTop: "1px solid var(--color-border)"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setAssigningId(null),
                                        className: "px-4 py-1.5 rounded-xl text-xs font-medium text-white",
                                        style: {
                                            background: "var(--color-accent)"
                                        },
                                        children: "Done"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FolderGrid.tsx",
                                        lineNumber: 1027,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FolderGrid.tsx",
                                    lineNumber: 1023,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FolderGrid.tsx",
                            lineNumber: 909,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/components/FolderGrid.tsx",
                lineNumber: 898,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FolderGrid.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_s(FolderGrid, "GaiWDscu9dtqJERLoUOlt30HlJQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = FolderGrid;
var _c;
__turbopack_context__.k.register(_c, "FolderGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_FolderGrid_tsx_c14aa2cf._.js.map