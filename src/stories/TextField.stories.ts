import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@/index.css";

import TextField from "../components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";

const COLORS = [
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
] as const;

const INPUT_SIZES = ["sm", "md", "lg"] as const;

const meta = {
  title: "UI/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the input",
    },
    errorText: {
      control: "text",
      description: "Error text (overrides helperText)",
    },
    color: {
      control: "select",
      options: COLORS,
      description: "Color scheme for the input",
    },
    inputSize: {
      control: "radio",
      options: INPUT_SIZES,
      description: "Size of the input field",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "HTML input type",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    required: {
      control: "boolean",
      description: "Make the input required",
    },
    readOnly: {
      control: "boolean",
      description: "Make the input read-only",
    },
    fullWidth: {
      control: "boolean",
      description: "Make the input full width",
    },
    removeBackground: {
      control: "boolean",
      description: "Remove background color",
    },
    startAdornment: {
      control: false,
      description: "React node displayed at the start of the input",
    },
    endAdornment: {
      control: false,
      description: "React node displayed at the end of the input",
    },
  },
  args: {
    label: "Label",
    placeholder: "Enter text...",
  },
  render: (args) => React.createElement(TextField, { ...args }),
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;
type PasswordStory = StoryObj<typeof PasswordField>;

export const BasicUsageExample: Story = {
  args: {
    label: "Email",
    helperText: "We will never share your email.",
    type: "email",
  },
};

export const PlaceholderOnlyExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  args: {
    placeholder: "Search",
    "aria-label": "Search",
  },
};

export const SizesExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    React.createElement(
      "div",
      { className: "flex flex-col gap-4" },
      INPUT_SIZES.map((size) =>
        React.createElement(TextField, {
          key: size,
          inputSize: size,
          label: `${size.toUpperCase()} input`,
        }),
      ),
    ),
};

export const AdornmentsExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  args: {
    inputSize: "md",
  },

  render: () =>
    React.createElement(
      "div",
      { className: "grid gap-4 sm:grid-cols-2" },
      React.createElement(TextField, {
        label: "Username",
        startAdornment: React.createElement(
          "span",
          { className: "text-xs font-semibold" },
          "@",
        ),
      }),
      React.createElement(TextField, {
        label: "Amount",
        endAdornment: React.createElement(
          "span",
          { className: "text-xs font-semibold" },
          "USD",
        ),
      }),
      React.createElement(TextField, {
        label: "Search",
        startAdornment: React.createElement(
          "span",
          { className: "text-xs font-semibold" },
          "?",
        ),
        endAdornment: React.createElement(
          "span",
          { className: "text-xs font-semibold" },
          "/",
        ),
      }),
      React.createElement(TextField, {
        label: "Tag",
        startAdornment: React.createElement(
          "span",
          { className: "text-xs font-semibold" },
          "#",
        ),
        endAdornment: React.createElement(
          "span",
          { className: "text-xs font-semibold" },
          "CMD+K",
        ),
      }),
    ),
};

export const HelperAndErrorExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    React.createElement(
      "div",
      { className: "grid gap-4 sm:grid-cols-2" },
      React.createElement(TextField, {
        label: "Helper text",
        helperText: "Optional, but helps your teammates.",
      }),
      React.createElement(TextField, {
        label: "Error state",
        errorText: "Please enter a valid email address.",
      }),
    ),
};

export const FullWidthExample: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () =>
    React.createElement(
      "div",
      { className: "w-full px-6 py-8" },
      React.createElement(
        "div",
        { className: "mx-auto w-full max-w-4xl" },
        React.createElement(TextField, {
          fullWidth: true,
          label: "Full width",
        }),
      ),
    ),
};

export const RemoveBackgroundExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    React.createElement(
      "div",
      { className: "rounded-xl bg-slate-100 p-6 dark:bg-slate-900" },
      React.createElement(TextField, {
        removeBackground: true,
        label: "Overlay input",
      }),
    ),
};

export const PasswordWithToggle: PasswordStory = {
  parameters: {
    controls: { disable: true },
  },
  args: {
    label: "Password",
    showVisibilityToggle: true,
    helperText: "Click the eye icon to toggle visibility",
  },
  render: (args) => React.createElement(PasswordField, { ...args }),
};

export const DisabledExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    React.createElement(
      "div",
      { className: "flex flex-col gap-4" },
      React.createElement(TextField, {
        disabled: true,
        label: "Disabled input",
      }),
      React.createElement(TextField, {
        disabled: true,
        label: "Disabled with helper",
        helperText: "You cannot edit this value",
      }),
    ),
};

export const ColorVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    React.createElement(
      "div",
      { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" },
      COLORS.map((color) =>
        React.createElement(TextField, {
          key: color,
          color,
          label: color,
          inputSize: "sm",
        }),
      ),
    ),
};

export const DarkModeExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    React.createElement(
      "div",
      { className: "dark rounded-xl bg-slate-950 p-6" },
      React.createElement(
        "div",
        { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" },
        COLORS.map((color) =>
          React.createElement(TextField, {
            key: `dark-${color}`,
            color,
            label: color,
            inputSize: "sm",
          }),
        ),
      ),
    ),
};
