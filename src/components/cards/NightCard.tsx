import { Check, Clipboard, Headphones, Moon, Square } from "lucide-react";
import type { DailyContent } from "../../types";
import { copyTextToClipboard } from "../../utils/content";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type NightCardProps = {
  content: DailyContent;
  audioEnabled: boolean;
  isSpeaking: boolean;
  onSpeak: (text: string, audioSrc?: string) => void | Promise<void>;
  onStop: () => void;
  onDone: () => void;
  audioSrc?: string;
};

export function NightCard({ content, audioEnabled, isSpeaking, onSpeak, onStop, onDone, audioSrc }: NightCardProps) {
  const audioText = `${content.night.question}. ${content.night.shortPrayer}`;
  return (
    <Card className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-morning-accent dark:text-night-accent">Noite</p>
        <h2 className="mt-2 font-serif text-3xl">Fechar o dia em paz</h2>
      </div>
      <div className="rounded-3xl bg-morning-soft/80 p-4 dark:bg-night-soft">
        <p className="text-sm font-bold">Pergunta noturna</p>
        <p className="mt-2 font-serif text-xl leading-relaxed">{content.night.question}</p>
      </div>
      <div className="space-y-3">
        {content.night.checklist.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/55 p-3 dark:bg-white/6">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-morning-accent/20 text-morning-text dark:bg-night-accent/20 dark:text-night-text">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium">{item}</span>
          </div>
        ))}
      </div>
      <div>
        <p className="text-sm font-bold">Oração noturna</p>
        <p className="mt-2 leading-7 opacity-85">{content.night.shortPrayer}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button icon={<Moon className="h-4 w-4" />} onClick={onDone}>Fechar meu dia</Button>
        {audioEnabled && (
          isSpeaking ? (
            <Button variant="secondary" icon={<Square className="h-4 w-4" />} onClick={onStop}>Parar narração</Button>
          ) : (
            <Button variant="secondary" icon={<Headphones className="h-4 w-4" />} onClick={() => onSpeak(audioText, audioSrc)}>Narrar fechamento</Button>
          )
        )}
        <Button variant="ghost" icon={<Clipboard className="h-4 w-4" />} onClick={() => void copyTextToClipboard(content.night.shortPrayer)}>Copiar oração</Button>
      </div>
    </Card>
  );
}
