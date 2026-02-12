import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@/index.css";

import { Button, type ColorType } from "../components/ui/Button";
import { ArrowDownIcon } from "./assets/ArrowDownIcon";
import { ButtonDocs } from "./ButtonDocs";

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
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const;
const SIZES = ["default", "sm", "lg", "icon"] as const;

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      page: ButtonDocs,
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    children: "Button",
  },
  render: (args) => React.createElement(Button, { ...args }),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default variant stories
export const Default: Story = {
  args: {
    variant: "default",
    children: "Default Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

// Size stories
export const SmallSize: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

export const IconSize: Story = {
  render: () =>
    React.createElement(Button, {
      size: "icon",
      children: React.createElement(ArrowDownIcon),
    }),
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

// Rounded button
export const Rounded: Story = {
  args: {
    rounded: true,
    children: "Rounded Button",
  },
};

// asChild prop example
export const AsChildLink: Story = {
  render: () =>
    React.createElement(Button, {
      asChild: true,
      children: React.createElement("a", { href: "#" }, "Navigate to Page"),
    }),
  parameters: {
    docs: {
      description: {
        story:
          "The `asChild` prop renders the button styles on a different element (like an anchor tag) without wrapper elements. Useful for semantic HTML.",
      },
    },
  },
};

export const RoundedVariants: Story = {
  render: () => {
    return React.createElement(
      "div",
      { className: "space-y-4" },
      VARIANTS.map((variant) =>
        React.createElement(
          "div",
          { key: variant },
          React.createElement(Button, {
            rounded: true,
            variant,
            children: `Rounded - ${variant}`,
          }),
        ),
      ),
    );
  },
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
        COLORS.map((color) =>
          React.createElement(Button, {
            key: `destructive-${color}`,
            color,
            variant: "destructive",
            children: color,
          }),
        ),
      ),
    );
  },
};

// All variants with size options
export const AllVariantsWithSizes: Story = {
  render: () => {
    return React.createElement(
      "div",
      { className: "space-y-8" },
      VARIANTS.map((variant) =>
        React.createElement(
          "div",
          { key: variant },
          React.createElement(
            "h3",
            { className: "mb-3 text-base font-semibold capitalize" },
            `${variant} Variant`,
          ),
          React.createElement(
            "div",
            { className: "flex flex-wrap items-center gap-2" },
            SIZES.map((size) =>
              React.createElement(Button, {
                key: `${variant}-${size}`,
                variant,
                size,
                children: size === "icon" ? "↓" : `${size}`,
              }),
            ),
          ),
        ),
      ),
    );
  },
};

// Slate color with all variants (default color)
export const SlateColorAllVariants: Story = {
  render: () => {
    return React.createElement(
      "div",
      { className: "space-y-4" },
      VARIANTS.map((variant) =>
        React.createElement(
          "div",
          { key: variant },
          React.createElement(Button, {
            color: "slate",
            variant,
            children: `Slate - ${variant}`,
          }),
        ),
      ),
    );
  },
};

// Blue color showcase (popular color)
export const BlueColorAllVariants: Story = {
  render: () => {
    return React.createElement(
      "div",
      { className: "space-y-4" },
      VARIANTS.map((variant) =>
        React.createElement(
          "div",
          { key: variant },
          React.createElement(Button, {
            color: "blue",
            variant,
            children: `Blue - ${variant}`,
          }),
        ),
      ),
    );
  },
};

// Green color showcase (success-like color)
export const GreenColorAllVariants: Story = {
  render: () => {
    return React.createElement(
      "div",
      { className: "space-y-4" },
      VARIANTS.map((variant) =>
        React.createElement(
          "div",
          { key: variant },
          React.createElement(Button, {
            color: "green",
            variant,
            children: `Green - ${variant}`,
          }),
        ),
      ),
    );
  },
};

// Red color showcase (error/danger color)
export const RedColorAllVariants: Story = {
  render: () => {
    return React.createElement(
      "div",
      { className: "space-y-4" },
      VARIANTS.map((variant) =>
        React.createElement(
          "div",
          { key: variant },
          React.createElement(Button, {
            color: "red",
            variant,
            children: `Red - ${variant}`,
          }),
        ),
      ),
    );
  },
};
