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
  WorkspaceRef,
  WorkspaceMember,
  WorkspaceInvitation,
  WorkspaceRole,
  WorkspaceMessage,
  DirectMessage,
  ChatAttachment,
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
  removeTasks,
  reorderTasksDocs,
  setFolder,
  updateFolderFields,
  removeFolder,
  setUserPreferences,
  incrementCompletionCount,
  decrementCompletionCount,
  bulkImport,
  type SavedViewData,
  type QuoteData,
} from "@/lib/firestore";
import {
  subscribeUserWorkspaces,
  subscribePendingInvitations,
  subscribeWsTasks,
  subscribeWsFolders,
  subscribeWsMembers,
  setWsTask,
  updateWsTaskFields,
  removeWsTasks,
  reorderWsTasksDocs,
  setWsFolder,
  updateWsFolderFields,
  removeWsFolder,
  createWorkspace as createWsDoc,
  deleteWorkspace as deleteWsDoc,
  updateWorkspace as updateWsDoc,
  createInvitation,
  acceptInvitation as acceptInvDoc,
  declineInvitation as declineInvDoc,
  removeWorkspaceMember,
  updateMemberRole as updateMemberRoleDoc,
  logActivity,
  subscribeWsMessages,
  sendWsMessage,
  getDmChannelId,
  ensureDmChannel,
  subscribeDmMessages,
  sendDmMessage,
} from "@/lib/workspace-firestore";
import Toast from "@/components/Toast";

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
  // Workspace collaboration
  activeWorkspaceId: string | null;
  workspaces: WorkspaceRef[];
  workspaceMembers: WorkspaceMember[];
  pendingInvitations: WorkspaceInvitation[];
  workspaceMessages: WorkspaceMessage[];
  // DM state
  activeDmUserId: string | null;
  dmMessages: DirectMessage[];
  // Toast notification
  toast: { message: string; type: "success" | "error" } | null;
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
  activeWorkspaceId: null,
  workspaces: [],
  workspaceMembers: [],
  pendingInvitations: [],
  workspaceMessages: [],
  activeDmUserId: null,
  dmMessages: [],
  toast: null,
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
  | { type: "SYNC_CUSTOM_QUOTES"; payload: QuoteData[] }
  | { type: "SET_ACTIVE_WORKSPACE"; payload: string | null }
  | { type: "SYNC_WORKSPACES"; payload: WorkspaceRef[] }
  | { type: "SYNC_WORKSPACE_MEMBERS"; payload: WorkspaceMember[] }
  | { type: "SYNC_PENDING_INVITATIONS"; payload: WorkspaceInvitation[] }
  | { type: "SYNC_CHAT_MESSAGES"; payload: WorkspaceMessage[] }
  | { type: "SET_ACTIVE_DM"; payload: string | null }
  | { type: "SYNC_DM_MESSAGES"; payload: DirectMessage[] }
  | { type: "SHOW_TOAST"; payload: { message: string; type: "success" | "error" } }
  | { type: "CLEAR_TOAST" };

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
    case "SET_ACTIVE_WORKSPACE":
      return {
        ...state,
        activeWorkspaceId: action.payload,
        activeFolderId: "inbox",
        workspaceMembers: [],
        workspaceMessages: [],
        activeDmUserId: null,
        dmMessages: [],
        viewMode: "dashboard",
      };
    case "SYNC_WORKSPACES":
      return { ...state, workspaces: action.payload };
    case "SYNC_WORKSPACE_MEMBERS":
      return { ...state, workspaceMembers: action.payload };
    case "SYNC_PENDING_INVITATIONS":
      return { ...state, pendingInvitations: action.payload };
    case "SYNC_CHAT_MESSAGES":
      return { ...state, workspaceMessages: action.payload };
    case "SET_ACTIVE_DM":
      return { ...state, activeDmUserId: action.payload, dmMessages: [] };
    case "SYNC_DM_MESSAGES":
      return { ...state, dmMessages: action.payload };
    case "SHOW_TOAST":
      return { ...state, toast: action.payload };
    case "CLEAR_TOAST":
      return { ...state, toast: null };
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
  // Workspace collaboration
  switchWorkspace: (workspaceId: string | null) => void;
  createWorkspaceAction: (
    name: string,
    emoji: string,
    color: string,
    description?: string,
  ) => Promise<string>;
  deleteWorkspaceAction: (wsId: string) => Promise<void>;
  renameWorkspaceAction: (wsId: string, newName: string) => Promise<void>;
  inviteToWorkspace: (
    wsId: string,
    email: string,
    role: WorkspaceRole,
  ) => Promise<void>;
  acceptInvitationAction: (invitation: WorkspaceInvitation) => Promise<void>;
  declineInvitationAction: (invitationId: string) => Promise<void>;
  removeMemberAction: (wsId: string, uid: string) => Promise<void>;
  updateMemberRoleAction: (
    wsId: string,
    uid: string,
    role: WorkspaceRole,
  ) => Promise<void>;
  leaveWorkspace: (wsId: string) => Promise<void>;
  sendMessage: (text: string, attachment?: ChatAttachment) => void;
  openDm: (userId: string) => void;
  closeDm: () => void;
  sendDm: (text: string, attachment?: ChatAttachment) => void;
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
  const metaUnsubsRef = useRef<(() => void)[]>([]);
  const dataUnsubsRef = useRef<(() => void)[]>([]);

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

  // ── User-level metadata subscriptions (preferences, stats, workspaces, invitations) ──
  useEffect(() => {
    metaUnsubsRef.current.forEach((fn) => fn());
    metaUnsubsRef.current = [];

    if (!state.user || !db) {
      // Load from localStorage for offline/unauthenticated use
      try {
        const sv = localStorage.getItem("zenflow-saved-views");
        if (sv) dispatch({ type: "SYNC_SAVED_VIEWS", payload: JSON.parse(sv) });
      } catch {}
      try {
        const cq = localStorage.getItem("zenflow-quotes");
        if (cq)
          dispatch({ type: "SYNC_CUSTOM_QUOTES", payload: JSON.parse(cq) });
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

    // Subscribe to preferences (theme, saved views, custom quotes)
    metaUnsubsRef.current.push(
      subscribePreferences(db, uid, (prefs) => {
        if (prefs) {
          dispatch({ type: "SET_THEME", payload: prefs.theme || "system" });
          dispatch({
            type: "SYNC_SAVED_VIEWS",
            payload: prefs.savedViews || [],
          });
          dispatch({
            type: "SYNC_CUSTOM_QUOTES",
            payload: prefs.customQuotes || [],
          });
        }
      }),
    );

    // Subscribe to stats (completion history)
    metaUnsubsRef.current.push(
      subscribeStats(db, uid, (stats) => {
        if (stats) {
          dispatch({
            type: "SYNC_COMPLETION_HISTORY",
            payload: stats.completionHistory || {},
          });
        }
      }),
    );

    // Subscribe to workspace list
    metaUnsubsRef.current.push(
      subscribeUserWorkspaces(db, uid, (refs) => {
        dispatch({ type: "SYNC_WORKSPACES", payload: refs });
      }),
    );

    // Subscribe to pending invitations
    if (state.user.email) {
      metaUnsubsRef.current.push(
        subscribePendingInvitations(db, state.user.email, (invs) => {
          dispatch({ type: "SYNC_PENDING_INVITATIONS", payload: invs });
        }),
      );
    }

    return () => {
      metaUnsubsRef.current.forEach((fn) => fn());
      metaUnsubsRef.current = [];
    };
  }, [state.user]);

  // ── Data subscriptions (tasks, folders, members) — change with workspace ──
  useEffect(() => {
    dataUnsubsRef.current.forEach((fn) => fn());
    dataUnsubsRef.current = [];

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

    if (state.activeWorkspaceId) {
      // Subscribe to workspace data
      dataUnsubsRef.current.push(
        subscribeWsTasks(db, state.activeWorkspaceId, (tasks) => {
          dispatch({ type: "SYNC_TASKS", payload: tasks });
        }),
      );
      dataUnsubsRef.current.push(
        subscribeWsFolders(db, state.activeWorkspaceId, (folders) => {
          if (folders.length === 0) {
            const inbox = initialState.folders[0];
            setWsFolder(db!, state.activeWorkspaceId!, inbox);
            dispatch({ type: "SYNC_FOLDERS", payload: [inbox] });
          } else {
            dispatch({ type: "SYNC_FOLDERS", payload: folders });
          }
        }),
      );
      dataUnsubsRef.current.push(
        subscribeWsMembers(db, state.activeWorkspaceId, (members) => {
          dispatch({ type: "SYNC_WORKSPACE_MEMBERS", payload: members });
        }),
      );
      dataUnsubsRef.current.push(
        subscribeWsMessages(db, state.activeWorkspaceId, (msgs) => {
          dispatch({ type: "SYNC_CHAT_MESSAGES", payload: msgs });
        }),
      );
    } else {
      // Subscribe to personal data
      const uid = state.user.uid;
      dataUnsubsRef.current.push(
        subscribeTasks(db, uid, (tasks) => {
          dispatch({ type: "SYNC_TASKS", payload: tasks });
        }),
      );
      dataUnsubsRef.current.push(
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
    }

    return () => {
      dataUnsubsRef.current.forEach((fn) => fn());
      dataUnsubsRef.current = [];
    };
  }, [state.user, state.activeWorkspaceId]);

  // ── DM subscription — changes with activeDmUserId ──
  const dmUnsubRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    dmUnsubRef.current?.();
    dmUnsubRef.current = null;
    dispatch({ type: "SYNC_DM_MESSAGES", payload: [] });

    if (!state.user || !db || !state.activeWorkspaceId || !state.activeDmUserId)
      return;

    const channelId = getDmChannelId(state.user.uid, state.activeDmUserId);
    ensureDmChannel(
      db,
      state.activeWorkspaceId,
      state.user.uid,
      state.activeDmUserId,
    ).then(() => {
      if (!db || !state.activeWorkspaceId) return;
      dmUnsubRef.current = subscribeDmMessages(
        db,
        state.activeWorkspaceId,
        channelId,
        (msgs) => {
          dispatch({ type: "SYNC_DM_MESSAGES", payload: msgs });
        },
      );
    });

    return () => {
      dmUnsubRef.current?.();
      dmUnsubRef.current = null;
    };
  }, [state.user, state.activeWorkspaceId, state.activeDmUserId]);

  useEffect(() => {
    if (!state.activeWorkspaceId) return;

    const hasActiveWorkspace = state.workspaces.some(
      (workspace) => workspace.workspaceId === state.activeWorkspaceId,
    );

    if (!hasActiveWorkspace) {
      dispatch({ type: "SET_ACTIVE_WORKSPACE", payload: null });
    }
  }, [state.activeWorkspaceId, state.workspaces]);

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
      // Add creator info if in workspace
      if (state.activeWorkspaceId && state.user) {
        newTask.createdBy = state.user.uid;
        newTask.createdByName =
          state.user.displayName || state.user.email || "";
      }
      dispatch({ type: "ADD_TASK", payload: newTask });
      if (state.user && db) {
        if (state.activeWorkspaceId) {
          setWsTask(db, state.activeWorkspaceId, newTask);
          logActivity(db, state.activeWorkspaceId, {
            id: genId(),
            type: "task_created",
            userId: state.user.uid,
            userName: state.user.displayName || "",
            userPhotoURL: state.user.photoURL || "",
            targetId: newTask.id,
            targetTitle: newTask.title,
            detail: "",
            timestamp: now,
          });
        } else {
          setTask(db, state.user.uid, newTask);
        }
      }
      return newTask.id;
    },
    [state.user, state.tasks.length, state.activeWorkspaceId],
  );

  const updateTaskAction = useCallback(
    (id: string, updates: Partial<Task>) => {
      const merged = { ...updates, updatedAt: new Date().toISOString() };
      dispatch({ type: "UPDATE_TASK", payload: { id, updates: merged } });
      if (state.user && db) {
        if (state.activeWorkspaceId) {
          updateWsTaskFields(db, state.activeWorkspaceId, id, merged);
        } else {
          updateTaskFields(db, state.user.uid, id, merged);
        }
      }
    },
    [state.user, state.activeWorkspaceId],
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
        if (state.activeWorkspaceId) {
          removeWsTasks(db, state.activeWorkspaceId, toDelete);
        } else {
          removeTasks(db, state.user.uid, toDelete);
        }
      }
    },
    [state.user, state.tasks, state.activeWorkspaceId],
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
        if (state.activeWorkspaceId) {
          setWsFolder(db, state.activeWorkspaceId, folder);
        } else {
          setFolder(db, state.user.uid, folder);
        }
      }
    },
    [state.user, state.folders.length, state.activeWorkspaceId],
  );

  const updateFolderAction = useCallback(
    (id: string, updates: Partial<Folder>) => {
      dispatch({ type: "UPDATE_FOLDER", payload: { id, updates } });
      if (state.user && db) {
        if (state.activeWorkspaceId) {
          updateWsFolderFields(db, state.activeWorkspaceId, id, updates);
        } else {
          updateFolderFields(db, state.user.uid, id, updates);
        }
      }
    },
    [state.user, state.activeWorkspaceId],
  );

  const deleteFolderAction = useCallback(
    (id: string) => {
      if (id === "inbox") return;
      dispatch({ type: "DELETE_FOLDER", payload: id });
      state.tasks
        .filter((t) => t.folderId === id)
        .forEach((t) => {
          updateTaskAction(t.id, { folderId: "inbox" });
        });
      if (state.user && db) {
        if (state.activeWorkspaceId) {
          removeWsFolder(db, state.activeWorkspaceId, id);
        } else {
          removeFolder(db, state.user.uid, id);
        }
      }
    },
    [state.user, state.tasks, updateTaskAction, state.activeWorkspaceId],
  );

  const reorderTasksAction = useCallback(
    (tasks: Task[]) => {
      dispatch({ type: "REORDER_TASKS", payload: tasks });
      if (state.user && db) {
        const items = tasks.map((t, i) => ({ id: t.id, order: i }));
        if (state.activeWorkspaceId) {
          reorderWsTasksDocs(db, state.activeWorkspaceId, items);
        } else {
          reorderTasksDocs(db, state.user.uid, items);
        }
      }
    },
    [state.user, state.activeWorkspaceId],
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

  // ── Workspace actions ───────────────────

  const switchWorkspace = useCallback((workspaceId: string | null) => {
    dispatch({ type: "SET_ACTIVE_WORKSPACE", payload: workspaceId });
  }, []);

  const createWorkspaceAction = useCallback(
    async (
      name: string,
      emoji: string,
      color: string,
      description?: string,
    ): Promise<string> => {
      if (!state.user || !db) throw new Error("Not authenticated");
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
        updatedAt: now,
      };
      await createWsDoc(db, workspace, {
        uid: state.user.uid,
        displayName: state.user.displayName || "",
        email: state.user.email || "",
        photoURL: state.user.photoURL || "",
      });
      return id;
    },
    [state.user],
  );

  const deleteWorkspaceActionFn = useCallback(
    async (wsId: string) => {
      if (!db) return;
      const wsName =
        state.workspaces.find((w) => w.workspaceId === wsId)?.name ||
        "Workspace";
      await deleteWsDoc(db, wsId, state.user?.uid);
      if (state.activeWorkspaceId === wsId) {
        dispatch({ type: "SET_ACTIVE_WORKSPACE", payload: null });
      }
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: `"${wsName}" has been deleted`, type: "success" },
      });
    },
    [state.activeWorkspaceId, state.user?.uid, state.workspaces],
  );

  const renameWorkspaceActionFn = useCallback(
    async (wsId: string, newName: string) => {
      if (!db) return;
      await updateWsDoc(db, wsId, { name: newName, updatedAt: new Date().toISOString() });
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: `Workspace renamed to "${newName}"`, type: "success" },
      });
    },
    [],
  );

  const inviteToWorkspaceAction = useCallback(
    async (wsId: string, email: string, role: WorkspaceRole) => {
      if (!state.user || !db) return;
      const ws = state.workspaces.find((w) => w.workspaceId === wsId);
      await createInvitation(db, {
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
        createdAt: new Date().toISOString(),
      });
    },
    [state.user, state.workspaces],
  );

  const acceptInvitationAction = useCallback(
    async (invitation: WorkspaceInvitation) => {
      if (!state.user || !db) return;
      await acceptInvDoc(db, invitation, {
        uid: state.user.uid,
        displayName: state.user.displayName || "",
        email: state.user.email || "",
        photoURL: state.user.photoURL || "",
      });
    },
    [state.user],
  );

  const declineInvitationActionFn = useCallback(
    async (invitationId: string) => {
      if (!db) return;
      await declineInvDoc(db, invitationId);
    },
    [],
  );

  const removeMemberActionFn = useCallback(
    async (wsId: string, uid: string) => {
      if (!db) return;
      await removeWorkspaceMember(db, wsId, uid);
    },
    [],
  );

  const updateMemberRoleActionFn = useCallback(
    async (wsId: string, uid: string, role: WorkspaceRole) => {
      if (!db) return;
      await updateMemberRoleDoc(db, wsId, uid, role);
    },
    [],
  );

  const leaveWorkspaceAction = useCallback(
    async (wsId: string) => {
      if (!state.user || !db) return;
      await removeWorkspaceMember(db, wsId, state.user.uid);
      if (state.activeWorkspaceId === wsId) {
        dispatch({ type: "SET_ACTIVE_WORKSPACE", payload: null });
      }
    },
    [state.user, state.activeWorkspaceId],
  );

  const sendMessageAction = useCallback(
    (text: string, attachment?: ChatAttachment) => {
      if (!state.user || !db || !state.activeWorkspaceId) return;
      if (!text.trim() && !attachment) return;
      const msg: WorkspaceMessage = {
        id: genId(),
        text: text.trim(),
        userId: state.user.uid,
        userName: state.user.displayName || state.user.email || "",
        userPhotoURL: state.user.photoURL || "",
        createdAt: new Date().toISOString(),
        ...(attachment ? { attachment } : {}),
      };
      sendWsMessage(db, state.activeWorkspaceId, msg);
    },
    [state.user, state.activeWorkspaceId],
  );

  const openDmAction = useCallback((userId: string) => {
    dispatch({ type: "SET_ACTIVE_DM", payload: userId });
  }, []);

  const closeDmAction = useCallback(() => {
    dispatch({ type: "SET_ACTIVE_DM", payload: null });
  }, []);

  const sendDmAction = useCallback(
    (text: string, attachment?: ChatAttachment) => {
      if (
        !state.user ||
        !db ||
        !state.activeWorkspaceId ||
        !state.activeDmUserId
      )
        return;
      if (!text.trim() && !attachment) return;
      const channelId = getDmChannelId(state.user.uid, state.activeDmUserId);
      const msg: DirectMessage = {
        id: genId(),
        text: text.trim(),
        senderId: state.user.uid,
        senderName: state.user.displayName || state.user.email || "",
        senderPhotoURL: state.user.photoURL || "",
        createdAt: new Date().toISOString(),
        ...(attachment ? { attachment } : {}),
      };
      sendDmMessage(db, state.activeWorkspaceId, channelId, msg);
    },
    [state.user, state.activeWorkspaceId, state.activeDmUserId],
  );

  // Auto-dismiss toast
  useEffect(() => {
    if (!state.toast) return;
    const timer = setTimeout(() => dispatch({ type: "CLEAR_TOAST" }), 4000);
    return () => clearTimeout(timer);
  }, [state.toast]);

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
        switchWorkspace,
        createWorkspaceAction,
        deleteWorkspaceAction: deleteWorkspaceActionFn,
        renameWorkspaceAction: renameWorkspaceActionFn,
        inviteToWorkspace: inviteToWorkspaceAction,
        acceptInvitationAction,
        declineInvitationAction: declineInvitationActionFn,
        removeMemberAction: removeMemberActionFn,
        updateMemberRoleAction: updateMemberRoleActionFn,
        leaveWorkspace: leaveWorkspaceAction,
        sendMessage: sendMessageAction,
        openDm: openDmAction,
        closeDm: closeDmAction,
        sendDm: sendDmAction,
      }}
    >
      {children}
      {state.toast && <Toast message={state.toast.message} type={state.toast.type} onClose={() => dispatch({ type: "CLEAR_TOAST" })} />}
    </AppContext.Provider>
  );
}
