import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@/index.css";

import Input from "../components/Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "search", "tel", "url"],
    },
  },
  args: {
    type: "text",
    placeholder: "Enter text",
  },
  render: (args) => React.createElement(Input, { ...args }),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "Acme, Inc.",
    label: "Company Name",
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "name@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "••••••••",
  },
};

export const Telephone: Story = {
  args: {
    type: "tel",
    placeholder: "(123) 456-7890",
  },
};

export const HelperText: Story = {
  args: {
    helperText: "This is some helper text.",
    label: "Input with Helper Text",
  },
};

export const ErrorState: Story = {
  args: {
    error: "There was an error with your submission.",
  },
};

export const BooleanErrorState: Story = {
  args: {
    error: true,
    helperText: "There was an error with your submission.",
  },
};
