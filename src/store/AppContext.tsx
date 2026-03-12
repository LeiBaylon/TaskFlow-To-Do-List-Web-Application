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
import { onAuthStateChanged, User } from "firebase/auth";
import {
  initUserDocument,
  subscribeTasks,
  subscribeFolders,
  subscribePreferences,
  subscribeStats,
  setTask,
  updateTaskFields,
  removeTask,
  removeTasks,
  reorderTasksDocs,
  setFolder,
  updateFolderFields,
  removeFolder,
  setUserPreferences,
  incrementCompletionCount,
  decrementCompletionCount,
  setUserProfile as setProfileDoc,
  bulkImport,
  type UserPreferences,
  type UserStats,
  type SavedViewData,
  type QuoteData,
} from "@/lib/firestore";

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
  completionHistory: Record<string, number>;
  savedViews: SavedViewData[];
  customQuotes: QuoteData[];
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
  completionHistory: {},
  savedViews: [],
  customQuotes: [],
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
  | { type: "REDO" }
  | { type: "SYNC_COMPLETION_HISTORY"; payload: Record<string, number> }
  | { type: "SYNC_SAVED_VIEWS"; payload: SavedViewData[] }
  | { type: "SYNC_CUSTOM_QUOTES"; payload: QuoteData[] };

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
    case "SYNC_COMPLETION_HISTORY":
      return { ...state, completionHistory: action.payload };
    case "SYNC_SAVED_VIEWS":
      return { ...state, savedViews: action.payload };
    case "SYNC_CUSTOM_QUOTES":
      return { ...state, customQuotes: action.payload };
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
  saveSavedViews: (views: SavedViewData[]) => void;
  saveCustomQuotes: (quotes: QuoteData[]) => void;
  importBackup: (tasks: Task[], folders: Folder[]) => void;
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
  const unsubsRef = useRef<(() => void)[]>([]);

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

  // Load theme from localStorage (for unauthenticated / initial load)
  useEffect(() => {
    const saved = localStorage.getItem("zenflow-theme") as ThemeMode | null;
    if (saved) dispatch({ type: "SET_THEME", payload: saved });
  }, []);

  // Persist theme to localStorage always
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

  // ── Firestore sync ──────────────────────
  useEffect(() => {
    // Clean up previous subscriptions
    unsubsRef.current.forEach((fn) => fn());
    unsubsRef.current = [];

    if (!state.user || !db) {
      // Load from localStorage for offline/unauthenticated use
      const savedTasks = localStorage.getItem("zenflow-tasks");
      const savedFolders = localStorage.getItem("zenflow-folders");
      if (savedTasks) {
        try { dispatch({ type: "SYNC_TASKS", payload: JSON.parse(savedTasks) }); } catch {}
      }
      if (savedFolders) {
        try { dispatch({ type: "SYNC_FOLDERS", payload: JSON.parse(savedFolders) }); } catch {}
      } else {
        dispatch({ type: "SYNC_FOLDERS", payload: initialState.folders });
      }
      // Load saved views & quotes from localStorage
      try {
        const sv = localStorage.getItem("zenflow-saved-views");
        if (sv) dispatch({ type: "SYNC_SAVED_VIEWS", payload: JSON.parse(sv) });
      } catch {}
      try {
        const cq = localStorage.getItem("zenflow-quotes");
        if (cq) dispatch({ type: "SYNC_CUSTOM_QUOTES", payload: JSON.parse(cq) });
      } catch {}
      return;
    }

    const uid = state.user.uid;

    // Initialize user document on first sign-in
    initUserDocument(db, uid, {
      displayName: state.user.displayName || "",
      email: state.user.email || "",
      photoURL: state.user.photoURL || "",
    });

    // Subscribe to tasks
    unsubsRef.current.push(
      subscribeTasks(db, uid, (tasks) => {
        dispatch({ type: "SYNC_TASKS", payload: tasks });
      }),
    );

    // Subscribe to folders
    unsubsRef.current.push(
      subscribeFolders(db, uid, (folders) => {
        if (folders.length === 0) {
          const inbox = initialState.folders[0];
          setFolder(db!, uid, inbox);
          dispatch({ type: "SYNC_FOLDERS", payload: [inbox] });
        } else {
          dispatch({ type: "SYNC_FOLDERS", payload: folders });
        }
      }),
    );

    // Subscribe to preferences (theme, saved views, custom quotes)
    unsubsRef.current.push(
      subscribePreferences(db, uid, (prefs) => {
        if (prefs) {
          dispatch({ type: "SET_THEME", payload: prefs.theme || "system" });
          dispatch({ type: "SYNC_SAVED_VIEWS", payload: prefs.savedViews || [] });
          dispatch({ type: "SYNC_CUSTOM_QUOTES", payload: prefs.customQuotes || [] });
        }
      }),
    );

    // Subscribe to stats (completion history)
    unsubsRef.current.push(
      subscribeStats(db, uid, (stats) => {
        if (stats) {
          dispatch({ type: "SYNC_COMPLETION_HISTORY", payload: stats.completionHistory || {} });
        }
      }),
    );

    return () => {
      unsubsRef.current.forEach((fn) => fn());
      unsubsRef.current = [];
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
      dispatch({ type: "ADD_TASK", payload: newTask });
      if (state.user && db) {
        setTask(db, state.user.uid, newTask);
      }
      return newTask.id;
    },
    [state.user, state.tasks.length],
  );

  const updateTaskAction = useCallback(
    (id: string, updates: Partial<Task>) => {
      const merged = { ...updates, updatedAt: new Date().toISOString() };
      dispatch({ type: "UPDATE_TASK", payload: { id, updates: merged } });
      if (state.user && db) {
        updateTaskFields(db, state.user.uid, id, merged);
      }
    },
    [state.user],
  );

  const deleteTaskAction = useCallback(
    (id: string) => {
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
        removeTasks(db, state.user.uid, toDelete);
      }
    },
    [state.user, state.tasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return;
      const completed = !task.completed;
      const now = new Date().toISOString();
      const dateKey = now.split("T")[0];
      const updates: Partial<Task> = {
        completed,
        status: completed ? "done" : "todo",
        completedAt: completed ? now : null,
      };
      updateTaskAction(id, updates);

      // Update completion stats
      if (state.user && db) {
        if (completed) {
          incrementCompletionCount(db, state.user.uid, dateKey);
        } else {
          decrementCompletionCount(db, state.user.uid, dateKey);
        }
      }

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
    [state.tasks, state.user, updateTaskAction, addTask],
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

  const addFolderAction = useCallback(
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
        setFolder(db, state.user.uid, folder);
      }
    },
    [state.user, state.folders.length],
  );

  const updateFolderAction = useCallback(
    (id: string, updates: Partial<Folder>) => {
      dispatch({ type: "UPDATE_FOLDER", payload: { id, updates } });
      if (state.user && db) {
        updateFolderFields(db, state.user.uid, id, updates);
      }
    },
    [state.user],
  );

  const deleteFolderAction = useCallback(
    (id: string) => {
      if (id === "inbox") return;
      dispatch({ type: "DELETE_FOLDER", payload: id });
      // Move tasks to inbox
      state.tasks
        .filter((t) => t.folderId === id)
        .forEach((t) => {
          updateTaskAction(t.id, { folderId: "inbox" });
        });
      if (state.user && db) {
        removeFolder(db, state.user.uid, id);
      }
    },
    [state.user, state.tasks, updateTaskAction],
  );

  const reorderTasksAction = useCallback(
    (tasks: Task[]) => {
      dispatch({ type: "REORDER_TASKS", payload: tasks });
      if (state.user && db) {
        reorderTasksDocs(
          db,
          state.user.uid,
          tasks.map((t, i) => ({ id: t.id, order: i })),
        );
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

  // Persist theme to Firestore when changed by user
  const prevThemeRef = useRef(state.theme);
  useEffect(() => {
    if (prevThemeRef.current !== state.theme) {
      prevThemeRef.current = state.theme;
      if (state.user && db) {
        setUserPreferences(db, state.user.uid, { theme: state.theme });
      }
    }
  }, [state.theme, state.user]);

  const saveSavedViews = useCallback(
    (views: SavedViewData[]) => {
      dispatch({ type: "SYNC_SAVED_VIEWS", payload: views });
      if (state.user && db) {
        setUserPreferences(db, state.user.uid, { savedViews: views });
      } else {
        localStorage.setItem("zenflow-saved-views", JSON.stringify(views));
      }
    },
    [state.user],
  );

  const saveCustomQuotes = useCallback(
    (quotes: QuoteData[]) => {
      dispatch({ type: "SYNC_CUSTOM_QUOTES", payload: quotes });
      if (state.user && db) {
        setUserPreferences(db, state.user.uid, { customQuotes: quotes });
      } else {
        localStorage.setItem("zenflow-quotes", JSON.stringify(quotes));
      }
    },
    [state.user],
  );

  const importBackupAction = useCallback(
    (tasks: Task[], folders: Folder[]) => {
      dispatch({ type: "SET_TASKS", payload: tasks });
      dispatch({ type: "SET_FOLDERS", payload: folders });
      if (state.user && db) {
        bulkImport(db, state.user.uid, tasks, folders);
      }
    },
    [state.user],
  );

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
