export type Denomination =
  | "evangelical"
  | "catholic"
  | "non_religious_christian";

export type DailyContent = {
  id: string;
  dayIndex: number;
  denomination: Denomination;
  title: string;
  verse: {
    reference: string;
    text: string;
  };
  morning: {
    reflection: string;
    prayer: string;
    practicalGoal: string;
    audioText: string;
  };
  night: {
    question: string;
    shortPrayer: string;
    checklist: string[];
  };
  tags: string[];
};

export type UserPreferences = {
  denomination: Denomination;
  morningReminderTime: string;
  nightReminderTime: string;
  audioEnabled: boolean;
  themeMode: "auto" | "morning" | "night";
  prayerProfile: PrayerProfile;
  isPremium: boolean;
};

export type PrayerFocus =
  | "peace"
  | "gratitude"
  | "direction"
  | "family"
  | "forgiveness"
  | "discipline";

export type PrayerTone = "intimate" | "reverent" | "direct";

export type PrayerLength = "short" | "balanced" | "deep";

export type PrayerProfile = {
  focus: PrayerFocus;
  tone: PrayerTone;
  length: PrayerLength;
  includePersonalRequests: boolean;
};

export type YearlyDevotion = {
  dayIndex: number;
  word: string;
  verse: {
    reference: string;
    text: string;
  };
  gratitudeSeed: string;
  surrenderSeed: string;
  requestSeed: string;
  practiceSeed: string;
};

export type Completion = {
  date: string;
  morningDone: boolean;
  nightDone: boolean;
  breathingDone: boolean;
};

export type JournalEntry = {
  id: string;
  date: string;
  content: string;
  mood?: "peaceful" | "anxious" | "grateful" | "tired" | "sad";
  createdAt?: string;
  updatedAt?: string;
};

export type HomeState =
  | "BREATHING"
  | "MORNING"
  | "MIDDAY_REST"
  | "NIGHT"
  | "COMPLETED";

export type AppPage = "home" | "journal" | "history" | "settings";
