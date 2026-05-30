import { PremiumWaitlistModal } from "../components/premium/PremiumWaitlistModal";
import { GamificationCard } from "../components/cards/GamificationCard";
import { StreakCalendar } from "../components/cards/StreakCalendar";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import type { Completion } from "../types";
import { useState } from "react";

type HistoryProps = {
  completions: Completion[];
  currentStreak: number;
  totalCompletedDays: number;
  isPremium: boolean;
  userEmail: string;
  onJoinPremium: (email: string) => Promise<void>;
};

export function History({ completions, currentStreak, totalCompletedDays, isPremium, userEmail, onJoinPremium }: HistoryProps) {
  const [showPremium, setShowPremium] = useState(false);
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-serif text-4xl">Histórico</h1>
        <p className="mt-2 opacity-75">Constância simples, sem ranking e sem comparação.</p>
      </header>
      <div className="grid grid-cols-2 gap-3">
        <Card><p className="text-sm opacity-65">Streak atual</p><p className="mt-2 font-serif text-4xl">{currentStreak}</p></Card>
        <Card><p className="text-sm opacity-65">Dias completos</p><p className="mt-2 font-serif text-4xl">{totalCompletedDays}</p></Card>
      </div>
      <GamificationCard completions={completions} currentStreak={currentStreak} totalCompletedDays={totalCompletedDays} />
      <Card className="space-y-4">
        <StreakCalendar completions={completions} isPremium={isPremium} />
        <div className="grid gap-2 text-sm opacity-75">
          <span>Claro: sem conclusão</span>
          <span>Destaque suave: só manhã ou só noite</span>
          <span>Destaque cheio: manhã e noite feitas</span>
        </div>
      </Card>
      <Card className="space-y-3">
        <h2 className="font-serif text-2xl">Últimos 7 dias</h2>
        {[...completions]
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 7)
          .map((completion) => (
            <div key={completion.date} className="flex items-center justify-between rounded-2xl bg-white/55 p-3 text-sm dark:bg-white/8">
              <span className="font-semibold">{completion.date}</span>
              <span className="opacity-75">
                {completion.morningDone && completion.nightDone ? "dia completo" : completion.morningDone ? "manhã feita" : completion.nightDone ? "noite feita" : "em aberto"}
              </span>
            </div>
          ))}
        {completions.length === 0 && <p className="text-sm opacity-75">Nenhum ritual concluído ainda. Respiração, manhã e noite começam a alimentar seu histórico.</p>}
      </Card>
      {!isPremium && (
        <Card className="space-y-3">
          <h2 className="font-serif text-2xl">Premium em breve</h2>
          <p className="opacity-75">Detalhes completos ficam limitados aos últimos 7 dias no Free. Nenhuma cobrança será feita agora.</p>
          <Button variant="secondary" onClick={() => setShowPremium(true)}>Premium em breve</Button>
        </Card>
      )}
      {showPremium && <PremiumWaitlistModal defaultEmail={userEmail} onClose={() => setShowPremium(false)} onJoin={onJoinPremium} />}
    </div>
  );
}
