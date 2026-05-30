import { BookOpen, Check, Clipboard, Headphones, PenLine, Square } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import type { DailyContent } from "../../types";
import { copyTextToClipboard } from "../../utils/content";

type MorningCardProps = {
  content: DailyContent;
  audioEnabled: boolean;
  isSpeaking: boolean;
  onSpeak: (text: string, audioSrc?: string) => void | Promise<void>;
  onStop: () => void;
  onDone: () => void;
  onSaveJournal: () => void;
  audioSrc?: string;
};

export function MorningCard({ content, audioEnabled, isSpeaking, onSpeak, onStop, onDone, onSaveJournal, audioSrc }: MorningCardProps) {
  return (
    <Card className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-morning-accent night:text-night-accent">Manhã</p>
        <h2 className="mt-2 font-serif text-3xl">{content.title}</h2>
      </div>
      <blockquote className="rounded-3xl bg-morning-soft/80 p-4 night:bg-night-soft">
        <p className="font-serif text-xl leading-relaxed">“{content.verse.text}”</p>
        <cite className="mt-3 block text-sm not-italic opacity-70">{content.verse.reference}</cite>
      </blockquote>
      <p className="leading-7 opacity-85">{content.morning.reflection}</p>
      <div className="rounded-3xl bg-white/55 p-4 night:bg-white/6">
        <p className="text-sm font-bold">Oração</p>
        <p className="mt-2 leading-7 opacity-85">{content.morning.prayer}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button icon={<Check className="h-4 w-4" />} onClick={onDone}>Marcar como feito</Button>
        {audioEnabled && (
          isSpeaking ? (
            <Button variant="secondary" icon={<Square className="h-4 w-4" />} onClick={onStop}>Parar narração</Button>
          ) : (
            <Button variant="secondary" icon={<Headphones className="h-4 w-4" />} onClick={() => onSpeak(content.morning.audioText, audioSrc)}>Narrar devocional</Button>
          )
        )}
        <Button variant="ghost" icon={<Clipboard className="h-4 w-4" />} onClick={() => void copyTextToClipboard(content.morning.prayer)}>Copiar oração</Button>
        <Button variant="ghost" icon={<BookOpen className="h-4 w-4" />} onClick={() => void copyTextToClipboard(`${content.verse.text} — ${content.verse.reference}`)}>Copiar versículo</Button>
        <Button variant="secondary" icon={<PenLine className="h-4 w-4" />} onClick={onSaveJournal}>Salvar no diário</Button>
      </div>
    </Card>
  );
}
