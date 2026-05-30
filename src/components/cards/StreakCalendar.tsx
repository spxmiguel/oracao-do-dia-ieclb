import type { Completion } from "../../types";
import { getTodayKey } from "../../utils/date";

type StreakCalendarProps = {
  completions: Completion[];
  isPremium: boolean;
};

export function StreakCalendar({ completions, isPremium }: StreakCalendarProps) {
  const byDate = new Map(completions.map((completion) => [completion.date, completion]));
  const days = Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - index));
    const key = getTodayKey(date);
    return { key, completion: byDate.get(key), locked: !isPremium && index < 23 };
  });

  return (
    <div className="grid grid-cols-10 gap-2">
      {days.map(({ key, completion, locked }) => {
        const full = completion?.morningDone && completion?.nightDone;
        const partial = completion?.morningDone || completion?.nightDone;
        return (
          <div
            key={key}
            title={key}
            className={`aspect-square rounded-xl border transition ${
              locked
                ? "border-black/5 bg-black/5 blur-[1px] dark:border-white/10 dark:bg-white/10"
                : full
                  ? "border-morning-accent bg-morning-accent dark:border-night-accent dark:bg-night-accent"
                  : partial
                    ? "border-morning-accent/50 bg-morning-accent/25 dark:border-night-accent/50 dark:bg-night-accent/25"
                    : "border-black/5 bg-white/55 dark:border-white/10 dark:bg-white/8"
            }`}
          />
        );
      })}
    </div>
  );
}
