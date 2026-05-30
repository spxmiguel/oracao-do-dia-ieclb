export const STORAGE_KEYS = {
  preferences: "primeiros-minutos/preferences-cache",
  completions: "primeiros-minutos/completions-cache",
  journal: "primeiros-minutos/journal-cache",
  breathing: "primeiros-minutos/breathing-cache",
  guestProfile: "primeiros-minutos/guest-profile",
  voiceProvider: "primeiros-minutos/voice-provider"
} as const;

export const clearAppCache = (): void => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};
