import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const colorClasses = {
  slate: {
    default:
      "bg-slate-700 text-white hover:bg-slate-800 focus-visible:ring-slate-500 dark:focus-visible:ring-slate-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500",
    secondary:
      "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500",
    ghost:
      "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500",
    link: "text-slate-600 dark:text-slate-400 underline-offset-4 hover:underline focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500",
  },
  gray: {
    default:
      "bg-gray-700 text-white hover:bg-gray-800 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500",
    secondary:
      "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500",
    ghost:
      "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500",
    link: "text-gray-600 dark:text-gray-400 underline-offset-4 hover:underline focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500",
  },
  zinc: {
    default:
      "bg-zinc-700 text-white hover:bg-zinc-800 focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
    secondary:
      "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
    ghost:
      "text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
    link: "text-zinc-600 dark:text-zinc-400 underline-offset-4 hover:underline focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
  },
  neutral: {
    default:
      "bg-neutral-700 text-white hover:bg-neutral-800 focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
    secondary:
      "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
    ghost:
      "text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
    link: "text-neutral-600 dark:text-neutral-400 underline-offset-4 hover:underline focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
  },
  stone: {
    default:
      "bg-stone-700 text-white hover:bg-stone-800 focus-visible:ring-stone-500 dark:focus-visible:ring-stone-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-900 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500",
    secondary:
      "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500",
    ghost:
      "text-stone-900 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500",
    link: "text-stone-600 dark:text-stone-400 underline-offset-4 hover:underline focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500",
  },
  red: {
    default:
      "bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-500 dark:focus-visible:ring-red-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-red-300 dark:border-red-700 bg-white dark:bg-red-950 text-red-900 dark:text-red-100 hover:bg-red-50 dark:hover:bg-red-900 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    secondary:
      "bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    ghost:
      "text-red-900 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-800 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    link: "text-red-600 dark:text-red-400 underline-offset-4 hover:underline focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
  },
  orange: {
    default:
      "bg-orange-700 text-white hover:bg-orange-800 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-orange-300 dark:border-orange-700 bg-white dark:bg-orange-950 text-orange-900 dark:text-orange-100 hover:bg-orange-50 dark:hover:bg-orange-900 focus-visible:ring-orange-400 dark:focus-visible:ring-orange-500",
    secondary:
      "bg-orange-100 dark:bg-orange-800 text-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-700 focus-visible:ring-orange-400 dark:focus-visible:ring-orange-500",
    ghost:
      "text-orange-900 dark:text-orange-100 hover:bg-orange-100 dark:hover:bg-orange-800 focus-visible:ring-orange-400 dark:focus-visible:ring-orange-500",
    link: "text-orange-700 dark:text-orange-300 underline-offset-4 hover:underline focus-visible:ring-orange-500 dark:focus-visible:ring-orange-500",
  },
  amber: {
    default:
      "bg-amber-700 text-white hover:bg-amber-800 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-amber-300 dark:border-amber-700 bg-white dark:bg-amber-950 text-amber-900 dark:text-amber-100 hover:bg-amber-50 dark:hover:bg-amber-900 focus-visible:ring-amber-400 dark:focus-visible:ring-amber-500",
    secondary:
      "bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-700 focus-visible:ring-amber-400 dark:focus-visible:ring-amber-500",
    ghost:
      "text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-800 focus-visible:ring-amber-400 dark:focus-visible:ring-amber-500",
    link: "text-amber-700 dark:text-amber-300 underline-offset-4 hover:underline focus-visible:ring-amber-500 dark:focus-visible:ring-amber-500",
  },
  yellow: {
    default:
      "bg-yellow-700 text-white hover:bg-yellow-800 focus-visible:ring-yellow-500 dark:focus-visible:ring-yellow-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-yellow-300 dark:border-yellow-700 bg-white dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-50 dark:hover:bg-yellow-900 focus-visible:ring-yellow-400 dark:focus-visible:ring-yellow-500",
    secondary:
      "bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-700 focus-visible:ring-yellow-400 dark:focus-visible:ring-yellow-500",
    ghost:
      "text-yellow-900 dark:text-yellow-100 hover:bg-yellow-100 dark:hover:bg-yellow-800 focus-visible:ring-yellow-400 dark:focus-visible:ring-yellow-500",
    link: "text-yellow-700 dark:text-yellow-300 underline-offset-4 hover:underline focus-visible:ring-yellow-500 dark:focus-visible:ring-yellow-500",
  },
  lime: {
    default:
      "bg-lime-700 text-white hover:bg-lime-800 focus-visible:ring-lime-500 dark:focus-visible:ring-lime-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-lime-300 dark:border-lime-700 bg-white dark:bg-lime-950 text-lime-900 dark:text-lime-100 hover:bg-lime-50 dark:hover:bg-lime-900 focus-visible:ring-lime-400 dark:focus-visible:ring-lime-500",
    secondary:
      "bg-lime-100 dark:bg-lime-800 text-lime-900 dark:text-lime-100 hover:bg-lime-200 dark:hover:bg-lime-700 focus-visible:ring-lime-400 dark:focus-visible:ring-lime-500",
    ghost:
      "text-lime-900 dark:text-lime-100 hover:bg-lime-100 dark:hover:bg-lime-800 focus-visible:ring-lime-400 dark:focus-visible:ring-lime-500",
    link: "text-lime-700 dark:text-lime-300 underline-offset-4 hover:underline focus-visible:ring-lime-500 dark:focus-visible:ring-lime-500",
  },
  green: {
    default:
      "bg-green-700 text-white hover:bg-green-800 focus-visible:ring-green-500 dark:focus-visible:ring-green-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-green-300 dark:border-green-700 bg-white dark:bg-green-950 text-green-900 dark:text-green-100 hover:bg-green-50 dark:hover:bg-green-900 focus-visible:ring-green-400 dark:focus-visible:ring-green-500",
    secondary:
      "bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-700 focus-visible:ring-green-400 dark:focus-visible:ring-green-500",
    ghost:
      "text-green-900 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-800 focus-visible:ring-green-400 dark:focus-visible:ring-green-500",
    link: "text-green-700 dark:text-green-300 underline-offset-4 hover:underline focus-visible:ring-green-500 dark:focus-visible:ring-green-500",
  },
  emerald: {
    default:
      "bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900 focus-visible:ring-emerald-400 dark:focus-visible:ring-emerald-500",
    secondary:
      "bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200 dark:hover:bg-emerald-700 focus-visible:ring-emerald-400 dark:focus-visible:ring-emerald-500",
    ghost:
      "text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-800 focus-visible:ring-emerald-400 dark:focus-visible:ring-emerald-500",
    link: "text-emerald-700 dark:text-emerald-300 underline-offset-4 hover:underline focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-500",
  },
  teal: {
    default:
      "bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-500 dark:focus-visible:ring-teal-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-teal-300 dark:border-teal-700 bg-white dark:bg-teal-950 text-teal-900 dark:text-teal-100 hover:bg-teal-50 dark:hover:bg-teal-900 focus-visible:ring-teal-400 dark:focus-visible:ring-teal-500",
    secondary:
      "bg-teal-100 dark:bg-teal-800 text-teal-900 dark:text-teal-100 hover:bg-teal-200 dark:hover:bg-teal-700 focus-visible:ring-teal-400 dark:focus-visible:ring-teal-500",
    ghost:
      "text-teal-900 dark:text-teal-100 hover:bg-teal-100 dark:hover:bg-teal-800 focus-visible:ring-teal-400 dark:focus-visible:ring-teal-500",
    link: "text-teal-700 dark:text-teal-300 underline-offset-4 hover:underline focus-visible:ring-teal-500 dark:focus-visible:ring-teal-500",
  },
  cyan: {
    default:
      "bg-cyan-700 text-white hover:bg-cyan-800 focus-visible:ring-cyan-500 dark:focus-visible:ring-cyan-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-cyan-300 dark:border-cyan-700 bg-white dark:bg-cyan-950 text-cyan-900 dark:text-cyan-100 hover:bg-cyan-50 dark:hover:bg-cyan-900 focus-visible:ring-cyan-400 dark:focus-visible:ring-cyan-500",
    secondary:
      "bg-cyan-100 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100 hover:bg-cyan-200 dark:hover:bg-cyan-700 focus-visible:ring-cyan-400 dark:focus-visible:ring-cyan-500",
    ghost:
      "text-cyan-900 dark:text-cyan-100 hover:bg-cyan-100 dark:hover:bg-cyan-800 focus-visible:ring-cyan-400 dark:focus-visible:ring-cyan-500",
    link: "text-cyan-700 dark:text-cyan-300 underline-offset-4 hover:underline focus-visible:ring-cyan-500 dark:focus-visible:ring-cyan-500",
  },
  sky: {
    default:
      "bg-sky-700 text-white hover:bg-sky-800 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-sky-300 dark:border-sky-700 bg-white dark:bg-sky-950 text-sky-900 dark:text-sky-100 hover:bg-sky-50 dark:hover:bg-sky-900 focus-visible:ring-sky-400 dark:focus-visible:ring-sky-500",
    secondary:
      "bg-sky-100 dark:bg-sky-800 text-sky-900 dark:text-sky-100 hover:bg-sky-200 dark:hover:bg-sky-700 focus-visible:ring-sky-400 dark:focus-visible:ring-sky-500",
    ghost:
      "text-sky-900 dark:text-sky-100 hover:bg-sky-100 dark:hover:bg-sky-800 focus-visible:ring-sky-400 dark:focus-visible:ring-sky-500",
    link: "text-sky-700 dark:text-sky-300 underline-offset-4 hover:underline focus-visible:ring-sky-500 dark:focus-visible:ring-sky-500",
  },
  blue: {
    default:
      "bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-950 text-blue-900 dark:text-blue-100 hover:bg-blue-50 dark:hover:bg-blue-900 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500",
    secondary:
      "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-700 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500",
    ghost:
      "text-blue-900 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-800 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500",
    link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500",
  },
  indigo: {
    default:
      "bg-indigo-700 text-white hover:bg-indigo-800 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-indigo-950 text-indigo-900 dark:text-indigo-100 hover:bg-indigo-50 dark:hover:bg-indigo-900 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500",
    secondary:
      "bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100 hover:bg-indigo-200 dark:hover:bg-indigo-700 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500",
    ghost:
      "text-indigo-900 dark:text-indigo-100 hover:bg-indigo-100 dark:hover:bg-indigo-800 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500",
    link: "text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500",
  },
  violet: {
    default:
      "bg-violet-700 text-white hover:bg-violet-800 focus-visible:ring-violet-500 dark:focus-visible:ring-violet-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-violet-300 dark:border-violet-700 bg-white dark:bg-violet-950 text-violet-900 dark:text-violet-100 hover:bg-violet-50 dark:hover:bg-violet-900 focus-visible:ring-violet-400 dark:focus-visible:ring-violet-500",
    secondary:
      "bg-violet-100 dark:bg-violet-800 text-violet-900 dark:text-violet-100 hover:bg-violet-200 dark:hover:bg-violet-700 focus-visible:ring-violet-400 dark:focus-visible:ring-violet-500",
    ghost:
      "text-violet-900 dark:text-violet-100 hover:bg-violet-100 dark:hover:bg-violet-800 focus-visible:ring-violet-400 dark:focus-visible:ring-violet-500",
    link: "text-violet-600 dark:text-violet-400 underline-offset-4 hover:underline focus-visible:ring-violet-400 dark:focus-visible:ring-violet-500",
  },
  purple: {
    default:
      "bg-purple-700 text-white hover:bg-purple-800 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-purple-300 dark:border-purple-700 bg-white dark:bg-purple-950 text-purple-900 dark:text-purple-100 hover:bg-purple-50 dark:hover:bg-purple-900 focus-visible:ring-purple-400 dark:focus-visible:ring-purple-500",
    secondary:
      "bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-700 focus-visible:ring-purple-400 dark:focus-visible:ring-purple-500",
    ghost:
      "text-purple-900 dark:text-purple-100 hover:bg-purple-100 dark:hover:bg-purple-800 focus-visible:ring-purple-400 dark:focus-visible:ring-purple-500",
    link: "text-purple-600 dark:text-purple-400 underline-offset-4 hover:underline focus-visible:ring-purple-400 dark:focus-visible:ring-purple-500",
  },
  fuchsia: {
    default:
      "bg-fuchsia-700 text-white hover:bg-fuchsia-800 focus-visible:ring-fuchsia-500 dark:focus-visible:ring-fuchsia-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-fuchsia-300 dark:border-fuchsia-700 bg-white dark:bg-fuchsia-950 text-fuchsia-900 dark:text-fuchsia-100 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900 focus-visible:ring-fuchsia-400 dark:focus-visible:ring-fuchsia-500",
    secondary:
      "bg-fuchsia-100 dark:bg-fuchsia-800 text-fuchsia-900 dark:text-fuchsia-100 hover:bg-fuchsia-200 dark:hover:bg-fuchsia-700 focus-visible:ring-fuchsia-400 dark:focus-visible:ring-fuchsia-500",
    ghost:
      "text-fuchsia-900 dark:text-fuchsia-100 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800 focus-visible:ring-fuchsia-400 dark:focus-visible:ring-fuchsia-500",
    link: "text-fuchsia-600 dark:text-fuchsia-400 underline-offset-4 hover:underline focus-visible:ring-fuchsia-400 dark:focus-visible:ring-fuchsia-500",
  },
  pink: {
    default:
      "bg-pink-700 text-white hover:bg-pink-800 focus-visible:ring-pink-500 dark:focus-visible:ring-pink-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-pink-300 dark:border-pink-700 bg-white dark:bg-pink-950 text-pink-900 dark:text-pink-100 hover:bg-pink-50 dark:hover:bg-pink-900 focus-visible:ring-pink-400 dark:focus-visible:ring-pink-500",
    secondary:
      "bg-pink-100 dark:bg-pink-800 text-pink-900 dark:text-pink-100 hover:bg-pink-200 dark:hover:bg-pink-700 focus-visible:ring-pink-400 dark:focus-visible:ring-pink-500",
    ghost:
      "text-pink-900 dark:text-pink-100 hover:bg-pink-100 dark:hover:bg-pink-800 focus-visible:ring-pink-400 dark:focus-visible:ring-pink-500",
    link: "text-pink-600 dark:text-pink-400 underline-offset-4 hover:underline focus-visible:ring-pink-400 dark:focus-visible:ring-pink-500",
  },
  rose: {
    default:
      "bg-rose-700 text-white hover:bg-rose-800 focus-visible:ring-rose-500 dark:focus-visible:ring-rose-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 dark:focus-visible:ring-red-500",
    outline:
      "border border-rose-300 dark:border-rose-700 bg-white dark:bg-rose-950 text-rose-900 dark:text-rose-100 hover:bg-rose-50 dark:hover:bg-rose-900 focus-visible:ring-rose-400 dark:focus-visible:ring-rose-500",
    secondary:
      "bg-rose-100 dark:bg-rose-800 text-rose-900 dark:text-rose-100 hover:bg-rose-200 dark:hover:bg-rose-700 focus-visible:ring-rose-400 dark:focus-visible:ring-rose-500",
    ghost:
      "text-rose-900 dark:text-rose-100 hover:bg-rose-100 dark:hover:bg-rose-800 focus-visible:ring-rose-400 dark:focus-visible:ring-rose-500",
    link: "text-rose-600 dark:text-rose-400 underline-offset-4 hover:underline focus-visible:ring-rose-400 dark:focus-visible:ring-rose-500",
  },
} as const;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        outline: "",
        secondary: "",
        ghost: "",
        link: "",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ColorType = keyof typeof colorClasses;

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: ColorType;
  rounded?: boolean;
  fullWidth?: boolean;
}

type ButtonElement = HTMLButtonElement;

const Button = React.forwardRef<ButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size,
      asChild = false,
      color = "slate",
      rounded = false,
      fullWidth = false,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const resolvedType = asChild ? type : (type ?? "button");
    const resolvedRef = asChild ? undefined : ref;
    const colorVariant =
      colorClasses[color]?.[variant as keyof typeof colorClasses.slate] ||
      colorClasses.slate[variant as keyof typeof colorClasses.slate];

    if (ref && asChild) {
      console.warn(
        "The 'ref' prop is not forwarded when 'asChild' is true. Please use the 'ref' prop on the child component instead.",
      );
    }

    return (
      <Comp
        className={cn(
          "cursor-pointer",
          buttonVariants({ variant, size }),
          colorVariant,
          rounded && "rounded-full",
          fullWidth ? "w-full" : "w-fit self-start justify-self-start",
          className,
        )}
        // name={props.name || props["aria-label"] || undefined}
        type={resolvedType}
        ref={resolvedRef}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
