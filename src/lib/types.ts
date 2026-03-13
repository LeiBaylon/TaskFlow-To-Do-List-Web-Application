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
  // Collaboration fields (workspace tasks only)
  assigneeId?: string | null;
  assigneeName?: string | null;
  assigneePhotoURL?: string | null;
  createdBy?: string;
  createdByName?: string;
}

export interface FolderAssignee {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface Folder {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  order: number;
  createdAt: string;
  assignees?: FolderAssignee[];
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

export type ViewMode =
  | "list"
  | "kanban"
  | "calendar"
  | "dashboard"
  | "folders"
  | "settings"
  | "members"
  | "chat";
export type ThemeMode = "light" | "dark" | "system";

// ─── Collaboration ─────────────────────────

export type WorkspaceRole = "owner" | "admin" | "member" | "viewer";

export interface Workspace {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  ownerId: string;
  ownerName: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: WorkspaceRole;
  joinedAt: string;
  invitedBy: string;
}

export interface WorkspaceRef {
  workspaceId: string;
  name: string;
  emoji: string;
  color: string;
  role: WorkspaceRole;
  memberCount: number;
  joinedAt: string;
}

export interface WorkspaceInvitation {
  id: string;
  workspaceId: string;
  workspaceName: string;
  workspaceEmoji: string;
  workspaceColor: string;
  invitedEmail: string;
  invitedBy: string;
  invitedByName: string;
  invitedByPhotoURL: string;
  role: WorkspaceRole;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

export interface ActivityEntry {
  id: string;
  type:
    | "task_created"
    | "task_completed"
    | "task_assigned"
    | "member_joined"
    | "member_removed"
    | "folder_created";
  userId: string;
  userName: string;
  userPhotoURL: string;
  targetId: string;
  targetTitle: string;
  detail: string;
  timestamp: string;
}

export interface ChatAttachment {
  url: string;
  name: string;
  type: "image" | "file";
  size?: number;
}

export interface WorkspaceMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhotoURL: string;
  createdAt: string;
  attachment?: ChatAttachment;
}

export interface DirectMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderPhotoURL: string;
  createdAt: string;
  attachment?: ChatAttachment;
}
