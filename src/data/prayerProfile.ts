import type { PrayerFocus, PrayerLength, PrayerTone } from "../types";

export const prayerFocusLabels: Record<PrayerFocus, string> = {
  peace: "Paz e ansiedade",
  gratitude: "Gratidão",
  direction: "Direção",
  family: "Família",
  forgiveness: "Perdão",
  discipline: "Disciplina"
};

export const prayerToneLabels: Record<PrayerTone, string> = {
  intimate: "Íntima",
  reverent: "Reverente",
  direct: "Direta"
};

export const prayerLengthLabels: Record<PrayerLength, string> = {
  short: "Curta",
  balanced: "Equilibrada",
  deep: "Mais profunda"
};

export const prayerFocusOptions = Object.entries(prayerFocusLabels).map(([value, label]) => ({
  value: value as PrayerFocus,
  label
}));

export const prayerToneOptions = Object.entries(prayerToneLabels).map(([value, label]) => ({
  value: value as PrayerTone,
  label
}));

export const prayerLengthOptions = Object.entries(prayerLengthLabels).map(([value, label]) => ({
  value: value as PrayerLength,
  label
}));
