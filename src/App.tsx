import { useEffect, useMemo, useState } from "react";
import { Navigation } from "./components/layout/Navigation";
import { PageContainer } from "./components/layout/PageContainer";
import { useAppState } from "./hooks/useAppState";
import { useAuth } from "./hooks/useAuth";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { Journal } from "./pages/Journal";
import { Onboarding } from "./pages/Onboarding";
import { Settings } from "./pages/Settings";
import type { AppPage } from "./types";
import { isNightTime } from "./utils/date";
import { STORAGE_KEYS } from "./utils/storage";

function App() {
  const auth = useAuth();
  const [guestProfile, setGuestProfile] = useState(() => localStorage.getItem(STORAGE_KEYS.guestProfile) === "true");
  const [guestStarted, setGuestStarted] = useState(false);
  const appState = useAppState(auth.user, guestProfile);
  const [page, setPage] = useState<AppPage>("home");

  const theme = useMemo(() => {
    if (appState.preferences.themeMode === "night") return "night";
    if (appState.preferences.themeMode === "morning") return "morning";
    return isNightTime() ? "night" : "morning";
  }, [appState.preferences.themeMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("night", theme === "night");
  }, [theme]);

  if (auth.loading || appState.loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-morning-accent dark:text-night-accent">Primeiros Minutos</p>
          <h1 className="mt-3 font-serif text-3xl">Preparando seu ritual...</h1>
        </div>
      </main>
    );
  }

  if ((!auth.user && !guestProfile) || !appState.hasProfile) {
    return (
      <Onboarding
        authError={auth.error}
        authLoading={auth.loading}
        isAuthenticated={Boolean(auth.user) || guestStarted}
        onGoogle={auth.signInWithGoogle}
        onGuestStart={() => setGuestStarted(true)}
        onSavePreferences={async (preferences) => {
          await appState.setPreferences(preferences);
          if (!auth.user) {
            localStorage.setItem(STORAGE_KEYS.guestProfile, "true");
            setGuestProfile(true);
          }
        }}
      />
    );
  }

  const email = auth.user?.email ?? "";
  const todayCompletion = appState.getTodayCompletion();

  return (
    <>
      <PageContainer>
        {appState.error && <p className="mb-4 rounded-2xl bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-200">{appState.error}</p>}
        {page === "home" && (
          <Home
            audioEnabled={appState.preferences.audioEnabled}
            completions={appState.completions}
            currentStreak={appState.currentStreak}
            denomination={appState.preferences.denomination}
            prayerProfile={appState.preferences.prayerProfile}
            onBreathingDone={appState.markBreathingDone}
            onMorningDone={appState.markMorningDone}
            onNightDone={appState.markNightDone}
            onOpenJournal={() => setPage("journal")}
            onSaveJournal={async (content) => {
              await appState.addJournalEntry({ content, mood: "grateful" });
              setPage("journal");
            }}
            todayCompletion={todayCompletion}
            totalCompletedDays={appState.totalCompletedDays}
          />
        )}
        {page === "journal" && (
          <Journal
            entries={appState.journalEntries}
            isPremium={appState.preferences.isPremium}
            onAdd={appState.addJournalEntry}
            onDelete={appState.deleteJournalEntry}
            onJoinPremium={appState.joinPremiumWaitlist}
            onUpdate={appState.updateJournalEntry}
            userEmail={email}
          />
        )}
        {page === "history" && (
          <History
            completions={appState.completions}
            currentStreak={appState.currentStreak}
            isPremium={appState.preferences.isPremium}
            onJoinPremium={appState.joinPremiumWaitlist}
            totalCompletedDays={appState.totalCompletedDays}
            userEmail={email}
          />
        )}
        {page === "settings" && (
          <Settings
            email={email}
            onJoinPremium={appState.joinPremiumWaitlist}
            onLogout={async () => {
              if (auth.user) {
                await auth.logout();
              }
              localStorage.removeItem(STORAGE_KEYS.guestProfile);
              setGuestProfile(false);
              setGuestStarted(false);
            }}
            onResetCache={appState.resetLocalCache}
            onSave={appState.setPreferences}
            preferences={appState.preferences}
          />
        )}
      </PageContainer>
      <Navigation page={page} onChange={setPage} />
    </>
  );
}

export default App;
