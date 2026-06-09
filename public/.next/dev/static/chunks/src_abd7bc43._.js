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
    "isRegisteredEmail",
    ()=>isRegisteredEmail,
    "removeFolder",
    ()=>removeFolder,
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
    }, (err)=>{
        console.warn("subscribePreferences:", err.message);
        callback(null);
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
        const rest = {
            ...existing.completionHistory
        };
        delete rest[dateKey];
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
    }, (err)=>{
        console.warn("subscribeStats:", err.message);
        callback(null);
    });
}
function subscribeTasks(db, uid, callback) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(tasksCol(db, uid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("order"));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
        callback(snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            })));
    }, (err)=>{
        console.warn("subscribeTasks:", err.message);
        callback([]);
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
    }, (err)=>{
        console.warn("subscribeFolders:", err.message);
        callback([]);
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
    // Always register email for invite lookups
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "registeredEmails", data.email.toLowerCase()), {
        uid,
        email: data.email.toLowerCase()
    }, {
        merge: true
    });
}
async function isRegisteredEmail(db, email) {
    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "registeredEmails", email.toLowerCase()));
    return snap.exists();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/workspace-firestore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "acceptInvitation",
    ()=>acceptInvitation,
    "addWorkspaceMember",
    ()=>addWorkspaceMember,
    "createInvitation",
    ()=>createInvitation,
    "createWorkspace",
    ()=>createWorkspace,
    "declineInvitation",
    ()=>declineInvitation,
    "deleteWorkspace",
    ()=>deleteWorkspace,
    "ensureDmChannel",
    ()=>ensureDmChannel,
    "getDmChannelId",
    ()=>getDmChannelId,
    "logActivity",
    ()=>logActivity,
    "removeWorkspaceMember",
    ()=>removeWorkspaceMember,
    "removeWsFolder",
    ()=>removeWsFolder,
    "removeWsTasks",
    ()=>removeWsTasks,
    "reorderWsTasksDocs",
    ()=>reorderWsTasksDocs,
    "sendDmMessage",
    ()=>sendDmMessage,
    "sendWsMessage",
    ()=>sendWsMessage,
    "setWsFolder",
    ()=>setWsFolder,
    "setWsTask",
    ()=>setWsTask,
    "subscribeDmMessages",
    ()=>subscribeDmMessages,
    "subscribePendingInvitations",
    ()=>subscribePendingInvitations,
    "subscribeUserWorkspaces",
    ()=>subscribeUserWorkspaces,
    "subscribeWsActivity",
    ()=>subscribeWsActivity,
    "subscribeWsFolders",
    ()=>subscribeWsFolders,
    "subscribeWsMembers",
    ()=>subscribeWsMembers,
    "subscribeWsMessages",
    ()=>subscribeWsMessages,
    "subscribeWsTasks",
    ()=>subscribeWsTasks,
    "updateMemberRole",
    ()=>updateMemberRole,
    "updateWorkspace",
    ()=>updateWorkspace,
    "updateWsFolderFields",
    ()=>updateWsFolderFields,
    "updateWsTaskFields",
    ()=>updateWsTaskFields
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
// ─── Path helpers ─────────────────────────
const wsDoc = (db, wsId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "workspaces", wsId);
const wsMembersCol = (db, wsId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "workspaces", wsId, "members");
const wsMemberDoc = (db, wsId, uid)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "workspaces", wsId, "members", uid);
const wsTasksCol = (db, wsId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "workspaces", wsId, "tasks");
const wsTaskDoc = (db, wsId, taskId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "workspaces", wsId, "tasks", taskId);
const wsFoldersCol = (db, wsId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "workspaces", wsId, "folders");
const wsFolderDoc = (db, wsId, folderId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "workspaces", wsId, "folders", folderId);
const wsActivityCol = (db, wsId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "workspaces", wsId, "activity");
const wsMessagesCol = (db, wsId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "workspaces", wsId, "messages");
const wsDmsCol = (db, wsId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "workspaces", wsId, "dms");
const userWsCol = (db, uid)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "users", uid, "workspaces");
const userWsDoc = (db, uid, wsId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "users", uid, "workspaces", wsId);
const invitationsCol = (db)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "invitations");
const invitationDoc = (db, invId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "invitations", invId);
async function deleteRefsInBatches(db, refs, batchSize = 400) {
    for(let index = 0; index < refs.length; index += batchSize){
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
        refs.slice(index, index + batchSize).forEach((ref)=>batch.delete(ref));
        await batch.commit();
    }
}
async function createWorkspace(db, workspace, creator) {
    const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
    // 1. Create workspace document
    batch.set(wsDoc(db, workspace.id), workspace);
    // 2. Add creator as owner member
    const member = {
        uid: creator.uid,
        displayName: creator.displayName,
        email: creator.email,
        photoURL: creator.photoURL,
        role: "owner",
        joinedAt: workspace.createdAt,
        invitedBy: creator.uid
    };
    batch.set(wsMemberDoc(db, workspace.id, creator.uid), member);
    // 3. Add workspace ref to user's index
    const ref = {
        workspaceId: workspace.id,
        name: workspace.name,
        emoji: workspace.emoji,
        color: workspace.color,
        role: "owner",
        memberCount: 1,
        joinedAt: workspace.createdAt
    };
    batch.set(userWsDoc(db, creator.uid, workspace.id), ref);
    // 4. Create inbox folder
    const inbox = {
        id: "inbox",
        name: "Inbox",
        icon: "inbox",
        color: "#6366f1",
        order: 0,
        createdAt: workspace.createdAt
    };
    batch.set(wsFolderDoc(db, workspace.id, "inbox"), inbox);
    await batch.commit();
}
async function deleteWorkspace(db, wsId) {
    const refsToDelete = [];
    // Get all members to remove their workspace refs
    const membersSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(wsMembersCol(db, wsId));
    membersSnap.docs.forEach((d)=>{
        refsToDelete.push(userWsDoc(db, d.data().uid, wsId));
        refsToDelete.push(d.ref);
    });
    // Delete workspace tasks
    const tasksSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(wsTasksCol(db, wsId));
    tasksSnap.docs.forEach((d)=>refsToDelete.push(d.ref));
    // Delete workspace folders
    const foldersSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(wsFoldersCol(db, wsId));
    foldersSnap.docs.forEach((d)=>refsToDelete.push(d.ref));
    // Delete activity
    const activitySnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(wsActivityCol(db, wsId));
    activitySnap.docs.forEach((d)=>refsToDelete.push(d.ref));
    // Delete chat messages
    const messagesSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(wsMessagesCol(db, wsId));
    messagesSnap.docs.forEach((d)=>refsToDelete.push(d.ref));
    // Delete DM messages and DM channel docs
    const dmsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(wsDmsCol(db, wsId));
    for (const channelDoc of dmsSnap.docs){
        const dmMessagesSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(channelDoc.ref, "messages"));
        dmMessagesSnap.docs.forEach((d)=>refsToDelete.push(d.ref));
        refsToDelete.push(channelDoc.ref);
    }
    // Delete pending and historical invitations for the workspace
    const invitationsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(invitationsCol(db), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("workspaceId", "==", wsId)));
    invitationsSnap.docs.forEach((d)=>refsToDelete.push(d.ref));
    // Delete workspace doc last
    refsToDelete.push(wsDoc(db, wsId));
    await deleteRefsInBatches(db, refsToDelete);
}
async function updateWorkspace(db, wsId, updates) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(wsDoc(db, wsId), updates, {
        merge: true
    });
    // Update cached info in all members' workspace refs
    if (updates.name || updates.emoji || updates.color) {
        const membersSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(wsMembersCol(db, wsId));
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
        const refUpdates = {};
        if (updates.name) refUpdates.name = updates.name;
        if (updates.emoji) refUpdates.emoji = updates.emoji;
        if (updates.color) refUpdates.color = updates.color;
        membersSnap.docs.forEach((d)=>{
            batch.set(userWsDoc(db, d.data().uid, wsId), refUpdates, {
                merge: true
            });
        });
        await batch.commit();
    }
}
function subscribeUserWorkspaces(db, uid, callback) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(userWsCol(db, uid), (snap)=>{
        const refs = snap.docs.map((d)=>d.data());
        callback(refs);
    }, (err)=>{
        console.warn("subscribeUserWorkspaces:", err.message);
        callback([]);
    });
}
function subscribeWsMembers(db, wsId, callback) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(wsMembersCol(db, wsId), (snap)=>{
        const members = snap.docs.map((d)=>d.data());
        members.sort((a, b)=>{
            const order = {
                owner: 0,
                admin: 1,
                member: 2,
                viewer: 3
            };
            return order[a.role] - order[b.role];
        });
        callback(members);
    }, (err)=>{
        console.warn("subscribeWsMembers:", err.message);
        callback([]);
    });
}
function subscribeWsTasks(db, wsId, callback) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(wsTasksCol(db, wsId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("order", "asc"));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
        const tasks = snap.docs.map((d)=>d.data());
        callback(tasks);
    }, (err)=>{
        console.warn("subscribeWsTasks:", err.message);
        callback([]);
    });
}
function subscribeWsFolders(db, wsId, callback) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(wsFoldersCol(db, wsId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("order", "asc"));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
        const folders = snap.docs.map((d)=>d.data());
        callback(folders);
    }, (err)=>{
        console.warn("subscribeWsFolders:", err.message);
        callback([]);
    });
}
function subscribeWsActivity(db, wsId, callback, maxEntries = 50) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(wsActivityCol(db, wsId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("timestamp", "desc"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(maxEntries));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
        callback(snap.docs.map((d)=>d.data()));
    }, (err)=>{
        console.warn("subscribeWsActivity:", err.message);
        callback([]);
    });
}
function subscribePendingInvitations(db, email, callback) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(invitationsCol(db), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("invitedEmail", "==", email.toLowerCase()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("status", "==", "pending"));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
        callback(snap.docs.map((d)=>({
                ...d.data(),
                id: d.id
            })));
    }, (err)=>{
        console.warn("subscribePendingInvitations:", err.message);
        callback([]);
    });
}
async function addWorkspaceMember(db, wsId, member) {
    const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
    // Add member to workspace
    batch.set(wsMemberDoc(db, wsId, member.uid), member);
    // Get workspace data for ref
    const wsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(wsDoc(db, wsId));
    const ws = wsSnap.data();
    // Add workspace ref to user's index
    const ref = {
        workspaceId: wsId,
        name: ws.name,
        emoji: ws.emoji,
        color: ws.color,
        role: member.role,
        memberCount: ws.memberCount + 1,
        joinedAt: member.joinedAt
    };
    batch.set(userWsDoc(db, member.uid, wsId), ref);
    // Increment member count on workspace
    batch.set(wsDoc(db, wsId), {
        memberCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["increment"])(1)
    }, {
        merge: true
    });
    await batch.commit();
}
async function removeWorkspaceMember(db, wsId, uid) {
    const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
    batch.delete(wsMemberDoc(db, wsId, uid));
    batch.delete(userWsDoc(db, uid, wsId));
    batch.set(wsDoc(db, wsId), {
        memberCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["increment"])(-1)
    }, {
        merge: true
    });
    await batch.commit();
}
async function updateMemberRole(db, wsId, uid, role) {
    const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
    batch.set(wsMemberDoc(db, wsId, uid), {
        role
    }, {
        merge: true
    });
    batch.set(userWsDoc(db, uid, wsId), {
        role
    }, {
        merge: true
    });
    await batch.commit();
}
async function createInvitation(db, invitation) {
    const id = crypto.randomUUID();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(invitationDoc(db, id), {
        ...invitation,
        id
    });
    return id;
}
async function acceptInvitation(db, invitation, user) {
    const now = new Date().toISOString();
    const member = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: invitation.role,
        joinedAt: now,
        invitedBy: invitation.invitedBy
    };
    // Add member
    await addWorkspaceMember(db, invitation.workspaceId, member);
    // Update invitation status
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(invitationDoc(db, invitation.id), {
        status: "accepted"
    }, {
        merge: true
    });
    // Log activity
    await logActivity(db, invitation.workspaceId, {
        id: crypto.randomUUID(),
        type: "member_joined",
        userId: user.uid,
        userName: user.displayName,
        userPhotoURL: user.photoURL,
        targetId: user.uid,
        targetTitle: user.displayName,
        detail: `joined as ${invitation.role}`,
        timestamp: now
    });
}
async function declineInvitation(db, invitationId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(invitationDoc(db, invitationId), {
        status: "declined"
    }, {
        merge: true
    });
}
async function setWsTask(db, wsId, task) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(wsTaskDoc(db, wsId, task.id), task);
}
async function updateWsTaskFields(db, wsId, taskId, fields) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(wsTaskDoc(db, wsId, taskId), fields, {
        merge: true
    });
}
async function removeWsTasks(db, wsId, taskIds) {
    const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
    taskIds.forEach((id)=>batch.delete(wsTaskDoc(db, wsId, id)));
    await batch.commit();
}
async function reorderWsTasksDocs(db, wsId, items) {
    const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
    items.forEach(({ id, order })=>batch.set(wsTaskDoc(db, wsId, id), {
            order
        }, {
            merge: true
        }));
    await batch.commit();
}
async function setWsFolder(db, wsId, folder) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(wsFolderDoc(db, wsId, folder.id), folder);
}
async function updateWsFolderFields(db, wsId, folderId, fields) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(wsFolderDoc(db, wsId, folderId), fields, {
        merge: true
    });
}
async function removeWsFolder(db, wsId, folderId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(wsFolderDoc(db, wsId, folderId));
}
async function logActivity(db, wsId, entry) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(wsActivityCol(db, wsId), entry.id), entry);
}
function subscribeWsMessages(db, wsId, callback, maxMessages = 200) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(wsMessagesCol(db, wsId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "asc"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(maxMessages));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
        callback(snap.docs.map((d)=>d.data()));
    }, (err)=>{
        console.warn("subscribeWsMessages:", err.message);
        callback([]);
    });
}
async function sendWsMessage(db, wsId, message) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(wsMessagesCol(db, wsId), message.id), message);
}
function getDmChannelId(uid1, uid2) {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
}
const wsDmDoc = (db, wsId, channelId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "workspaces", wsId, "dms", channelId);
const wsDmMessagesCol = (db, wsId, channelId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "workspaces", wsId, "dms", channelId, "messages");
async function ensureDmChannel(db, wsId, uid1, uid2) {
    const channelId = getDmChannelId(uid1, uid2);
    const ref = wsDmDoc(db, wsId, channelId);
    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(ref);
    if (!snap.exists()) {
        const sorted = uid1 < uid2 ? [
            uid1,
            uid2
        ] : [
            uid2,
            uid1
        ];
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(ref, {
            participants: sorted,
            createdAt: new Date().toISOString()
        });
    }
    return channelId;
}
function subscribeDmMessages(db, wsId, channelId, callback, maxMessages = 200) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(wsDmMessagesCol(db, wsId, channelId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "asc"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(maxMessages));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
        callback(snap.docs.map((d)=>d.data()));
    }, (err)=>{
        console.warn("subscribeDmMessages:", err.message);
        callback([]);
    });
}
async function sendDmMessage(db, wsId, channelId, message) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(wsDmMessagesCol(db, wsId, channelId), message.id), message);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/workspace-firestore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
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
    pendingInvitations: [],
    workspaceMessages: [],
    activeDmUserId: null,
    dmMessages: []
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
                workspaceMessages: [],
                activeDmUserId: null,
                dmMessages: [],
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
        case "SYNC_CHAT_MESSAGES":
            return {
                ...state,
                workspaceMessages: action.payload
            };
        case "SET_ACTIVE_DM":
            return {
                ...state,
                activeDmUserId: action.payload,
                dmMessages: []
            };
        case "SYNC_DM_MESSAGES":
            return {
                ...state,
                dmMessages: action.payload
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
    // ── User-level metadata subscriptions (preferences, stats, workspaces, invitations) ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            metaUnsubsRef.current.forEach({
                "AppProvider.useEffect": (fn)=>fn()
            }["AppProvider.useEffect"]);
            metaUnsubsRef.current = [];
            if (!state.user || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                // Load from localStorage for offline/unauthenticated use
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
            // Subscribe to preferences (theme, saved views, custom quotes)
            metaUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribePreferences"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
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
            metaUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeStats"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
                "AppProvider.useEffect": (stats)=>{
                    if (stats) {
                        dispatch({
                            type: "SYNC_COMPLETION_HISTORY",
                            payload: stats.completionHistory || {}
                        });
                    }
                }
            }["AppProvider.useEffect"]));
            // Subscribe to workspace list
            metaUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeUserWorkspaces"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
                "AppProvider.useEffect": (refs)=>{
                    dispatch({
                        type: "SYNC_WORKSPACES",
                        payload: refs
                    });
                }
            }["AppProvider.useEffect"]));
            // Subscribe to pending invitations
            if (state.user.email) {
                metaUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribePendingInvitations"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.email, {
                    "AppProvider.useEffect": (invs)=>{
                        dispatch({
                            type: "SYNC_PENDING_INVITATIONS",
                            payload: invs
                        });
                    }
                }["AppProvider.useEffect"]));
            }
            return ({
                "AppProvider.useEffect": ()=>{
                    metaUnsubsRef.current.forEach({
                        "AppProvider.useEffect": (fn)=>fn()
                    }["AppProvider.useEffect"]);
                    metaUnsubsRef.current = [];
                }
            })["AppProvider.useEffect"];
        }
    }["AppProvider.useEffect"], [
        state.user
    ]);
    // ── Data subscriptions (tasks, folders, members) — change with workspace ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            dataUnsubsRef.current.forEach({
                "AppProvider.useEffect": (fn)=>fn()
            }["AppProvider.useEffect"]);
            dataUnsubsRef.current = [];
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
                return;
            }
            if (state.activeWorkspaceId) {
                // Subscribe to workspace data
                dataUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWsTasks"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, {
                    "AppProvider.useEffect": (tasks)=>{
                        dispatch({
                            type: "SYNC_TASKS",
                            payload: tasks
                        });
                    }
                }["AppProvider.useEffect"]));
                dataUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWsFolders"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, {
                    "AppProvider.useEffect": (folders)=>{
                        if (folders.length === 0) {
                            const inbox = initialState.folders[0];
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setWsFolder"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, inbox);
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
                dataUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWsMembers"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, {
                    "AppProvider.useEffect": (members)=>{
                        dispatch({
                            type: "SYNC_WORKSPACE_MEMBERS",
                            payload: members
                        });
                    }
                }["AppProvider.useEffect"]));
                dataUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWsMessages"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, {
                    "AppProvider.useEffect": (msgs)=>{
                        dispatch({
                            type: "SYNC_CHAT_MESSAGES",
                            payload: msgs
                        });
                    }
                }["AppProvider.useEffect"]));
            } else {
                // Subscribe to personal data
                const uid = state.user.uid;
                dataUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeTasks"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
                    "AppProvider.useEffect": (tasks)=>{
                        dispatch({
                            type: "SYNC_TASKS",
                            payload: tasks
                        });
                    }
                }["AppProvider.useEffect"]));
                dataUnsubsRef.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeFolders"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], uid, {
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
            }
            return ({
                "AppProvider.useEffect": ()=>{
                    dataUnsubsRef.current.forEach({
                        "AppProvider.useEffect": (fn)=>fn()
                    }["AppProvider.useEffect"]);
                    dataUnsubsRef.current = [];
                }
            })["AppProvider.useEffect"];
        }
    }["AppProvider.useEffect"], [
        state.user,
        state.activeWorkspaceId
    ]);
    // ── DM subscription — changes with activeDmUserId ──
    const dmUnsubRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            dmUnsubRef.current?.();
            dmUnsubRef.current = null;
            dispatch({
                type: "SYNC_DM_MESSAGES",
                payload: []
            });
            if (!state.user || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"] || !state.activeWorkspaceId || !state.activeDmUserId) return;
            const channelId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDmChannelId"])(state.user.uid, state.activeDmUserId);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureDmChannel"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, state.user.uid, state.activeDmUserId).then({
                "AppProvider.useEffect": ()=>{
                    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"] || !state.activeWorkspaceId) return;
                    dmUnsubRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeDmMessages"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, channelId, {
                        "AppProvider.useEffect": (msgs)=>{
                            dispatch({
                                type: "SYNC_DM_MESSAGES",
                                payload: msgs
                            });
                        }
                    }["AppProvider.useEffect"]);
                }
            }["AppProvider.useEffect"]);
            return ({
                "AppProvider.useEffect": ()=>{
                    dmUnsubRef.current?.();
                    dmUnsubRef.current = null;
                }
            })["AppProvider.useEffect"];
        }
    }["AppProvider.useEffect"], [
        state.user,
        state.activeWorkspaceId,
        state.activeDmUserId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if (!state.activeWorkspaceId) return;
            const hasActiveWorkspace = state.workspaces.some({
                "AppProvider.useEffect.hasActiveWorkspace": (workspace)=>workspace.workspaceId === state.activeWorkspaceId
            }["AppProvider.useEffect.hasActiveWorkspace"]);
            if (!hasActiveWorkspace) {
                dispatch({
                    type: "SET_ACTIVE_WORKSPACE",
                    payload: null
                });
            }
        }
    }["AppProvider.useEffect"], [
        state.activeWorkspaceId,
        state.workspaces
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
            // Add creator info if in workspace
            if (state.activeWorkspaceId && state.user) {
                newTask.createdBy = state.user.uid;
                newTask.createdByName = state.user.displayName || state.user.email || "";
            }
            dispatch({
                type: "ADD_TASK",
                payload: newTask
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                if (state.activeWorkspaceId) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setWsTask"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, newTask);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logActivity"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, {
                        id: genId(),
                        type: "task_created",
                        userId: state.user.uid,
                        userName: state.user.displayName || "",
                        userPhotoURL: state.user.photoURL || "",
                        targetId: newTask.id,
                        targetTitle: newTask.title,
                        detail: "",
                        timestamp: now
                    });
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTask"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, newTask);
                }
            }
            return newTask.id;
        }
    }["AppProvider.useCallback[addTask]"], [
        state.user,
        state.tasks.length,
        state.activeWorkspaceId
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
                if (state.activeWorkspaceId) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateWsTaskFields"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, id, merged);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTaskFields"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, id, merged);
                }
            }
        }
    }["AppProvider.useCallback[updateTaskAction]"], [
        state.user,
        state.activeWorkspaceId
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
                if (state.activeWorkspaceId) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeWsTasks"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, toDelete);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTasks"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, toDelete);
                }
            }
        }
    }["AppProvider.useCallback[deleteTaskAction]"], [
        state.user,
        state.tasks,
        state.activeWorkspaceId
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
                if (state.activeWorkspaceId) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setWsFolder"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, folder);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setFolder"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, folder);
                }
            }
        }
    }["AppProvider.useCallback[addFolderAction]"], [
        state.user,
        state.folders.length,
        state.activeWorkspaceId
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
                if (state.activeWorkspaceId) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateWsFolderFields"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, id, updates);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateFolderFields"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, id, updates);
                }
            }
        }
    }["AppProvider.useCallback[updateFolderAction]"], [
        state.user,
        state.activeWorkspaceId
    ]);
    const deleteFolderAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[deleteFolderAction]": (id)=>{
            if (id === "inbox") return;
            dispatch({
                type: "DELETE_FOLDER",
                payload: id
            });
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
                if (state.activeWorkspaceId) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeWsFolder"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, id);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeFolder"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, id);
                }
            }
        }
    }["AppProvider.useCallback[deleteFolderAction]"], [
        state.user,
        state.tasks,
        updateTaskAction,
        state.activeWorkspaceId
    ]);
    const reorderTasksAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[reorderTasksAction]": (tasks)=>{
            dispatch({
                type: "REORDER_TASKS",
                payload: tasks
            });
            if (state.user && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
                const items = tasks.map({
                    "AppProvider.useCallback[reorderTasksAction].items": (t, i)=>({
                            id: t.id,
                            order: i
                        })
                }["AppProvider.useCallback[reorderTasksAction].items"]);
                if (state.activeWorkspaceId) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reorderWsTasksDocs"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, items);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reorderTasksDocs"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.user.uid, items);
                }
            }
        }
    }["AppProvider.useCallback[reorderTasksAction]"], [
        state.user,
        state.activeWorkspaceId
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
    // ── Workspace actions ───────────────────
    const switchWorkspace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[switchWorkspace]": (workspaceId)=>{
            dispatch({
                type: "SET_ACTIVE_WORKSPACE",
                payload: workspaceId
            });
        }
    }["AppProvider.useCallback[switchWorkspace]"], []);
    const createWorkspaceAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[createWorkspaceAction]": async (name, emoji, color, description)=>{
            if (!state.user || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) throw new Error("Not authenticated");
            const now = new Date().toISOString();
            const id = genId();
            const workspace = {
                id,
                name,
                emoji,
                color,
                description: description || "",
                ownerId: state.user.uid,
                ownerName: state.user.displayName || state.user.email || "",
                memberCount: 1,
                createdAt: now,
                updatedAt: now
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWorkspace"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], workspace, {
                uid: state.user.uid,
                displayName: state.user.displayName || "",
                email: state.user.email || "",
                photoURL: state.user.photoURL || ""
            });
            return id;
        }
    }["AppProvider.useCallback[createWorkspaceAction]"], [
        state.user
    ]);
    const deleteWorkspaceActionFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[deleteWorkspaceActionFn]": async (wsId)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteWorkspace"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], wsId);
            if (state.activeWorkspaceId === wsId) {
                dispatch({
                    type: "SET_ACTIVE_WORKSPACE",
                    payload: null
                });
            }
        }
    }["AppProvider.useCallback[deleteWorkspaceActionFn]"], [
        state.activeWorkspaceId
    ]);
    const inviteToWorkspaceAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[inviteToWorkspaceAction]": async (wsId, email, role)=>{
            if (!state.user || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) return;
            const ws = state.workspaces.find({
                "AppProvider.useCallback[inviteToWorkspaceAction].ws": (w)=>w.workspaceId === wsId
            }["AppProvider.useCallback[inviteToWorkspaceAction].ws"]);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInvitation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], {
                workspaceId: wsId,
                workspaceName: ws?.name || "",
                workspaceEmoji: ws?.emoji || "",
                workspaceColor: ws?.color || "",
                invitedEmail: email.toLowerCase(),
                invitedBy: state.user.uid,
                invitedByName: state.user.displayName || "",
                invitedByPhotoURL: state.user.photoURL || "",
                role,
                status: "pending",
                createdAt: new Date().toISOString()
            });
        }
    }["AppProvider.useCallback[inviteToWorkspaceAction]"], [
        state.user,
        state.workspaces
    ]);
    const acceptInvitationAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[acceptInvitationAction]": async (invitation)=>{
            if (!state.user || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["acceptInvitation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], invitation, {
                uid: state.user.uid,
                displayName: state.user.displayName || "",
                email: state.user.email || "",
                photoURL: state.user.photoURL || ""
            });
        }
    }["AppProvider.useCallback[acceptInvitationAction]"], [
        state.user
    ]);
    const declineInvitationActionFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[declineInvitationActionFn]": async (invitationId)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["declineInvitation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], invitationId);
        }
    }["AppProvider.useCallback[declineInvitationActionFn]"], []);
    const removeMemberActionFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[removeMemberActionFn]": async (wsId, uid)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeWorkspaceMember"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], wsId, uid);
        }
    }["AppProvider.useCallback[removeMemberActionFn]"], []);
    const updateMemberRoleActionFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[updateMemberRoleActionFn]": async (wsId, uid, role)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMemberRole"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], wsId, uid, role);
        }
    }["AppProvider.useCallback[updateMemberRoleActionFn]"], []);
    const leaveWorkspaceAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[leaveWorkspaceAction]": async (wsId)=>{
            if (!state.user || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeWorkspaceMember"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], wsId, state.user.uid);
            if (state.activeWorkspaceId === wsId) {
                dispatch({
                    type: "SET_ACTIVE_WORKSPACE",
                    payload: null
                });
            }
        }
    }["AppProvider.useCallback[leaveWorkspaceAction]"], [
        state.user,
        state.activeWorkspaceId
    ]);
    const sendMessageAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[sendMessageAction]": (text, attachment)=>{
            if (!state.user || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"] || !state.activeWorkspaceId) return;
            if (!text.trim() && !attachment) return;
            const msg = {
                id: genId(),
                text: text.trim(),
                userId: state.user.uid,
                userName: state.user.displayName || state.user.email || "",
                userPhotoURL: state.user.photoURL || "",
                createdAt: new Date().toISOString(),
                ...attachment ? {
                    attachment
                } : {}
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendWsMessage"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, msg);
        }
    }["AppProvider.useCallback[sendMessageAction]"], [
        state.user,
        state.activeWorkspaceId
    ]);
    const openDmAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[openDmAction]": (userId)=>{
            dispatch({
                type: "SET_ACTIVE_DM",
                payload: userId
            });
        }
    }["AppProvider.useCallback[openDmAction]"], []);
    const closeDmAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[closeDmAction]": ()=>{
            dispatch({
                type: "SET_ACTIVE_DM",
                payload: null
            });
        }
    }["AppProvider.useCallback[closeDmAction]"], []);
    const sendDmAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[sendDmAction]": (text, attachment)=>{
            if (!state.user || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"] || !state.activeWorkspaceId || !state.activeDmUserId) return;
            if (!text.trim() && !attachment) return;
            const channelId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDmChannelId"])(state.user.uid, state.activeDmUserId);
            const msg = {
                id: genId(),
                text: text.trim(),
                senderId: state.user.uid,
                senderName: state.user.displayName || state.user.email || "",
                senderPhotoURL: state.user.photoURL || "",
                createdAt: new Date().toISOString(),
                ...attachment ? {
                    attachment
                } : {}
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workspace$2d$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendDmMessage"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], state.activeWorkspaceId, channelId, msg);
        }
    }["AppProvider.useCallback[sendDmAction]"], [
        state.user,
        state.activeWorkspaceId,
        state.activeDmUserId
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
            importBackup: importBackupAction,
            switchWorkspace,
            createWorkspaceAction,
            deleteWorkspaceAction: deleteWorkspaceActionFn,
            inviteToWorkspace: inviteToWorkspaceAction,
            acceptInvitationAction,
            declineInvitationAction: declineInvitationActionFn,
            removeMemberAction: removeMemberActionFn,
            updateMemberRoleAction: updateMemberRoleActionFn,
            leaveWorkspace: leaveWorkspaceAction,
            sendMessage: sendMessageAction,
            openDm: openDmAction,
            closeDm: closeDmAction,
            sendDm: sendDmAction
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/store/AppContext.tsx",
        lineNumber: 1164,
        columnNumber: 5
    }, this);
}
_s1(AppProvider, "8VkYzYOA/Z8aFEcQsRemdSu7qbw=");
_c = AppProvider;
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_abd7bc43._.js.map