import type { Denomination, PrayerFocus, PrayerProfile, YearlyDevotion } from "../types";

const focusRequests: Record<PrayerFocus, string> = {
  peace: "acalmes meu interior e me ensines a respirar antes de carregar pesos que não são meus",
  gratitude: "abras meus olhos para reconhecer tua bondade em detalhes simples",
  direction: "mostres o próximo passo com clareza, humildade e coragem",
  family: "abençoes minha casa, minhas conversas e os vínculos que precisam de cuidado",
  forgiveness: "cures ressentimentos e me dês coragem para pedir e oferecer perdão",
  discipline: "formes em mim constância serena, sem culpa e sem desistência"
};

const denominationClosings: Record<Denomination, string> = {
  evangelical: "Em nome de Jesus, amém.",
  catholic: "Por Cristo, nosso Senhor. Amém.",
  non_religious_christian: "Em Jesus, amém."
};

const openings = {
  intimate: "Pai amado",
  reverent: "Senhor Deus",
  direct: "Jesus"
};

const trimByLength = (parts: string[], length: PrayerProfile["length"]) => {
  if (length === "short") return [parts[0], parts[3], parts[5]];
  if (length === "deep") return parts;
  return [parts[0], parts[2], parts[3], parts[5]];
};

export const buildPersonalPrayer = (
  devotion: YearlyDevotion,
  profile: PrayerProfile,
  denomination: Denomination
) => {
  const parts = [
    `${openings[profile.tone]}, obrigado ${devotion.gratitudeSeed}.`,
    `Hoje eu recebo tua Palavra: ${devotion.verse.reference}. Que ela encontre espaço real dentro de mim.`,
    `Eu ${devotion.surrenderSeed}.`,
    `Peço que tu ${focusRequests[profile.focus]}.`,
    profile.includePersonalRequests
      ? `Também coloco diante de ti os pedidos que ainda não consigo explicar direito. ${devotion.requestSeed}.`
      : `${devotion.requestSeed}.`,
    `Guarda meu coração durante este dia e faz tua Palavra permanecer em mim com paz. ${denominationClosings[denomination]}`
  ];

  return trimByLength(parts, profile.length).join("\n\n");
};
