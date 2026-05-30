import { motion } from "framer-motion";
import { Cloud, CloudOff } from "lucide-react";
import { useMemo, useState } from "react";
import { DailyStartCard } from "../components/cards/DailyStartCard";
import { DaySummaryCard } from "../components/cards/DaySummaryCard";
import { NightCard } from "../components/cards/NightCard";
import { BreathingFocus } from "../components/ui/BreathingFocus";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import type { Completion, Denomination, HomeState, PrayerProfile } from "../types";
import { getDenominationLabel } from "../utils/content";
import { formatDisplayDate, isNightTime } from "../utils/date";
import { useSpeech } from "../hooks/useSpeech";
import { useTodayContent } from "../hooks/useTodayContent";
import { useYearlyDevotion } from "../hooks/useYearlyDevotion";

type HomeProps = {
  denomination: Denomination;
  prayerProfile: PrayerProfile;
  audioEnabled: boolean;
  todayCompletion: Completion;
  currentStreak: number;
  onBreathingDone: () => Promise<void>;
  onMorningDone: () => Promise<void>;
  onNightDone: () => Promise<void>;
  onSaveJournal: (content: string) => Promise<void>;
  onOpenJournal: () => void;
  cloudSaveEnabled: boolean;
  onOpenSettings: () => void;
};

export function Home({ denomination, prayerProfile, audioEnabled, todayCompletion, currentStreak, onBreathingDone, onMorningDone, onNightDone, onSaveJournal, onOpenJournal, cloudSaveEnabled, onOpenSettings }: HomeProps) {
  const [forceNight, setForceNight] = useState(false);
  const { content } = useTodayContent(denomination);
  const yearlyDevotion = useYearlyDevotion();
  const speech = useSpeech();
  const night = isNightTime();

  const homeState: HomeState = useMemo(() => {
    if (todayCompletion.morningDone && todayCompletion.nightDone) return "COMPLETED";
    if (!night && !todayCompletion.morningDone) return "MORNING";
    if (!night && todayCompletion.morningDone && !todayCompletion.nightDone) return "MIDDAY_REST";
    if (night && !todayCompletion.nightDone) return "NIGHT";
    return "COMPLETED";
  }, [night, todayCompletion]);

  const greeting = night ? "Boa noite" : new Date().getHours() < 12 ? "Bom dia" : "Boa tarde";

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold opacity-65">{formatDisplayDate()}</p>
        <h1 className="mt-2 font-serif text-4xl">{greeting}</h1>
        <p className="mt-2 text-sm font-semibold text-morning-accent dark:text-night-accent">{getDenominationLabel(denomination)}</p>
      </header>
      <button
        className="flex w-full items-center justify-between rounded-3xl border border-black/5 bg-white/50 p-4 text-left text-sm font-semibold shadow-soft dark:border-white/10 dark:bg-white/6"
        onClick={onOpenSettings}
        type="button"
      >
        <span className="flex items-center gap-3">
          {cloudSaveEnabled ? <Cloud className="h-5 w-5 text-morning-accent dark:text-night-accent" /> : <CloudOff className="h-5 w-5 opacity-55" />}
          {cloudSaveEnabled ? "Cloud save ativo com Google" : "Entre com Google para salvar na nuvem"}
        </span>
        <span className="opacity-60">{cloudSaveEnabled ? "sincronizado" : "local"}</span>
      </button>
      {speech.error && <p className="rounded-2xl bg-amber-500/10 p-3 text-sm font-semibold text-amber-800 dark:text-amber-100">{speech.error}</p>}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        {!todayCompletion.breathingDone && (
          <div className="mb-5">
            <BreathingFocus onComplete={() => void onBreathingDone()} />
          </div>
        )}
        {homeState === "MORNING" && (
          <DailyStartCard
            audioEnabled={audioEnabled}
            completed={todayCompletion.morningDone}
            denomination={denomination}
            devotion={yearlyDevotion}
            isSpeaking={speech.isSpeaking}
            onComplete={onMorningDone}
            onSaveJournal={(journalContent) => void onSaveJournal(journalContent)}
            onSpeak={speech.speak}
            onStop={speech.stop}
            profile={prayerProfile}
          />
        )}
        {homeState === "MIDDAY_REST" && !forceNight && (
          <Card className="space-y-5 text-center">
            <h2 className="font-serif text-3xl">Sua manhã foi entregue.</h2>
            <p className="leading-7 opacity-80">A leitura de hoje já ficou com você. Volte à noite para fechar o dia em paz.</p>
            <Button variant="secondary" onClick={() => setForceNight(true)}>Abrir reflexão da noite agora</Button>
          </Card>
        )}
        {(homeState === "NIGHT" || forceNight) && (
          <NightCard audioEnabled={audioEnabled} content={content} isSpeaking={speech.isSpeaking} onDone={onNightDone} onSpeak={speech.speak} onStop={speech.stop} />
        )}
        {homeState === "COMPLETED" && <DaySummaryCard streak={currentStreak} onOpenJournal={onOpenJournal} />}
      </motion.div>
    </div>
  );
}
