import { BookOpen, Clipboard, Headphones, PenLine, Sparkles, Square } from "lucide-react";
import type { Denomination, PrayerProfile, YearlyDevotion } from "../../types";
import { copyTextToClipboard } from "../../utils/content";
import { buildPersonalPrayer } from "../../utils/personalPrayer";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type PersonalPrayerCardProps = {
  devotion: YearlyDevotion;
  profile: PrayerProfile;
  denomination: Denomination;
  audioEnabled: boolean;
  isSpeaking: boolean;
  onSpeak: (text: string) => void | Promise<void>;
  onStop: () => void;
  onSaveJournal: (content: string) => void;
};

export function PersonalPrayerCard({
  devotion,
  profile,
  denomination,
  audioEnabled,
  isSpeaking,
  onSpeak,
  onStop,
  onSaveJournal
}: PersonalPrayerCardProps) {
  const prayer = buildPersonalPrayer(devotion, profile, denomination);

  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-morning-accent dark:text-night-accent">
            <Sparkles className="h-4 w-4" />
            Palavra do dia
          </p>
          <h2 className="mt-2 font-serif text-3xl">{devotion.word}</h2>
        </div>
        <span className="rounded-full bg-morning-accent/15 px-3 py-1 text-xs font-bold dark:bg-night-accent/18">
          {devotion.dayIndex + 1}/365
        </span>
      </div>

      <blockquote className="rounded-3xl bg-morning-soft/80 p-4 dark:bg-night-soft">
        <p className="font-serif text-lg leading-relaxed">“{devotion.verse.text}”</p>
        <cite className="mt-3 block text-sm not-italic opacity-70">{devotion.verse.reference}</cite>
      </blockquote>

      <div className="rounded-3xl bg-white/55 p-4 dark:bg-white/6">
        <p className="text-sm font-bold">Sua oração de hoje</p>
        <p className="mt-3 whitespace-pre-line leading-7 opacity-85">{prayer}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {audioEnabled && (
          isSpeaking ? (
            <Button variant="secondary" icon={<Square className="h-4 w-4" />} onClick={onStop}>Parar oração</Button>
          ) : (
            <Button variant="secondary" icon={<Headphones className="h-4 w-4" />} onClick={() => onSpeak(prayer)}>Ouvir oração</Button>
          )
        )}
        <Button variant="ghost" icon={<Clipboard className="h-4 w-4" />} onClick={() => void copyTextToClipboard(prayer)}>Copiar oração</Button>
        <Button variant="ghost" icon={<BookOpen className="h-4 w-4" />} onClick={() => void copyTextToClipboard(`${devotion.verse.text} — ${devotion.verse.reference}`)}>Copiar versículo</Button>
        <Button variant="secondary" icon={<PenLine className="h-4 w-4" />} onClick={() => onSaveJournal(`${devotion.word}\n\n${devotion.verse.text} — ${devotion.verse.reference}\n\n${prayer}`)}>Salvar no diário</Button>
      </div>
    </Card>
  );
}
