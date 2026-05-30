import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type PremiumWaitlistModalProps = {
  defaultEmail: string;
  onClose: () => void;
  onJoin: (email: string) => Promise<void>;
};

export function PremiumWaitlistModal({ defaultEmail, onClose, onJoin }: PremiumWaitlistModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    try {
      await onJoin(email);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/35 p-4 backdrop-blur-sm sm:items-center sm:justify-center">
      <Card className="w-full max-w-lg space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl">Premium em breve</h2>
            <p className="mt-3 leading-7 opacity-80">
              Estamos preparando histórico completo, backup avançado e devocionais especiais. Entre na lista de espera para ser avisado no lançamento.
            </p>
          </div>
          <button className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10" onClick={onClose} type="button" aria-label="Fechar modal">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="rounded-2xl bg-morning-accent/15 p-3 text-sm font-bold dark:bg-night-accent/20">Nenhuma cobrança será feita agora.</p>
        <ul className="grid gap-2 text-sm opacity-85">
          <li>histórico completo</li>
          <li>backup avançado</li>
          <li>filtros do diário</li>
          <li>devocionais especiais para ansiedade, prova, gratidão e descanso</li>
          <li>personalizações visuais extras</li>
        </ul>
        {status === "success" ? (
          <p className="rounded-2xl bg-emerald-500/10 p-4 font-semibold text-emerald-700 dark:text-emerald-200">
            Você entrou na lista. Vamos te avisar quando estiver pronto.
          </p>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-morning-accent dark:border-white/10 dark:bg-white/8 dark:focus:ring-night-accent"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              type="email"
              value={email}
              required
            />
            {status === "error" && <p className="text-sm text-red-600">Não foi possível entrar na lista agora.</p>}
            <Button className="w-full" disabled={status === "loading"} type="submit">
              {status === "loading" ? "Enviando..." : "Entrar na lista de espera"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
