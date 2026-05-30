import { User } from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as firestore from "../services/firestore";
import type { Completion, JournalEntry, UserPreferences } from "../types";
import { getTodayKey } from "../utils/date";
import { clearAppCache, STORAGE_KEYS } from "../utils/storage";
import { useLocalStorage } from "./useLocalStorage";

const defaultPreferences: UserPreferences = {
  denomination: "evangelical",
  morningReminderTime: "07:00",
  nightReminderTime: "21:30",
  audioEnabled: true,
  themeMode: "auto",
  isPremium: false
};

const emptyTodayCompletion = (): Completion => ({
  date: getTodayKey(),
  morningDone: false,
  nightDone: false,
  breathingDone: false
});

const sortJournal = (entries: JournalEntry[]) =>
  [...entries].sort((a, b) => {
    const dateA = a.createdAt ?? a.date;
    const dateB = b.createdAt ?? b.date;
    return dateB.localeCompare(dateA);
  });

export function useAppState(user: User | null, hasGuestProfile = false) {
  const [preferences, setPreferencesCache] = useLocalStorage<UserPreferences>(STORAGE_KEYS.preferences, defaultPreferences);
  const [completions, setCompletionsCache] = useLocalStorage<Completion[]>(STORAGE_KEYS.completions, []);
  const [journalEntries, setJournalCache] = useLocalStorage<JournalEntry[]>(STORAGE_KEYS.journal, []);
  const [loading, setLoading] = useState(Boolean(user));
  const [error, setError] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setHasProfile(hasGuestProfile);
      return;
    }

    setLoading(true);
    const handleError = (caught: Error) => {
      setError(caught.message);
      setLoading(false);
    };

    const unsubscribeProfile = firestore.listenUserProfile(
      user.uid,
      (profile) => {
        setHasProfile(Boolean(profile));
        if (profile) {
          setPreferencesCache({ ...defaultPreferences, ...profile, isPremium: false });
        }
        setLoading(false);
      },
      handleError
    );
    const unsubscribeCompletions = firestore.listenCompletions(user.uid, setCompletionsCache, handleError);
    const unsubscribeJournal = firestore.listenJournalEntries(user.uid, (entries) => setJournalCache(sortJournal(entries)), handleError);

    return () => {
      unsubscribeProfile();
      unsubscribeCompletions();
      unsubscribeJournal();
    };
  }, [hasGuestProfile, setCompletionsCache, setJournalCache, setPreferencesCache, user]);

  const getTodayCompletion = useCallback((): Completion => {
    const today = getTodayKey();
    return completions.find((completion) => completion.date === today) ?? emptyTodayCompletion();
  }, [completions]);

  const saveCompletion = useCallback(
    async (updates: Partial<Completion>) => {
      const next = { ...getTodayCompletion(), ...updates, date: getTodayKey() };
      setCompletionsCache((previous) => {
        const withoutToday = previous.filter((item) => item.date !== next.date);
        return [...withoutToday, next];
      });
      if (user) {
        await firestore.upsertCompletion(user.uid, next);
      }
    },
    [getTodayCompletion, setCompletionsCache, user]
  );

  const setPreferences = useCallback(
    async (nextPreferences: UserPreferences) => {
      const safePreferences = { ...nextPreferences, isPremium: false };
      setPreferencesCache(safePreferences);
      if (user) {
        const existing = await firestore.getUserProfile(user.uid);
        if (existing) {
          await firestore.updateUserProfile(user.uid, safePreferences);
        } else {
          await firestore.createUserProfile(user.uid, safePreferences);
          setHasProfile(true);
        }
      } else {
        setHasProfile(true);
      }
    },
    [setPreferencesCache, user]
  );

  const markBreathingDone = useCallback(() => saveCompletion({ breathingDone: true }), [saveCompletion]);
  const markMorningDone = useCallback(() => saveCompletion({ morningDone: true, breathingDone: true }), [saveCompletion]);
  const markNightDone = useCallback(() => saveCompletion({ nightDone: true, breathingDone: true }), [saveCompletion]);

  const addJournalEntry = useCallback(
    async (entry: Omit<JournalEntry, "id" | "date" | "createdAt" | "updatedAt"> & { date?: string }) => {
      const next: JournalEntry = {
        id: crypto.randomUUID(),
        date: entry.date ?? getTodayKey(),
        content: entry.content,
        mood: entry.mood,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setJournalCache((previous) => sortJournal([next, ...previous]));
      if (user) {
        await firestore.addJournalEntry(user.uid, next);
      }
      return next;
    },
    [setJournalCache, user]
  );

  const updateJournalEntry = useCallback(
    async (entryId: string, updates: Partial<JournalEntry>) => {
      const nextUpdates = { ...updates, updatedAt: new Date().toISOString() };
      setJournalCache((previous) => sortJournal(previous.map((entry) => (entry.id === entryId ? { ...entry, ...nextUpdates } : entry))));
      if (user) {
        await firestore.updateJournalEntry(user.uid, entryId, nextUpdates);
      }
    },
    [setJournalCache, user]
  );

  const deleteJournalEntry = useCallback(
    async (entryId: string) => {
      setJournalCache((previous) => previous.filter((entry) => entry.id !== entryId));
      if (user) {
        await firestore.deleteJournalEntry(user.uid, entryId);
      }
    },
    [setJournalCache, user]
  );

  const resetLocalCache = useCallback(() => {
    clearAppCache();
    setPreferencesCache(defaultPreferences);
    setCompletionsCache([]);
    setJournalCache([]);
  }, [setCompletionsCache, setJournalCache, setPreferencesCache]);

  const currentStreak = useMemo(() => {
    let streak = 0;
    const completedDates = new Set(completions.filter((item) => item.morningDone && item.nightDone).map((item) => item.date));
    const date = new Date();
    for (let index = 0; index < 365; index += 1) {
      if (!completedDates.has(getTodayKey(date))) break;
      streak += 1;
      date.setDate(date.getDate() - 1);
    }
    return streak;
  }, [completions]);

  const totalCompletedDays = useMemo(
    () => completions.filter((item) => item.morningDone && item.nightDone).length,
    [completions]
  );

  const joinPremiumWaitlist = useCallback(
    async (email: string) => {
      if (!user) throw new Error("Entre com uma conta para participar da lista de espera.");
      await firestore.joinPremiumWaitlist(user.uid, email);
    },
    [user]
  );

  return {
    preferences,
    completions,
    journalEntries,
    hasCompletedBreathingToday: getTodayCompletion().breathingDone,
    loading,
    error,
    hasProfile,
    setPreferences,
    markBreathingDone,
    markMorningDone,
    markNightDone,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    resetLocalCache,
    getTodayCompletion,
    currentStreak,
    totalCompletedDays,
    joinPremiumWaitlist
  };
}
