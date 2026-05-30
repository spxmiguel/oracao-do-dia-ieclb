import { FormEvent, useMemo, useState } from "react";
import { PremiumWaitlistModal } from "../components/premium/PremiumWaitlistModal";
import { JournalEntryCard } from "../components/cards/JournalEntryCard";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import type { JournalEntry } from "../types";

type JournalProps = {
  entries: JournalEntry[];
  isPremium: boolean;
  userEmail: string;
  onAdd: (entry: { content: string; mood?: JournalEntry["mood"] }) => Promise<unknown>;
  onUpdate: (entryId: string, updates: Partial<JournalEntry>) => Promise<void>;
  onDelete: (entryId: string) => Promise<void>;
  onJoinPremium: (email: string) => Promise<void>;
};

const moods: Array<NonNullable<JournalEntry["mood"]>> = ["peaceful", "anxious", "grateful", "tired", "sad"];

export function Journal({ entries, isPremium, userEmail, onAdd, onUpdate, onDelete, onJoinPremium }: JournalProps) {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<JournalEntry["mood"]>("peaceful");
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const [showPremium, setShowPremium] = useState(false);
  const visibleEntries = useMemo(() => (isPremium ? entries : entries.slice(0, 7)), [entries, isPremium]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!content.trim()) return;
    if (editing) {
      await onUpdate(editing.id, { content, mood });
      setEditing(null);
    } else {
      await onAdd({ content, mood });
    }
    setContent("");
    setMood("peaceful");
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-serif text-4xl">Diário</h1>
        <p className="mt-2 opacity-75">Escreva uma oração, pensamento ou reflexão privada.</p>
      </header>
      <Card>
        <form className="space-y-4" onSubmit={submit}>
          <textarea className="field min-h-36 resize-none" value={content} onChange={(event) => setContent(event.target.value)} placeholder="Deus, hoje eu..." required />
          <div className="flex flex-wrap gap-2">
            {moods.map((item) => (
              <button key={item} type="button" onClick={() => setMood(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${mood === item ? "bg-morning-text text-white night:bg-night-accent" : "bg-white/60 night:bg-white/8"}`}>
                {item}
              </button>
            ))}
          </div>
          <Button type="submit">{editing ? "Salvar edição" : "Salvar entrada"}</Button>
        </form>
      </Card>
      {!isPremium && (
        <Card className="space-y-3">
          <h2 className="font-serif text-2xl">Premium em breve</h2>
          <p className="opacity-75">No plano Free, mostramos as últimas 7 entradas. Histórico completo chegará sem cobrança agora.</p>
          <Button variant="secondary" onClick={() => setShowPremium(true)}>Premium em breve</Button>
        </Card>
      )}
      <div className="space-y-3">
        {visibleEntries.map((entry) => (
          <JournalEntryCard
            key={entry.id}
            entry={entry}
            onDelete={onDelete}
            onEdit={(next) => {
              setEditing(next);
              setContent(next.content);
              setMood(next.mood);
            }}
          />
        ))}
        {visibleEntries.length === 0 && <Card><p className="opacity-75">Seu diário ainda está em silêncio. A primeira linha já é um começo.</p></Card>}
      </div>
      {showPremium && <PremiumWaitlistModal defaultEmail={userEmail} onClose={() => setShowPremium(false)} onJoin={onJoinPremium} />}
    </div>
  );
}
