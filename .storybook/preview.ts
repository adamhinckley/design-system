import type { Preview } from "@storybook/react-vite";
import React from "react";
import "../src/index.css";
import { BackgroundProvider } from "../src/theme/background";

const themeBackgrounds = {
  light: "#ffffff",
  dark: "#0f172a",
} as const;

const isDarkColor = (value?: unknown) => {
  if (!value || typeof value !== "string") {
    return false;
  }

  const hexMatch = value.trim().match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    const normalized =
      hex.length === 3
        ? hex
            .split("")
            .map((char) => char + char)
            .join("")
        : hex.slice(0, 6);
    const r = Number.parseInt(normalized.slice(0, 2), 16);
    const g = Number.parseInt(normalized.slice(2, 4), 16);
    const b = Number.parseInt(normalized.slice(4, 6), 16);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance < 0.5;
  }

  const rgbMatch = value
    .trim()
    .match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (rgbMatch) {
    const r = Number(rgbMatch[1]);
    const g = Number(rgbMatch[2]);
    const b = Number(rgbMatch[3]);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance < 0.5;
  }

  return false;
};

const resolveTheme = (theme: string, background?: string) => {
  if (theme === "dark") {
    return { mode: "dark" as const, color: themeBackgrounds.dark };
  }
  if (theme === "light") {
    return { mode: "light" as const, color: themeBackgrounds.light };
  }

  const derivedMode = isDarkColor(background)
    ? ("dark" as const)
    : ("light" as const);
  return {
    mode: derivedMode,
    color: background ?? themeBackgrounds[derivedMode],
  };
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Controls canvas background and component mode",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
      showName: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      story: { inline: true },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    backgrounds: { disable: true },
  },
  decorators: [
    (Story, context) => {
      const theme =
        typeof context.globals?.theme === "string"
          ? context.globals.theme
          : "light";
      const resolved = resolveTheme(theme);
      document.documentElement.classList.toggle(
        "dark",
        resolved.mode === "dark",
      );
      document.body?.classList.toggle("dark", resolved.mode === "dark");
      document.documentElement.style.setProperty(
        "--sb-background",
        resolved.color,
      );
      if (document.body) {
        document.body.style.backgroundColor = resolved.color;
        document.body.style.colorScheme =
          resolved.mode === "dark" ? "dark" : "light";
      }
      return React.createElement(BackgroundProvider, {
        value: resolved,
        children: React.createElement(Story),
      });
    },
  ],
};

export default preview;
