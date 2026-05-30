import { useState } from "react";
import { Cloud, CloudOff, Headphones } from "lucide-react";
import { denominations, prayerFocusOptions, prayerLengthOptions, prayerToneOptions } from "../data";
import type { UserPreferences } from "../types";
import { PremiumWaitlistModal } from "../components/premium/PremiumWaitlistModal";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { STORAGE_KEYS } from "../utils/storage";

type SettingsProps = {
  email: string;
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => Promise<void>;
  onLogout: () => Promise<void> | void;
  onResetCache: () => void;
  onJoinPremium: (email: string) => Promise<void>;
  onGoogleCloudSave: () => Promise<void>;
  cloudSaveEnabled: boolean;
  authLoading: boolean;
  authError: string | null;
};

export function Settings({ email, preferences, onSave, onLogout, onResetCache, onJoinPremium, onGoogleCloudSave, cloudSaveEnabled, authLoading, authError }: SettingsProps) {
  const [draft, setDraft] = useState(preferences);
  const [showPremium, setShowPremium] = useState(false);
  const [voiceProvider, setVoiceProvider] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.voiceProvider) === "browser" ? "browser" : "google_translate"
  );
  const [voiceStatus, setVoiceStatus] = useState<string | null>(null);

  const save = async () => {
    await onSave({ ...draft, isPremium: false });
    localStorage.setItem(STORAGE_KEYS.voiceProvider, voiceProvider);
  };

  const testGoogleVoice = async () => {
    setVoiceStatus("Testando narrador...");
    localStorage.setItem(STORAGE_KEYS.voiceProvider, "google_translate");
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=pt-BR&q=${encodeURIComponent("Primeiros Minutos. Esta é uma prévia da narração.")}`;
      const audio = new Audio(url);
      await audio.play();
      setVoiceStatus("Narrador Google funcionando neste dispositivo.");
    } catch {
      setVoiceStatus("O narrador Google falhou agora. O app ainda usa a voz do navegador como reserva.");
    }
  };

  const resetCache = () => {
    if (window.confirm("Resetar apenas o cache local deste dispositivo?")) {
      onResetCache();
    }
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-serif text-4xl">Perfil</h1>
        <p className="mt-2 opacity-75">Ajuste seu momento com Deus sem transformar isso em barulho.</p>
      </header>
      <Card className="space-y-3">
        <p className="text-sm opacity-65">Conta</p>
        <p className="font-semibold">{email || "Modo sem login"}</p>
        <div className="rounded-2xl bg-white/55 p-3 text-sm font-bold dark:bg-white/8">
          <p>Plano: Free</p>
          <p className="mt-2 flex items-center gap-2 opacity-75">
            {cloudSaveEnabled ? <Cloud className="h-4 w-4 text-morning-accent dark:text-night-accent" /> : <CloudOff className="h-4 w-4" />}
            {cloudSaveEnabled ? "Cloud save ativo na sua conta Google." : "Progresso salvo apenas neste dispositivo."}
          </p>
        </div>
        {!cloudSaveEnabled && (
          <Button variant="secondary" icon={<Cloud className="h-4 w-4" />} onClick={() => void onGoogleCloudSave()} disabled={authLoading}>
            {authLoading ? "Conectando..." : "Salvar na nuvem com Google"}
          </Button>
        )}
        {authError && <p className="rounded-2xl bg-red-500/10 p-3 text-sm font-semibold text-red-700 dark:text-red-200">{authError}</p>}
        <Button variant="secondary" onClick={() => setShowPremium(true)}>Premium em breve</Button>
      </Card>
      <Card className="space-y-4">
        <label className="grid gap-2 text-sm font-semibold">
          Vertente
          <select className="field" value={draft.denomination} onChange={(event) => setDraft((current) => ({ ...current, denomination: event.target.value as UserPreferences["denomination"] }))}>
            {denominations.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">Manhã<input className="field" type="time" value={draft.morningReminderTime} onChange={(event) => setDraft((current) => ({ ...current, morningReminderTime: event.target.value }))} /></label>
        <label className="grid gap-2 text-sm font-semibold">Noite<input className="field" type="time" value={draft.nightReminderTime} onChange={(event) => setDraft((current) => ({ ...current, nightReminderTime: event.target.value }))} /></label>
        <label className="flex items-center justify-between rounded-2xl bg-white/55 p-4 text-sm font-semibold dark:bg-white/8">Narração<input type="checkbox" checked={draft.audioEnabled} onChange={(event) => setDraft((current) => ({ ...current, audioEnabled: event.target.checked }))} /></label>
        <div className="space-y-3 rounded-3xl bg-white/55 p-4 dark:bg-white/8">
          <div>
            <p className="text-sm font-bold">Seu jeito de orar</p>
            <p className="mt-1 text-sm opacity-70">Esses sinais ajustam a oração diária sem transformar sua vida interior em formulário.</p>
          </div>
          <label className="grid gap-2 text-sm font-semibold">
            O que mais combina com sua fase atual?
            <select className="field" value={draft.prayerProfile.focus} onChange={(event) => setDraft((current) => ({ ...current, prayerProfile: { ...current.prayerProfile, focus: event.target.value as UserPreferences["prayerProfile"]["focus"] } }))}>
              {prayerFocusOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Linguagem
            <select className="field" value={draft.prayerProfile.tone} onChange={(event) => setDraft((current) => ({ ...current, prayerProfile: { ...current.prayerProfile, tone: event.target.value as UserPreferences["prayerProfile"]["tone"] } }))}>
              {prayerToneOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Ritmo
            <select className="field" value={draft.prayerProfile.length} onChange={(event) => setDraft((current) => ({ ...current, prayerProfile: { ...current.prayerProfile, length: event.target.value as UserPreferences["prayerProfile"]["length"] } }))}>
              {prayerLengthOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label className="flex items-center justify-between rounded-2xl bg-white/60 p-3 text-sm font-semibold dark:bg-white/8">
            Abrir espaço para pedidos pessoais
            <input type="checkbox" checked={draft.prayerProfile.includePersonalRequests} onChange={(event) => setDraft((current) => ({ ...current, prayerProfile: { ...current.prayerProfile, includePersonalRequests: event.target.checked } }))} />
          </label>
        </div>
        <div className="space-y-3 rounded-3xl bg-white/55 p-4 text-sm dark:bg-white/8">
          <p className="font-bold">Voz</p>
          <p className="opacity-75">Use o narrador do Google Tradutor para uma voz melhor. Se ele falhar, o app usa a voz do navegador como reserva.</p>
          <label className="grid gap-2 text-sm font-semibold">
            Provedor
            <select className="field" value={voiceProvider} onChange={(event) => setVoiceProvider(event.target.value)}>
              <option value="google_translate">Narrador Google</option>
              <option value="browser">Voz do navegador</option>
            </select>
          </label>
          <Button variant="secondary" icon={<Headphones className="h-4 w-4" />} onClick={testGoogleVoice} type="button">Testar narrador</Button>
          {voiceStatus && <p className="rounded-2xl bg-white/60 p-3 text-sm font-semibold dark:bg-white/8">{voiceStatus}</p>}
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Tema
          <select className="field" value={draft.themeMode} onChange={(event) => setDraft((current) => ({ ...current, themeMode: event.target.value as UserPreferences["themeMode"] }))}>
            <option value="auto">auto</option>
            <option value="morning">manhã</option>
            <option value="night">noite</option>
          </select>
        </label>
        <Button onClick={save}>Salvar preferências</Button>
      </Card>
      <Card className="space-y-3">
        <p className="text-sm opacity-65">Versão 1.0.0</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={resetCache}>Resetar cache local</Button>
          <Button variant="danger" onClick={onLogout}>Sair</Button>
        </div>
      </Card>
      {showPremium && <PremiumWaitlistModal defaultEmail={email} onClose={() => setShowPremium(false)} onJoin={onJoinPremium} />}
    </div>
  );
}
