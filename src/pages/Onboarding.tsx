import { useState } from "react";
import { Chrome, UserRound } from "lucide-react";
import { denominations } from "../data";
import type { UserPreferences } from "../types";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

type OnboardingProps = {
  authLoading: boolean;
  authError: string | null;
  isAuthenticated: boolean;
  onGoogle: () => Promise<void> | void;
  onSavePreferences: (preferences: UserPreferences) => Promise<void>;
  onGuestStart: () => void;
};

export function Onboarding({ authLoading, authError, isAuthenticated, onGoogle, onSavePreferences, onGuestStart }: OnboardingProps) {
  const [guestSelected, setGuestSelected] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    denomination: "evangelical",
    morningReminderTime: "07:00",
    nightReminderTime: "21:30",
    audioEnabled: true,
    themeMode: "auto",
    isPremium: false
  });
  const [saving, setSaving] = useState(false);

  const savePreferences = async () => {
    setSaving(true);
    await onSavePreferences({ ...preferences, isPremium: false });
    setSaving(false);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-4 py-10">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-morning-accent">Primeiros Minutos</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight">Os primeiros minutos do seu dia, entregues a Deus.</h1>
        <p className="mt-4 leading-7 opacity-75">Um ritual cristão simples para Palavra, oração e reflexão.</p>
      </div>

      {!isAuthenticated && !guestSelected ? (
        <Card className="space-y-5">
          <Button className="w-full" icon={<Chrome className="h-4 w-4" />} onClick={onGoogle} disabled={authLoading}>
            Entrar com Google
          </Button>
          <Button
            className="w-full"
            icon={<UserRound className="h-4 w-4" />}
            onClick={() => {
              setGuestSelected(true);
              onGuestStart();
            }}
            variant="secondary"
          >
            Continuar sem login
          </Button>
          <p className="rounded-3xl bg-white/55 p-4 text-sm leading-6 opacity-75">
            Para reduzir riscos do MVP, não usamos senha própria. Entre com Google para backup na nuvem ou continue sem login neste dispositivo.
          </p>
          {authError && <p className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-700">{authError}</p>}
        </Card>
      ) : (
        <Card className="space-y-5">
          <div>
            <h2 className="font-serif text-3xl">Preferências do ritual</h2>
            <p className="mt-2 opacity-75">Escolha o tom do conteúdo e os horários que combinam com sua rotina.</p>
          </div>
          <div className="grid gap-2">
            {denominations.map((item) => (
              <button
                className={`rounded-2xl border p-4 text-left font-semibold transition ${
                  preferences.denomination === item.value ? "border-morning-accent bg-morning-accent/15" : "border-black/10 bg-white/55"
                }`}
                key={item.value}
                onClick={() => setPreferences((current) => ({ ...current, denomination: item.value }))}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="grid gap-2 text-sm font-semibold">
            Horário da manhã
            <input className="field" type="time" value={preferences.morningReminderTime} onChange={(event) => setPreferences((current) => ({ ...current, morningReminderTime: event.target.value }))} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Horário da noite
            <input className="field" type="time" value={preferences.nightReminderTime} onChange={(event) => setPreferences((current) => ({ ...current, nightReminderTime: event.target.value }))} />
          </label>
          <label className="flex items-center justify-between rounded-2xl bg-white/55 p-4 text-sm font-semibold">
            Narração opcional
            <input type="checkbox" checked={preferences.audioEnabled} onChange={(event) => setPreferences((current) => ({ ...current, audioEnabled: event.target.checked }))} />
          </label>
          <Button className="w-full" onClick={savePreferences} disabled={saving}>{saving ? "Salvando..." : "Começar"}</Button>
        </Card>
      )}
    </main>
  );
}
