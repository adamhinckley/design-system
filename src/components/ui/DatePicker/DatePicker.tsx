import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";

import { formatDate, datePickerColorClasses, isValidDate } from "./shared";
import { useEscapeToClose } from "./useEscapeToClose";
import { CalendarPopover } from "./CalendarPopover";
import type { TailwindColors } from "@/lib/types";
import { inputSizeClasses } from "@/lib/constants";

type DatePickerSize = keyof typeof inputSizeClasses;

export interface DatePickerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "value" | "defaultValue"
> {
  label?: string;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
  color?: TailwindColors;
  placeholder?: string;
  selected?: Date;
  defaultSelected?: Date;
  onDateChange?: (date: Date | undefined) => void;
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

export function DatePicker({
  label,
  helperText,
  errorText,
  fullWidth,
  color = "slate",
  placeholder = "Select date",
  selected,
  defaultSelected,
  onDateChange,
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
}: DatePickerProps) {
  const generatedId = useId();
  const sanitizedSelected = isValidDate(selected) ? selected : undefined;
  const sanitizedDefaultSelected = isValidDate(defaultSelected)
    ? defaultSelected
    : undefined;
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    sanitizedDefaultSelected,
  );
  const resolvedValue = sanitizedSelected ?? internalValue;
  const initialMonth = resolvedValue
    ? monthStart(resolvedValue)
    : monthStart(new Date());
  const [viewMonth, setViewMonth] = useState<Date>(initialMonth);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputId = id ?? generatedId;
  const helperContent = errorText || helperText;
  const currentColor = datePickerColorClasses[color];
  const sizeClass = inputSizeClasses[inputSize];

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

  const displayValue = resolvedValue
    ? formatDate(resolvedValue, locale)
    : placeholder;
  const applyDate = useCallback(
    (nextDate: Date | undefined) => {
      if (selected === undefined) setInternalValue(nextDate);
      onDateChange?.(nextDate);
    },
    [onDateChange, selected],
  );

  const handleToggleOpen = useCallback(() => {
    const nextOpen = !open;
    if (nextOpen) setViewMonth(monthStart(resolvedValue ?? new Date()));
    setOpenState(nextOpen);
  }, [open, resolvedValue, setOpenState]);

  const handleCalendarDateChange = useCallback(
    (nextDate: Date | undefined) => {
      applyDate(nextDate);
      setOpenState(false);
    },
    [applyDate, setOpenState],
  );

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative flex flex-col",
        fullWidth ? "w-full" : "w-64",
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
          "flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 text-left text-slate-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:text-slate-50",
          sizeClass,
          removeBackground && "bg-transparent dark:bg-transparent",
          !errorText && currentColor.border,
          !errorText && currentColor.focus,
          errorText && "border-destructive focus-visible:ring-destructive",
        )}
        onClick={handleToggleOpen}
        {...props}
      >
        <span className="flex-1 truncate">{displayValue}</span>
        {!hideCalendarIcon ? (
          <CalendarDays
            aria-hidden="true"
            data-testid="date-picker-calendar-icon"
            className={cn(
              "h-4 w-4 shrink-0",
              errorText ? "text-destructive" : currentColor.helper,
            )}
          />
        ) : null}
      </button>

      {open ? (
        <CalendarPopover
          inputId={inputId}
          enableMonthYearPicker={enableMonthYearPicker}
          color={color}
          viewMonth={viewMonth}
          selectedDate={resolvedValue}
          locale={locale}
          onViewMonthChange={setViewMonth}
          onDateChange={handleCalendarDateChange}
        />
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
