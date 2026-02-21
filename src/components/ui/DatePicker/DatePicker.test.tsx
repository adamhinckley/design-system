import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders default placeholder and no label", () => {
    render(<DatePicker data-testid="date-trigger" />);

    const trigger = screen.getByTestId("date-trigger");
    expect(trigger).toHaveTextContent("Select date");
    expect(screen.queryByText("Booking date")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders label and helper text with provided id", () => {
    render(
      <DatePicker
        id="booking-date"
        label="Booking date"
        helperText="Pick a preferred day"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Booking date" });
    const label = screen.getByText("Booking date");
    expect(trigger).toHaveAttribute("id", "booking-date");
    expect(label).toHaveAttribute("for", "booking-date");
    expect(screen.getByText("Pick a preferred day")).toBeInTheDocument();
  });

  it("prioritizes error text over helper text and sets invalid styles/aria", () => {
    render(
      <DatePicker
        label="Due date"
        helperText="Helper text"
        errorText="This field is required"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Due date" });
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveClass("border-destructive");
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
  });

  it("supports fullWidth and custom className", () => {
    const { container } = render(
      <DatePicker label="Width" fullWidth className="custom-wrapper" />,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass("w-full", "custom-wrapper");
    expect(wrapper).not.toHaveClass("w-64");
  });

  it("applies color classes to label, helper, and trigger", () => {
    render(
      <DatePicker label="Color" helperText="Color helper" color="emerald" />,
    );

    const trigger = screen.getByRole("button", { name: "Color" });
    expect(screen.getByText("Color")).toHaveClass("text-emerald-700");
    expect(screen.getByText("Color helper")).toHaveClass("text-emerald-700");
    expect(trigger).toHaveClass("border-emerald-300");
  });

  it("supports custom placeholder and safely renders untrusted text", () => {
    const untrusted = '<img src=x onerror="alert(1)">';
    const { container } = render(<DatePicker placeholder={untrusted} />);

    expect(screen.getByRole("button")).toHaveTextContent(untrusted);
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("script")).toBeNull();
  });

  it("supports defaultSelected in uncontrolled mode", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        defaultSelected={new Date(2026, 0, 15)}
        placeholder="Pick date"
      />,
    );

    const trigger = screen.getByRole("button");
    expect(trigger).toHaveTextContent("Jan 15, 2026");

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(trigger).toHaveTextContent("Pick date");
  });

  it("supports selected in controlled mode and does not self-mutate displayed value", async () => {
    const user = userEvent.setup();
    const onDateChange = vi.fn();

    render(
      <DatePicker
        selected={new Date(2026, 0, 1)}
        onDateChange={onDateChange}
      />,
    );

    const trigger = screen.getByRole("button");
    expect(trigger).toHaveTextContent("Jan 1, 2026");

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onDateChange).toHaveBeenCalledWith(undefined);
    expect(trigger).toHaveTextContent("Jan 1, 2026");
  });

  it("updates displayed value when selected prop changes", () => {
    const { rerender } = render(
      <DatePicker selected={new Date(2026, 3, 10)} />,
    );
    expect(screen.getByRole("button")).toHaveTextContent("Apr 10, 2026");

    rerender(<DatePicker selected={new Date(2026, 5, 20)} />);
    expect(screen.getByRole("button")).toHaveTextContent("Jun 20, 2026");
  });

  it("handles invalid selected value by falling back to placeholder", () => {
    render(
      <DatePicker placeholder="Pick date" selected={new Date(Number.NaN)} />,
    );

    expect(screen.getByRole("button")).toHaveTextContent("Pick date");
  });

  it("handles invalid defaultSelected value by falling back to placeholder", () => {
    render(
      <DatePicker
        placeholder="Pick date"
        defaultSelected={new Date(Number.NaN)}
      />,
    );

    expect(screen.getByRole("button")).toHaveTextContent("Pick date");
  });

  it("fires onDateChange for Today and Clear actions", async () => {
    const user = userEvent.setup();
    const onDateChange = vi.fn();
    render(<DatePicker onDateChange={onDateChange} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button", { name: "Today" }));
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onDateChange.mock.calls[0]?.[0]).toBeInstanceOf(Date);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(onDateChange).toHaveBeenLastCalledWith(undefined);
  });

  it("fires onOpenChange when opening and closing from interactions", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(<DatePicker onOpenChange={onOpenChange} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);
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

  it("closes on touchstart outside the component", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(<DatePicker onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole("button"));
    expect(
      screen.getByRole("dialog", { name: "Calendar" }),
    ).toBeInTheDocument();

    fireEvent.touchStart(document.body);

    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(
      screen.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByRole("button"));
    expect(
      screen.getByRole("dialog", { name: "Calendar" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(
      screen.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();
  });

  it("supports required and removeBackground props", () => {
    render(<DatePicker required removeBackground />);

    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-required", "true");
    expect(trigger).toHaveClass("bg-transparent");
  });

  it("renders optional calendar icon when enabled", () => {
    const { rerender } = render(<DatePicker />);

    expect(screen.queryByTestId("date-picker-calendar-icon")).toBeNull();

    rerender(<DatePicker showCalendarIcon />);
    expect(screen.getByTestId("date-picker-calendar-icon")).toBeInTheDocument();
  });

  it("supports inputSize variants", () => {
    const { rerender } = render(<DatePicker inputSize="sm" />);
    expect(screen.getByRole("button")).toHaveClass("h-9", "text-sm");

    rerender(<DatePicker inputSize="md" />);
    expect(screen.getByRole("button")).toHaveClass("h-11", "text-base");

    rerender(<DatePicker inputSize="lg" />);
    expect(screen.getByRole("button")).toHaveClass("h-12", "text-lg");
  });

  it("renders month navigation by default and month/year picker when enabled", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<DatePicker />);

    await user.click(screen.getByRole("button"));
    expect(
      screen.getByRole("button", { name: "Previous month" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next month" }),
    ).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    rerender(<DatePicker id="month-year" enableMonthYearPicker />);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("combobox", { name: "Month" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Year" })).toBeInTheDocument();
    expect(screen.getByLabelText("Month")).toHaveAttribute(
      "id",
      "month-year-month-select",
    );
    expect(screen.getByLabelText("Year")).toHaveAttribute(
      "id",
      "month-year-year-select",
    );
  });

  it("updates displayed month when Previous month and Next month buttons are clicked", async () => {
    const user = userEvent.setup();

    render(<DatePicker defaultSelected={new Date(2026, 2, 15)} />);

    await user.click(screen.getByRole("button", { name: "Mar 15, 2026" }));
    expect(screen.getByText("March 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("February 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("March 2026")).toBeInTheDocument();
  });

  it("updates calendar view when month/year combobox values change", async () => {
    const user = userEvent.setup();

    render(
      <DatePicker
        id="picker"
        defaultSelected={new Date(2026, 2, 15)}
        enableMonthYearPicker
      />,
    );

    await user.click(screen.getByRole("button", { name: "Mar 15, 2026" }));

    fireEvent.change(screen.getByRole("combobox", { name: "Month" }), {
      target: { value: "0" },
    });
    expect(screen.getByTestId("non-native-day-2026-01-01")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox", { name: "Year" }), {
      target: { value: "2028" },
    });
    expect(screen.getByTestId("non-native-day-2028-01-01")).toBeInTheDocument();

    expect(screen.getByLabelText("Month")).toHaveValue("0");
    expect(screen.getByLabelText("Year")).toHaveValue("2028");
  });

  it("selects a day button, updates value, and closes the popover", async () => {
    const user = userEvent.setup();
    const onDateChange = vi.fn();

    render(
      <DatePicker
        defaultSelected={new Date(2026, 5, 10)}
        onDateChange={onDateChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Jun 10, 2026" }));
    await user.click(screen.getByTestId("non-native-day-2026-06-18"));

    expect(onDateChange).toHaveBeenCalledWith(new Date(2026, 5, 18));
    expect(
      screen.getByRole("button", { name: "Jun 18, 2026" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();
  });

  it("supports selecting an adjacent-month day button", async () => {
    const user = userEvent.setup();

    render(<DatePicker defaultSelected={new Date(2026, 5, 10)} />);

    await user.click(screen.getByRole("button", { name: "Jun 10, 2026" }));
    await user.click(screen.getByTestId("non-native-day-2026-05-31"));

    expect(
      screen.getByRole("button", { name: "May 31, 2026" }),
    ).toBeInTheDocument();
  });

  it("closes popover when Today and Clear buttons are used", async () => {
    const user = userEvent.setup();
    render(<DatePicker defaultSelected={new Date(2026, 0, 15)} />);

    await user.click(screen.getByRole("button", { name: "Jan 15, 2026" }));
    await user.click(screen.getByRole("button", { name: "Today" }));
    expect(
      screen.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(
      screen.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();
  });

  it("passes through common button HTML props and blocks interaction when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <DatePicker
        id="custom-id"
        disabled
        aria-label="Pick a date"
        data-testid="date-picker"
        onClick={onClick}
      />,
    );

    const trigger = screen.getByTestId("date-picker");
    expect(trigger).toHaveAttribute("id", "custom-id");
    expect(trigger).toHaveAttribute("aria-label", "Pick a date");
    expect(trigger).toBeDisabled();

    await user.click(trigger);
    expect(onClick).not.toHaveBeenCalled();
    expect(
      screen.queryByRole("dialog", { name: "Calendar" }),
    ).not.toBeInTheDocument();
  });

  it("does not render duplicate element ids", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DatePicker
        id="booking-date"
        label="Booking date"
        enableMonthYearPicker
      />,
    );

    await user.click(screen.getByRole("button", { name: "Booking date" }));

    const ids = Array.from(container.querySelectorAll<HTMLElement>("[id]"))
      .map((element) => element.id)
      .filter(Boolean);

    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

    expect(ids.length).toBeGreaterThan(0);
    expect(duplicateIds).toEqual([]);
  });

  it("formats dates using default en-US locale", () => {
    render(<DatePicker selected={new Date(2026, 0, 15)} />);
    expect(screen.getByRole("button")).toHaveTextContent("Jan 15, 2026");
  });

  it("formats dates using custom locale", () => {
    render(<DatePicker selected={new Date(2026, 0, 15)} locale="de-DE" />);
    const button = screen.getByRole("button");
    expect(button.textContent).toMatch(/15/);
    expect(button.textContent).toMatch(/Jan/i);
    expect(button.textContent).toMatch(/2026/);
  });

  it("renders localized weekday and month names in calendar", async () => {
    const user = userEvent.setup();
    render(<DatePicker locale="fr-FR" enableMonthYearPicker />);

    await user.click(screen.getByRole("button"));

    const monthSelect = screen.getByRole("combobox", { name: "Month" });
    expect(monthSelect.innerHTML).toMatch(/janvier/i);
    expect(monthSelect.innerHTML).toMatch(/d[ée]cembre/i);
  });
});
