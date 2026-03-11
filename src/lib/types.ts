export type Priority = 1 | 2 | 3 | 4;

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  recurrence?: "none" | "daily" | "weekly" | "monthly";
  reminderMinutes?: number | null;
  priority: Priority;
  dueDate?: string | null;
  dueTime?: string | null;
  tags: string[];
  folderId: string;
  parentId?: string | null;
  subtaskIds: string[];
  order: number;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
  completedAt?: string | null;
}

export interface Folder {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  order: number;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  streak: number;
  lastActiveDate: string;
  completionHistory: Record<string, number>; // date string -> count
  createdAt: string;
}

export type ViewMode = "list" | "kanban" | "calendar" | "dashboard" | "folders";
export type ThemeMode = "light" | "dark" | "system";
