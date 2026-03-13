import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  writeBatch,
  getDocs,
  increment,
  type DocumentReference,
  type Firestore,
} from "firebase/firestore";
import type {
  Task,
  Folder,
  Workspace,
  WorkspaceMember,
  WorkspaceRef,
  WorkspaceInvitation,
  WorkspaceRole,
  ActivityEntry,
  WorkspaceMessage,
  DirectMessage,
} from "@/lib/types";

// ─── Path helpers ─────────────────────────

const wsDoc = (db: Firestore, wsId: string) => doc(db, "workspaces", wsId);
const wsMembersCol = (db: Firestore, wsId: string) =>
  collection(db, "workspaces", wsId, "members");
const wsMemberDoc = (db: Firestore, wsId: string, uid: string) =>
  doc(db, "workspaces", wsId, "members", uid);
const wsTasksCol = (db: Firestore, wsId: string) =>
  collection(db, "workspaces", wsId, "tasks");
const wsTaskDoc = (db: Firestore, wsId: string, taskId: string) =>
  doc(db, "workspaces", wsId, "tasks", taskId);
const wsFoldersCol = (db: Firestore, wsId: string) =>
  collection(db, "workspaces", wsId, "folders");
const wsFolderDoc = (db: Firestore, wsId: string, folderId: string) =>
  doc(db, "workspaces", wsId, "folders", folderId);
const wsActivityCol = (db: Firestore, wsId: string) =>
  collection(db, "workspaces", wsId, "activity");
const wsMessagesCol = (db: Firestore, wsId: string) =>
  collection(db, "workspaces", wsId, "messages");
const wsDmsCol = (db: Firestore, wsId: string) =>
  collection(db, "workspaces", wsId, "dms");
const userWsCol = (db: Firestore, uid: string) =>
  collection(db, "users", uid, "workspaces");
const userWsDoc = (db: Firestore, uid: string, wsId: string) =>
  doc(db, "users", uid, "workspaces", wsId);
const invitationsCol = (db: Firestore) => collection(db, "invitations");
const invitationDoc = (db: Firestore, invId: string) =>
  doc(db, "invitations", invId);

async function deleteRefsInBatches(
  db: Firestore,
  refs: DocumentReference[],
  batchSize = 400,
) {
  for (let index = 0; index < refs.length; index += batchSize) {
    const batch = writeBatch(db);
    refs.slice(index, index + batchSize).forEach((ref) => batch.delete(ref));
    await batch.commit();
  }
}

// ─── Workspace CRUD ───────────────────────

export async function createWorkspace(
  db: Firestore,
  workspace: Workspace,
  creator: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
  },
) {
  const batch = writeBatch(db);
  // 1. Create workspace document
  batch.set(wsDoc(db, workspace.id), workspace);
  // 2. Add creator as owner member
  const member: WorkspaceMember = {
    uid: creator.uid,
    displayName: creator.displayName,
    email: creator.email,
    photoURL: creator.photoURL,
    role: "owner",
    joinedAt: workspace.createdAt,
    invitedBy: creator.uid,
  };
  batch.set(wsMemberDoc(db, workspace.id, creator.uid), member);
  // 3. Add workspace ref to user's index
  const ref: WorkspaceRef = {
    workspaceId: workspace.id,
    name: workspace.name,
    emoji: workspace.emoji,
    color: workspace.color,
    role: "owner",
    memberCount: 1,
    joinedAt: workspace.createdAt,
  };
  batch.set(userWsDoc(db, creator.uid, workspace.id), ref);
  // 4. Create inbox folder
  const inbox: Folder = {
    id: "inbox",
    name: "Inbox",
    icon: "inbox",
    color: "#6366f1",
    order: 0,
    createdAt: workspace.createdAt,
  };
  batch.set(wsFolderDoc(db, workspace.id, "inbox"), inbox);
  await batch.commit();
}

export async function deleteWorkspace(
  db: Firestore,
  wsId: string,
  currentUid?: string,
) {
  // Gather all subcollection docs first so we know what to clean up
  const membersSnap = await getDocs(wsMembersCol(db, wsId));
  const tasksSnap = await getDocs(wsTasksCol(db, wsId));
  const foldersSnap = await getDocs(wsFoldersCol(db, wsId));
  const activitySnap = await getDocs(wsActivityCol(db, wsId));
  const messagesSnap = await getDocs(wsMessagesCol(db, wsId));

  // DMs and invitations may fail due to security rules; treat as best-effort
  let dmsSnap: Awaited<ReturnType<typeof getDocs>> | null = null;
  let invitationsSnap: Awaited<ReturnType<typeof getDocs>> | null = null;
  try {
    dmsSnap = await getDocs(wsDmsCol(db, wsId));
  } catch (err) {
    console.warn("deleteWorkspace: could not read DM channels:", err);
  }
  try {
    invitationsSnap = await getDocs(
      query(invitationsCol(db), where("workspaceId", "==", wsId)),
    );
  } catch (err) {
    console.warn("deleteWorkspace: could not read invitations:", err);
  }

  // Delete workspace root doc FIRST while the owner's member doc still exists,
  // otherwise the isOwner() security rule check will fail.
  await deleteRefsInBatches(db, [wsDoc(db, wsId)]);

  // Now delete all remaining subcollection and related documents.
  // Keep the current user's member doc until the very end so isMember()
  // checks pass for all subcollection deletions across batches.
  const refsToDelete: DocumentReference[] = [];
  const deferredRefs: DocumentReference[] = [];

  // Member workspace refs + member docs
  membersSnap.docs.forEach((d) => {
    const uid = d.data().uid;
    refsToDelete.push(userWsDoc(db, uid, wsId));
    if (currentUid && uid === currentUid) {
      deferredRefs.push(d.ref);
    } else {
      refsToDelete.push(d.ref);
    }
  });

  tasksSnap.docs.forEach((d) => refsToDelete.push(d.ref));
  foldersSnap.docs.forEach((d) => refsToDelete.push(d.ref));
  activitySnap.docs.forEach((d) => refsToDelete.push(d.ref));
  messagesSnap.docs.forEach((d) => refsToDelete.push(d.ref));

  // DM messages and channel docs
  if (dmsSnap) {
    for (const channelDoc of dmsSnap.docs) {
      try {
        const dmMessagesSnap = await getDocs(
          collection(channelDoc.ref, "messages"),
        );
        dmMessagesSnap.docs.forEach((d) =>
          refsToDelete.push(d.ref as DocumentReference),
        );
      } catch {
        // DM message read may be denied; skip
      }
      refsToDelete.push(channelDoc.ref as DocumentReference);
    }
  }

  if (invitationsSnap) {
    invitationsSnap.docs.forEach((d) =>
      refsToDelete.push(d.ref as DocumentReference),
    );
  }

  await deleteRefsInBatches(db, refsToDelete);

  // Delete the current user's member doc last
  if (deferredRefs.length > 0) {
    await deleteRefsInBatches(db, deferredRefs);
  }
}

export async function updateWorkspace(
  db: Firestore,
  wsId: string,
  updates: Partial<Workspace>,
) {
  await setDoc(wsDoc(db, wsId), updates, { merge: true });
  // Update cached info in all members' workspace refs
  if (updates.name || updates.emoji || updates.color) {
    const membersSnap = await getDocs(wsMembersCol(db, wsId));
    const batch = writeBatch(db);
    const refUpdates: Partial<WorkspaceRef> = {};
    if (updates.name) refUpdates.name = updates.name;
    if (updates.emoji) refUpdates.emoji = updates.emoji;
    if (updates.color) refUpdates.color = updates.color;
    membersSnap.docs.forEach((d) => {
      batch.set(userWsDoc(db, d.data().uid, wsId), refUpdates, { merge: true });
    });
    await batch.commit();
  }
}

// ─── Subscriptions ────────────────────────

export function subscribeUserWorkspaces(
  db: Firestore,
  uid: string,
  callback: (refs: WorkspaceRef[]) => void,
) {
  return onSnapshot(
    userWsCol(db, uid),
    (snap) => {
      const refs = snap.docs.map((d) => d.data() as WorkspaceRef);
      callback(refs);
    },
    (err) => {
      console.warn("subscribeUserWorkspaces:", err.message);
      callback([]);
    },
  );
}

export function subscribeWsMembers(
  db: Firestore,
  wsId: string,
  callback: (members: WorkspaceMember[]) => void,
) {
  return onSnapshot(
    wsMembersCol(db, wsId),
    (snap) => {
      const members = snap.docs.map((d) => d.data() as WorkspaceMember);
      members.sort((a, b) => {
        const order: Record<WorkspaceRole, number> = {
          owner: 0,
          admin: 1,
          member: 2,
          viewer: 3,
        };
        return order[a.role] - order[b.role];
      });
      callback(members);
    },
    (err) => {
      console.warn("subscribeWsMembers:", err.message);
      callback([]);
    },
  );
}

export function subscribeWsTasks(
  db: Firestore,
  wsId: string,
  callback: (tasks: Task[]) => void,
) {
  const q = query(wsTasksCol(db, wsId), orderBy("order", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      const tasks = snap.docs.map((d) => d.data() as Task);
      callback(tasks);
    },
    (err) => {
      console.warn("subscribeWsTasks:", err.message);
      callback([]);
    },
  );
}

export function subscribeWsFolders(
  db: Firestore,
  wsId: string,
  callback: (folders: Folder[]) => void,
) {
  const q = query(wsFoldersCol(db, wsId), orderBy("order", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      const folders = snap.docs.map((d) => d.data() as Folder);
      callback(folders);
    },
    (err) => {
      console.warn("subscribeWsFolders:", err.message);
      callback([]);
    },
  );
}

export function subscribeWsActivity(
  db: Firestore,
  wsId: string,
  callback: (entries: ActivityEntry[]) => void,
  maxEntries = 50,
) {
  const q = query(
    wsActivityCol(db, wsId),
    orderBy("timestamp", "desc"),
    limit(maxEntries),
  );
  return onSnapshot(
    q,
    (snap) => {
      callback(snap.docs.map((d) => d.data() as ActivityEntry));
    },
    (err) => {
      console.warn("subscribeWsActivity:", err.message);
      callback([]);
    },
  );
}

export function subscribePendingInvitations(
  db: Firestore,
  email: string,
  callback: (invitations: WorkspaceInvitation[]) => void,
) {
  const q = query(
    invitationsCol(db),
    where("invitedEmail", "==", email.toLowerCase()),
    where("status", "==", "pending"),
  );
  return onSnapshot(
    q,
    (snap) => {
      callback(
        snap.docs.map(
          (d) => ({ ...d.data(), id: d.id }) as WorkspaceInvitation,
        ),
      );
    },
    (err) => {
      console.warn("subscribePendingInvitations:", err.message);
      callback([]);
    },
  );
}

// ─── Members ──────────────────────────────

export async function addWorkspaceMember(
  db: Firestore,
  wsId: string,
  member: WorkspaceMember,
) {
  const batch = writeBatch(db);
  // Add member to workspace
  batch.set(wsMemberDoc(db, wsId, member.uid), member);
  // Get workspace data for ref
  const wsSnap = await getDoc(wsDoc(db, wsId));
  const ws = wsSnap.data() as Workspace;
  // Add workspace ref to user's index
  const ref: WorkspaceRef = {
    workspaceId: wsId,
    name: ws.name,
    emoji: ws.emoji,
    color: ws.color,
    role: member.role,
    memberCount: ws.memberCount + 1,
    joinedAt: member.joinedAt,
  };
  batch.set(userWsDoc(db, member.uid, wsId), ref);
  // Increment member count on workspace
  batch.set(wsDoc(db, wsId), { memberCount: increment(1) }, { merge: true });
  await batch.commit();
}

export async function removeWorkspaceMember(
  db: Firestore,
  wsId: string,
  uid: string,
) {
  const batch = writeBatch(db);
  batch.delete(wsMemberDoc(db, wsId, uid));
  batch.delete(userWsDoc(db, uid, wsId));
  batch.set(wsDoc(db, wsId), { memberCount: increment(-1) }, { merge: true });
  await batch.commit();
}

export async function updateMemberRole(
  db: Firestore,
  wsId: string,
  uid: string,
  role: WorkspaceRole,
) {
  const batch = writeBatch(db);
  batch.set(wsMemberDoc(db, wsId, uid), { role }, { merge: true });
  batch.set(userWsDoc(db, uid, wsId), { role }, { merge: true });
  await batch.commit();
}

// ─── Invitations ──────────────────────────

export async function createInvitation(
  db: Firestore,
  invitation: Omit<WorkspaceInvitation, "id">,
) {
  const id = crypto.randomUUID();
  await setDoc(invitationDoc(db, id), { ...invitation, id });
  return id;
}

export async function acceptInvitation(
  db: Firestore,
  invitation: WorkspaceInvitation,
  user: { uid: string; displayName: string; email: string; photoURL: string },
) {
  const now = new Date().toISOString();
  const member: WorkspaceMember = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role: invitation.role,
    joinedAt: now,
    invitedBy: invitation.invitedBy,
  };
  // Add member
  await addWorkspaceMember(db, invitation.workspaceId, member);
  // Update invitation status
  await setDoc(
    invitationDoc(db, invitation.id),
    { status: "accepted" },
    { merge: true },
  );
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
    timestamp: now,
  });
}

export async function declineInvitation(db: Firestore, invitationId: string) {
  await setDoc(
    invitationDoc(db, invitationId),
    { status: "declined" },
    { merge: true },
  );
}

// ─── Workspace Tasks ──────────────────────

export async function setWsTask(db: Firestore, wsId: string, task: Task) {
  await setDoc(wsTaskDoc(db, wsId, task.id), task);
}

export async function updateWsTaskFields(
  db: Firestore,
  wsId: string,
  taskId: string,
  fields: Partial<Task>,
) {
  await setDoc(wsTaskDoc(db, wsId, taskId), fields, { merge: true });
}

export async function removeWsTasks(
  db: Firestore,
  wsId: string,
  taskIds: string[],
) {
  const batch = writeBatch(db);
  taskIds.forEach((id) => batch.delete(wsTaskDoc(db, wsId, id)));
  await batch.commit();
}

export async function reorderWsTasksDocs(
  db: Firestore,
  wsId: string,
  items: { id: string; order: number }[],
) {
  const batch = writeBatch(db);
  items.forEach(({ id, order }) =>
    batch.set(wsTaskDoc(db, wsId, id), { order }, { merge: true }),
  );
  await batch.commit();
}

// ─── Workspace Folders ────────────────────

export async function setWsFolder(db: Firestore, wsId: string, folder: Folder) {
  await setDoc(wsFolderDoc(db, wsId, folder.id), folder);
}

export async function updateWsFolderFields(
  db: Firestore,
  wsId: string,
  folderId: string,
  fields: Partial<Folder>,
) {
  await setDoc(wsFolderDoc(db, wsId, folderId), fields, { merge: true });
}

export async function removeWsFolder(
  db: Firestore,
  wsId: string,
  folderId: string,
) {
  await deleteDoc(wsFolderDoc(db, wsId, folderId));
}

// ─── Activity ─────────────────────────────

export async function logActivity(
  db: Firestore,
  wsId: string,
  entry: ActivityEntry,
) {
  await setDoc(doc(wsActivityCol(db, wsId), entry.id), entry);
}

// ─── Chat Messages ───────────────────────

export function subscribeWsMessages(
  db: Firestore,
  wsId: string,
  callback: (messages: WorkspaceMessage[]) => void,
  maxMessages = 200,
) {
  const q = query(
    wsMessagesCol(db, wsId),
    orderBy("createdAt", "asc"),
    limit(maxMessages),
  );
  return onSnapshot(
    q,
    (snap) => {
      callback(snap.docs.map((d) => d.data() as WorkspaceMessage));
    },
    (err) => {
      console.warn("subscribeWsMessages:", err.message);
      callback([]);
    },
  );
}

export async function sendWsMessage(
  db: Firestore,
  wsId: string,
  message: WorkspaceMessage,
) {
  await setDoc(doc(wsMessagesCol(db, wsId), message.id), message);
}

// ─── Direct Messages ───────────────────

export function getDmChannelId(uid1: string, uid2: string): string {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
}

const wsDmDoc = (db: Firestore, wsId: string, channelId: string) =>
  doc(db, "workspaces", wsId, "dms", channelId);

const wsDmMessagesCol = (db: Firestore, wsId: string, channelId: string) =>
  collection(db, "workspaces", wsId, "dms", channelId, "messages");

export async function ensureDmChannel(
  db: Firestore,
  wsId: string,
  uid1: string,
  uid2: string,
) {
  const channelId = getDmChannelId(uid1, uid2);
  const ref = wsDmDoc(db, wsId, channelId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const sorted = uid1 < uid2 ? [uid1, uid2] : [uid2, uid1];
    await setDoc(ref, {
      participants: sorted,
      createdAt: new Date().toISOString(),
    });
  }
  return channelId;
}

export function subscribeDmMessages(
  db: Firestore,
  wsId: string,
  channelId: string,
  callback: (messages: DirectMessage[]) => void,
  maxMessages = 200,
) {
  const q = query(
    wsDmMessagesCol(db, wsId, channelId),
    orderBy("createdAt", "asc"),
    limit(maxMessages),
  );
  return onSnapshot(
    q,
    (snap) => {
      callback(snap.docs.map((d) => d.data() as DirectMessage));
    },
    (err) => {
      console.warn("subscribeDmMessages:", err.message);
      callback([]);
    },
  );
}

export async function sendDmMessage(
  db: Firestore,
  wsId: string,
  channelId: string,
  message: DirectMessage,
) {
  await setDoc(doc(wsDmMessagesCol(db, wsId, channelId), message.id), message);
}
