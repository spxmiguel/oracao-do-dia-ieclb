import { denominationLabels } from "../data/denominations";
import type { Denomination, JournalEntry } from "../types";

export const getDenominationLabel = (denomination: Denomination): string =>
  denominationLabels[denomination];

export const getMoodLabel = (mood?: JournalEntry["mood"]): string => {
  const labels: Record<NonNullable<JournalEntry["mood"]>, string> = {
    peaceful: "Em paz",
    anxious: "Ansioso",
    grateful: "Grato",
    tired: "Cansado",
    sad: "Triste"
  };
  return mood ? labels[mood] : "Sem humor";
};

export const getMoodEmoji = (mood?: JournalEntry["mood"]): string => {
  const emojis: Record<NonNullable<JournalEntry["mood"]>, string> = {
    peaceful: "☀",
    anxious: "~",
    grateful: "+",
    tired: "z",
    sad: "·"
  };
  return mood ? emojis[mood] : "•";
};

export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const element = document.createElement("textarea");
    element.value = text;
    element.style.position = "fixed";
    element.style.opacity = "0";
    document.body.appendChild(element);
    element.focus();
    element.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(element);
    return copied;
  } catch {
    return false;
  }
};
