import { forwardRef, useId } from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.ComponentProps<"input"> & {
  helperText?: string;
  errorText?: string;
  label?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  color?: InputColor;
  removeBackground?: boolean;
  inputSize?: InputSize;
};

const inputColorClasses = {
  slate: {
    label: "text-slate-700 dark:text-slate-300",
    helper: "text-slate-600 dark:text-slate-400",
    adornment: "text-slate-500 dark:text-slate-400",
    border: "border-slate-300 dark:border-slate-700",
    focus: "focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500",
    placeholder: "placeholder:text-slate-400 dark:placeholder:text-slate-500",
  },
  gray: {
    label: "text-gray-700 dark:text-gray-300",
    helper: "text-gray-600 dark:text-gray-400",
    adornment: "text-gray-500 dark:text-gray-400",
    border: "border-gray-300 dark:border-gray-700",
    focus: "focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500",
    placeholder: "placeholder:text-gray-400 dark:placeholder:text-gray-500",
  },
  zinc: {
    label: "text-zinc-700 dark:text-zinc-300",
    helper: "text-zinc-600 dark:text-zinc-400",
    adornment: "text-zinc-500 dark:text-zinc-400",
    border: "border-zinc-300 dark:border-zinc-700",
    focus: "focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
    placeholder: "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
  },
  neutral: {
    label: "text-neutral-700 dark:text-neutral-300",
    helper: "text-neutral-600 dark:text-neutral-400",
    adornment: "text-neutral-500 dark:text-neutral-400",
    border: "border-neutral-300 dark:border-neutral-700",
    focus: "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
    placeholder:
      "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
  },
  stone: {
    label: "text-stone-700 dark:text-stone-300",
    helper: "text-stone-600 dark:text-stone-400",
    adornment: "text-stone-500 dark:text-stone-400",
    border: "border-stone-300 dark:border-stone-700",
    focus: "focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500",
    placeholder: "placeholder:text-stone-400 dark:placeholder:text-stone-500",
  },
  red: {
    label: "text-red-700 dark:text-red-300",
    helper: "text-red-600 dark:text-red-400",
    adornment: "text-red-500 dark:text-red-400",
    border: "border-red-300 dark:border-red-700",
    focus: "focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    placeholder: "placeholder:text-red-400 dark:placeholder:text-red-500",
  },
  orange: {
    label: "text-orange-700 dark:text-orange-300",
    helper: "text-orange-600 dark:text-orange-400",
    adornment: "text-orange-500 dark:text-orange-400",
    border: "border-orange-300 dark:border-orange-700",
    focus: "focus-visible:ring-orange-400 dark:focus-visible:ring-orange-500",
    placeholder: "placeholder:text-orange-400 dark:placeholder:text-orange-500",
  },
  amber: {
    label: "text-amber-700 dark:text-amber-300",
    helper: "text-amber-600 dark:text-amber-400",
    adornment: "text-amber-500 dark:text-amber-400",
    border: "border-amber-300 dark:border-amber-700",
    focus: "focus-visible:ring-amber-400 dark:focus-visible:ring-amber-500",
    placeholder: "placeholder:text-amber-400 dark:placeholder:text-amber-500",
  },
  yellow: {
    label: "text-yellow-700 dark:text-yellow-300",
    helper: "text-yellow-600 dark:text-yellow-400",
    adornment: "text-yellow-500 dark:text-yellow-400",
    border: "border-yellow-300 dark:border-yellow-700",
    focus: "focus-visible:ring-yellow-400 dark:focus-visible:ring-yellow-500",
    placeholder: "placeholder:text-yellow-400 dark:placeholder:text-yellow-500",
  },
  lime: {
    label: "text-lime-700 dark:text-lime-300",
    helper: "text-lime-600 dark:text-lime-400",
    adornment: "text-lime-500 dark:text-lime-400",
    border: "border-lime-300 dark:border-lime-700",
    focus: "focus-visible:ring-lime-400 dark:focus-visible:ring-lime-500",
    placeholder: "placeholder:text-lime-400 dark:placeholder:text-lime-500",
  },
  green: {
    label: "text-green-700 dark:text-green-300",
    helper: "text-green-600 dark:text-green-400",
    adornment: "text-green-500 dark:text-green-400",
    border: "border-green-300 dark:border-green-700",
    focus: "focus-visible:ring-green-400 dark:focus-visible:ring-green-500",
    placeholder: "placeholder:text-green-400 dark:placeholder:text-green-500",
  },
  emerald: {
    label: "text-emerald-700 dark:text-emerald-300",
    helper: "text-emerald-600 dark:text-emerald-400",
    adornment: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-300 dark:border-emerald-700",
    focus: "focus-visible:ring-emerald-400 dark:focus-visible:ring-emerald-500",
    placeholder:
      "placeholder:text-emerald-400 dark:placeholder:text-emerald-500",
  },
  teal: {
    label: "text-teal-700 dark:text-teal-300",
    helper: "text-teal-600 dark:text-teal-400",
    adornment: "text-teal-500 dark:text-teal-400",
    border: "border-teal-300 dark:border-teal-700",
    focus: "focus-visible:ring-teal-400 dark:focus-visible:ring-teal-500",
    placeholder: "placeholder:text-teal-400 dark:placeholder:text-teal-500",
  },
  cyan: {
    label: "text-cyan-700 dark:text-cyan-300",
    helper: "text-cyan-600 dark:text-cyan-400",
    adornment: "text-cyan-500 dark:text-cyan-400",
    border: "border-cyan-300 dark:border-cyan-700",
    focus: "focus-visible:ring-cyan-400 dark:focus-visible:ring-cyan-500",
    placeholder: "placeholder:text-cyan-400 dark:placeholder:text-cyan-500",
  },
  sky: {
    label: "text-sky-700 dark:text-sky-300",
    helper: "text-sky-600 dark:text-sky-400",
    adornment: "text-sky-500 dark:text-sky-400",
    border: "border-sky-300 dark:border-sky-700",
    focus: "focus-visible:ring-sky-400 dark:focus-visible:ring-sky-500",
    placeholder: "placeholder:text-sky-400 dark:placeholder:text-sky-500",
  },
  blue: {
    label: "text-blue-700 dark:text-blue-300",
    helper: "text-blue-600 dark:text-blue-400",
    adornment: "text-blue-500 dark:text-blue-400",
    border: "border-blue-300 dark:border-blue-700",
    focus: "focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500",
    placeholder: "placeholder:text-blue-400 dark:placeholder:text-blue-500",
  },
  indigo: {
    label: "text-indigo-700 dark:text-indigo-300",
    helper: "text-indigo-600 dark:text-indigo-400",
    adornment: "text-indigo-500 dark:text-indigo-400",
    border: "border-indigo-300 dark:border-indigo-700",
    focus: "focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500",
    placeholder: "placeholder:text-indigo-400 dark:placeholder:text-indigo-500",
  },
  violet: {
    label: "text-violet-700 dark:text-violet-300",
    helper: "text-violet-600 dark:text-violet-400",
    adornment: "text-violet-500 dark:text-violet-400",
    border: "border-violet-300 dark:border-violet-700",
    focus: "focus-visible:ring-violet-400 dark:focus-visible:ring-violet-500",
    placeholder: "placeholder:text-violet-400 dark:placeholder:text-violet-500",
  },
  purple: {
    label: "text-purple-700 dark:text-purple-300",
    helper: "text-purple-600 dark:text-purple-400",
    adornment: "text-purple-500 dark:text-purple-400",
    border: "border-purple-300 dark:border-purple-700",
    focus: "focus-visible:ring-purple-400 dark:focus-visible:ring-purple-500",
    placeholder: "placeholder:text-purple-400 dark:placeholder:text-purple-500",
  },
  fuchsia: {
    label: "text-fuchsia-700 dark:text-fuchsia-300",
    helper: "text-fuchsia-600 dark:text-fuchsia-400",
    adornment: "text-fuchsia-500 dark:text-fuchsia-400",
    border: "border-fuchsia-300 dark:border-fuchsia-700",
    focus: "focus-visible:ring-fuchsia-400 dark:focus-visible:ring-fuchsia-500",
    placeholder:
      "placeholder:text-fuchsia-400 dark:placeholder:text-fuchsia-500",
  },
  pink: {
    label: "text-pink-700 dark:text-pink-300",
    helper: "text-pink-600 dark:text-pink-400",
    adornment: "text-pink-500 dark:text-pink-400",
    border: "border-pink-300 dark:border-pink-700",
    focus: "focus-visible:ring-pink-400 dark:focus-visible:ring-pink-500",
    placeholder: "placeholder:text-pink-400 dark:placeholder:text-pink-500",
  },
  rose: {
    label: "text-rose-700 dark:text-rose-300",
    helper: "text-rose-600 dark:text-rose-400",
    adornment: "text-rose-500 dark:text-rose-400",
    border: "border-rose-300 dark:border-rose-700",
    focus: "focus-visible:ring-rose-400 dark:focus-visible:ring-rose-500",
    placeholder: "placeholder:text-rose-400 dark:placeholder:text-rose-500",
  },
} as const;

const sizeClasses = {
  sm: "h-9 text-sm",
  md: "h-11 text-base",
  lg: "h-12 text-lg",
} as const;

type InputColor = keyof typeof inputColorClasses;
type InputSize = keyof typeof sizeClasses;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      helperText,
      errorText,
      id,
      label,
      fullWidth,
      startAdornment,
      endAdornment,
      color = "slate",
      removeBackground = false,
      inputSize = "md",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const hasError = Boolean(errorText);
    const helperContent = errorText || helperText;
    const inputId = id ?? (label || helperContent ? generatedId : undefined);
    const helperId = inputId ? `${inputId}-help` : undefined;
    const hasStartAdornment = Boolean(startAdornment);
    const hasEndAdornment = Boolean(endAdornment);
    const colorClasses = inputColorClasses[color];
    const sizeClass = sizeClasses[inputSize];

    return (
      <div
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
              hasError ? "text-destructive" : colorClasses.label,
            )}
          >
            {label}
          </label>
        ) : null}
        <div className="relative flex items-center">
          {hasStartAdornment ? (
            <div
              className={cn(
                "absolute left-3 flex h-full items-center",
                hasError ? "text-destructive" : colorClasses.adornment,
              )}
            >
              {startAdornment}
            </div>
          ) : null}
          <input
            id={inputId}
            type={type}
            className={cn(
              "flex w-full rounded-lg border bg-white px-3 py-2 text-slate-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-700 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50  dark:bg-slate-950 dark:text-slate-50",
              sizeClass,
              !hasError && colorClasses.border,
              !hasError && colorClasses.focus,
              !hasError && colorClasses.placeholder,
              removeBackground && "bg-transparent dark:bg-transparent",
              hasStartAdornment && "pl-10",
              hasEndAdornment && "pr-10",
              hasError && "border-destructive focus-visible:ring-destructive",
            )}
            aria-invalid={hasError || undefined}
            aria-describedby={helperContent && helperId ? helperId : undefined}
            ref={ref}
            {...props}
          />
          {hasEndAdornment ? (
            <div
              className={cn(
                "absolute right-3 flex h-full items-center",
                hasError ? "text-destructive" : colorClasses.adornment,
              )}
            >
              {endAdornment}
            </div>
          ) : null}
        </div>
        {helperContent ? (
          <p
            id={helperId}
            className={cn(
              "pointer-events-none absolute left-0 top-full mt-1 ml-2 text-xs",
              hasError ? "text-destructive" : colorClasses.helper,
            )}
          >
            {helperContent}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
