import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./Button";

type BreathingFocusProps = {
  onComplete: () => void;
};

export function BreathingFocus({ onComplete }: BreathingFocusProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const next = Math.min(100, ((Date.now() - startedAt) / 10_000) * 100);
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(interval);
        onComplete();
      }
    }, 100);
    return () => window.clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex min-h-[64vh] flex-col items-center justify-center text-center">
      <motion.div
        className="mb-8 h-44 w-44 rounded-full bg-morning-accent/25 ring-1 ring-morning-accent/30 night:bg-night-accent/20 night:ring-night-accent/30"
        animate={{ scale: [1, 1.14, 1], opacity: [0.76, 1, 0.76] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <h1 className="max-w-xs font-serif text-3xl leading-tight">Respire. Entregue estes primeiros minutos a Deus.</h1>
      <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-black/10 night:bg-white/10">
        <div className="h-full rounded-full bg-morning-accent night:bg-night-accent" style={{ width: `${progress}%` }} />
      </div>
      <Button className="mt-8" variant="secondary" onClick={onComplete}>
        Pular
      </Button>
    </div>
  );
}
