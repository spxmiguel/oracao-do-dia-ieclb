import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { STORAGE_KEYS } from "../utils/storage";

type VoiceProvider = "browser" | "elevenlabs";

const getVoiceProvider = (): VoiceProvider =>
  localStorage.getItem(STORAGE_KEYS.voiceProvider) === "elevenlabs" ? "elevenlabs" : "browser";

const getElevenLabsVoiceId = () =>
  localStorage.getItem(STORAGE_KEYS.elevenLabsVoiceId)?.trim() || "21m00Tcm4TlvDq8ikWAM";

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

  const speak = useCallback(
    async (text: string) => {
      stop();
      const provider = getVoiceProvider();

      if (provider === "elevenlabs") {
        const apiKey = localStorage.getItem(STORAGE_KEYS.elevenLabsApiKey)?.trim();
        if (apiKey) {
          try {
            setIsSpeaking(true);
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${getElevenLabsVoiceId()}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "xi-api-key": apiKey
              },
              body: JSON.stringify({
                text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                  stability: 0.62,
                  similarity_boost: 0.78,
                  style: 0.18,
                  use_speaker_boost: true
                }
              })
            });

            if (!response.ok) {
              throw new Error("ElevenLabs indisponível.");
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            audio.onended = () => {
              URL.revokeObjectURL(audioUrl);
              setIsSpeaking(false);
              audioRef.current = null;
            };
            audio.onerror = () => {
              URL.revokeObjectURL(audioUrl);
              setIsSpeaking(false);
              audioRef.current = null;
            };
            await audio.play();
            return;
          } catch {
            setIsSpeaking(false);
          }
        }
      }

      if (!isSupported) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.voice = preferredVoice ?? null;
      utterance.rate = 0.82;
      utterance.pitch = 0.94;
      utterance.volume = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, preferredVoice, stop]
  );

  useEffect(() => stop, [stop]);

  return { speak, stop, isSpeaking, isSupported, voiceName: preferredVoice?.name ?? "voz do navegador" };
}
