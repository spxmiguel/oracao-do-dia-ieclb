import { yearlyDevotions } from "../data/yearlyDevotions";
import { getYearDayIndex } from "../utils/date";

export function useYearlyDevotion() {
  const dayIndex = getYearDayIndex();
  return yearlyDevotions[dayIndex] ?? yearlyDevotions[0];
}
