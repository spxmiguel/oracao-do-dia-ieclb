import { Clipboard, Headphones, Moon, Square } from "lucide-react";
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
  const audioText = `Oração antes de dormir. ${content.night.shortPrayer}`;
  return (
    <Card className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-morning-accent dark:text-night-accent">Noite</p>
        <h2 className="mt-2 font-serif text-3xl">Oração antes de dormir</h2>
      </div>
      <div className="rounded-3xl bg-morning-soft/80 p-5 dark:bg-night-soft">
        <p className="font-serif text-xl leading-9 opacity-90">{content.night.shortPrayer}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button icon={<Moon className="h-4 w-4" />} onClick={onDone}>Li antes de dormir</Button>
        {audioEnabled && (
          isSpeaking ? (
            <Button variant="secondary" icon={<Square className="h-4 w-4" />} onClick={onStop}>Parar narração</Button>
          ) : (
            <Button variant="secondary" icon={<Headphones className="h-4 w-4" />} onClick={() => onSpeak(audioText, audioSrc)}>Narrar oração</Button>
          )
        )}
        <Button variant="ghost" icon={<Clipboard className="h-4 w-4" />} onClick={() => void copyTextToClipboard(content.night.shortPrayer)}>Copiar oração</Button>
      </div>
    </Card>
  );
}
