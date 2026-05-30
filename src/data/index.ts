import type { DailyContent, Denomination } from "../types";
import { catholicContent } from "./content/catholic";
import { evangelicalContent } from "./content/evangelical";
import { nonReligiousChristianContent } from "./content/nonReligiousChristian";

export const dailyContent: Record<Denomination, DailyContent[]> = {
  evangelical: evangelicalContent,
  catholic: catholicContent,
  non_religious_christian: nonReligiousChristianContent
};

export { denominations, denominationLabels } from "./denominations";
export {
  prayerDiscoveryFocusOptions,
  prayerDiscoveryLengthOptions,
  prayerDiscoveryToneOptions,
  prayerFocusOptions,
  prayerLengthOptions,
  prayerToneOptions
} from "./prayerProfile";
