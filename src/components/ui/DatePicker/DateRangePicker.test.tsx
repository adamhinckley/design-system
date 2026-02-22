import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DateRangePicker } from "./DateRangePicker";

describe("DateRangePicker", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders start and end placeholders with optional label/helper", () => {
    render(
      <DateRangePicker
        label="Travel dates"
        helperText="Pick your range"
        startPlaceholder="From"
        endPlaceholder="To"
      />,
    );

    expect(screen.getByText("Travel dates")).toBeInTheDocument();
    expect(screen.getByLabelText("Travel dates")).toHaveTextContent(
      "From - To",
    );
    expect(screen.getByText("Pick your range")).toBeInTheDocument();
  });

  it("supports default selected start and end values", () => {
    render(
      <DateRangePicker
        defaultStartSelected={new Date(2026, 0, 10)}
        defaultEndSelected={new Date(2026, 0, 20)}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Jan 10, 2026 - Jan 20, 2026" }),
    ).toBeInTheDocument();
  });

  it("sanitizes invalid date props to placeholders", () => {
    render(
      <DateRangePicker
        startSelected={new Date("invalid")}
        endSelected={new Date("invalid")}
        defaultStartSelected={new Date("invalid")}
        defaultEndSelected={new Date("invalid")}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Start date - End date" }),
    ).toBeInTheDocument();
  });

  it("fires start/end/range callbacks when dates are selected", async () => {
    const user = userEvent.setup();
    const onStartDateChange = vi.fn();
    const onEndDateChange = vi.fn();
    const onRangeChange = vi.fn();

    render(
      <DateRangePicker
        defaultStartSelected={new Date(2026, 5, 10)}
        defaultEndSelected={new Date(2026, 5, 20)}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onRangeChange={onRangeChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Jun 10, 2026 - Jun 20, 2026" }),
    );
    await user.click(screen.getByTestId("start-day-2026-06-18"));

    expect(onStartDateChange).toHaveBeenCalledWith(new Date(2026, 5, 18));
    expect(onRangeChange).toHaveBeenCalledWith({
      startDate: new Date(2026, 5, 18),
      endDate: new Date(2026, 5, 20),
    });

    await user.click(screen.getByTestId("end-day-2026-06-25"));

    expect(onEndDateChange).toHaveBeenCalledWith(new Date(2026, 5, 25));
    expect(onRangeChange).toHaveBeenLastCalledWith({
      startDate: new Date(2026, 5, 18),
      endDate: new Date(2026, 5, 25),
    });
  });

  it("supports controlled mode without self-mutating displayed values", async () => {
    const user = userEvent.setup();
    const onStartDateChange = vi.fn();

    render(
      <DateRangePicker
        startSelected={new Date(2026, 3, 5)}
        endSelected={new Date(2026, 3, 12)}
        onStartDateChange={onStartDateChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Apr 5, 2026 - Apr 12, 2026" }),
    );
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onStartDateChange).toHaveBeenCalledWith(undefined);
    expect(
      screen.getByRole("button", { name: "Apr 5, 2026 - Apr 12, 2026" }),
    ).toBeInTheDocument();
  });

  it("clears displayed values in uncontrolled mode", async () => {
    const user = userEvent.setup();

    render(
      <DateRangePicker
        defaultStartSelected={new Date(2026, 3, 5)}
        defaultEndSelected={new Date(2026, 3, 12)}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Apr 5, 2026 - Apr 12, 2026" }),
    );
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(
      screen.getByRole("button", { name: "Start date - End date" }),
    ).toBeInTheDocument();
  });

  it("emits a fully cleared range when clearing", async () => {
    const user = userEvent.setup();
    const onRangeChange = vi.fn();

    render(
      <DateRangePicker
        defaultStartSelected={new Date(2026, 4, 1)}
        defaultEndSelected={new Date(2026, 4, 10)}
        onRangeChange={onRangeChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "May 1, 2026 - May 10, 2026" }),
    );
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onRangeChange).toHaveBeenLastCalledWith({
      startDate: undefined,
      endDate: undefined,
    });
  });

  it("supports mixed controlled start with uncontrolled end", async () => {
    const user = userEvent.setup();
    const onStartDateChange = vi.fn();
    const onEndDateChange = vi.fn();

    render(
      <DateRangePicker
        startSelected={new Date(2026, 3, 5)}
        defaultEndSelected={new Date(2026, 3, 12)}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Apr 5, 2026 - Apr 12, 2026" }),
    );
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onStartDateChange).toHaveBeenCalledWith(undefined);
    expect(onEndDateChange).toHaveBeenCalledWith(undefined);
    expect(
      screen.getByRole("button", { name: "Apr 5, 2026 - End date" }),
    ).toBeInTheDocument();
  });

  it("fires onOpenChange when opening and closing", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(<DateRangePicker onOpenChange={onOpenChange} />);

    await user.click(
      screen.getByRole("button", { name: "Start date - End date" }),
    );
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(
      screen.getByRole("dialog", { name: "Calendar" }),
    ).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(
      screen.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);

    await user.click(
      screen.getByRole("button", { name: "Start date - End date" }),
    );
    expect(
      screen.getByRole("dialog", { name: "Calendar" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(
      screen.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();
  });

  it("closes on touch outside", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);

    await user.click(
      screen.getByRole("button", { name: "Start date - End date" }),
    );
    expect(
      screen.getByRole("dialog", { name: "Calendar" }),
    ).toBeInTheDocument();

    fireEvent.touchStart(document.body);

    expect(
      screen.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();
  });

  it("resets view months from selected values on reopen", async () => {
    const user = userEvent.setup();

    render(
      <DateRangePicker
        defaultStartSelected={new Date(2026, 1, 21)}
        defaultEndSelected={new Date(2026, 2, 4)}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Feb 21, 2026 - Mar 4, 2026" }),
    );
    await user.click(screen.getAllByRole("button", { name: "Next month" })[0]);

    const marchHeadings = screen.getAllByText("March 2026");
    expect(marchHeadings.length).toBeGreaterThan(0);

    fireEvent.mouseDown(document.body);

    await user.click(
      screen.getByRole("button", { name: "Feb 21, 2026 - Mar 4, 2026" }),
    );

    const febHeadings = screen.getAllByText("February 2026");
    expect(febHeadings.length).toBeGreaterThan(0);
  });

  it("applies required and error semantics", () => {
    render(
      <DateRangePicker
        required
        helperText="Helpful"
        errorText="Required range"
      />,
    );

    const trigger = screen.getByRole("button", {
      name: "Start date - End date",
    });
    expect(trigger).toHaveAttribute("aria-required", "true");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveClass("border-destructive");
    expect(screen.queryByText("Helpful")).not.toBeInTheDocument();
    expect(screen.getByText("Required range")).toBeInTheDocument();
  });

  it("updates aria-expanded as popover toggles", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);

    const trigger = screen.getByRole("button", {
      name: "Start date - End date",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.mouseDown(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports color, input size, and hide icon options", () => {
    const { rerender } = render(
      <DateRangePicker color="emerald" inputSize="sm" />,
    );

    expect(
      screen.getByRole("button", { name: "Start date - End date" }),
    ).toHaveClass("border-emerald-300", "h-9", "text-sm");
    expect(
      screen.getByTestId("date-range-picker-calendar-icon"),
    ).toBeInTheDocument();

    rerender(<DateRangePicker hideCalendarIcon />);
    expect(screen.queryByTestId("date-range-picker-calendar-icon")).toBeNull();
  });

  it("supports month/year picker mode", async () => {
    const user = userEvent.setup();
    render(
      <DateRangePicker
        id="travel-range"
        defaultStartSelected={new Date(2026, 2, 10)}
        enableMonthYearPicker
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Mar 10, 2026 - End date" }),
    );

    const monthSelects = screen.getAllByRole("combobox", { name: "Month" });
    const yearSelects = screen.getAllByRole("combobox", { name: "Year" });
    expect(monthSelects).toHaveLength(2);
    expect(yearSelects).toHaveLength(2);
    expect(monthSelects[0]).toHaveAttribute(
      "id",
      "travel-range-start-month-select",
    );
    expect(yearSelects[0]).toHaveAttribute(
      "id",
      "travel-range-start-year-select",
    );
    expect(monthSelects[1]).toHaveAttribute(
      "id",
      "travel-range-end-month-select",
    );
    expect(yearSelects[1]).toHaveAttribute(
      "id",
      "travel-range-end-year-select",
    );
  });

  it("renders a cohesive popover with one shared Clear action", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker defaultStartSelected={new Date(2026, 1, 21)} />);

    await user.click(
      screen.getByRole("button", { name: "Feb 21, 2026 - End date" }),
    );

    const clearButtons = screen.getAllByRole("button", { name: "Clear" });
    expect(clearButtons).toHaveLength(1);

    const startPanel = screen
      .getByText("Start date")
      .closest("div")
      ?.querySelector('[data-testid^="start-day-"]')
      ?.closest("div");
    const endPanel = screen
      .getByText("End date")
      .closest("div")
      ?.querySelector('[data-testid^="end-day-"]')
      ?.closest("div");

    expect(startPanel?.className).not.toContain("border");
    expect(startPanel?.className).not.toContain("shadow");
    expect(endPanel?.className).not.toContain("border");
    expect(endPanel?.className).not.toContain("shadow");
  });
});
