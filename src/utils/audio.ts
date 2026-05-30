export const getAudioPath = (contentId: string, moment: "morning" | "night") =>
  `${import.meta.env.BASE_URL}audio/${contentId}-${moment}.mp3`;
