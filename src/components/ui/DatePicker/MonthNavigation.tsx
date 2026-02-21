import { cn } from "@/lib/utils";

export interface MonthNavigationProps {
  monthLabel: string;
  hoverClass: string;
  focusClass: string;
  onPrevious: () => void;
  onNext: () => void;
}

export function MonthNavigation({
  monthLabel,
  hoverClass,
  focusClass,
  onPrevious,
  onNext,
}: MonthNavigationProps) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <button
        type="button"
        aria-label="Previous month"
        className={cn(
          "h-8 w-8 rounded-md text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:text-slate-300",
          hoverClass,
          focusClass,
        )}
        onClick={onPrevious}
      >
        ←
      </button>
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {monthLabel}
      </p>
      <button
        type="button"
        aria-label="Next month"
        className={cn(
          "h-8 w-8 rounded-md text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:text-slate-300",
          hoverClass,
          focusClass,
        )}
        onClick={onNext}
      >
        →
      </button>
    </div>
  );
}
