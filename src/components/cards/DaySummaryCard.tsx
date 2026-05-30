import { RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type DaySummaryCardProps = {
  onReread: () => void;
};

export function DaySummaryCard({ onReread }: DaySummaryCardProps) {
  return (
    <Card className="space-y-5 text-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-morning-accent dark:text-night-accent">Hoje</p>
        <h2 className="mt-2 font-serif text-3xl">Tudo já lido por hoje.</h2>
        <p className="mt-3 leading-7 opacity-80">Deseja reler a mensagem da manhã ou a oração antes de dormir?</p>
      </div>
      <Button icon={<RotateCcw className="h-4 w-4" />} onClick={onReread}>Reler</Button>
    </Card>
  );
}
