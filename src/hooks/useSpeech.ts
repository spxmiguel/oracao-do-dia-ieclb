import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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

      if (audioSrc) {
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
    [speakWithBrowser, stop]
  );

  useEffect(() => stop, [stop]);

  return { speak, stop, isSpeaking, isSupported, voiceName: preferredVoice?.name ?? "áudio do ritual" };
}
