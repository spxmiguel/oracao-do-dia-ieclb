import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { STORAGE_KEYS } from "../utils/storage";

type VoiceProvider = "google_translate" | "browser";

const getVoiceProvider = (): VoiceProvider =>
  localStorage.getItem(STORAGE_KEYS.voiceProvider) === "browser" ? "browser" : "google_translate";

const splitTextForGoogle = (text: string): string[] => {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const sentences = normalized.match(/[^.!?]+[.!?]*/g) ?? [normalized];
  const chunks: string[] = [];
  let current = "";

  sentences.forEach((sentence) => {
    const next = `${current} ${sentence}`.trim();
    if (next.length <= 180) {
      current = next;
      return;
    }
    if (current) chunks.push(current);
    if (sentence.length <= 180) {
      current = sentence.trim();
      return;
    }
    sentence.match(/.{1,170}(\s|$)/g)?.forEach((part) => chunks.push(part.trim()));
    current = "";
  });

  if (current) chunks.push(current);
  return chunks.filter(Boolean);
};

const googleTranslateAudioUrl = (text: string): string =>
  `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=pt-BR&q=${encodeURIComponent(text)}`;

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playbackIdRef = useRef(0);
  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, [isSupported]);

  const preferredVoice = useMemo(
    () =>
      voices.find((voice) => voice.lang.toLowerCase() === "pt-br" && /google|luciana|maria|female|brasil/i.test(voice.name)) ??
      voices.find((voice) => voice.lang.toLowerCase() === "pt-br") ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith("pt")),
    [voices]
  );

  const stop = useCallback(() => {
    playbackIdRef.current += 1;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [isSupported]);

  const speakWithGoogleTranslate = useCallback(
    async (text: string) => {
      const chunks = splitTextForGoogle(text);
      if (chunks.length === 0) return false;

      const playbackId = playbackIdRef.current;
      setIsSpeaking(true);

      for (const chunk of chunks) {
        if (playbackId !== playbackIdRef.current) return true;
        const audio = new Audio(googleTranslateAudioUrl(chunk));
        audio.preload = "auto";
        audioRef.current = audio;

        try {
          await audio.play();
          await new Promise<void>((resolve, reject) => {
            audio.onended = () => resolve();
            audio.onerror = () => reject(new Error("Google Translate TTS falhou."));
          });
        } catch {
          setIsSpeaking(false);
          audioRef.current = null;
          return false;
        }
      }

      if (playbackId === playbackIdRef.current) {
        setIsSpeaking(false);
        audioRef.current = null;
      }
      return true;
    },
    []
  );

  const speakWithBrowser = useCallback(
    (text: string) => {
      if (!isSupported) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.voice = preferredVoice ?? null;
      utterance.rate = 0.8;
      utterance.pitch = 0.92;
      utterance.volume = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, preferredVoice]
  );

  const speak = useCallback(
    async (text: string, audioSrc?: string) => {
      stop();
      setError(null);

      if (getVoiceProvider() === "google_translate") {
        const played = await speakWithGoogleTranslate(text);
        if (played) return;
        setError("Narrador do Google indisponível agora. Usei a voz do navegador.");
      }

      if (audioSrc && getVoiceProvider() === "browser") {
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          audioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          audioRef.current = null;
          speakWithBrowser(text);
        };

        try {
          setIsSpeaking(true);
          await audio.play();
          return;
        } catch {
          setIsSpeaking(false);
          audioRef.current = null;
        }
      }

      speakWithBrowser(text);
    },
    [speakWithBrowser, speakWithGoogleTranslate, stop]
  );

  useEffect(() => stop, [stop]);

  return { speak, stop, isSpeaking, isSupported, error, voiceName: getVoiceProvider() === "google_translate" ? "Narrador Google" : preferredVoice?.name ?? "voz do navegador" };
}
