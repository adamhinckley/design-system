import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TailwindColors } from "@/lib/types";
import { inputSizeClasses } from "@/lib/constants";

import { formatDate, datePickerColorClasses, isValidDate } from "./shared";
import { useEscapeToClose } from "./useEscapeToClose";
import { CalendarPopover } from "./CalendarPopover";
import { calendarColorClasses } from "./internalDatePickerConstants";

type DatePickerSize = keyof typeof inputSizeClasses;

export interface DateRangePickerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  label?: string;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
  color?: TailwindColors;
  startPlaceholder?: string;
  endPlaceholder?: string;
  startSelected?: Date;
  endSelected?: Date;
  disabled?: boolean;
  defaultStartSelected?: Date;
  defaultEndSelected?: Date;
  onStartDateChange?: (date: Date | undefined) => void;
  onEndDateChange?: (date: Date | undefined) => void;
  onRangeChange?: (range: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => void;
  onOpenChange?: (open: boolean) => void;
  required?: boolean;
  enableMonthYearPicker?: boolean;
  removeBackground?: boolean;
  hideCalendarIcon?: boolean;
  inputSize?: DatePickerSize;
  locale?: Intl.UnicodeBCP47LocaleIdentifier;
}

const monthStart = (value: Date) =>
  new Date(value.getFullYear(), value.getMonth(), 1);

export function DateRangePicker({
  label,
  helperText,
  errorText,
  fullWidth,
  color = "slate",
  startPlaceholder = "Start date",
  endPlaceholder = "End date",
  startSelected,
  endSelected,
  disabled,
  defaultStartSelected,
  defaultEndSelected,
  onStartDateChange,
  onEndDateChange,
  onRangeChange,
  onOpenChange,
  className,
  id,
  required,
  enableMonthYearPicker = false,
  removeBackground = false,
  hideCalendarIcon = false,
  inputSize = "md",
  locale = "en-US",
  ...props
}: DateRangePickerProps) {
  const generatedId = useId();
  const sanitizedStartSelected = isValidDate(startSelected)
    ? startSelected
    : undefined;
  const sanitizedEndSelected = isValidDate(endSelected)
    ? endSelected
    : undefined;
  const sanitizedDefaultStart = isValidDate(defaultStartSelected)
    ? defaultStartSelected
    : undefined;
  const sanitizedDefaultEnd = isValidDate(defaultEndSelected)
    ? defaultEndSelected
    : undefined;

  const [internalStart, setInternalStart] = useState<Date | undefined>(
    sanitizedDefaultStart,
  );
  const [internalEnd, setInternalEnd] = useState<Date | undefined>(
    sanitizedDefaultEnd,
  );
  const resolvedStart = sanitizedStartSelected ?? internalStart;
  const resolvedEnd = sanitizedEndSelected ?? internalEnd;

  const [open, setOpen] = useState(false);
  const initialStartMonth = monthStart(resolvedStart ?? new Date());
  const initialEndMonth = monthStart(
    resolvedEnd ??
      new Date(
        initialStartMonth.getFullYear(),
        initialStartMonth.getMonth() + 1,
        1,
      ),
  );
  const [startViewMonth, setStartViewMonth] = useState<Date>(initialStartMonth);
  const [endViewMonth, setEndViewMonth] = useState<Date>(initialEndMonth);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const inputId = id ?? generatedId;
  const helperContent = errorText || helperText;
  const currentColor = datePickerColorClasses[color];
  const calendarColors = calendarColorClasses[color];
  const sizeClass = inputSizeClasses[inputSize];

  const emitRangeChange = useCallback(
    (nextStart: Date | undefined, nextEnd: Date | undefined) => {
      onRangeChange?.({ startDate: nextStart, endDate: nextEnd });
    },
    [onRangeChange],
  );

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange],
  );

  const handleClose = useCallback(() => {
    setOpenState(false);
  }, [setOpenState]);

  useEscapeToClose(open, handleClose);

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
  }, [open, setOpenState]);

  const applyStartDate = useCallback(
    (nextDate: Date | undefined) => {
      if (startSelected === undefined) setInternalStart(nextDate);
      onStartDateChange?.(nextDate);
      emitRangeChange(nextDate, resolvedEnd);
    },
    [emitRangeChange, onStartDateChange, resolvedEnd, startSelected],
  );

  const applyEndDate = useCallback(
    (nextDate: Date | undefined) => {
      if (endSelected === undefined) setInternalEnd(nextDate);
      onEndDateChange?.(nextDate);
      emitRangeChange(resolvedStart, nextDate);
    },
    [emitRangeChange, endSelected, onEndDateChange, resolvedStart],
  );

  const handleToggleOpen = useCallback(() => {
    const nextOpen = !open;
    if (nextOpen) {
      const nextStartMonth = monthStart(resolvedStart ?? new Date());
      const nextEndMonth = monthStart(
        resolvedEnd ??
          new Date(
            nextStartMonth.getFullYear(),
            nextStartMonth.getMonth() + 1,
            1,
          ),
      );
      setStartViewMonth(nextStartMonth);
      setEndViewMonth(nextEndMonth);
    }
    setOpenState(nextOpen);
  }, [open, resolvedEnd, resolvedStart, setOpenState]);

  const displayStartValue = resolvedStart
    ? formatDate(resolvedStart, locale)
    : startPlaceholder;
  const displayEndValue = resolvedEnd
    ? formatDate(resolvedEnd, locale)
    : endPlaceholder;
  const displayValue = `${displayStartValue} - ${displayEndValue}`;

  const handleClearRange = useCallback(() => {
    applyStartDate(undefined);
    applyEndDate(undefined);
    emitRangeChange(undefined, undefined);
  }, [applyEndDate, applyStartDate, emitRangeChange]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative flex flex-col",
        fullWidth ? "w-full" : "w-68",
        className,
      )}
      {...props}
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
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 text-left text-slate-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:text-slate-50",
          sizeClass,
          removeBackground && "bg-transparent dark:bg-transparent",
          !errorText && currentColor.border,
          !errorText && currentColor.focus,
          errorText && "border-destructive focus-visible:ring-destructive",
        )}
        onClick={handleToggleOpen}
      >
        <span className="flex-1 truncate">{displayValue}</span>
        {!hideCalendarIcon ? (
          <CalendarDays
            aria-hidden="true"
            data-testid="date-range-picker-calendar-icon"
            className={cn(
              "h-4 w-4 shrink-0",
              errorText ? "text-destructive" : currentColor.helper,
            )}
          />
        ) : null}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Calendar"
          className={cn(
            "absolute top-full z-10 mt-2 rounded-lg border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900",
            fullWidth ? "w-full" : "w-[32rem] max-w-[calc(100vw-2rem)]",
          )}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <p className={cn("text-xs font-medium", currentColor.label)}>
                Start date
              </p>
              <CalendarPopover
                inputId={`${inputId}-start`}
                enableMonthYearPicker={enableMonthYearPicker}
                color={color}
                viewMonth={startViewMonth}
                selectedDate={resolvedStart}
                locale={locale}
                inline
                showDialogRole={false}
                minimal
                showFooterActions={false}
                dayTestIdPrefix="start-day"
                onViewMonthChange={setStartViewMonth}
                onDateChange={(nextDate) => {
                  applyStartDate(nextDate);
                }}
              />
            </div>
            <div className="space-y-2 border-t border-slate-200 pt-3 md:border-t-0 md:border-l md:pt-0 md:pl-3 dark:border-slate-700">
              <p className={cn("text-xs font-medium", currentColor.label)}>
                End date
              </p>
              <CalendarPopover
                inputId={`${inputId}-end`}
                enableMonthYearPicker={enableMonthYearPicker}
                color={color}
                viewMonth={endViewMonth}
                selectedDate={resolvedEnd}
                locale={locale}
                inline
                showDialogRole={false}
                minimal
                showFooterActions={false}
                dayTestIdPrefix="end-day"
                onViewMonthChange={setEndViewMonth}
                onDateChange={(nextDate) => {
                  applyEndDate(nextDate);
                }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end border-t border-slate-200 pt-3 dark:border-slate-700">
            <button
              type="button"
              onClick={handleClearRange}
              className={cn(
                "h-8 rounded-md border px-2 text-xs text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:text-slate-300",
                currentColor.border,
                currentColor.focus,
                calendarColors.hover,
              )}
            >
              Clear
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
