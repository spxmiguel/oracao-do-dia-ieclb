import type { Completion } from "../types";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
};

export type GamificationProgress = {
  xp: number;
  level: number;
  levelProgress: number;
  nextLevelXp: number;
  achievements: Achievement[];
};

const XP_PER_LEVEL = 120;

export const getGamificationProgress = (
  completions: Completion[],
  currentStreak: number,
  totalCompletedDays: number
): GamificationProgress => {
  const xp = completions.reduce((total, completion) => {
    const breathing = completion.breathingDone ? 10 : 0;
    const morning = completion.morningDone ? 40 : 0;
    const night = completion.nightDone ? 50 : 0;
    return total + breathing + morning + night;
  }, 0);

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const levelProgress = xp % XP_PER_LEVEL;

  return {
    xp,
    level,
    levelProgress,
    nextLevelXp: XP_PER_LEVEL,
    achievements: [
      {
        id: "first-breath",
        title: "Primeiro minuto",
        description: "Respirou e entregou o começo a Deus.",
        unlocked: completions.some((completion) => completion.breathingDone)
      },
      {
        id: "full-day",
        title: "Dia completo",
        description: "Fez manhã e noite no mesmo dia.",
        unlocked: totalCompletedDays >= 1
      },
      {
        id: "three-days",
        title: "Três manhãs firmes",
        description: "Manteve constância por 3 dias completos.",
        unlocked: currentStreak >= 3 || totalCompletedDays >= 3
      },
      {
        id: "seven-days",
        title: "Semana de paz",
        description: "Chegou a 7 dias completos.",
        unlocked: currentStreak >= 7 || totalCompletedDays >= 7
      }
    ]
  };
};
