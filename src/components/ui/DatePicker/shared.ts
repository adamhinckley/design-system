import type { TailwindColors } from "@/lib/types";

const DEFAULT_LOCALE: Intl.UnicodeBCP47LocaleIdentifier = "en-US";
const warnedInvalidLocales = new Set<string>();

export const resolveLocale = (
  locale: Intl.UnicodeBCP47LocaleIdentifier = DEFAULT_LOCALE,
): Intl.UnicodeBCP47LocaleIdentifier => {
  try {
    new Intl.DateTimeFormat(locale);
    return locale;
  } catch {
    const rawLocale = String(locale);
    if (!warnedInvalidLocales.has(rawLocale)) {
      warnedInvalidLocales.add(rawLocale);
      console.error(
        `[DatePicker] Invalid locale "${rawLocale}" passed. Falling back to "${DEFAULT_LOCALE}".`,
      );
    }
    return DEFAULT_LOCALE;
  }
};

export interface DateColorStyles {
  label: string;
  helper: string;
  border: string;
  focus: string;
}

export const datePickerColorClasses: Record<TailwindColors, DateColorStyles> = {
  slate: {
    label: "text-slate-700 dark:text-slate-300",
    helper: "text-slate-600 dark:text-slate-400",
    border: "border-slate-300 dark:border-slate-700",
    focus: "focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500",
  },
  gray: {
    label: "text-gray-700 dark:text-gray-300",
    helper: "text-gray-600 dark:text-gray-400",
    border: "border-gray-300 dark:border-gray-700",
    focus: "focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500",
  },
  zinc: {
    label: "text-zinc-700 dark:text-zinc-300",
    helper: "text-zinc-600 dark:text-zinc-400",
    border: "border-zinc-300 dark:border-zinc-700",
    focus: "focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
  },
  neutral: {
    label: "text-neutral-700 dark:text-neutral-300",
    helper: "text-neutral-600 dark:text-neutral-400",
    border: "border-neutral-300 dark:border-neutral-700",
    focus: "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
  },
  stone: {
    label: "text-stone-700 dark:text-stone-300",
    helper: "text-stone-600 dark:text-stone-400",
    border: "border-stone-300 dark:border-stone-700",
    focus: "focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500",
  },
  red: {
    label: "text-red-700 dark:text-red-300",
    helper: "text-red-700 dark:text-red-300",
    border: "border-red-300 dark:border-red-700",
    focus: "focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
  },
  orange: {
    label: "text-orange-700 dark:text-orange-300",
    helper: "text-orange-700 dark:text-orange-300",
    border: "border-orange-300 dark:border-orange-700",
    focus: "focus-visible:ring-orange-400 dark:focus-visible:ring-orange-500",
  },
  amber: {
    label: "text-amber-700 dark:text-amber-300",
    helper: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    focus: "focus-visible:ring-amber-400 dark:focus-visible:ring-amber-500",
  },
  yellow: {
    label: "text-yellow-700 dark:text-yellow-300",
    helper: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-300 dark:border-yellow-700",
    focus: "focus-visible:ring-yellow-400 dark:focus-visible:ring-yellow-500",
  },
  lime: {
    label: "text-lime-700 dark:text-lime-300",
    helper: "text-lime-700 dark:text-lime-300",
    border: "border-lime-300 dark:border-lime-700",
    focus: "focus-visible:ring-lime-400 dark:focus-visible:ring-lime-500",
  },
  green: {
    label: "text-green-700 dark:text-green-300",
    helper: "text-green-700 dark:text-green-300",
    border: "border-green-300 dark:border-green-700",
    focus: "focus-visible:ring-green-400 dark:focus-visible:ring-green-500",
  },
  emerald: {
    label: "text-emerald-700 dark:text-emerald-300",
    helper: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-300 dark:border-emerald-700",
    focus: "focus-visible:ring-emerald-400 dark:focus-visible:ring-emerald-500",
  },
  teal: {
    label: "text-teal-700 dark:text-teal-300",
    helper: "text-teal-700 dark:text-teal-300",
    border: "border-teal-300 dark:border-teal-700",
    focus: "focus-visible:ring-teal-400 dark:focus-visible:ring-teal-500",
  },
  cyan: {
    label: "text-cyan-700 dark:text-cyan-300",
    helper: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-300 dark:border-cyan-700",
    focus: "focus-visible:ring-cyan-400 dark:focus-visible:ring-cyan-500",
  },
  sky: {
    label: "text-sky-700 dark:text-sky-300",
    helper: "text-sky-700 dark:text-sky-300",
    border: "border-sky-300 dark:border-sky-700",
    focus: "focus-visible:ring-sky-400 dark:focus-visible:ring-sky-500",
  },
  blue: {
    label: "text-blue-700 dark:text-blue-300",
    helper: "text-blue-700 dark:text-blue-300",
    border: "border-blue-300 dark:border-blue-700",
    focus: "focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500",
  },
  indigo: {
    label: "text-indigo-700 dark:text-indigo-300",
    helper: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-300 dark:border-indigo-700",
    focus: "focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500",
  },
  violet: {
    label: "text-violet-700 dark:text-violet-300",
    helper: "text-violet-700 dark:text-violet-300",
    border: "border-violet-300 dark:border-violet-700",
    focus: "focus-visible:ring-violet-400 dark:focus-visible:ring-violet-500",
  },
  purple: {
    label: "text-purple-700 dark:text-purple-300",
    helper: "text-purple-700 dark:text-purple-300",
    border: "border-purple-300 dark:border-purple-700",
    focus: "focus-visible:ring-purple-400 dark:focus-visible:ring-purple-500",
  },
  fuchsia: {
    label: "text-fuchsia-700 dark:text-fuchsia-300",
    helper: "text-fuchsia-700 dark:text-fuchsia-300",
    border: "border-fuchsia-300 dark:border-fuchsia-700",
    focus: "focus-visible:ring-fuchsia-400 dark:focus-visible:ring-fuchsia-500",
  },
  pink: {
    label: "text-pink-700 dark:text-pink-300",
    helper: "text-pink-700 dark:text-pink-300",
    border: "border-pink-300 dark:border-pink-700",
    focus: "focus-visible:ring-pink-400 dark:focus-visible:ring-pink-500",
  },
  rose: {
    label: "text-rose-700 dark:text-rose-300",
    helper: "text-rose-700 dark:text-rose-300",
    border: "border-rose-300 dark:border-rose-700",
    focus: "focus-visible:ring-rose-400 dark:focus-visible:ring-rose-500",
  },
};

export const formatDate = (
  value?: Date,
  locale: Intl.UnicodeBCP47LocaleIdentifier = DEFAULT_LOCALE,
) => {
  const safeLocale = resolveLocale(locale);

  return value
    ? new Intl.DateTimeFormat(safeLocale, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(value)
    : "";
};

export const getWeekDayNames = (
  locale: Intl.UnicodeBCP47LocaleIdentifier = DEFAULT_LOCALE,
): string[] => {
  const safeLocale = resolveLocale(locale);
  const baseDate = new Date(2000, 0, 2);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    return new Intl.DateTimeFormat(safeLocale, { weekday: "short" }).format(
      date,
    );
  });
};

export const getMonthNames = (
  locale: Intl.UnicodeBCP47LocaleIdentifier = DEFAULT_LOCALE,
): string[] => {
  const safeLocale = resolveLocale(locale);

  return Array.from({ length: 12 }, (_, i) => {
    return new Intl.DateTimeFormat(safeLocale, { month: "long" }).format(
      new Date(2000, i, 1),
    );
  });
};

export const isValidDate = (value: Date | undefined): value is Date =>
  value !== undefined && !Number.isNaN(value.getTime());
