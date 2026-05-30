import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { DaySummaryCard } from "../components/cards/DaySummaryCard";
import { MorningCard } from "../components/cards/MorningCard";
import { NightCard } from "../components/cards/NightCard";
import { BreathingFocus } from "../components/ui/BreathingFocus";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import type { Completion, Denomination, HomeState } from "../types";
import { getDenominationLabel } from "../utils/content";
import { formatDisplayDate, isNightTime } from "../utils/date";
import { useSpeech } from "../hooks/useSpeech";
import { useTodayContent } from "../hooks/useTodayContent";

type HomeProps = {
  denomination: Denomination;
  audioEnabled: boolean;
  todayCompletion: Completion;
  currentStreak: number;
  onBreathingDone: () => Promise<void>;
  onMorningDone: () => Promise<void>;
  onNightDone: () => Promise<void>;
  onSaveJournal: (content: string) => Promise<void>;
  onOpenJournal: () => void;
};

export function Home({ denomination, audioEnabled, todayCompletion, currentStreak, onBreathingDone, onMorningDone, onNightDone, onSaveJournal, onOpenJournal }: HomeProps) {
  const [forceNight, setForceNight] = useState(false);
  const { content } = useTodayContent(denomination);
  const speech = useSpeech();
  const night = isNightTime();

  const homeState: HomeState = useMemo(() => {
    if (!todayCompletion.breathingDone) return "BREATHING";
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
        <p className="mt-2 text-sm font-semibold text-morning-accent night:text-night-accent">{getDenominationLabel(denomination)}</p>
      </header>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        {homeState === "BREATHING" && <BreathingFocus onComplete={() => void onBreathingDone()} />}
        {homeState === "MORNING" && (
          <MorningCard
            audioEnabled={audioEnabled}
            content={content}
            isSpeaking={speech.isSpeaking}
            onDone={onMorningDone}
            onSaveJournal={() => onSaveJournal(`${content.title}\n\n${content.morning.reflection}\n\n${content.morning.prayer}`)}
            onSpeak={() =>
              speech.speak(
                `${content.title}. ${content.verse.text}. ${content.verse.reference}. ${content.morning.reflection} Pausa para oração. ${content.morning.prayer}`
              )
            }
            onStop={speech.stop}
          />
        )}
        {homeState === "MIDDAY_REST" && !forceNight && (
          <Card className="space-y-5 text-center">
            <h2 className="font-serif text-3xl">Sua manhã foi entregue.</h2>
            <p className="leading-7 opacity-80">Volte à noite para fechar o dia em paz.</p>
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
