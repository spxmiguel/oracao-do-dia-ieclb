export const getTodayKey = (date = new Date()): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getDayIndex = (date = new Date()): number => {
  const base = new Date(2026, 0, 5);
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = Math.floor((today.getTime() - base.getTime()) / 86_400_000);
  return ((diff % 7) + 7) % 7;
};

export const formatDisplayDate = (date = new Date()): string =>
  new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  }).format(date);

export const isNightTime = (date = new Date()): boolean => date.getHours() >= 18;
