import { Award, Flame, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Completion } from "../../types";
import { getGamificationProgress } from "../../utils/gamification";
import { Card } from "../ui/Card";

type GamificationCardProps = {
  completions: Completion[];
  currentStreak: number;
  totalCompletedDays: number;
};

export function GamificationCard({ completions, currentStreak, totalCompletedDays }: GamificationCardProps) {
  const progress = getGamificationProgress(completions, currentStreak, totalCompletedDays);
  const percentage = Math.min(100, Math.round((progress.levelProgress / progress.nextLevelXp) * 100));

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-morning-accent night:text-night-accent">
            <Sparkles className="h-4 w-4" />
            Jornada
          </p>
          <h2 className="mt-2 font-serif text-2xl">Nível {progress.level}</h2>
        </div>
        <div className="rounded-2xl bg-white/60 px-3 py-2 text-right night:bg-white/8">
          <p className="text-xs font-semibold opacity-65">XP</p>
          <p className="font-serif text-2xl">{progress.xp}</p>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-semibold opacity-70">
          <span>{progress.levelProgress} XP</span>
          <span>{progress.nextLevelXp} XP</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-black/5 night:bg-white/10">
          <motion.div
            animate={{ width: `${percentage}%` }}
            className="h-full rounded-full bg-morning-accent night:bg-night-accent"
            initial={{ width: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="grid gap-2">
        {progress.achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`flex items-center gap-3 rounded-2xl p-3 transition ${
              achievement.unlocked ? "bg-morning-accent/16 night:bg-night-accent/18" : "bg-white/45 opacity-55 night:bg-white/6"
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 night:bg-white/10">
              {achievement.unlocked ? <Award className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
            </span>
            <span>
              <span className="block text-sm font-bold">{achievement.title}</span>
              <span className="block text-xs opacity-70">{achievement.description}</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
