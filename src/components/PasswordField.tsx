import { useState } from "react";
import TextField, { type InputProps } from "./TextField";
import { cn } from "@/lib/utils";

export type PasswordFieldProps = Omit<InputProps, "type" | "endAdornment"> & {
  showVisibilityToggle?: boolean;
};

const iconColorClasses = {
  slate:
    "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300",
  gray: "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300",
  zinc: "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300",
  neutral:
    "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300",
  stone:
    "text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300",
  red: "text-red-500 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300",
  orange:
    "text-orange-500 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300",
  amber:
    "text-amber-500 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300",
  yellow:
    "text-yellow-500 dark:text-yellow-400 group-hover:text-yellow-700 dark:group-hover:text-yellow-300",
  lime: "text-lime-500 dark:text-lime-400 group-hover:text-lime-700 dark:group-hover:text-lime-300",
  green:
    "text-green-500 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300",
  emerald:
    "text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300",
  teal: "text-teal-500 dark:text-teal-400 group-hover:text-teal-700 dark:group-hover:text-teal-300",
  cyan: "text-cyan-500 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300",
  sky: "text-sky-500 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300",
  blue: "text-blue-500 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300",
  indigo:
    "text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300",
  violet:
    "text-violet-500 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300",
  purple:
    "text-purple-500 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300",
  fuchsia:
    "text-fuchsia-500 dark:text-fuchsia-400 group-hover:text-fuchsia-700 dark:group-hover:text-fuchsia-300",
  pink: "text-pink-500 dark:text-pink-400 group-hover:text-pink-700 dark:group-hover:text-pink-300",
  rose: "text-rose-500 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300",
} as const;

type IconColor = keyof typeof iconColorClasses;

const createIcon = (pathData: string, colorClass: string) => (
  <svg
    width="30"
    height="30"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("transition-colors", colorClass)}
  >
    <path d={pathData}></path>
  </svg>
);

const PasswordField = ({
  showVisibilityToggle,
  color = "slate",
  ...props
}: PasswordFieldProps) => {
  const [show, setShow] = useState(false);
  const toggleLabel = show ? "Hide" : "Show";
  const iconColor =
    iconColorClasses[color as IconColor] ?? iconColorClasses.slate;

  const openIcon = createIcon(
    "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3",
    iconColor,
  );

  const closeIcon = createIcon(
    "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z",
    iconColor,
  );

  return (
    <TextField
      {...props}
      color={color}
      type={show ? "text" : "password"}
      endAdornment={
        showVisibilityToggle ? (
          <button
            type="button"
            aria-label={`${toggleLabel} password`}
            aria-pressed={show}
            disabled={props.disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setShow((value) => !value)}
            className="group cursor-pointer inline-flex items-center justify-center bg-transparent p-0 m-0 border-0 appearance-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {show ? closeIcon : openIcon}
          </button>
        ) : null
      }
    />
  );
};

export default PasswordField;
