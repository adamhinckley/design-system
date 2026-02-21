import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { formatDate, inputColorClasses } from "./shared";
import { useEscapeToClose } from "./useEscapeToClose";

type NonNativeColor = keyof typeof inputColorClasses;

const calendarColorClasses: Record<
  NonNativeColor,
  { selected: string; hover: string; today: string }
> = {
  slate: {
    selected:
      "bg-slate-900 text-slate-50 dark:bg-slate-300 dark:text-slate-950",
    hover: "hover:bg-slate-100 dark:hover:bg-slate-800/70",
    today: "ring-slate-500 dark:ring-slate-400",
  },
  gray: {
    selected: "bg-gray-900 text-gray-50 dark:bg-gray-300 dark:text-gray-950",
    hover: "hover:bg-gray-100 dark:hover:bg-gray-800/70",
    today: "ring-gray-500 dark:ring-gray-400",
  },
  zinc: {
    selected: "bg-zinc-900 text-zinc-50 dark:bg-zinc-300 dark:text-zinc-950",
    hover: "hover:bg-zinc-100 dark:hover:bg-zinc-800/70",
    today: "ring-zinc-500 dark:ring-zinc-400",
  },
  neutral: {
    selected:
      "bg-neutral-900 text-neutral-50 dark:bg-neutral-300 dark:text-neutral-950",
    hover: "hover:bg-neutral-100 dark:hover:bg-neutral-800/70",
    today: "ring-neutral-500 dark:ring-neutral-400",
  },
  stone: {
    selected:
      "bg-stone-900 text-stone-50 dark:bg-stone-300 dark:text-stone-950",
    hover: "hover:bg-stone-100 dark:hover:bg-stone-800/70",
    today: "ring-stone-500 dark:ring-stone-400",
  },
  red: {
    selected: "bg-red-900 text-red-50 dark:bg-red-300 dark:text-red-950",
    hover: "hover:bg-red-100 dark:hover:bg-red-800/70",
    today: "ring-red-500 dark:ring-red-400",
  },
  orange: {
    selected:
      "bg-orange-900 text-orange-50 dark:bg-orange-300 dark:text-orange-950",
    hover: "hover:bg-orange-100 dark:hover:bg-orange-800/70",
    today: "ring-orange-500 dark:ring-orange-400",
  },
  amber: {
    selected:
      "bg-amber-900 text-amber-50 dark:bg-amber-300 dark:text-amber-950",
    hover: "hover:bg-amber-100 dark:hover:bg-amber-800/70",
    today: "ring-amber-500 dark:ring-amber-400",
  },
  yellow: {
    selected:
      "bg-yellow-900 text-yellow-50 dark:bg-yellow-300 dark:text-yellow-950",
    hover: "hover:bg-yellow-100 dark:hover:bg-yellow-800/70",
    today: "ring-yellow-500 dark:ring-yellow-400",
  },
  lime: {
    selected: "bg-lime-900 text-lime-50 dark:bg-lime-300 dark:text-lime-950",
    hover: "hover:bg-lime-100 dark:hover:bg-lime-800/70",
    today: "ring-lime-500 dark:ring-lime-400",
  },
  green: {
    selected:
      "bg-green-900 text-green-50 dark:bg-green-300 dark:text-green-950",
    hover: "hover:bg-green-100 dark:hover:bg-green-800/70",
    today: "ring-green-500 dark:ring-green-400",
  },
  emerald: {
    selected:
      "bg-emerald-900 text-emerald-50 dark:bg-emerald-300 dark:text-emerald-950",
    hover: "hover:bg-emerald-100 dark:hover:bg-emerald-800/70",
    today: "ring-emerald-500 dark:ring-emerald-400",
  },
  teal: {
    selected: "bg-teal-900 text-teal-50 dark:bg-teal-300 dark:text-teal-950",
    hover: "hover:bg-teal-100 dark:hover:bg-teal-800/70",
    today: "ring-teal-500 dark:ring-teal-400",
  },
  cyan: {
    selected: "bg-cyan-900 text-cyan-50 dark:bg-cyan-300 dark:text-cyan-950",
    hover: "hover:bg-cyan-100 dark:hover:bg-cyan-800/70",
    today: "ring-cyan-500 dark:ring-cyan-400",
  },
  sky: {
    selected: "bg-sky-900 text-sky-50 dark:bg-sky-300 dark:text-sky-950",
    hover: "hover:bg-sky-100 dark:hover:bg-sky-800/70",
    today: "ring-sky-500 dark:ring-sky-400",
  },
  blue: {
    selected: "bg-blue-900 text-blue-50 dark:bg-blue-300 dark:text-blue-950",
    hover: "hover:bg-blue-100 dark:hover:bg-blue-800/70",
    today: "ring-blue-500 dark:ring-blue-400",
  },
  indigo: {
    selected:
      "bg-indigo-900 text-indigo-50 dark:bg-indigo-300 dark:text-indigo-950",
    hover: "hover:bg-indigo-100 dark:hover:bg-indigo-800/70",
    today: "ring-indigo-500 dark:ring-indigo-400",
  },
  violet: {
    selected:
      "bg-violet-900 text-violet-50 dark:bg-violet-300 dark:text-violet-950",
    hover: "hover:bg-violet-100 dark:hover:bg-violet-800/70",
    today: "ring-violet-500 dark:ring-violet-400",
  },
  purple: {
    selected:
      "bg-purple-900 text-purple-50 dark:bg-purple-300 dark:text-purple-950",
    hover: "hover:bg-purple-100 dark:hover:bg-purple-800/70",
    today: "ring-purple-500 dark:ring-purple-400",
  },
  fuchsia: {
    selected:
      "bg-fuchsia-900 text-fuchsia-50 dark:bg-fuchsia-300 dark:text-fuchsia-950",
    hover: "hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800/70",
    today: "ring-fuchsia-500 dark:ring-fuchsia-400",
  },
  pink: {
    selected: "bg-pink-900 text-pink-50 dark:bg-pink-300 dark:text-pink-950",
    hover: "hover:bg-pink-100 dark:hover:bg-pink-800/70",
    today: "ring-pink-500 dark:ring-pink-400",
  },
  rose: {
    selected: "bg-rose-900 text-rose-50 dark:bg-rose-300 dark:text-rose-950",
    hover: "hover:bg-rose-100 dark:hover:bg-rose-800/70",
    today: "ring-rose-500 dark:ring-rose-400",
  },
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarDay {
  date: Date;
  inCurrentMonth: boolean;
}

export interface NonNativeDatePickerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "value" | "defaultValue"
> {
  label?: string;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
  color?: NonNativeColor;
  placeholder?: string;
  selected?: Date;
  defaultSelected?: Date;
  onDateChange?: (date: Date | undefined) => void;
  onOpenChange?: (open: boolean) => void;
  required?: boolean;
  "data-testid"?: string;
}

const monthStart = (value: Date) =>
  new Date(value.getFullYear(), value.getMonth(), 1);

const isSameDay = (left?: Date, right?: Date) => {
  if (!left || !right) return false;
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

const monthGrid = (currentMonth: Date): CalendarDay[] => {
  const first = monthStart(currentMonth);
  const firstWeekDay = first.getDay();
  const firstCell = new Date(first);
  firstCell.setDate(firstCell.getDate() - firstWeekDay);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstCell);
    date.setDate(firstCell.getDate() + index);
    return {
      date,
      inCurrentMonth: date.getMonth() === currentMonth.getMonth(),
    };
  });
};

export function NonNativeDatePicker({
  label,
  helperText,
  errorText,
  fullWidth,
  color = "slate",
  placeholder = "Pick a date",
  selected,
  defaultSelected,
  onDateChange,
  onOpenChange,
  className,
  id,
  required,
  disabled,
  ...props
}: NonNativeDatePickerProps) {
  const generatedId = useId();
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultSelected,
  );
  const resolvedValue = selected ?? internalValue;
  const initialMonth = resolvedValue
    ? monthStart(resolvedValue)
    : monthStart(new Date());
  const [viewMonth, setViewMonth] = useState<Date>(initialMonth);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputId = id ?? generatedId;
  const helperContent = errorText || helperText;
  const currentColor = inputColorClasses[color];
  const calendarColors = calendarColorClasses[color];
  const today = useMemo(() => new Date(), []);

  const setOpenState = (nextOpen: boolean) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEscapeToClose(open, () => setOpenState(false));

  useEffect(() => {
    if (resolvedValue) setViewMonth(monthStart(resolvedValue));
  }, [resolvedValue]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const node = wrapperRef.current;
      if (!node) return;
      if (node.contains(event.target as Node)) return;
      setOpenState(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  const displayValue = resolvedValue ? formatDate(resolvedValue) : placeholder;
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(viewMonth);

  const days = useMemo(() => monthGrid(viewMonth), [viewMonth]);

  const applyDate = (nextDate: Date | undefined) => {
    if (selected === undefined) setInternalValue(nextDate);
    onDateChange?.(nextDate);
  };

  const goMonth = (offset: number) => {
    setViewMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative flex flex-col",
        fullWidth ? "w-full" : "w-72",
        className,
      )}
    >
      {label ? (
        <label
          htmlFor={inputId}
          className={cn(
            "mb-1 ml-2 block text-sm font-medium",
            errorText ? "text-destructive" : currentColor.label,
          )}
        >
          {label}
        </label>
      ) : null}
      <button
        type="button"
        id={inputId}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={Boolean(errorText) || undefined}
        aria-required={required || undefined}
        className={cn(
          "flex h-11 w-full items-center justify-start rounded-lg border bg-white px-3 text-left text-sm text-slate-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:text-slate-50",
          !errorText && currentColor.border,
          !errorText && currentColor.focus,
          errorText && "border-destructive focus-visible:ring-destructive",
        )}
        disabled={disabled}
        onClick={() => setOpenState(!open)}
        {...props}
      >
        {displayValue}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Calendar"
          className="absolute top-full z-10 mt-2 w-full rounded-lg border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              className={cn(
                "h-8 w-8 rounded-md text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:text-slate-300",
                calendarColors.hover,
                currentColor.focus,
              )}
              onClick={() => goMonth(-1)}
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
                calendarColors.hover,
                currentColor.focus,
              )}
              onClick={() => goMonth(1)}
            >
              →
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <span
                key={day}
                className="text-center text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map(({ date, inCurrentMonth }) => {
              const dayDateId = `${date.getFullYear()}-${String(
                date.getMonth() + 1,
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
              const selectedDay = isSameDay(date, resolvedValue);
              const todayDay = isSameDay(date, today);

              return (
                <button
                  key={dayDateId}
                  type="button"
                  data-testid={`non-native-day-${dayDateId}`}
                  aria-label={date.toDateString()}
                  className={cn(
                    "h-9 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1",
                    currentColor.focus,
                    inCurrentMonth
                      ? "text-slate-800 dark:text-slate-200"
                      : "text-slate-400 dark:text-slate-600",
                    !selectedDay && calendarColors.hover,
                    selectedDay && calendarColors.selected,
                    todayDay &&
                      !selectedDay &&
                      cn("ring-1", calendarColors.today),
                  )}
                  onClick={() => {
                    applyDate(date);
                    setViewMonth(monthStart(date));
                    setOpenState(false);
                  }}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                applyDate(undefined);
                setOpenState(false);
              }}
              className={cn(
                "h-8 rounded-md border px-2 text-xs text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:text-slate-300",
                currentColor.border,
                currentColor.focus,
                calendarColors.hover,
              )}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                applyDate(today);
                setViewMonth(monthStart(today));
                setOpenState(false);
              }}
              className={cn(
                "h-8 rounded-md border px-2 text-xs text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:text-slate-300",
                currentColor.border,
                currentColor.focus,
                calendarColors.hover,
              )}
            >
              Today
            </button>
          </div>
        </div>
      ) : null}

      {helperContent ? (
        <p
          className={cn(
            "mt-1 ml-2 text-xs",
            errorText ? "text-destructive" : currentColor.helper,
          )}
        >
          {helperContent}
        </p>
      ) : null}
    </div>
  );
}
