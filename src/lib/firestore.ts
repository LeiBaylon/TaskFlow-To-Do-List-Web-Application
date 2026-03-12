import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  writeBatch,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore";
import type { Task, Folder, ThemeMode } from "@/lib/types";

// ─── Types ────────────────────────────────

export interface UserPreferences {
  theme: ThemeMode;
  savedViews: SavedViewData[];
  customQuotes: QuoteData[];
}

export interface SavedViewData {
  id: string;
  name: string;
  sortField: "order" | "priority" | "dueDate" | "title";
  sortAsc: boolean;
  statusFilter: string;
  priorityFilter: string;
}

export interface QuoteData {
  id: string;
  text: string;
  author: string;
}

export interface UserStats {
  completionHistory: Record<string, number>; // "YYYY-MM-DD" -> count
  lastActiveDate: string;
}

export interface UserProfileData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string;
}

// ─── Path helpers ─────────────────────────

const userDoc = (db: Firestore, uid: string) => doc(db, "users", uid);
const profileDoc = (db: Firestore, uid: string) =>
  doc(db, "users", uid, "meta", "profile");
const prefsDoc = (db: Firestore, uid: string) =>
  doc(db, "users", uid, "meta", "preferences");
const statsDoc = (db: Firestore, uid: string) =>
  doc(db, "users", uid, "meta", "stats");
const tasksCol = (db: Firestore, uid: string) =>
  collection(db, "users", uid, "tasks");
const foldersCol = (db: Firestore, uid: string) =>
  collection(db, "users", uid, "folders");
const taskDoc = (db: Firestore, uid: string, taskId: string) =>
  doc(db, "users", uid, "tasks", taskId);
const folderDoc = (db: Firestore, uid: string, folderId: string) =>
  doc(db, "users", uid, "folders", folderId);

// ─── Profile ──────────────────────────────

export async function setUserProfile(
  db: Firestore,
  uid: string,
  data: UserProfileData,
) {
  await setDoc(profileDoc(db, uid), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getUserProfile(
  db: Firestore,
  uid: string,
): Promise<UserProfileData | null> {
  const snap = await getDoc(profileDoc(db, uid));
  return snap.exists() ? (snap.data() as UserProfileData) : null;
}

// ─── Preferences ──────────────────────────

export async function setUserPreferences(
  db: Firestore,
  uid: string,
  prefs: Partial<UserPreferences>,
) {
  await setDoc(prefsDoc(db, uid), prefs, { merge: true });
}

export async function getUserPreferences(
  db: Firestore,
  uid: string,
): Promise<UserPreferences | null> {
  const snap = await getDoc(prefsDoc(db, uid));
  return snap.exists() ? (snap.data() as UserPreferences) : null;
}

export function subscribePreferences(
  db: Firestore,
  uid: string,
  callback: (prefs: UserPreferences | null) => void,
) {
  return onSnapshot(prefsDoc(db, uid), (snap) => {
    callback(snap.exists() ? (snap.data() as UserPreferences) : null);
  });
}

// ─── Stats ────────────────────────────────

export async function getUserStats(
  db: Firestore,
  uid: string,
): Promise<UserStats | null> {
  const snap = await getDoc(statsDoc(db, uid));
  return snap.exists() ? (snap.data() as UserStats) : null;
}

export async function incrementCompletionCount(
  db: Firestore,
  uid: string,
  dateKey: string,
) {
  const snap = await getDoc(statsDoc(db, uid));
  const existing = snap.exists() ? (snap.data() as UserStats) : { completionHistory: {}, lastActiveDate: "" };
  const current = existing.completionHistory[dateKey] || 0;
  await setDoc(
    statsDoc(db, uid),
    {
      completionHistory: { ...existing.completionHistory, [dateKey]: current + 1 },
      lastActiveDate: dateKey,
    },
    { merge: true },
  );
}

export async function decrementCompletionCount(
  db: Firestore,
  uid: string,
  dateKey: string,
) {
  const snap = await getDoc(statsDoc(db, uid));
  if (!snap.exists()) return;
  const existing = snap.data() as UserStats;
  const current = existing.completionHistory[dateKey] || 0;
  if (current <= 1) {
    const { [dateKey]: _, ...rest } = existing.completionHistory;
    await setDoc(statsDoc(db, uid), { ...existing, completionHistory: rest }, { merge: true });
  } else {
    await setDoc(
      statsDoc(db, uid),
      { completionHistory: { ...existing.completionHistory, [dateKey]: current - 1 } },
      { merge: true },
    );
  }
}

export function subscribeStats(
  db: Firestore,
  uid: string,
  callback: (stats: UserStats | null) => void,
) {
  return onSnapshot(statsDoc(db, uid), (snap) => {
    callback(snap.exists() ? (snap.data() as UserStats) : null);
  });
}

// ─── Tasks ────────────────────────────────

export function subscribeTasks(
  db: Firestore,
  uid: string,
  callback: (tasks: Task[]) => void,
) {
  const q = query(tasksCol(db, uid), orderBy("order"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Task));
  });
}

export async function setTask(db: Firestore, uid: string, task: Task) {
  await setDoc(taskDoc(db, uid, task.id), task);
}

export async function updateTaskFields(
  db: Firestore,
  uid: string,
  taskId: string,
  updates: Partial<Task>,
) {
  await setDoc(taskDoc(db, uid, taskId), updates, { merge: true });
}

export async function removeTask(
  db: Firestore,
  uid: string,
  taskId: string,
) {
  await deleteDoc(taskDoc(db, uid, taskId));
}

export async function removeTasks(
  db: Firestore,
  uid: string,
  taskIds: string[],
) {
  const batch = writeBatch(db);
  taskIds.forEach((id) => batch.delete(taskDoc(db, uid, id)));
  await batch.commit();
}

export async function reorderTasksDocs(
  db: Firestore,
  uid: string,
  tasks: { id: string; order: number }[],
) {
  const batch = writeBatch(db);
  tasks.forEach(({ id, order }) => {
    batch.update(taskDoc(db, uid, id), { order });
  });
  await batch.commit();
}

// ─── Folders ──────────────────────────────

export function subscribeFolders(
  db: Firestore,
  uid: string,
  callback: (folders: Folder[]) => void,
) {
  const q = query(foldersCol(db, uid), orderBy("order"));
  return onSnapshot(q, (snap) => {
    const folders = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Folder);
    callback(folders);
  });
}

export async function setFolder(db: Firestore, uid: string, folder: Folder) {
  await setDoc(folderDoc(db, uid, folder.id), folder);
}

export async function updateFolderFields(
  db: Firestore,
  uid: string,
  folderId: string,
  updates: Partial<Folder>,
) {
  await setDoc(folderDoc(db, uid, folderId), updates, { merge: true });
}

export async function removeFolder(
  db: Firestore,
  uid: string,
  folderId: string,
) {
  await deleteDoc(folderDoc(db, uid, folderId));
}

// ─── Bulk import (for backup restore) ─────

export async function bulkImport(
  db: Firestore,
  uid: string,
  tasks: Task[],
  folders: Folder[],
) {
  // Firestore batches are limited to 500 ops
  const all = [
    ...tasks.map((t) => ({ ref: taskDoc(db, uid, t.id), data: t })),
    ...folders.map((f) => ({ ref: folderDoc(db, uid, f.id), data: f })),
  ];

  for (let i = 0; i < all.length; i += 450) {
    const batch = writeBatch(db);
    all.slice(i, i + 450).forEach(({ ref, data }) => {
      batch.set(ref, data);
    });
    await batch.commit();
  }
}

// ─── Init user doc (first sign-in) ───────

export async function initUserDocument(
  db: Firestore,
  uid: string,
  data: { displayName: string; email: string; photoURL: string },
) {
  const profileSnap = await getDoc(profileDoc(db, uid));
  if (!profileSnap.exists()) {
    const profile: UserProfileData = {
      uid,
      displayName: data.displayName,
      email: data.email,
      photoURL: data.photoURL,
      createdAt: new Date().toISOString(),
    };
    await setDoc(profileDoc(db, uid), profile);

    // Default preferences
    await setDoc(prefsDoc(db, uid), {
      theme: "system" as ThemeMode,
      savedViews: [],
      customQuotes: [],
    });

    // Empty stats
    await setDoc(statsDoc(db, uid), {
      completionHistory: {},
      lastActiveDate: new Date().toISOString().split("T")[0],
    });

    // Default inbox folder
    const inbox: Folder = {
      id: "inbox",
      name: "Inbox",
      icon: "inbox",
      color: "#6366f1",
      order: 0,
      createdAt: new Date().toISOString(),
    };
    await setDoc(folderDoc(db, uid, "inbox"), inbox);
  }
}
