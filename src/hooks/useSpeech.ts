import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const splitTextForSpeech = (text: string): string[] => {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const sentences = normalized.match(/[^.!?]+[.!?]*/g) ?? [normalized];
  const chunks: string[] = [];
  let current = "";

  sentences.forEach((sentence) => {
    const next = `${current} ${sentence}`.trim();
    if (next.length <= 220) {
      current = next;
      return;
    }
    if (current) chunks.push(current);
    current = sentence.trim();
  });

  if (current) chunks.push(current);
  return chunks.filter(Boolean);
};

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const playbackIdRef = useRef(0);
  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, [isSupported]);

  const preferredVoice = useMemo(
    () =>
      voices.find((voice) => voice.lang.toLowerCase() === "pt-br" && /luciana|maria|google|brasil|female/i.test(voice.name)) ??
      voices.find((voice) => voice.lang.toLowerCase() === "pt-br") ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith("pt")),
    [voices]
  );

  const stop = useCallback(() => {
    playbackIdRef.current += 1;
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [isSupported]);

  const speakChunk = useCallback(
    (chunk: string, playbackId: number) =>
      new Promise<void>((resolve, reject) => {
        if (!isSupported || playbackId !== playbackIdRef.current) {
          resolve();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = "pt-BR";
        utterance.voice = preferredVoice ?? null;
        utterance.rate = 0.82;
        utterance.pitch = 0.95;
        utterance.volume = 1;
        utterance.onend = () => resolve();
        utterance.onerror = () => reject(new Error("Não foi possível narrar neste navegador."));
        window.speechSynthesis.speak(utterance);
      }),
    [isSupported, preferredVoice]
  );

  const speak = useCallback(
    async (text: string) => {
      stop();
      setError(null);

      if (!isSupported) {
        setError("Este navegador não oferece narração de texto.");
        return;
      }

      const chunks = splitTextForSpeech(text);
      if (chunks.length === 0) return;

      const playbackId = playbackIdRef.current;
      setIsSpeaking(true);

      try {
        for (const chunk of chunks) {
          if (playbackId !== playbackIdRef.current) return;
          await speakChunk(chunk, playbackId);
        }
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Não foi possível narrar agora.");
      } finally {
        if (playbackId === playbackIdRef.current) {
          setIsSpeaking(false);
        }
      }
    },
    [isSupported, speakChunk, stop]
  );

  useEffect(() => stop, [stop]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    error,
    voiceName: preferredVoice?.name ?? "voz do navegador"
  };
}
