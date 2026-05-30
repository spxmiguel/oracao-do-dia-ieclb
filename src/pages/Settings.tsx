import { useState } from "react";
import { denominations } from "../data";
import type { UserPreferences } from "../types";
import { PremiumWaitlistModal } from "../components/premium/PremiumWaitlistModal";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

type SettingsProps = {
  email: string;
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => Promise<void>;
  onLogout: () => Promise<void> | void;
  onResetCache: () => void;
  onJoinPremium: (email: string) => Promise<void>;
};

export function Settings({ email, preferences, onSave, onLogout, onResetCache, onJoinPremium }: SettingsProps) {
  const [draft, setDraft] = useState(preferences);
  const [showPremium, setShowPremium] = useState(false);

  const save = async () => {
    await onSave({ ...draft, isPremium: false });
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
        <p className="mt-2 opacity-75">Ajuste seu ritual sem transformar isso em barulho.</p>
      </header>
      <Card className="space-y-3">
        <p className="text-sm opacity-65">Conta</p>
        <p className="font-semibold">{email || "Modo sem login"}</p>
        <p className="rounded-2xl bg-white/55 p-3 text-sm font-bold night:bg-white/8">Plano: Free</p>
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
        <label className="flex items-center justify-between rounded-2xl bg-white/55 p-4 text-sm font-semibold night:bg-white/8">Narração<input type="checkbox" checked={draft.audioEnabled} onChange={(event) => setDraft((current) => ({ ...current, audioEnabled: event.target.checked }))} /></label>
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
