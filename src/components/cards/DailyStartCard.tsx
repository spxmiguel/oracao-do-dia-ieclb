import { BookOpen, CheckCircle2, Clipboard, Headphones, PenLine, Square } from "lucide-react";
import type { Denomination, PrayerProfile, YearlyDevotion } from "../../types";
import { copyTextToClipboard } from "../../utils/content";
import { formatBookDate } from "../../utils/date";
import { buildPersonalPrayer } from "../../utils/personalPrayer";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type DailyStartCardProps = {
  devotion: YearlyDevotion;
  profile: PrayerProfile;
  denomination: Denomination;
  audioEnabled: boolean;
  isSpeaking: boolean;
  completed: boolean;
  onComplete: () => Promise<void>;
  onSaveJournal: (content: string) => void;
  onSpeak: (text: string) => void | Promise<void>;
  onStop: () => void;
};

export function DailyStartCard({
  devotion,
  profile,
  denomination,
  audioEnabled,
  isSpeaking,
  completed,
  onComplete,
  onSaveJournal,
  onSpeak,
  onStop
}: DailyStartCardProps) {
  const prayer = buildPersonalPrayer(devotion, profile, denomination);
  const audioText = `${devotion.title}. Leia: ${devotion.readReference}. ${devotion.verse.text}. ${devotion.devotional}. Oração: ${prayer}`;
  const journalText = `${formatBookDate()}\n${devotion.title}\n\nLeia: ${devotion.readReference}\n${devotion.verse.text}\n\n${devotion.devotional}\n\nORAÇÃO\n${prayer}`;

  return (
    <Card className="overflow-hidden p-0">
      <article className="relative bg-white/68 px-5 py-6 dark:bg-white/6 sm:px-7">
        <div className="absolute right-5 top-5 rounded-full border border-morning-accent/25 px-3 py-1 text-xs font-extrabold uppercase text-morning-accent dark:border-night-accent/35 dark:text-night-accent">
          {formatBookDate()}
        </div>

        <div className="pr-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-morning-accent dark:text-night-accent">
            Start para o dia
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{devotion.title}</h2>
        </div>

        <p className="mt-5 text-sm font-bold opacity-75">
          Leia: <span className="opacity-100">{devotion.readReference}</span>
        </p>

        <blockquote className="mt-4 border-l-4 border-morning-accent/50 pl-4 dark:border-night-accent/70">
          <p className="font-serif text-xl leading-relaxed">“{devotion.verse.text}”</p>
          <cite className="mt-2 block text-sm not-italic opacity-65">{devotion.verse.reference}</cite>
        </blockquote>

        <div className="mt-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-morning-accent dark:text-night-accent">Mensagem do dia</p>
          <p className="mt-3 whitespace-pre-line font-serif text-[1.08rem] leading-9 opacity-90">{devotion.devotional}</p>
        </div>

        <div className="mt-6 rounded-2xl bg-white/75 p-4 dark:bg-white/8">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] opacity-65">Oração</p>
          <p className="mt-3 whitespace-pre-line leading-7">{prayer}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button icon={<CheckCircle2 className="h-4 w-4" />} onClick={onComplete}>
            {completed ? "Lido hoje" : "Marcar como lido"}
          </Button>
          {audioEnabled &&
            (isSpeaking ? (
              <Button variant="secondary" icon={<Square className="h-4 w-4" />} onClick={onStop}>
                Parar
              </Button>
            ) : (
              <Button variant="secondary" icon={<Headphones className="h-4 w-4" />} onClick={() => onSpeak(audioText)}>
                Narrar
              </Button>
            ))}
          <Button variant="ghost" icon={<Clipboard className="h-4 w-4" />} onClick={() => void copyTextToClipboard(prayer)}>
            Copiar oração
          </Button>
          <Button
            variant="ghost"
            icon={<BookOpen className="h-4 w-4" />}
            onClick={() => void copyTextToClipboard(`${devotion.verse.text} - ${devotion.verse.reference}`)}
          >
            Copiar versículo
          </Button>
          <Button variant="secondary" icon={<PenLine className="h-4 w-4" />} onClick={() => onSaveJournal(journalText)}>
            Salvar no diário
          </Button>
        </div>
      </article>
    </Card>
  );
}
