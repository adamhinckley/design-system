import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@/index.css";

import { Button, type ColorType } from "../components/ui/Button";
import { ArrowDownIcon } from "./assets/ArrowDownIcon";

const COLORS: ColorType[] = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

const VARIANTS = [
  "default",
  "secondary",
  "outline",
  "destructive",
  "ghost",
  "link",
] as const;

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  //   tags: ["autodocs"],
  argTypes: {},
  args: {
    children: "Button",
  },
  render: (args) => React.createElement(Button, { ...args }),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default variant stories
export const BasicUsageExample: Story = {
  args: {
    children: "Click me",
  },
};

export const VariantsExample: Story = {
  render: () =>
    React.createElement(
      "div",
      { className: "flex flex-wrap gap-3" },
      VARIANTS.map((variant) =>
        React.createElement(Button, {
          key: variant,
          variant,
          children:
            variant === "default"
              ? "Default"
              : `${variant.slice(0, 1).toUpperCase()}${variant.slice(1)}`,
        }),
      ),
    ),
};

export const SizesExample: Story = {
  render: () =>
    React.createElement(
      "div",
      { className: "flex flex-wrap items-center gap-3" },
      React.createElement(Button, { size: "sm", children: "Small" }),
      React.createElement(Button, { size: "default", children: "Default" }),
      React.createElement(Button, { size: "lg", children: "Large" }),
      React.createElement(Button, {
        size: "icon",
        children: React.createElement(ArrowDownIcon),
      }),
    ),
};

export const DisabledExample: Story = {
  render: () =>
    React.createElement(
      "div",
      { className: "flex flex-wrap gap-3" },
      React.createElement(Button, { disabled: true, children: "Disabled" }),
      React.createElement(Button, {
        disabled: true,
        variant: "destructive",
        children: "Disabled Delete",
      }),
    ),
};

export const RoundedButtonsExample: Story = {
  render: () =>
    React.createElement(
      "div",
      { className: "flex flex-wrap gap-3" },
      React.createElement(Button, { rounded: true, children: "Rounded" }),
      React.createElement(Button, {
        rounded: true,
        variant: "outline",
        children: "Rounded Outline",
      }),
    ),
};

export const AsChildExample: Story = {
  render: () =>
    React.createElement(Button, {
      asChild: true,
      children: React.createElement("a", { href: "/page" }, "Navigate to Page"),
    }),
};

export const DarkModeExample: Story = {
  render: () =>
    React.createElement(
      "div",
      { className: "dark rounded-xl bg-slate-900 p-6" },
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-3" },
        VARIANTS.map((variant) =>
          React.createElement(Button, {
            key: `dark-${variant}`,
            variant,
            children: variant === "default" ? "Primary" : variant,
          }),
        ),
      ),
    ),
};

// Colors - Default Variant
export const ColorVariants: Story = {
  render: () => {
    return React.createElement(
      "div",
      { className: "space-y-4" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "mb-4 text-lg font-semibold" },
          "Default Variant",
        ),
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-2" },
        COLORS.map((color) =>
          React.createElement(Button, {
            key: `default-${color}`,
            color,
            variant: "default",
            children: color,
          }),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "mb-4 mt-8 text-lg font-semibold" },
          "Outline Variant",
        ),
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-2" },
        COLORS.map((color) =>
          React.createElement(Button, {
            key: `outline-${color}`,
            color,
            variant: "outline",
            children: color,
          }),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "mb-4 mt-8 text-lg font-semibold" },
          "Secondary Variant",
        ),
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-2" },
        COLORS.map((color) =>
          React.createElement(Button, {
            key: `secondary-${color}`,
            color,
            variant: "secondary",
            children: color,
          }),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "mb-4 mt-8 text-lg font-semibold" },
          "Ghost Variant",
        ),
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-2" },
        COLORS.map((color) =>
          React.createElement(Button, {
            key: `ghost-${color}`,
            color,
            variant: "ghost",
            children: color,
          }),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "mb-4 mt-8 text-lg font-semibold" },
          "Link Variant",
        ),
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-2" },
        COLORS.map((color) =>
          React.createElement(Button, {
            key: `link-${color}`,
            color,
            variant: "link",
            children: color,
          }),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "mb-4 mt-8 text-lg font-semibold" },
          "Destructive Variant",
        ),
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-2" },
        React.createElement(Button, {
          key: "destructive",
          variant: "destructive",
          children: "destructive",
        }),
      ),
    );
  },
};

export const DarkModeColorVariants: Story = {
  render: () =>
    React.createElement(
      "div",
      { className: "dark rounded-xl bg-slate-900 p-6" },
      React.createElement(
        "div",
        { className: "space-y-4" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            { className: "mb-4 text-lg font-semibold text-slate-100" },
            "Default Variant",
          ),
        ),
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          COLORS.map((color) =>
            React.createElement(Button, {
              key: `dark-default-${color}`,
              color,
              variant: "default",
              children: color,
            }),
          ),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            { className: "mb-4 mt-8 text-lg font-semibold text-slate-100" },
            "Outline Variant",
          ),
        ),
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          COLORS.map((color) =>
            React.createElement(Button, {
              key: `dark-outline-${color}`,
              color,
              variant: "outline",
              children: color,
            }),
          ),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            { className: "mb-4 mt-8 text-lg font-semibold text-slate-100" },
            "Secondary Variant",
          ),
        ),
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          COLORS.map((color) =>
            React.createElement(Button, {
              key: `dark-secondary-${color}`,
              color,
              variant: "secondary",
              children: color,
            }),
          ),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            { className: "mb-4 mt-8 text-lg font-semibold text-slate-100" },
            "Ghost Variant",
          ),
        ),
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          COLORS.map((color) =>
            React.createElement(Button, {
              key: `dark-ghost-${color}`,
              color,
              variant: "ghost",
              children: color,
            }),
          ),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            { className: "mb-4 mt-8 text-lg font-semibold text-slate-100" },
            "Link Variant",
          ),
        ),
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          COLORS.map((color) =>
            React.createElement(Button, {
              key: `dark-link-${color}`,
              color,
              variant: "link",
              children: color,
            }),
          ),
        ),
      ),
    ),
};
