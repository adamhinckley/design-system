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
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      helperText,
      errorText,
      id,
      label,
      fullWidth,
      startAdornment,
      endAdornment,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const hasError = Boolean(errorText);
    const helperContent = errorText ?? helperText;
    const inputId = id ?? (label || helperContent ? generatedId : undefined);
    const helperId = inputId ? `${inputId}-help` : undefined;
    const hasStartAdornment = Boolean(startAdornment);
    const hasEndAdornment = Boolean(endAdornment);
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
              "mb-1 ml-2 block text-sm font-medium text-slate-700",
              hasError && "text-destructive",
            )}
          >
            {label}
          </label>
        ) : null}
        <div className="relative flex items-center">
          {hasStartAdornment ? (
            <div className="absolute left-3 flex h-full items-center text-slate-500">
              {startAdornment}
            </div>
          ) : null}
          <input
            id={inputId}
            type={type}
            className={cn(
              "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-700 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
            <div className="absolute right-3 flex h-full items-center text-slate-500">
              {endAdornment}
            </div>
          ) : null}
        </div>
        {helperContent ? (
          <p
            id={helperId}
            className={cn(
              "pointer-events-none absolute left-0 top-full mt-1 ml-2 text-xs",
              hasError ? "text-destructive" : "text-slate-600",
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
