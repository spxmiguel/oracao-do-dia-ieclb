import { BookOpen, CalendarDays, Home, UserCircle } from "lucide-react";
import type { AppPage } from "../../types";

type NavigationProps = {
  page: AppPage;
  onChange: (page: AppPage) => void;
};

const items: Array<{ page: AppPage; label: string; icon: typeof Home }> = [
  { page: "home", label: "Hoje", icon: Home },
  { page: "journal", label: "Diário", icon: BookOpen },
  { page: "history", label: "Histórico", icon: CalendarDays },
  { page: "settings", label: "Perfil", icon: UserCircle }
];

export function Navigation({ page, onChange }: NavigationProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-morning-bg/92 px-3 pb-4 pt-2 backdrop-blur-xl night:border-white/10 night:bg-night-bg/92">
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = page === item.page;
          return (
            <button
              key={item.page}
              className={`flex min-h-14 flex-col items-center justify-center rounded-2xl text-xs font-semibold transition ${
                active
                  ? "bg-white text-morning-text shadow-sm night:bg-white/10 night:text-night-text"
                  : "text-morning-text/60 night:text-night-text/60"
              }`}
              onClick={() => onChange(item.page)}
              type="button"
            >
              <Icon className="mb-1 h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
