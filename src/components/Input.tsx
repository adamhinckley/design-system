import { forwardRef, useId } from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.ComponentProps<"input"> & {
  helperText?: string;
  error?: boolean | string;
  label?: string;
  fullWidth?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, helperText, error, id, label, fullWidth, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const hasError = Boolean(error);
    const helperContent =
      typeof error === "boolean" ? helperText : (error ?? helperText);
    const inputId = id ?? (label || helperContent ? generatedId : undefined);
    const helperId = inputId ? `${inputId}-help` : undefined;

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
            className="mb-1 ml-2 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-700 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            hasError && "border-destructive focus-visible:ring-destructive",
          )}
          aria-invalid={hasError || undefined}
          aria-describedby={helperContent && helperId ? helperId : undefined}
          ref={ref}
          {...props}
        />
        {helperContent ? (
          <p
            id={helperId}
            className={cn(
              "pointer-events-none absolute left-0 top-full mt-1 ml-2 text-sm",
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
