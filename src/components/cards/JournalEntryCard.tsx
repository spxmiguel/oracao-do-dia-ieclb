import { Edit3, Trash2 } from "lucide-react";
import type { JournalEntry } from "../../types";
import { getMoodEmoji, getMoodLabel } from "../../utils/content";
import { Card } from "../ui/Card";

type JournalEntryCardProps = {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (entryId: string) => void;
};

export function JournalEntryCard({ entry, onEdit, onDelete }: JournalEntryCardProps) {
  return (
    <Card className="space-y-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-60">{entry.date}</p>
          <p className="mt-1 text-sm font-semibold">{getMoodEmoji(entry.mood)} {getMoodLabel(entry.mood)}</p>
        </div>
        <div className="flex gap-1">
          <button className="rounded-full p-2 hover:bg-black/5 night:hover:bg-white/10" onClick={() => onEdit(entry)} type="button" aria-label="Editar entrada">
            <Edit3 className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 text-red-600 hover:bg-red-500/10" onClick={() => onDelete(entry.id)} type="button" aria-label="Excluir entrada">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="whitespace-pre-wrap leading-7 opacity-85">{entry.content}</p>
    </Card>
  );
}
