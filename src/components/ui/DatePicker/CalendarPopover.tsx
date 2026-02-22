import { useMemo } from "react";

import { cn } from "@/lib/utils";
import type { TailwindColors } from "@/lib/types";

import { MonthNavigation } from "./MonthNavigation";
import { MonthYearPicker } from "./MonthYearPicker";
import {
  datePickerColorClasses,
  getWeekDayNames,
  getMonthNames,
} from "./shared";
import { calendarColorClasses } from "./internalDatePickerConstants";

export interface CalendarPopoverProps {
  inputId: string;
  enableMonthYearPicker: boolean;
  color: TailwindColors;
  viewMonth: Date;
  selectedDate?: Date;
  locale?: Intl.UnicodeBCP47LocaleIdentifier;
  inline?: boolean;
  dayTestIdPrefix?: string;
  showDialogRole?: boolean;
  minimal?: boolean;
  showFooterActions?: boolean;
  onViewMonthChange: (nextViewMonth: Date) => void;
  onDateChange: (date: Date | undefined) => void;
}

const isSameDay = (left?: Date, right?: Date) => {
  if (!left || !right) return false;
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

export function CalendarPopover({
  inputId,
  enableMonthYearPicker,
  color,
  viewMonth,
  selectedDate,
  locale = "en-US",
  inline = false,
  dayTestIdPrefix = "non-native-day",
  showDialogRole = true,
  minimal = false,
  showFooterActions = true,
  onViewMonthChange,
  onDateChange,
}: CalendarPopoverProps) {
  const today = useMemo(() => new Date(), []);
  const inputColors = datePickerColorClasses[color];
  const calendarColors = calendarColorClasses[color];
  const weekDays = useMemo(() => getWeekDayNames(locale), [locale]);
  const monthNames = useMemo(() => getMonthNames(locale), [locale]);
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(viewMonth),
    [viewMonth, locale],
  );
  const yearOptions = useMemo(() => {
    const currentYear = today.getFullYear();
    return Array.from({ length: 141 }, (_, index) => currentYear - 100 + index);
  }, [today]);
  const days = useMemo(() => {
    const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const last = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0);
    const firstCell = new Date(first);
    firstCell.setDate(firstCell.getDate() - first.getDay());
    const lastCell = new Date(last);
    lastCell.setDate(lastCell.getDate() + (6 - last.getDay()));
    const dayCount =
      Math.round(
        (lastCell.getTime() - firstCell.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;

    return Array.from({ length: dayCount }, (_, index) => {
      const date = new Date(firstCell);
      date.setDate(firstCell.getDate() + index);
      return {
        date,
        inCurrentMonth: date.getMonth() === viewMonth.getMonth(),
      };
    });
  }, [viewMonth]);
  return (
    <div
      role={showDialogRole ? "dialog" : undefined}
      aria-label={showDialogRole ? "Calendar" : undefined}
      className={cn(
        minimal
          ? "rounded-lg bg-transparent p-0 shadow-none"
          : "rounded-lg border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900",
        inline ? "w-full" : "absolute top-full z-10 mt-2 w-full",
      )}
    >
      {enableMonthYearPicker ? (
        <MonthYearPicker
          inputId={inputId}
          viewMonth={viewMonth}
          monthNames={monthNames}
          yearOptions={yearOptions}
          borderClass={inputColors.border}
          focusClass={inputColors.focus}
          onMonthYearChange={(nextMonth, nextYear) => {
            onViewMonthChange(new Date(nextYear, nextMonth, 1));
          }}
        />
      ) : (
        <MonthNavigation
          monthLabel={monthLabel}
          hoverClass={calendarColors.hover}
          focusClass={inputColors.focus}
          onPrevious={() => {
            onViewMonthChange(
              new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1),
            );
          }}
          onNext={() => {
            onViewMonthChange(
              new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1),
            );
          }}
        />
      )}

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
          const selectedDay = isSameDay(date, selectedDate);
          const todayDay = isSameDay(date, today);

          return (
            <button
              key={dayDateId}
              type="button"
              data-testid={`${dayTestIdPrefix}-${dayDateId}`}
              aria-label={date.toDateString()}
              className={cn(
                "h-9 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1",
                inputColors.focus,
                inCurrentMonth
                  ? "text-slate-800 dark:text-slate-200"
                  : "text-slate-500 dark:text-slate-400",
                !selectedDay && calendarColors.hover,
                selectedDay && calendarColors.selected,
                todayDay && !selectedDay && cn("ring-1", calendarColors.today),
              )}
              onClick={() => {
                onViewMonthChange(
                  new Date(date.getFullYear(), date.getMonth(), 1),
                );
                onDateChange(date);
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {showFooterActions ? (
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onDateChange(undefined)}
            className={cn(
              "h-8 rounded-md border px-2 text-xs text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:text-slate-300",
              inputColors.border,
              inputColors.focus,
              calendarColors.hover,
            )}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => {
              onViewMonthChange(
                new Date(today.getFullYear(), today.getMonth(), 1),
              );
              onDateChange(today);
            }}
            className={cn(
              "h-8 rounded-md border px-2 text-xs text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:text-slate-300",
              inputColors.border,
              inputColors.focus,
              calendarColors.hover,
            )}
          >
            Today
          </button>
        </div>
      ) : null}
    </div>
  );
}
