import {
  Firestore,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { Completion, JournalEntry, UserPreferences } from "../types";

const assertUid = (uid: string): void => {
  if (!uid) {
    throw new Error("Usuário não autenticado.");
  }
};

const getDatabase = (uid: string): Firestore => {
  assertUid(uid);
  if (!db) {
    throw new Error("Configure o Firebase no arquivo .env para usar o Firestore.");
  }
  return db;
};

const defaultProfile = (preferences: UserPreferences): UserPreferences => ({
  ...preferences,
  isPremium: false
});

export const getUserProfile = async (uid: string): Promise<UserPreferences | null> => {
  assertUid(uid);
  const database = getDatabase(uid);
  const snapshot = await getDoc(doc(database, "users", uid, "profile", "main"));
  return snapshot.exists() ? (snapshot.data() as UserPreferences) : null;
};

export const createUserProfile = async (uid: string, preferences: UserPreferences): Promise<void> => {
  assertUid(uid);
  const database = getDatabase(uid);
  await setDoc(doc(database, "users", uid, "profile", "main"), {
    ...defaultProfile(preferences),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
};

export const updateUserProfile = async (uid: string, preferences: Partial<UserPreferences>): Promise<void> => {
  assertUid(uid);
  const database = getDatabase(uid);
  await setDoc(
    doc(database, "users", uid, "profile", "main"),
    { ...preferences, isPremium: preferences.isPremium ?? false, updatedAt: Timestamp.now() },
    { merge: true }
  );
};

export const listenUserProfile = (uid: string, onNext: (profile: UserPreferences | null) => void, onError: (error: Error) => void) => {
  assertUid(uid);
  const database = getDatabase(uid);
  return onSnapshot(
    doc(database, "users", uid, "profile", "main"),
    (snapshot) => onNext(snapshot.exists() ? (snapshot.data() as UserPreferences) : null),
    onError
  );
};

export const listenCompletions = (uid: string, onNext: (completions: Completion[]) => void, onError: (error: Error) => void) => {
  assertUid(uid);
  const database = getDatabase(uid);
  return onSnapshot(
    collection(database, "users", uid, "completions"),
    (snapshot) => onNext(snapshot.docs.map((item) => ({ date: item.id, ...(item.data() as Omit<Completion, "date">) }))),
    onError
  );
};

export const upsertCompletion = async (uid: string, completion: Completion): Promise<void> => {
  assertUid(uid);
  const database = getDatabase(uid);
  await setDoc(
    doc(database, "users", uid, "completions", completion.date),
    {
      morningDone: completion.morningDone,
      nightDone: completion.nightDone,
      breathingDone: completion.breathingDone,
      updatedAt: Timestamp.now()
    },
    { merge: true }
  );
};

export const listenJournalEntries = (uid: string, onNext: (entries: JournalEntry[]) => void, onError: (error: Error) => void) => {
  assertUid(uid);
  const database = getDatabase(uid);
  return onSnapshot(
    query(collection(database, "users", uid, "journal"), orderBy("createdAt", "desc")),
    (snapshot) =>
      onNext(
        snapshot.docs.map((item) => {
          const data = item.data();
          return {
            id: item.id,
            date: data.date,
            content: data.content,
            mood: data.mood,
            createdAt: data.createdAt?.toDate?.().toISOString?.(),
            updatedAt: data.updatedAt?.toDate?.().toISOString?.()
          } as JournalEntry;
        })
      ),
    onError
  );
};

export const addJournalEntry = async (uid: string, entry: JournalEntry): Promise<void> => {
  assertUid(uid);
  const database = getDatabase(uid);
  await setDoc(doc(database, "users", uid, "journal", entry.id), {
    id: entry.id,
    date: entry.date,
    content: entry.content,
    mood: entry.mood,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
};

export const updateJournalEntry = async (uid: string, entryId: string, updates: Partial<JournalEntry>): Promise<void> => {
  assertUid(uid);
  const database = getDatabase(uid);
  await setDoc(
    doc(database, "users", uid, "journal", entryId),
    { ...updates, updatedAt: Timestamp.now() },
    { merge: true }
  );
};

export const deleteJournalEntry = async (uid: string, entryId: string): Promise<void> => {
  assertUid(uid);
  const database = getDatabase(uid);
  await deleteDoc(doc(database, "users", uid, "journal", entryId));
};

export const joinPremiumWaitlist = async (uid: string, email: string): Promise<void> => {
  assertUid(uid);
  const database = getDatabase(uid);
  await setDoc(
    doc(database, "premium_waitlist", uid),
    { userId: uid, email, createdAt: Timestamp.now(), source: "premium_modal" },
    { merge: true }
  );
};
