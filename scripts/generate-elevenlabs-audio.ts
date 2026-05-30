import { mkdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { dailyContent } from "../src/data";

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID ?? "21m00Tcm4TlvDq8ikWAM";
const modelId = process.env.ELEVENLABS_MODEL_ID ?? "eleven_multilingual_v2";
const outputDir = join(process.cwd(), "public", "audio");

const fileExists = async (path: string) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

const buildMorningText = (title: string, verse: string, reference: string, reflection: string, prayer: string) =>
  `${title}. ${verse}. ${reference}. ${reflection} Pausa para oração. ${prayer}`;

const requestSpeech = async (text: string) => {
  if (!apiKey) {
    throw new Error("Defina ELEVENLABS_API_KEY antes de rodar npm run generate:audio.");
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: {
        stability: 0.66,
        similarity_boost: 0.82,
        style: 0.12,
        use_speaker_boost: true
      }
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`ElevenLabs respondeu ${response.status}: ${message}`);
  }

  return Buffer.from(await response.arrayBuffer());
};

const main = async () => {
  await mkdir(outputDir, { recursive: true });
  const allContent = Object.values(dailyContent).flat();

  for (const content of allContent) {
    const morningPath = join(outputDir, `${content.id}-morning.mp3`);
    const nightPath = join(outputDir, `${content.id}-night.mp3`);

    if (!(await fileExists(morningPath))) {
      const morningText = buildMorningText(
        content.title,
        content.verse.text,
        content.verse.reference,
        content.morning.reflection,
        content.morning.prayer
      );
      await writeFile(morningPath, await requestSpeech(morningText));
      console.log(`gerado ${morningPath}`);
    }

    if (!(await fileExists(nightPath))) {
      const nightText = `${content.night.question}. ${content.night.shortPrayer}`;
      await writeFile(nightPath, await requestSpeech(nightText));
      console.log(`gerado ${nightPath}`);
    }
  }
};

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
