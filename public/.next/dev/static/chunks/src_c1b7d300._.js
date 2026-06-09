(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/firebase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "googleProvider",
    ()=>googleProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyBVlImxqS-gl_C9lAB0Y0CN5p7XQ5gjbJM") || "",
    authDomain: ("TURBOPACK compile-time value", "taskflow-12.firebaseapp.com") || "",
    projectId: ("TURBOPACK compile-time value", "taskflow-12") || "",
    storageBucket: ("TURBOPACK compile-time value", "taskflow-12.firebasestorage.app") || "",
    messagingSenderId: ("TURBOPACK compile-time value", "14124446211") || "",
    appId: ("TURBOPACK compile-time value", "1:14124446211:web:33b53204ec733d92ebd436") || ""
};
const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
let app = null;
let db = null;
let auth = null;
let googleProvider = null;
if (("TURBOPACK compile-time value", "object") !== "undefined" && isConfigured) {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])()[0];
    db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
    auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
    googleProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleAuthProvider"]();
    googleProvider.addScope("profile");
    googleProvider.addScope("email");
    googleProvider.setCustomParameters({
        prompt: "select_account"
    });
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/firestore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bulkImport",
    ()=>bulkImport,
    "decrementCompletionCount",
    ()=>decrementCompletionCount,
    "getUserPreferences",
    ()=>getUserPreferences,
    "getUserProfile",
    ()=>getUserProfile,
    "getUserStats",
    ()=>getUserStats,
    "incrementCompletionCount",
    ()=>incrementCompletionCount,
    "initUserDocument",
    ()=>initUserDocument,
    "removeFolder",
    ()=>removeFolder,
    "removeTask",
    ()=>removeTask,
    "removeTasks",
    ()=>removeTasks,
    "reorderTasksDocs",
    ()=>reorderTasksDocs,
    "setFolder",
    ()=>setFolder,
    "setTask",
    ()=>setTask,
    "setUserPreferences",
    ()=>setUserPreferences,
    "setUserProfile",
    ()=>setUserProfile,
    "subscribeFolders",
    ()=>subscribeFolders,
    "subscribePreferences",
    ()=>subscribePreferences,
    "subscribeStats",
    ()=>subscribeStats,
    "subscribeTasks",
    ()=>subscribeTasks,
    "updateFolderFields",
    ()=>updateFolderFields,
    "updateTaskFields",
    ()=>updateTaskFields
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
// ─── Path helpers ─────────────────────────
const userDoc = (db, uid)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid);
const profileDoc = (db, uid)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid, "meta", "profile");
const prefsDoc = (db, uid)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid, "meta", "preferences");
const statsDoc = (db, uid)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid, "meta", "stats");
const tasksCol = (db, uid)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "users", uid, "tasks");
const foldersCol = (db, uid)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "users", uid, "folders");
const taskDoc = (db, uid, taskId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid, "tasks", taskId);
const folderDoc = (db, uid, folderId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid, "folders", folderId);
async function setUserProfile(db, uid, data) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(profileDoc(db, uid), {
        ...data,
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
    }, {
        merge: true
    });
}
async function getUserProfile(db, uid) {
    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(profileDoc(db, uid));
    return snap.exists() ? snap.data() : null;
}
async function setUserPreferences(db, uid, prefs) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(prefsDoc(db, uid), prefs, {
        merge: true
    });
}
async function getUserPreferences(db, uid) {
    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(prefsDoc(db, uid));
    return snap.exists() ? snap.data() : null;
}
function subscribePreferences(db, uid, callback) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(prefsDoc(db, uid), (snap)=>{
        callback(snap.exists() ? snap.data() : null);
    });
}
async function getUserStats(db, uid) {
    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(statsDoc(db, uid));
    return snap.exists() ? snap.data() : null;
}
async function incrementCompletionCount(db, uid, dateKey) {
    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(statsDoc(db, uid));
    const existing = snap.exists() ? snap.data() : {
        completionHistory: {},
        lastActiveDate: ""
    };
    const current = existing.completionHistory[dateKey] || 0;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(statsDoc(db, uid), {
        completionHistory: {
            ...existing.completionHistory,
            [dateKey]: current + 1
        },
        lastActiveDate: dateKey
    }, {
        merge: true
    });
}
async function decrementCompletionCount(db, uid, dateKey) {
    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(statsDoc(db, uid));
    if (!snap.exists()) return;
    const existing = snap.data();
    const current = existing.completionHistory[dateKey] || 0;
    if (current <= 1) {
        const { [dateKey]: _, ...rest } = existing.completionHistory;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(statsDoc(db, uid), {
            ...existing,
            completionHistory: rest
        }, {
            merge: true
        });
    } else {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(statsDoc(db, uid), {
            completionHistory: {
                ...existing.completionHistory,
                [dateKey]: current - 1
            }
        }, {
            merge: true
        });
    }
}
function subscribeStats(db, uid, callback) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(statsDoc(db, uid), (snap)=>{
        callback(snap.exists() ? snap.data() : null);
    });
}
function subscribeTasks(db, uid, callback) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(tasksCol(db, uid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("order"));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
        callback(snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            })));
    });
}
async function setTask(db, uid, task) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(taskDoc(db, uid, task.id), task);
}
async function updateTaskFields(db, uid, taskId, updates) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(taskDoc(db, uid, taskId), updates, {
        merge: true
    });
}
async function removeTask(db, uid, taskId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(taskDoc(db, uid, taskId));
}
async function removeTasks(db, uid, taskIds) {
    const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
    taskIds.forEach((id)=>batch.delete(taskDoc(db, uid, id)));
    await batch.commit();
}
async function reorderTasksDocs(db, uid, tasks) {
    const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
    tasks.forEach(({ id, order })=>{
        batch.update(taskDoc(db, uid, id), {
            order
        });
    });
    await batch.commit();
}
function subscribeFolders(db, uid, callback) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(foldersCol(db, uid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("order"));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
        const folders = snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            }));
        callback(folders);
    });
}
async function setFolder(db, uid, folder) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(folderDoc(db, uid, folder.id), folder);
}
async function updateFolderFields(db, uid, folderId, updates) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(folderDoc(db, uid, folderId), updates, {
        merge: true
    });
}
async function removeFolder(db, uid, folderId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(folderDoc(db, uid, folderId));
}
async function bulkImport(db, uid, tasks, folders) {
    // Firestore batches are limited to 500 ops
    const all = [
        ...tasks.map((t)=>({
                ref: taskDoc(db, uid, t.id),
                data: t
            })),
        ...folders.map((f)=>({
                ref: folderDoc(db, uid, f.id),
                data: f
            }))
    ];
    for(let i = 0; i < all.length; i += 450){
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
        all.slice(i, i + 450).forEach(({ ref, data })=>{
            batch.set(ref, data);
        });
        await batch.commit();
    }
}
async function initUserDocument(db, uid, data) {
    const profileSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(profileDoc(db, uid));
    if (!profileSnap.exists()) {
        const profile = {
            uid,
            displayName: data.displayName,
            email: data.email,
            photoURL: data.photoURL,
            createdAt: new Date().toISOString()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(profileDoc(db, uid), profile);
        // Default preferences
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(prefsDoc(db, uid), {
            theme: "system",
            savedViews: [],
            customQuotes: []
        });
        // Empty stats
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(statsDoc(db, uid), {
            completionHistory: {},
            lastActiveDate: new Date().toISOString().split("T")[0]
        });
        // Default inbox folder
        const inbox = {
            id: "inbox",
            name: "Inbox",
            icon: "inbox",
            color: "#6366f1",
            order: 0,
            createdAt: new Date().toISOString()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(folderDoc(db, uid, "inbox"), inbox);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/AppContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firestore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const initialState = {
    user: null,
    profile: null,
    tasks: [],
    folders: [
        {
            id: "inbox",
            name: "Inbox",
            icon: "inbox",
            color: "#6366f1",
            order: 0,
            createdAt: new Date().toISOString()
        }
    ],
    activeFolderId: "inbox",
    viewMode: "dashboard",
    theme: "system",
    searchQuery: "",
    commandPaletteOpen: false,
    focusTaskId: null,
    authLoading: true,
    taskModal: null,
    history: [],
    future: [],
    completionHistory: {},
    savedViews: [],
    customQuotes: [],
    activeWorkspaceId: null,
    workspaces: [],
    workspaceMembers: [],
    pendingInvitations: []
};
function nextRecurringDate(dateStr, recurrence) {
    const dt = new Date(`${dateStr}T00:00:00`);
    if (Number.isNaN(dt.getTime())) return null;
    if (recurrence === "daily") dt.setDate(dt.getDate() + 1);
    if (recurrence === "weekly") dt.setDate(dt.getDate() + 7);
    if (recurrence === "monthly") dt.setMonth(dt.getMonth() + 1);
    return dt.toISOString().split("T")[0];
}
function withHistory(state) {
    const nextHistory = [
        ...state.history,
        {
            tasks: state.tasks,
            folders: state.folders
        }
    ];
    return {
        history: nextHistory.slice(-100),
        future: []
    };
}
function reducer(state, action) {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                authLoading: false
            };
        case "SET_PROFILE":
            return {
                ...state,
                profile: action.payload
            };
        case "SYNC_TASKS":
            return {
                ...state,
                tasks: action.payload
            };
        case "SYNC_FOLDERS":
            return {
                ...state,
                folders: action.payload
            };
        case "SET_TASKS":
            return {
                ...state,
                tasks: action.payload,
                ...withHistory(state)
            };
        case "ADD_TASK":
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.payload
                ],
                ...withHistory(state)
            };
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((t)=>t.id === action.payload.id ? {
                        ...t,
                        ...action.payload.updates
                    } : t),
                ...withHistory(state)
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((t)=>t.id !== action.payload),
                ...withHistory(state)
            };
        case "SET_FOLDERS":
            return {
                ...state,
                folders: action.payload,
                ...withHistory(state)
            };
        case "ADD_FOLDER":
            return {
                ...state,
                folders: [
                    ...state.folders,
                    action.payload
                ],
                ...withHistory(state)
            };
        case "UPDATE_FOLDER":
            return {
                ...state,
                folders: state.folders.map((f)=>f.id === action.payload.id ? {
                        ...f,
                        ...action.payload.updates
                    } : f),
                ...withHistory(state)
            };
        case "DELETE_FOLDER":
            return {
                ...state,
                folders: state.folders.filter((f)=>f.id !== action.payload),
                ...withHistory(state)
            };
        case "SET_ACTIVE_FOLDER":
            return {
                ...state,
                activeFolderId: action.payload
            };
        case "SET_VIEW_MODE":
            return {
                ...state,
                viewMode: action.payload
            };
        case "SET_THEME":
            return {
                ...state,
                theme: action.payload
            };
        case "SET_SEARCH":
            return {
                ...state,
                searchQuery: action.payload
            };
        case "TOGGLE_COMMAND_PALETTE":
            return {
                ...state,
                commandPaletteOpen: !state.commandPaletteOpen
            };
        case "SET_FOCUS_TASK":
            return {
                ...state,
                focusTaskId: action.payload
            };
        case "SET_AUTH_LOADING":
            return {
                ...state,
                authLoading: action.payload
            };
        case "REORDER_TASKS":
            return {
                ...state,
                tasks: action.payload,
                ...withHistory(state)
            };
        case "SET_TASK_MODAL":
            return {
                ...state,
                taskModal: action.payload
            };
        case "UNDO":
            {
                if (state.history.length === 0) return state;
                const prev = state.history[state.history.length - 1];
                return {
                    ...state,
                    tasks: prev.tasks,
                    folders: prev.folders,
                    history: state.history.slice(0, -1),
                    future: [
                        ...state.future,
                        {
                            tasks: state.tasks,
                            folders: state.folders
                        }
                    ]
                };
            }
        case "REDO":
            {
                if (state.future.length === 0) return state;
                const next = state.future[state.future.length - 1];
                return {
                    ...state,
                    tasks: next.tasks,
                    folders: next.folders,
                    history: [
                        ...state.history,
                        {
                            tasks: state.tasks,
                            folders: state.folders
                        }
                    ].slice(-100),
                    future: state.future.slice(0, -1)
                };
            }
        case "SYNC_COMPLETION_HISTORY":
            return {
                ...state,
                completionHistory: action.payload
            };
        case "SYNC_SAVED_VIEWS":
            return {
                ...state,
                savedViews: action.payload
            };
        case "SYNC_CUSTOM_QUOTES":
            return {
                ...state,
                customQuotes: action.payload
            };
        case "SET_ACTIVE_WORKSPACE":
            return {
                ...state,
                activeWorkspaceId: action.payload,
                activeFolderId: "inbox",
                workspaceMembers: [],
                viewMode: "dashboard"
            };
        case "SYNC_WORKSPACES":
            return {
                ...state,
                workspaces: action.payload
            };
        case "SYNC_WORKSPACE_MEMBERS":
            return {
                ...state,
                workspaceMembers: action.payload
            };
        case "SYNC_PENDING_INVITATIONS":
            return {
                ...state,
                pendingInvitations: action.payload
            };
        default:
            return state;
    }
}
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useApp() {
    _s();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider");
    return ctx;
}
_s(useApp, "/dMy7t63NXD4eYACoT93CePwGrg=");
function AppProvider({ children }) {
    _s1();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(reducer, initialState);
    const metaUnsubsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const dataUnsubsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Theme effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            const root = document.documentElement;
            const applyTheme = {
                "AppProvider.useEffect.applyTheme": (mode)=>{
                    if (mode === "system") {
                        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                        root.classList.toggle("dark", prefersDark);
                    } else {
                        root.classList.toggle("dark", mode === "dark");
                    }
                }
            }["AppProvider.useEffect.applyTheme"];
            applyTheme(state.theme);
            if (state.theme === "system") {
                const mq = window.matchMedia("(prefers-color-scheme: dark)");
                const handler = {
                    "AppProvider.useEffect.handler": ()=>applyTheme("system")
                }["AppProvider.useEffect.handler"];
                mq.addEventListener("change", handler);
                return ({
                    "AppProvider.useEffect": ()=>mq.removeEventListener("change", handler)
                })["AppProvider.useEffect"];
            }
        }
    }["AppProvider.useEffect"], [
        state.theme
    ]);
    // Load theme from localStorage (for unauthenticated / initial load)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            const saved = localStorage.getItem("zenflow-theme");
            if (saved) dispatch({
                type: "SET_THEME",
                payload: saved
            });
        }
    }["AppProvider.useEffect"], []);
    // Persist theme to localStorage always
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            localStorage.setItem("zenflow-theme", state.theme);
        }
    }["AppProvider.useEffect"], [
        state.theme
    ]);
    // Auth listener
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]) {
                dispatch({
                    type: "SET_AUTH_LOADING",
                    payload: false
                });
                return;
            }
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], {
                "AppProvider.useEffect.unsub": (user)=>{
                    dispatch({
                        type: "SET_USER",
                        payload: user
                    });
                }
            }["AppProvider.useEffect.unsub"]);
            return ({
                "AppProvider.useEffect": ()=>unsub()
            })["AppProvider.useEffect"];
        }
    }["AppProvider.useEffect"], []);
    // ── Firestore sync ──────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            // Clean up previous subscriptions
            unsubsRef.current.forEach({
                "AppProvider.useEffect": (fn)=>fn()
            }["AppProvider.useEffect"]);
            unsubsRef.current = [];
            if (!state.user || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                // Load from localStorage for offline/unauthenticated use
                const savedTasks = localStorage.getItem("zenflow-tasks");
                const savedFolders = localStorage.getItem("zenflow-folders");
                if (savedTasks) {
                    try {
                        dispatch({
                            type: "SYNC_TASKS",
                            payload: JSON.parse(savedTasks)
                        });
                    } catch  {}
                }
                if (savedFolders) {
                    try {
                        dispatch({
                            type: "SYNC_FOLDERS",
                            payload: JSON.parse(savedFolders)
                        });
                    } catch  {}
                } else {
                    dispatch({
                        type: "SYNC_FOLDERS",
                        payload: initialState.folders
                    });
                }
                // Load saved views & quotes from localStorage
                try {
                    const sv = localStorage.getItem("zenflow-saved-views");
                    if (sv) dispatch({
                        type: "SYNC_SAVED_VIEWS",
                        payload: JSON.parse(sv)
                    });
                } catch  {}
                try {
                    const cq = localStorage.getItem("zenflow-quotes");
                    if (cq) dispatch({
                        type: "SYNC_CUSTOM_QUOTES",
                        payload: JSON.parse(cq)
                    });
                } catch  {}
                return;
            }
            const uid = state.user.uid;
            // Initialize user document on first sign-in
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initUserDocument"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
                displayName: state.user.displayName || "",
                email: state.user.email || "",
                photoURL: state.user.photoURL || ""
            });
            // Subscribe to tasks
            unsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeTasks"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
                "AppProvider.useEffect": (tasks)=>{
                    dispatch({
                        type: "SYNC_TASKS",
                        payload: tasks
                    });
                }
            }["AppProvider.useEffect"]));
            // Subscribe to folders
            unsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeFolders"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
                "AppProvider.useEffect": (folders)=>{
                    if (folders.length === 0) {
                        const inbox = initialState.folders[0];
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setFolder"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, inbox);
                        dispatch({
                            type: "SYNC_FOLDERS",
                            payload: [
                                inbox
                            ]
                        });
                    } else {
                        dispatch({
                            type: "SYNC_FOLDERS",
                            payload: folders
                        });
                    }
                }
            }["AppProvider.useEffect"]));
            // Subscribe to preferences (theme, saved views, custom quotes)
            unsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribePreferences"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
                "AppProvider.useEffect": (prefs)=>{
                    if (prefs) {
                        dispatch({
                            type: "SET_THEME",
                            payload: prefs.theme || "system"
                        });
                        dispatch({
                            type: "SYNC_SAVED_VIEWS",
                            payload: prefs.savedViews || []
                        });
                        dispatch({
                            type: "SYNC_CUSTOM_QUOTES",
                            payload: prefs.customQuotes || []
                        });
                    }
                }
            }["AppProvider.useEffect"]));
            // Subscribe to stats (completion history)
            unsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeStats"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
                "AppProvider.useEffect": (stats)=>{
                    if (stats) {
                        dispatch({
                            type: "SYNC_COMPLETION_HISTORY",
                            payload: stats.completionHistory || {}
                        });
                    }
                }
            }["AppProvider.useEffect"]));
            return ({
                "AppProvider.useEffect": ()=>{
                    unsubsRef.current.forEach({
                        "AppProvider.useEffect": (fn)=>fn()
                    }["AppProvider.useEffect"]);
                    unsubsRef.current = [];
                }
            })["AppProvider.useEffect"];
        }
    }["AppProvider.useEffect"], [
        state.user
    ]);
    // Persist to localStorage when tasks/folders change (for offline mode)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if (!state.user) {
                localStorage.setItem("zenflow-tasks", JSON.stringify(state.tasks));
            }
        }
    }["AppProvider.useEffect"], [
        state.tasks,
        state.user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if (!state.user) {
                localStorage.setItem("zenflow-folders", JSON.stringify(state.folders));
            }
        }
    }["AppProvider.useEffect"], [
        state.folders,
        state.user
    ]);
    // Keyboard shortcut for command palette
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            const handler = {
                "AppProvider.useEffect.handler": (e)=>{
                    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                        e.preventDefault();
                        dispatch({
                            type: "TOGGLE_COMMAND_PALETTE"
                        });
                    }
                }
            }["AppProvider.useEffect.handler"];
            window.addEventListener("keydown", handler);
            return ({
                "AppProvider.useEffect": ()=>window.removeEventListener("keydown", handler)
            })["AppProvider.useEffect"];
        }
    }["AppProvider.useEffect"], []);
    const genId = ()=>crypto.randomUUID();
    const addTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addTask]": (task)=>{
            const now = new Date().toISOString();
            const newTask = {
                ...task,
                id: genId(),
                recurrence: task.recurrence || "none",
                reminderMinutes: task.reminderMinutes ?? null,
                subtaskIds: [],
                order: state.tasks.length,
                createdAt: now,
                updatedAt: now
            };
            dispatch({
                type: "ADD_TASK",
                payload: newTask
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTask"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, newTask);
            }
            return newTask.id;
        }
    }["AppProvider.useCallback[addTask]"], [
        state.user,
        state.tasks.length
    ]);
    const updateTaskAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[updateTaskAction]": (id, updates)=>{
            const merged = {
                ...updates,
                updatedAt: new Date().toISOString()
            };
            dispatch({
                type: "UPDATE_TASK",
                payload: {
                    id,
                    updates: merged
                }
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTaskFields"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, id, merged);
            }
        }
    }["AppProvider.useCallback[updateTaskAction]"], [
        state.user
    ]);
    const deleteTaskAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[deleteTaskAction]": (id)=>{
            const toDelete = [
                id
            ];
            const findChildren = {
                "AppProvider.useCallback[deleteTaskAction].findChildren": (parentId)=>{
                    state.tasks.filter({
                        "AppProvider.useCallback[deleteTaskAction].findChildren": (t)=>t.parentId === parentId
                    }["AppProvider.useCallback[deleteTaskAction].findChildren"]).forEach({
                        "AppProvider.useCallback[deleteTaskAction].findChildren": (t)=>{
                            toDelete.push(t.id);
                            findChildren(t.id);
                        }
                    }["AppProvider.useCallback[deleteTaskAction].findChildren"]);
                }
            }["AppProvider.useCallback[deleteTaskAction].findChildren"];
            findChildren(id);
            toDelete.forEach({
                "AppProvider.useCallback[deleteTaskAction]": (tid)=>dispatch({
                        type: "DELETE_TASK",
                        payload: tid
                    })
            }["AppProvider.useCallback[deleteTaskAction]"]);
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTasks"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, toDelete);
            }
        }
    }["AppProvider.useCallback[deleteTaskAction]"], [
        state.user,
        state.tasks
    ]);
    const toggleTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[toggleTask]": (id)=>{
            const task = state.tasks.find({
                "AppProvider.useCallback[toggleTask].task": (t)=>t.id === id
            }["AppProvider.useCallback[toggleTask].task"]);
            if (!task) return;
            const completed = !task.completed;
            const now = new Date().toISOString();
            const dateKey = now.split("T")[0];
            const updates = {
                completed,
                status: completed ? "done" : "todo",
                completedAt: completed ? now : null
            };
            updateTaskAction(id, updates);
            // Update completion stats
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                if (completed) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementCompletionCount"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, dateKey);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decrementCompletionCount"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, dateKey);
                }
            }
            // Auto-create next occurrence for recurring tasks when completed.
            if (completed && task.recurrence && task.recurrence !== "none" && task.dueDate) {
                const nextDueDate = nextRecurringDate(task.dueDate, task.recurrence);
                if (nextDueDate) {
                    addTask({
                        title: task.title,
                        description: task.description,
                        completed: false,
                        recurrence: task.recurrence,
                        reminderMinutes: task.reminderMinutes ?? null,
                        priority: task.priority,
                        dueDate: nextDueDate,
                        dueTime: task.dueTime ?? null,
                        tags: [
                            ...task.tags
                        ],
                        folderId: task.folderId,
                        parentId: task.parentId ?? null,
                        status: "todo"
                    });
                }
            }
        }
    }["AppProvider.useCallback[toggleTask]"], [
        state.tasks,
        state.user,
        updateTaskAction,
        addTask
    ]);
    // Browser reminders for due tasks.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === "undefined" || typeof Notification === "undefined") return;
            if (Notification.permission !== "granted") return;
            const interval = window.setInterval({
                "AppProvider.useEffect.interval": ()=>{
                    const now = Date.now();
                    state.tasks.forEach({
                        "AppProvider.useEffect.interval": (task)=>{
                            if (task.completed || !task.dueDate || task.reminderMinutes == null) return;
                            const dueStr = `${task.dueDate}T${task.dueTime || "09:00"}:00`;
                            const dueTs = new Date(dueStr).getTime();
                            if (Number.isNaN(dueTs)) return;
                            const reminderTs = dueTs - task.reminderMinutes * 60_000;
                            const key = `zenflow-reminder-${task.id}-${task.dueDate}-${task.dueTime || ""}-${task.reminderMinutes}`;
                            if (now >= reminderTs && now <= dueTs + 60_000 && !localStorage.getItem(key)) {
                                new Notification("Task reminder", {
                                    body: `${task.title}${task.dueTime ? ` at ${task.dueTime}` : ""}`
                                });
                                localStorage.setItem(key, "1");
                            }
                        }
                    }["AppProvider.useEffect.interval"]);
                }
            }["AppProvider.useEffect.interval"], 30_000);
            return ({
                "AppProvider.useEffect": ()=>window.clearInterval(interval)
            })["AppProvider.useEffect"];
        }
    }["AppProvider.useEffect"], [
        state.tasks
    ]);
    const addFolderAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addFolderAction]": (name, icon, color)=>{
            const folder = {
                id: genId(),
                name,
                icon: icon || "folder",
                color: color || "#6366f1",
                order: state.folders.length,
                createdAt: new Date().toISOString()
            };
            dispatch({
                type: "ADD_FOLDER",
                payload: folder
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setFolder"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, folder);
            }
        }
    }["AppProvider.useCallback[addFolderAction]"], [
        state.user,
        state.folders.length
    ]);
    const updateFolderAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[updateFolderAction]": (id, updates)=>{
            dispatch({
                type: "UPDATE_FOLDER",
                payload: {
                    id,
                    updates
                }
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateFolderFields"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, id, updates);
            }
        }
    }["AppProvider.useCallback[updateFolderAction]"], [
        state.user
    ]);
    const deleteFolderAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[deleteFolderAction]": (id)=>{
            if (id === "inbox") return;
            dispatch({
                type: "DELETE_FOLDER",
                payload: id
            });
            // Move tasks to inbox
            state.tasks.filter({
                "AppProvider.useCallback[deleteFolderAction]": (t)=>t.folderId === id
            }["AppProvider.useCallback[deleteFolderAction]"]).forEach({
                "AppProvider.useCallback[deleteFolderAction]": (t)=>{
                    updateTaskAction(t.id, {
                        folderId: "inbox"
                    });
                }
            }["AppProvider.useCallback[deleteFolderAction]"]);
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeFolder"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, id);
            }
        }
    }["AppProvider.useCallback[deleteFolderAction]"], [
        state.user,
        state.tasks,
        updateTaskAction
    ]);
    const reorderTasksAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[reorderTasksAction]": (tasks)=>{
            dispatch({
                type: "REORDER_TASKS",
                payload: tasks
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reorderTasksDocs"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, tasks.map({
                    "AppProvider.useCallback[reorderTasksAction]": (t, i)=>({
                            id: t.id,
                            order: i
                        })
                }["AppProvider.useCallback[reorderTasksAction]"]));
            }
        }
    }["AppProvider.useCallback[reorderTasksAction]"], [
        state.user
    ]);
    const openTaskModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[openTaskModal]": (modal)=>{
            dispatch({
                type: "SET_TASK_MODAL",
                payload: modal
            });
        }
    }["AppProvider.useCallback[openTaskModal]"], []);
    const closeTaskModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[closeTaskModal]": ()=>{
            dispatch({
                type: "SET_TASK_MODAL",
                payload: null
            });
        }
    }["AppProvider.useCallback[closeTaskModal]"], []);
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[undo]": ()=>{
            dispatch({
                type: "UNDO"
            });
        }
    }["AppProvider.useCallback[undo]"], []);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[redo]": ()=>{
            dispatch({
                type: "REDO"
            });
        }
    }["AppProvider.useCallback[redo]"], []);
    // Persist theme to Firestore when changed by user
    const prevThemeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(state.theme);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if (prevThemeRef.current !== state.theme) {
                prevThemeRef.current = state.theme;
                if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setUserPreferences"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, {
                        theme: state.theme
                    });
                }
            }
        }
    }["AppProvider.useEffect"], [
        state.theme,
        state.user
    ]);
    const saveSavedViews = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[saveSavedViews]": (views)=>{
            dispatch({
                type: "SYNC_SAVED_VIEWS",
                payload: views
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setUserPreferences"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, {
                    savedViews: views
                });
            } else {
                localStorage.setItem("zenflow-saved-views", JSON.stringify(views));
            }
        }
    }["AppProvider.useCallback[saveSavedViews]"], [
        state.user
    ]);
    const saveCustomQuotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[saveCustomQuotes]": (quotes)=>{
            dispatch({
                type: "SYNC_CUSTOM_QUOTES",
                payload: quotes
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setUserPreferences"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, {
                    customQuotes: quotes
                });
            } else {
                localStorage.setItem("zenflow-quotes", JSON.stringify(quotes));
            }
        }
    }["AppProvider.useCallback[saveCustomQuotes]"], [
        state.user
    ]);
    const importBackupAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[importBackupAction]": (tasks, folders)=>{
            dispatch({
                type: "SET_TASKS",
                payload: tasks
            });
            dispatch({
                type: "SET_FOLDERS",
                payload: folders
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bulkImport"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, tasks, folders);
            }
        }
    }["AppProvider.useCallback[importBackupAction]"], [
        state.user
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            state,
            dispatch,
            addTask,
            updateTask: updateTaskAction,
            deleteTask: deleteTaskAction,
            toggleTask,
            addFolder: addFolderAction,
            updateFolder: updateFolderAction,
            deleteFolder: deleteFolderAction,
            reorderTasks: reorderTasksAction,
            openTaskModal,
            closeTaskModal,
            undo,
            redo,
            saveSavedViews,
            saveCustomQuotes,
            importBackup: importBackupAction
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/store/AppContext.tsx",
        lineNumber: 822,
        columnNumber: 5
    }, this);
}
_s1(AppProvider, "eLQ8l3ZGohsLimQB+svSbszwJxs=");
_c = AppProvider;
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_c1b7d300._.js.map