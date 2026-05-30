import { BookOpen, Flame } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type DaySummaryCardProps = {
  streak: number;
  onOpenJournal: () => void;
};

export function DaySummaryCard({ streak, onOpenJournal }: DaySummaryCardProps) {
  return (
    <Card className="space-y-5 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-morning-accent/20 dark:bg-night-accent/20">
        <Flame className="h-7 w-7 text-morning-accent dark:text-night-accent" />
      </div>
      <div>
        <h2 className="font-serif text-3xl">Dia concluído</h2>
        <p className="mt-3 leading-7 opacity-80">Você começou e fechou o dia com Deus. Agora descanse sem pressa.</p>
      </div>
      <p className="rounded-2xl bg-white/60 p-3 text-sm font-bold dark:bg-white/8">{streak} dia(s) de constância</p>
      <Button icon={<BookOpen className="h-4 w-4" />} onClick={onOpenJournal}>Abrir diário</Button>
    </Card>
  );
}
