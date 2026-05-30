import { useState } from "react";
import { Chrome, UserRound } from "lucide-react";
import { denominations, prayerDiscoveryFocusOptions, prayerDiscoveryLengthOptions, prayerDiscoveryToneOptions } from "../data";
import type { UserPreferences } from "../types";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

type OnboardingProps = {
  authLoading: boolean;
  authError: string | null;
  isAuthenticated: boolean;
  onGoogle: () => Promise<unknown> | void;
  onSavePreferences: (preferences: UserPreferences) => Promise<void>;
  onGuestStart: () => void;
};

export function Onboarding({ authLoading, authError, isAuthenticated, onGoogle, onSavePreferences, onGuestStart }: OnboardingProps) {
  const [guestSelected, setGuestSelected] = useState(false);
  const [setupStep, setSetupStep] = useState<"identity" | "prayer">("identity");
  const [preferences, setPreferences] = useState<UserPreferences>({
    denomination: "evangelical",
    morningReminderTime: "07:00",
    nightReminderTime: "21:30",
    audioEnabled: true,
    themeMode: "auto",
    prayerProfile: {
      focus: "peace",
      tone: "intimate",
      length: "balanced",
      includePersonalRequests: true
    },
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
        <p className="mt-4 leading-7 opacity-75">Um devocional cristão simples para Palavra, oração e reflexão.</p>
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-morning-accent">
              {setupStep === "identity" ? "Primeiro ajuste" : "Seu jeito de começar"}
            </p>
            <h2 className="mt-2 font-serif text-3xl">
              {setupStep === "identity" ? "Vamos preparar seu devocional" : "Me conta como sua manhã costuma chegar"}
            </h2>
            <p className="mt-2 opacity-75">
              {setupStep === "identity"
                ? "Essas escolhas criam sua primeira experiência no app."
                : "Não é um teste. São só sinais para a oração diária soar mais próxima de você."}
            </p>
          </div>

          {setupStep === "identity" ? (
            <>
              <div className="grid gap-2">
                <p className="text-sm font-bold">Qual linguagem cristã fica mais natural para você?</p>
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
                Quando você quer abrir o dia com Deus?
                <input className="field" type="time" value={preferences.morningReminderTime} onChange={(event) => setPreferences((current) => ({ ...current, morningReminderTime: event.target.value }))} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Quando costuma fechar o dia?
                <input className="field" type="time" value={preferences.nightReminderTime} onChange={(event) => setPreferences((current) => ({ ...current, nightReminderTime: event.target.value }))} />
              </label>
              <label className="flex items-center justify-between rounded-2xl bg-white/55 p-4 text-sm font-semibold">
                Quero opção de narração
                <input type="checkbox" checked={preferences.audioEnabled} onChange={(event) => setPreferences((current) => ({ ...current, audioEnabled: event.target.checked }))} />
              </label>
                <Button className="w-full" onClick={() => setSetupStep("prayer")}>Continuar</Button>
            </>
          ) : (
            <>
              <div className="space-y-3 rounded-3xl bg-white/55 p-4 dark:bg-white/8">
                <div>
                  <p className="text-sm font-bold">Quando você pensa nos próximos dias, qual frase parece mais verdadeira?</p>
                  <p className="mt-1 text-sm opacity-70">Isso guia o centro da oração, sem te prender a uma etiqueta.</p>
                </div>
                <div className="grid gap-2">
                  {prayerDiscoveryFocusOptions.map((item) => (
                    <button
                      className={`rounded-2xl border p-3 text-left transition ${
                        preferences.prayerProfile.focus === item.value ? "border-morning-accent bg-morning-accent/15" : "border-black/10 bg-white/55"
                      }`}
                      key={item.value}
                      onClick={() => setPreferences((current) => ({ ...current, prayerProfile: { ...current.prayerProfile, focus: item.value } }))}
                      type="button"
                    >
                      <span className="block text-sm font-bold">{item.title}</span>
                      <span className="mt-1 block text-xs leading-5 opacity-70">{item.description}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 rounded-3xl bg-white/55 p-4 dark:bg-white/8">
                <p className="text-sm font-bold">Que tipo de linguagem te ajuda a orar melhor?</p>
                <div className="grid gap-2">
                  {prayerDiscoveryToneOptions.map((item) => (
                    <button
                      className={`rounded-2xl border p-3 text-left transition ${
                        preferences.prayerProfile.tone === item.value ? "border-morning-accent bg-morning-accent/15" : "border-black/10 bg-white/55"
                      }`}
                      key={item.value}
                      onClick={() => setPreferences((current) => ({ ...current, prayerProfile: { ...current.prayerProfile, tone: item.value } }))}
                      type="button"
                    >
                      <span className="block text-sm font-bold">{item.title}</span>
                      <span className="mt-1 block text-xs leading-5 opacity-70">{item.description}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 rounded-3xl bg-white/55 p-4 dark:bg-white/8">
                <p className="text-sm font-bold">Quanto espaço esse momento costuma ter?</p>
                <div className="grid gap-2">
                  {prayerDiscoveryLengthOptions.map((item) => (
                    <button
                      className={`rounded-2xl border p-3 text-left transition ${
                        preferences.prayerProfile.length === item.value ? "border-morning-accent bg-morning-accent/15" : "border-black/10 bg-white/55"
                      }`}
                      key={item.value}
                      onClick={() => setPreferences((current) => ({ ...current, prayerProfile: { ...current.prayerProfile, length: item.value } }))}
                      type="button"
                    >
                      <span className="block text-sm font-bold">{item.title}</span>
                      <span className="mt-1 block text-xs leading-5 opacity-70">{item.description}</span>
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center justify-between rounded-2xl bg-white/60 p-3 text-sm font-semibold dark:bg-white/8">
                Pode incluir pedidos pessoais mais abertos
                <input type="checkbox" checked={preferences.prayerProfile.includePersonalRequests} onChange={(event) => setPreferences((current) => ({ ...current, prayerProfile: { ...current.prayerProfile, includePersonalRequests: event.target.checked } }))} />
              </label>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setSetupStep("identity")}>Voltar</Button>
                <Button className="flex-1" onClick={savePreferences} disabled={saving}>{saving ? "Salvando..." : "Começar"}</Button>
              </div>
            </>
          )}
        </Card>
      )}
    </main>
  );
}
