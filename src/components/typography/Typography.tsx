import { cn } from "@/lib/utils";
import React from "react";

import type { TailwindColors, ColorType } from "@/lib/types";

/**
 * Typography component props with comprehensive Tailwind text utilities.
 */
export interface TypographyProps {
  /** The content to display */
  children: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Typography variant that determines element and default styles */
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "overline"
    | "inherit";
  /** Override the default HTML element for this variant */
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

  // Font properties
  /** Font family */
  fontFamily?: "sans" | "serif" | "mono";
  /** Font size (overrides variant default) */
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  /** Font weight */
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  /** Font style */
  italic?: boolean;
  /** Font smoothing */
  smoothing?: "antialiased" | "subpixel-antialiased";
  /** Font stretch (requires extended variants) */
  stretch?: "normal" | "condensed" | "expanded";
  /** Numeric font variant */
  numericVariant?:
    | "normal-nums"
    | "ordinal"
    | "slashed-zero"
    | "lining-nums"
    | "oldstyle-nums"
    | "proportional-nums"
    | "tabular-nums"
    | "diagonal-fractions"
    | "stacked-fractions";

  // Spacing and layout
  /** Letter spacing */
  tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  /** Line height */
  leading?:
    | "none"
    | "tight"
    | "snug"
    | "normal"
    | "relaxed"
    | "loose"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10";
  /** Line clamp (truncate after n lines) */
  lineClamp?: "1" | "2" | "3" | "4" | "5" | "6" | "none";
  /** Text indent */
  indent?:
    | "0"
    | "px"
    | "0.5"
    | "1"
    | "1.5"
    | "2"
    | "2.5"
    | "3"
    | "3.5"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8";

  // Alignment
  /** Text alignment */
  align?: "left" | "center" | "right" | "justify" | "start" | "end";
  /** Vertical alignment */
  verticalAlign?:
    | "baseline"
    | "top"
    | "middle"
    | "bottom"
    | "text-top"
    | "text-bottom"
    | "sub"
    | "super";

  // Color
  /** Text color with automatic dark mode support */
  color?: TailwindColors;

  // Decoration
  /** Text decoration line */
  decoration?: "underline" | "overline" | "line-through" | "no-underline";
  /** Text decoration color */
  decorationColor?: ColorType;
  /** Text decoration style */
  decorationStyle?: "solid" | "double" | "dotted" | "dashed" | "wavy";
  /** Text decoration thickness */
  decorationThickness?: "auto" | "from-font" | "0" | "1" | "2" | "4" | "8";
  /** Underline offset */
  underlineOffset?: "auto" | "0" | "1" | "2" | "4" | "8";

  // Transform and overflow
  /** Text transform */
  transform?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
  /** Text overflow */
  overflow?: "truncate" | "ellipsis" | "clip";
  /** Text wrap */
  wrap?: "wrap" | "nowrap" | "balance" | "pretty";
  /** White space handling */
  whitespace?:
    | "normal"
    | "nowrap"
    | "pre"
    | "pre-line"
    | "pre-wrap"
    | "break-spaces";
  /** Word break */
  wordBreak?: "normal" | "words" | "all" | "keep";
  /** Overflow wrap */
  overflowWrap?: "normal" | "break-word";
  /** Hyphens */
  hyphens?: "none" | "manual" | "auto";
}

// Map colors to light/dark mode classes
const typographyColorClasses: Record<TailwindColors, string> = {
  slate: "text-slate-700 dark:text-slate-300",
  gray: "text-gray-700 dark:text-gray-300",
  zinc: "text-zinc-700 dark:text-zinc-300",
  neutral: "text-neutral-700 dark:text-neutral-300",
  stone: "text-stone-700 dark:text-stone-300",
  red: "text-red-700 dark:text-red-300",
  orange: "text-orange-700 dark:text-orange-300",
  amber: "text-amber-700 dark:text-amber-300",
  yellow: "text-yellow-700 dark:text-yellow-300",
  lime: "text-lime-700 dark:text-lime-300",
  green: "text-green-700 dark:text-green-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  teal: "text-teal-700 dark:text-teal-300",
  cyan: "text-cyan-700 dark:text-cyan-300",
  sky: "text-sky-700 dark:text-sky-300",
  blue: "text-blue-700 dark:text-blue-300",
  indigo: "text-indigo-700 dark:text-indigo-300",
  violet: "text-violet-700 dark:text-violet-300",
  purple: "text-purple-700 dark:text-purple-300",
  fuchsia: "text-fuchsia-700 dark:text-fuchsia-300",
  pink: "text-pink-700 dark:text-pink-300",
  rose: "text-rose-700 dark:text-rose-300",
};

// Map variants to default elements
const variantElementMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  button: "span",
  caption: "span",
  overline: "span",
  inherit: "span",
} as const;

// Default styles for each variant
const variantStyles = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",
  subtitle1: "text-base font-normal leading-relaxed",
  subtitle2: "text-sm font-medium leading-relaxed",
  body1: "text-base font-normal leading-relaxed",
  body2: "text-sm font-normal leading-normal",
  button: "text-sm font-medium tracking-wide uppercase",
  caption: "text-xs font-normal leading-snug",
  overline: "text-xs font-semibold tracking-widest uppercase",
  inherit: "",
} as const;

/**
 * A flexible typography component with comprehensive Tailwind text styling options.
 * Supports multiple variants matching Material-UI's Typography API.
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Page Title</Typography>
 * <Typography variant="body1">Regular paragraph text.</Typography>
 * <Typography variant="caption" color="gray-500">
 *   Small caption text
 * </Typography>
 * <Typography
 *   variant="h2"
 *   component="div"
 *   weight="bold"
 *   align="center"
 * >
 *   Custom styled heading
 * </Typography>
 * ```
 */
export function Typography({
  children,
  className,
  variant = "body1",
  component,
  color = "slate",

  // Font
  fontFamily,
  size,
  weight,
  italic,
  smoothing,
  stretch,
  numericVariant,

  // Spacing
  tracking,
  leading,
  lineClamp,
  indent,

  // Alignment
  align,
  verticalAlign,

  // Decoration
  decoration,
  decorationColor,
  decorationStyle,
  decorationThickness,
  underlineOffset,

  // Transform/Overflow
  transform,
  overflow,
  wrap,
  whitespace,
  wordBreak,
  overflowWrap,
  hyphens,
}: TypographyProps) {
  // Determine which element to render
  const Component = (component ||
    variantElementMap[variant]) as React.ElementType;

  // Get default styles for the variant
  const defaultStyles = variantStyles[variant];

  return (
    <Component
      className={cn(
        defaultStyles,

        // Font
        fontFamily && `font-${fontFamily}`,
        size && `text-${size}`,
        weight && `font-${weight}`,
        italic && "italic",
        smoothing &&
          (smoothing === "antialiased"
            ? "antialiased"
            : "subpixel-antialiased"),
        stretch && stretch !== "normal" && `font-${stretch}`,
        numericVariant && numericVariant,

        // Spacing
        tracking && `tracking-${tracking}`,
        leading && `leading-${leading}`,
        lineClamp && lineClamp !== "none" && `line-clamp-${lineClamp}`,
        indent && `indent-${indent}`,

        // Alignment
        align && `text-${align}`,
        verticalAlign && `align-${verticalAlign}`,

        // Color
        typographyColorClasses[color],

        // Decoration
        decoration,
        decorationColor,
        decorationStyle && `decoration-${decorationStyle}`,
        decorationThickness && `decoration-${decorationThickness}`,
        underlineOffset && `underline-offset-${underlineOffset}`,

        // Transform/Overflow
        transform,
        overflow,
        wrap && `text-${wrap}`,
        whitespace && `whitespace-${whitespace}`,
        wordBreak && `break-${wordBreak}`,
        overflowWrap === "break-word" && "wrap-break-word",
        hyphens && `hyphens-${hyphens}`,

        className,
      )}
    >
      {children}
    </Component>
  );
}
