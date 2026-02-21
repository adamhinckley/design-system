import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { DatePicker } from "../components/ui/DatePicker";

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

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: COLORS,
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const I18N_LOCALES = [
  { label: "English", locale: "en-US" },
  { label: "French", locale: "fr-FR" },
  { label: "German", locale: "de-DE" },
  { label: "Spanish", locale: "es-ES" },
] as const;

export const DefaultExample: Story = {
  args: {
    label: "Date",
    helperText: "Select a date",
    placeholder: "Pick a date",
  },
  decorators: [
    (Story) => (
      <div className="min-h-104 pt-2">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Date" });

    await userEvent.click(trigger);
    await expect(
      canvas.getByRole("dialog", { name: "Calendar" }),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Today" }));
    await expect(trigger).not.toHaveTextContent("Pick a date");

    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(
      canvas.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();
    await expect(trigger).toHaveTextContent("Pick a date");
  },
};

export const MonthYearPickerExample: Story = {
  args: {
    label: "Month/Year picker",
    helperText: "Select month and year from dropdowns",
    placeholder: "Pick a date",
    enableMonthYearPicker: true,
  },
  decorators: [
    (Story) => (
      <div className="min-h-104 pt-2">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Month/Year picker" });

    await userEvent.click(trigger);
    await expect(
      canvas.getByRole("dialog", { name: "Calendar" }),
    ).toBeInTheDocument();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const monthSelect = canvas.getByRole("combobox", { name: "Month" });
    const yearSelect = canvas.getByRole("combobox", { name: "Year" });

    await userEvent.selectOptions(monthSelect, "2");
    await userEvent.selectOptions(yearSelect, "2030");
    await expect(monthSelect).toHaveValue("2");
    await expect(yearSelect).toHaveValue("2030");

    await userEvent.click(canvas.getByTestId("non-native-day-2030-03-15"));
    await expect(trigger).toHaveTextContent("Mar 15, 2030");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(trigger).toHaveTextContent("Pick a date");
  },
};

export const SizeVariantsExample: Story = {
  render: () => (
    <div className="grid gap-3 min-h-104 ">
      <DatePicker label="Large" inputSize="lg" />
      <DatePicker label="Medium" inputSize="md" />
      <DatePicker label="Small" inputSize="sm" />
    </div>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="grid gap-3 min-h-104">
      <DatePicker label="Default" helperText="Ready for input" />
      <DatePicker label="Error" errorText="Date is required" />
      <DatePicker label="Disabled" disabled />
    </div>
  ),
};

export const RemoveBackgroundExample: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="grid gap-4 sm:grid-cols-2">
        <DatePicker
          label="Default background"
          helperText="Standard filled input"
          placeholder="Pick a date"
        />
        <DatePicker
          label="removeBackground"
          helperText="Transparent trigger background"
          placeholder="Pick a date"
          removeBackground
        />
      </div>
    </div>
  ),
};

export const LightAndDarkExample: Story = {
  parameters: {
    controls: { disable: true },
    layout: "fullscreen",
  },
  render: () => (
    <div className="w-full px-6 py-8">
      <div className="w-full">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              Light mode
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {COLORS.map((color) => (
                <DatePicker
                  key={`light-${color}`}
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                  helperText={`${color} theme`}
                  placeholder="Pick a date"
                  color={color}
                  fullWidth
                  enableMonthYearPicker
                />
              ))}
            </div>
          </div>

          <div className="dark rounded-xl bg-slate-950 p-5">
            <p className="mb-3 text-sm font-medium text-slate-300">Dark mode</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {COLORS.map((color) => (
                <DatePicker
                  key={`dark-${color}`}
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                  helperText={`${color} theme`}
                  placeholder="Pick a date"
                  color={color}
                  fullWidth
                  enableMonthYearPicker
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InternationalizationExample: Story = {
  args: {
    color: "slate",
  },
  render: (args) => (
    <div className="min-h-104">
      <div className="grid gap-3 sm:grid-cols-2 ">
        {I18N_LOCALES.map(({ label, locale }) => (
          <DatePicker
            key={locale}
            label={label}
            helperText={locale}
            locale={locale}
            defaultSelected={new Date(2026, 1, 21)}
            color={args.color}
            enableMonthYearPicker
          />
        ))}
      </div>
    </div>
  ),
};
