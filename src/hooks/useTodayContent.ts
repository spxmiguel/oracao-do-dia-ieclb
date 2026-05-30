import { dailyContent } from "../data";
import type { Denomination } from "../types";
import { getDayIndex } from "../utils/date";

export function useTodayContent(denomination: Denomination) {
  const dayIndex = getDayIndex();
  const contentList = dailyContent[denomination] ?? dailyContent.evangelical;
  const content = contentList.find((item) => item.dayIndex === dayIndex) ?? contentList[0] ?? dailyContent.evangelical[0];

  return { dayIndex, content };
}
