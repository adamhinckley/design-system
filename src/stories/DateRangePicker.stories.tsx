import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import type { ReactNode } from "react";

import { DateRangePicker } from "../components/ui/DatePicker";

const formatRange = (
  start: Date,
  end: Date,
  locale: Intl.UnicodeBCP47LocaleIdentifier = "en-US",
) => {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
};

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
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: COLORS,
    },
  },
} satisfies Meta<typeof DateRangePicker>;

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
    label: "Travel dates",
    helperText: "Pick start and end dates",
    startPlaceholder: "Start date",
    endPlaceholder: "End date",
    defaultStartSelected: new Date(2030, 2, 10),
    defaultEndSelected: new Date(2030, 2, 20),
  },
  decorators: [
    (Story: () => ReactNode) => (
      <div className="min-h-130 pt-2">
        <Story />
      </div>
    ),
  ],
  play: async ({
    canvasElement,
    args,
  }: {
    canvasElement: HTMLElement;
    args: Story["args"];
  }) => {
    const canvas = within(canvasElement);
    const locale = args?.locale ?? "en-US";
    const labelText = args?.label ?? "Travel dates";

    const trigger = canvas.getByLabelText(labelText);
    await expect(trigger).toHaveAccessibleName(labelText);
    await expect(trigger).toHaveTextContent(
      formatRange(new Date(2030, 2, 10), new Date(2030, 2, 20), locale),
    );

    await userEvent.click(trigger);
    await expect(
      await canvas.findByRole("dialog", { name: "Calendar" }),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByTestId("start-day-2030-03-15"));
    await expect(trigger).toHaveTextContent(
      formatRange(new Date(2030, 2, 15), new Date(2030, 2, 20), locale),
    );

    await userEvent.click(canvas.getByTestId("end-day-2030-03-25"));
    await expect(trigger).toHaveTextContent(
      formatRange(new Date(2030, 2, 15), new Date(2030, 2, 25), locale),
    );
  },
};

export const MonthYearPickerExample: Story = {
  args: {
    label: "Month/year range",
    helperText: "Use dropdowns to navigate",
    enableMonthYearPicker: true,
  },
  decorators: [
    (Story: () => ReactNode) => (
      <div className="min-h-120 pt-2">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByLabelText("Month/year range");

    await userEvent.click(trigger);
    await expect(
      canvas.getByRole("dialog", { name: "Calendar" }),
    ).toBeInTheDocument();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const monthSelects = canvas.getAllByRole("combobox", { name: "Month" });
    const yearSelects = canvas.getAllByRole("combobox", { name: "Year" });

    await userEvent.selectOptions(monthSelects[0], "2");
    await userEvent.selectOptions(yearSelects[0], "2030");
    await expect(monthSelects[0]).toHaveValue("2");
    await expect(yearSelects[0]).toHaveValue("2030");

    await userEvent.selectOptions(monthSelects[1], "3");
    await userEvent.selectOptions(yearSelects[1], "2030");
    await expect(monthSelects[1]).toHaveValue("3");
    await expect(yearSelects[1]).toHaveValue("2030");

    await userEvent.click(canvas.getByTestId("start-day-2030-03-15"));
    await userEvent.click(canvas.getByTestId("end-day-2030-04-20"));

    await expect(trigger).toHaveTextContent("Mar 15, 2030 - Apr 20, 2030");

    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(trigger).toHaveTextContent("Start date - End date");
  },
};

export const SizeVariantsExample: Story = {
  render: () => (
    <div className="grid gap-3 min-h-104">
      <DateRangePicker label="Large" inputSize="lg" />
      <DateRangePicker label="Medium" inputSize="md" />
      <DateRangePicker label="Small" inputSize="sm" />
    </div>
  ),
};

export const InteractiveStatesExample: Story = {
  render: () => (
    <div className="grid  min-h-104">
      <DateRangePicker label="Default" helperText="Ready for input" />
      <DateRangePicker label="Error" errorText="Date range is required" />
      <DateRangePicker disabled />
    </div>
  ),
};

export const RemoveBackgroundExample: Story = {
  render: () => (
    <div className="w-full max-w-4xl rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="grid gap-4 sm:grid-cols-2">
        <DateRangePicker
          label="Default background"
          helperText="Standard filled input"
          startPlaceholder="Start date"
          endPlaceholder="End date"
        />
        <DateRangePicker
          label="removeBackground"
          helperText="Transparent trigger background"
          startPlaceholder="Start date"
          endPlaceholder="End date"
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
            <div className="grid gap-3">
              {COLORS.map((color) => (
                <DateRangePicker
                  key={`light-${color}`}
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                  helperText={`${color} theme`}
                  color={color}
                  fullWidth
                  enableMonthYearPicker
                />
              ))}
            </div>
          </div>

          <div className="dark rounded-xl bg-slate-950 p-5">
            <p className="mb-3 text-sm font-medium text-slate-300">Dark mode</p>
            <div className="grid gap-3">
              {COLORS.map((color) => (
                <DateRangePicker
                  key={`dark-${color}`}
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                  helperText={`${color} theme`}
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
      <div className="grid gap-3 sm:grid-cols-2">
        {I18N_LOCALES.map(({ label, locale }) => (
          <DateRangePicker
            key={locale}
            label={label}
            helperText={locale}
            locale={locale}
            defaultStartSelected={new Date(2026, 1, 10)}
            defaultEndSelected={new Date(2026, 1, 21)}
            color={args.color}
            enableMonthYearPicker
          />
        ))}
      </div>
    </div>
  ),
};

export const RangeSelectionExample = DefaultExample;
export const MonthYearRangeExample = MonthYearPickerExample;
