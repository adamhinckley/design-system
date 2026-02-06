import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  helperText?: React.ReactNode;
  error?: boolean | React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, helperText, error, id, ...props }, ref) => {
    const hasError = Boolean(error);
    const helperContent =
      typeof error === "boolean" ? helperText : (error ?? helperText);
    const helperId = id ? `${id}-help` : undefined;

    return (
      <div className="grid gap-1.5">
        <input
          id={id}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            hasError && "border-destructive focus-visible:ring-destructive",
            className,
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
              "text-sm",
              hasError ? "text-destructive" : "text-muted-foreground",
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

export { Input };
