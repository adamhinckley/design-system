import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@/index.css";

import TextField from "../components/TextField";
import PasswordField from "@/components/PasswordField";

const meta = {
  title: "UI/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
    parameters: {
      controls: { disable: true },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
    helperText: {
      table: {
        disable: true,
      },
    },
  },
  args: {},
  render: (args) => React.createElement(TextField, { ...args }),
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;
type PasswordStory = StoryObj<typeof PasswordField>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
    label: "Default Input",
    helperText: "This is some helper text.",
  },
};

export const PasswordWithToggle: PasswordStory = {
  args: {
    placeholder: "enter your password",
    label: "Password",
    fullWidth: true,
    showVisibilityToggle: true,
  },
  render: (args) => React.createElement(PasswordField, { ...args }),
};

export const ErrorState: Story = {
  args: {
    label: "Input with Error",
    errorText: "There is an error with this input.",
  },
};
