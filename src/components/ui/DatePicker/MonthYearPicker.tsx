import { cn } from "@/lib/utils";

export interface MonthYearPickerProps {
  inputId: string;
  viewMonth: Date;
  monthNames: string[];
  yearOptions: number[];
  borderClass: string;
  focusClass: string;
  onMonthYearChange: (nextMonth: number, nextYear: number) => void;
}

export function MonthYearPicker({
  inputId,
  viewMonth,
  monthNames: monthLabels,
  yearOptions,
  borderClass,
  focusClass,
  onMonthYearChange,
}: MonthYearPickerProps) {
  return (
    <div className="mb-3 grid grid-cols-2 gap-2">
      <label className="sr-only" htmlFor={`${inputId}-month-select`}>
        Month
      </label>
      <select
        id={`${inputId}-month-select`}
        aria-label="Month"
        value={viewMonth.getMonth()}
        onChange={(event) => {
          const nextMonth = Number(event.target.value);
          onMonthYearChange(nextMonth, viewMonth.getFullYear());
        }}
        className={cn(
          "h-9 rounded-md border bg-white px-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-1 dark:bg-slate-950 dark:text-slate-50",
          borderClass,
          focusClass,
        )}
      >
        {monthLabels.map((month, monthIndex) => (
          <option key={month} value={monthIndex}>
            {month}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor={`${inputId}-year-select`}>
        Year
      </label>
      <select
        id={`${inputId}-year-select`}
        aria-label="Year"
        value={viewMonth.getFullYear()}
        onChange={(event) => {
          const nextYear = Number(event.target.value);
          onMonthYearChange(viewMonth.getMonth(), nextYear);
        }}
        className={cn(
          "h-9 rounded-md border bg-white px-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-1 dark:bg-slate-950 dark:text-slate-50",
          borderClass,
          focusClass,
        )}
      >
        {yearOptions.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
