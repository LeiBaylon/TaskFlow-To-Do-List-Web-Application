"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type {
  Task,
  Folder,
  UserProfile,
  ViewMode,
  ThemeMode,
  Priority,
} from "@/lib/types";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

// ─── State ────────────────────────────────
export interface TaskModalState {
  mode: "add" | "edit";
  task?: Task;
  defaults?: Partial<Task>;
}

interface AppState {
  user: User | null;
  profile: UserProfile | null;
  tasks: Task[];
  folders: Folder[];
  activeFolderId: string;
  viewMode: ViewMode;
  theme: ThemeMode;
  searchQuery: string;
  commandPaletteOpen: boolean;
  focusTaskId: string | null;
  authLoading: boolean;
  taskModal: TaskModalState | null;
  history: HistorySnapshot[];
  future: HistorySnapshot[];
}

interface HistorySnapshot {
  tasks: Task[];
  folders: Folder[];
}

const initialState: AppState = {
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
      createdAt: new Date().toISOString(),
    },
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
};

function nextRecurringDate(dateStr: string, recurrence: Task["recurrence"]) {
  const dt = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(dt.getTime())) return null;
  if (recurrence === "daily") dt.setDate(dt.getDate() + 1);
  if (recurrence === "weekly") dt.setDate(dt.getDate() + 7);
  if (recurrence === "monthly") dt.setMonth(dt.getMonth() + 1);
  return dt.toISOString().split("T")[0];
}

// ─── Actions ──────────────────────────────
type Action =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_PROFILE"; payload: UserProfile | null }
  | { type: "SYNC_TASKS"; payload: Task[] }
  | { type: "SYNC_FOLDERS"; payload: Folder[] }
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<Task> } }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_FOLDERS"; payload: Folder[] }
  | { type: "ADD_FOLDER"; payload: Folder }
  | { type: "UPDATE_FOLDER"; payload: { id: string; updates: Partial<Folder> } }
  | { type: "DELETE_FOLDER"; payload: string }
  | { type: "SET_ACTIVE_FOLDER"; payload: string }
  | { type: "SET_VIEW_MODE"; payload: ViewMode }
  | { type: "SET_THEME"; payload: ThemeMode }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "TOGGLE_COMMAND_PALETTE" }
  | { type: "SET_FOCUS_TASK"; payload: string | null }
  | { type: "SET_AUTH_LOADING"; payload: boolean }
  | { type: "REORDER_TASKS"; payload: Task[] }
  | { type: "SET_TASK_MODAL"; payload: TaskModalState | null }
  | { type: "UNDO" }
  | { type: "REDO" };

function withHistory(state: AppState): Pick<AppState, "history" | "future"> {
  const nextHistory = [
    ...state.history,
    { tasks: state.tasks, folders: state.folders },
  ];
  return {
    history: nextHistory.slice(-100),
    future: [],
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, authLoading: false };
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SYNC_TASKS":
      return { ...state, tasks: action.payload };
    case "SYNC_FOLDERS":
      return { ...state, folders: action.payload };
    case "SET_TASKS":
      return { ...state, tasks: action.payload, ...withHistory(state) };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        ...withHistory(state),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t,
        ),
        ...withHistory(state),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        ...withHistory(state),
      };
    case "SET_FOLDERS":
      return { ...state, folders: action.payload, ...withHistory(state) };
    case "ADD_FOLDER":
      return {
        ...state,
        folders: [...state.folders, action.payload],
        ...withHistory(state),
      };
    case "UPDATE_FOLDER":
      return {
        ...state,
        folders: state.folders.map((f) =>
          f.id === action.payload.id ? { ...f, ...action.payload.updates } : f,
        ),
        ...withHistory(state),
      };
    case "DELETE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter((f) => f.id !== action.payload),
        ...withHistory(state),
      };
    case "SET_ACTIVE_FOLDER":
      return { ...state, activeFolderId: action.payload };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "TOGGLE_COMMAND_PALETTE":
      return { ...state, commandPaletteOpen: !state.commandPaletteOpen };
    case "SET_FOCUS_TASK":
      return { ...state, focusTaskId: action.payload };
    case "SET_AUTH_LOADING":
      return { ...state, authLoading: action.payload };
    case "REORDER_TASKS":
      return { ...state, tasks: action.payload, ...withHistory(state) };
    case "SET_TASK_MODAL":
      return { ...state, taskModal: action.payload };
    case "UNDO": {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return {
        ...state,
        tasks: prev.tasks,
        folders: prev.folders,
        history: state.history.slice(0, -1),
        future: [
          ...state.future,
          { tasks: state.tasks, folders: state.folders },
        ],
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[state.future.length - 1];
      return {
        ...state,
        tasks: next.tasks,
        folders: next.folders,
        history: [
          ...state.history,
          { tasks: state.tasks, folders: state.folders },
        ].slice(-100),
        future: state.future.slice(0, -1),
      };
    }
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  addTask: (
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "subtaskIds" | "order">,
  ) => string;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  addFolder: (name: string, icon?: string, color?: string) => void;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  openTaskModal: (modal: TaskModalState) => void;
  closeTaskModal: () => void;
  undo: () => void;
  redo: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const unsubTasksRef = useRef<(() => void) | null>(null);
  const unsubFoldersRef = useRef<(() => void) | null>(null);

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (mode: ThemeMode) => {
      if (mode === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        root.classList.toggle("dark", prefersDark);
      } else {
        root.classList.toggle("dark", mode === "dark");
      }
    };
    applyTheme(state.theme);

    if (state.theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [state.theme]);

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("zenflow-theme") as ThemeMode | null;
    if (saved) dispatch({ type: "SET_THEME", payload: saved });
  }, []);

  useEffect(() => {
    localStorage.setItem("zenflow-theme", state.theme);
  }, [state.theme]);

  // Auth listener
  useEffect(() => {
    if (!auth) {
      dispatch({ type: "SET_AUTH_LOADING", payload: false });
      return;
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_USER", payload: user });
    });
    return () => unsub();
  }, []);

  // Firestore sync
  useEffect(() => {
    if (!state.user || !db) {
      // Load from localStorage for offline/unauthenticated use
      const savedTasks = localStorage.getItem("zenflow-tasks");
      const savedFolders = localStorage.getItem("zenflow-folders");
      if (savedTasks) {
        try {
          dispatch({ type: "SYNC_TASKS", payload: JSON.parse(savedTasks) });
        } catch {}
      }
      if (savedFolders) {
        try {
          dispatch({ type: "SYNC_FOLDERS", payload: JSON.parse(savedFolders) });
        } catch {}
      } else {
        dispatch({ type: "SYNC_FOLDERS", payload: initialState.folders });
      }
      return;
    }

    const uid = state.user.uid;

    // Subscribe to tasks
    const tasksQ = query(
      collection(db!, "users", uid, "tasks"),
      orderBy("order"),
    );
    unsubTasksRef.current = onSnapshot(tasksQ, (snap) => {
      const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Task);
      dispatch({ type: "SYNC_TASKS", payload: tasks });
    });

    // Subscribe to folders
    const foldersQ = query(
      collection(db!, "users", uid, "folders"),
      orderBy("order"),
    );
    unsubFoldersRef.current = onSnapshot(foldersQ, (snap) => {
      const folders = snap.docs.map(
        (d) => ({ id: d.id, ...d.data() }) as Folder,
      );
      if (folders.length === 0) {
        // Initialize with default
        const inbox = initialState.folders[0];
        setDoc(doc(db!, "users", uid, "folders", inbox.id), inbox);
        dispatch({ type: "SYNC_FOLDERS", payload: [inbox] });
      } else {
        dispatch({ type: "SYNC_FOLDERS", payload: folders });
      }
    });

    return () => {
      unsubTasksRef.current?.();
      unsubFoldersRef.current?.();
    };
  }, [state.user]);

  // Persist to localStorage when tasks/folders change (for offline mode)
  useEffect(() => {
    if (!state.user) {
      localStorage.setItem("zenflow-tasks", JSON.stringify(state.tasks));
    }
  }, [state.tasks, state.user]);

  useEffect(() => {
    if (!state.user) {
      localStorage.setItem("zenflow-folders", JSON.stringify(state.folders));
    }
  }, [state.folders, state.user]);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        dispatch({ type: "TOGGLE_COMMAND_PALETTE" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const genId = () => crypto.randomUUID();

  const addTask = useCallback(
    (
      task: Omit<
        Task,
        "id" | "createdAt" | "updatedAt" | "subtaskIds" | "order"
      >,
    ): string => {
      const now = new Date().toISOString();
      const newTask: Task = {
        ...task,
        id: genId(),
        recurrence: task.recurrence || "none",
        reminderMinutes: task.reminderMinutes ?? null,
        subtaskIds: [],
        order: state.tasks.length,
        createdAt: now,
        updatedAt: now,
      };
      // Optimistic update
      dispatch({ type: "ADD_TASK", payload: newTask });
      // Persist
      if (state.user && db) {
        setDoc(doc(db!, "users", state.user.uid, "tasks", newTask.id), newTask);
      }
      return newTask.id;
    },
    [state.user, state.tasks.length],
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      const merged = { ...updates, updatedAt: new Date().toISOString() };
      dispatch({ type: "UPDATE_TASK", payload: { id, updates: merged } });
      if (state.user && db) {
        setDoc(doc(db!, "users", state.user.uid, "tasks", id), merged, {
          merge: true,
        });
      }
    },
    [state.user],
  );

  const deleteTask = useCallback(
    (id: string) => {
      // Also delete subtasks recursively
      const toDelete = [id];
      const findChildren = (parentId: string) => {
        state.tasks
          .filter((t) => t.parentId === parentId)
          .forEach((t) => {
            toDelete.push(t.id);
            findChildren(t.id);
          });
      };
      findChildren(id);

      toDelete.forEach((tid) =>
        dispatch({ type: "DELETE_TASK", payload: tid }),
      );

      if (state.user && db) {
        const batch = writeBatch(db!);
        toDelete.forEach((tid) => {
          batch.delete(doc(db!, "users", state.user!.uid, "tasks", tid));
        });
        batch.commit();
      }
    },
    [state.user, state.tasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return;
      const completed = !task.completed;
      const updates: Partial<Task> = {
        completed,
        status: completed ? "done" : "todo",
        completedAt: completed ? new Date().toISOString() : null,
      };
      updateTask(id, updates);

      // Auto-create next occurrence for recurring tasks when completed.
      if (
        completed &&
        task.recurrence &&
        task.recurrence !== "none" &&
        task.dueDate
      ) {
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
            tags: [...task.tags],
            folderId: task.folderId,
            parentId: task.parentId ?? null,
            status: "todo",
          });
        }
      }
    },
    [state.tasks, updateTask, addTask],
  );

  // Browser reminders for due tasks.
  useEffect(() => {
    if (typeof window === "undefined" || typeof Notification === "undefined")
      return;
    if (Notification.permission !== "granted") return;

    const interval = window.setInterval(() => {
      const now = Date.now();
      state.tasks.forEach((task) => {
        if (task.completed || !task.dueDate || task.reminderMinutes == null)
          return;
        const dueStr = `${task.dueDate}T${task.dueTime || "09:00"}:00`;
        const dueTs = new Date(dueStr).getTime();
        if (Number.isNaN(dueTs)) return;

        const reminderTs = dueTs - task.reminderMinutes * 60_000;
        const key = `zenflow-reminder-${task.id}-${task.dueDate}-${task.dueTime || ""}-${task.reminderMinutes}`;
        if (
          now >= reminderTs &&
          now <= dueTs + 60_000 &&
          !localStorage.getItem(key)
        ) {
          new Notification("Task reminder", {
            body: `${task.title}${task.dueTime ? ` at ${task.dueTime}` : ""}`,
          });
          localStorage.setItem(key, "1");
        }
      });
    }, 30_000);

    return () => window.clearInterval(interval);
  }, [state.tasks]);

  const addFolder = useCallback(
    (name: string, icon?: string, color?: string) => {
      const folder: Folder = {
        id: genId(),
        name,
        icon: icon || "folder",
        color: color || "#6366f1",
        order: state.folders.length,
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: "ADD_FOLDER", payload: folder });
      if (state.user && db) {
        setDoc(doc(db!, "users", state.user.uid, "folders", folder.id), folder);
      }
    },
    [state.user, state.folders.length],
  );

  const updateFolder = useCallback(
    (id: string, updates: Partial<Folder>) => {
      dispatch({ type: "UPDATE_FOLDER", payload: { id, updates } });
      if (state.user && db) {
        const folderRef = doc(db!, "users", state.user.uid, "folders", id);
        setDoc(folderRef, updates, { merge: true });
      }
    },
    [state.user],
  );

  const deleteFolder = useCallback(
    (id: string) => {
      if (id === "inbox") return;
      dispatch({ type: "DELETE_FOLDER", payload: id });
      // Move tasks to inbox
      state.tasks
        .filter((t) => t.folderId === id)
        .forEach((t) => {
          updateTask(t.id, { folderId: "inbox" });
        });
      if (state.user && db) {
        deleteDoc(doc(db!, "users", state.user.uid, "folders", id));
      }
    },
    [state.user, state.tasks, updateTask],
  );

  const reorderTasks = useCallback(
    (tasks: Task[]) => {
      dispatch({ type: "REORDER_TASKS", payload: tasks });
      if (state.user && db) {
        const batch = writeBatch(db!);
        tasks.forEach((t, i) => {
          batch.update(doc(db!, "users", state.user!.uid, "tasks", t.id), {
            order: i,
          });
        });
        batch.commit();
      }
    },
    [state.user],
  );

  const openTaskModal = useCallback((modal: TaskModalState) => {
    dispatch({ type: "SET_TASK_MODAL", payload: modal });
  }, []);

  const closeTaskModal = useCallback(() => {
    dispatch({ type: "SET_TASK_MODAL", payload: null });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: "REDO" });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        addFolder,
        updateFolder,
        deleteFolder,
        reorderTasks,
        openTaskModal,
        closeTaskModal,
        undo,
        redo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
