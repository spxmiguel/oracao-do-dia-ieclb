import { motion } from "framer-motion";
import { BookOpen, Moon } from "lucide-react";
import { useState } from "react";
import { DailyStartCard } from "../components/cards/DailyStartCard";
import { DaySummaryCard } from "../components/cards/DaySummaryCard";
import { NightCard } from "../components/cards/NightCard";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import type { Completion, Denomination, PrayerProfile } from "../types";
import { getDenominationLabel } from "../utils/content";
import { formatDisplayDate } from "../utils/date";
import { useSpeech } from "../hooks/useSpeech";
import { useTodayContent } from "../hooks/useTodayContent";
import { useYearlyDevotion } from "../hooks/useYearlyDevotion";

type HomeProps = {
  denomination: Denomination;
  prayerProfile: PrayerProfile;
  audioEnabled: boolean;
  todayCompletion: Completion;
  onBreathingDone: () => Promise<void>;
  onMorningDone: () => Promise<void>;
  onNightDone: () => Promise<void>;
  onSaveJournal: (content: string) => Promise<void>;
};

type RereadChoice = "morning" | "night" | null;

export function Home({ denomination, prayerProfile, audioEnabled, todayCompletion, onBreathingDone, onMorningDone, onNightDone, onSaveJournal }: HomeProps) {
  const [showNight, setShowNight] = useState(false);
  const [showRereadMenu, setShowRereadMenu] = useState(false);
  const [rereadChoice, setRereadChoice] = useState<RereadChoice>(null);
  const { content } = useTodayContent(denomination);
  const yearlyDevotion = useYearlyDevotion();
  const speech = useSpeech();
  const allReadToday = todayCompletion.morningDone && todayCompletion.nightDone;
  const shouldShowMorning = !allReadToday || rereadChoice === "morning";
  const shouldShowNight = showNight || rereadChoice === "night";

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold opacity-65">{formatDisplayDate()}</p>
        <h1 className="font-serif text-4xl leading-tight">Start para o dia</h1>
        <p className="max-w-xl leading-7 opacity-75">Uma mensagem diária para ler com calma e uma oração para colocar os primeiros minutos diante de Deus.</p>
        <p className="text-sm font-semibold text-morning-accent">{getDenominationLabel(denomination)}</p>
      </header>

      <motion.div className="space-y-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        {allReadToday && !showRereadMenu && !rereadChoice && <DaySummaryCard onReread={() => setShowRereadMenu(true)} />}

        {allReadToday && showRereadMenu && !rereadChoice && (
          <Card className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-morning-accent">Reler</p>
              <h2 className="mt-2 font-serif text-2xl">O que você quer reler?</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button variant="secondary" icon={<BookOpen className="h-4 w-4" />} onClick={() => setRereadChoice("morning")}>
                Ler de manhã
              </Button>
              <Button variant="secondary" icon={<Moon className="h-4 w-4" />} onClick={() => setRereadChoice("night")}>
                Ler de noite
              </Button>
            </div>
          </Card>
        )}

        {shouldShowMorning && (
          <DailyStartCard
            audioEnabled={audioEnabled}
            completed={todayCompletion.morningDone}
            denomination={denomination}
            devotion={yearlyDevotion}
            isSpeaking={speech.isSpeaking}
            onComplete={async () => {
              if (!todayCompletion.breathingDone) {
                await onBreathingDone();
              }
              await onMorningDone();
            }}
            onSaveJournal={(journalContent) => void onSaveJournal(journalContent)}
            onSpeak={speech.speak}
            onStop={speech.stop}
            profile={prayerProfile}
          />
        )}

        {todayCompletion.morningDone && !todayCompletion.nightDone && !showNight && !rereadChoice && (
          <Card className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-morning-accent">Mais tarde</p>
              <h2 className="mt-2 font-serif text-2xl">Oração antes de dormir</h2>
            </div>
            <p className="leading-7 opacity-78">Quando for se deitar, volte aqui para ler uma oração curta e fechar o dia em paz.</p>
            <Button variant="secondary" icon={<Moon className="h-4 w-4" />} onClick={() => setShowNight(true)}>
              Abrir oração da noite
            </Button>
          </Card>
        )}

        {shouldShowNight && (
          <NightCard audioEnabled={audioEnabled} content={content} isSpeaking={speech.isSpeaking} onDone={onNightDone} onSpeak={speech.speak} onStop={speech.stop} />
        )}
      </motion.div>
    </div>
  );
}
