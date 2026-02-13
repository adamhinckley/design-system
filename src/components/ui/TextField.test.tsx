import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TextField from "./TextField";

describe("TextField", () => {
  it("renders a label linked to the input", async () => {
    const user = userEvent.setup();
    render(<TextField label="Email" />);

    const input = screen.getByLabelText("Email");
    const label = screen.getByText("Email");

    expect(input).toHaveAttribute("id");
    expect(label).toHaveAttribute("for", input.getAttribute("id"));

    await user.click(label);
    expect(input).toHaveFocus();
  });

  it("renders helper text with aria-describedby", () => {
    render(<TextField label="Name" helperText="Helper copy" />);

    const input = screen.getByLabelText("Name");
    const helper = screen.getByText("Helper copy");

    expect(helper).toHaveAttribute("id");
    expect(input).toHaveAttribute(
      "aria-describedby",
      helper.getAttribute("id"),
    );

    cleanup();
  });

  it("prioritizes error text over helper text", () => {
    render(
      <TextField
        label="Email"
        helperText="Helper copy"
        errorText="Something is wrong"
      />,
    );

    expect(screen.queryByText("Helper copy")).not.toBeInTheDocument();
    const error = screen.getByText("Something is wrong");
    const input = screen.getByLabelText("Email");
    const label = screen.getByText("Email");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(label).toHaveClass("text-destructive");
    expect(input).toHaveClass("border-destructive");
    expect(error).toHaveClass("text-destructive");

    cleanup();
  });

  it("renders helper text when errorText is an empty string", () => {
    render(
      <TextField
        label="With helper"
        helperText="Helper copy"
        errorText=""
        data-testid="empty-error-input"
      />,
    );

    const helper = screen.getByText("Helper copy");
    const input = screen.getByTestId("empty-error-input");
    const label = screen.getByText("With helper");

    expect(helper).toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(label).not.toHaveClass("text-destructive");
    expect(input).not.toHaveClass("border-destructive");
  });

  it("supports fullWidth layout", () => {
    const { container: fullContainer } = render(
      <TextField label="Full" fullWidth />,
    );
    const { container: defaultContainer } = render(
      <TextField label="Default" />,
    );

    expect(fullContainer.firstChild).toHaveClass("w-full");
    expect(defaultContainer.firstChild).toHaveClass("w-64");
  });

  it("applies color and size variants", () => {
    render(
      <TextField
        label="Custom"
        color="emerald"
        inputSize="sm"
        placeholder="Type"
      />,
    );

    const input = screen.getByLabelText("Custom");
    const label = screen.getByText("Custom");

    expect(label).toHaveClass("text-emerald-700");
    expect(input).toHaveClass("border-emerald-300");
    expect(input).toHaveClass("h-9", "text-sm");
  });

  it("renders start and end adornments with padding", () => {
    render(
      <TextField
        label="Amount"
        startAdornment={<span data-testid="start">$</span>}
        endAdornment={<span data-testid="end">USD</span>}
      />,
    );

    const input = screen.getByLabelText("Amount");

    expect(screen.getByTestId("start")).toBeInTheDocument();
    expect(screen.getByTestId("end")).toBeInTheDocument();
    expect(input).toHaveClass("pl-10", "pr-10");
  });

  it("supports removeBackground styling", () => {
    render(<TextField label="Overlay" removeBackground />);

    const input = screen.getByLabelText("Overlay");
    expect(input).toHaveClass("bg-transparent");
    expect(input).toHaveClass("dark:bg-transparent");
  });

  it("passes common HTML props to the input", () => {
    render(
      <TextField
        label="Props"
        id="custom-id"
        className="custom-wrapper"
        disabled
        required
        aria-label="Props input"
        data-testid="text-field"
      />,
    );

    const input = screen.getByTestId("text-field");
    const label = screen.getByText("Props");
    const wrapper = input.closest("div")?.parentElement;

    expect(input).toHaveAttribute("id", "custom-id");
    expect(label).toHaveAttribute("for", "custom-id");
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-label", "Props input");
    expect(wrapper).toHaveClass("custom-wrapper");
  });

  it("fires event handlers", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const handleChange = vi.fn();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(
      <TextField
        label="Events"
        onClick={handleClick}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />,
    );

    const input = screen.getByLabelText("Events");

    await user.click(input);
    expect(handleClick).toHaveBeenCalled();
    expect(handleFocus).toHaveBeenCalled();

    await user.type(input, "hello");
    expect(handleChange).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("supports uncontrolled usage with defaultValue", async () => {
    const user = userEvent.setup();
    render(<TextField aria-label="Uncontrolled" defaultValue="start" />);

    const input = screen.getByLabelText("Uncontrolled") as HTMLInputElement;

    await user.type(input, "-end");
    expect(input.value).toBe("start-end");
  });

  it("supports controlled usage", async () => {
    const user = userEvent.setup();

    function ControlledExample() {
      const [value, setValue] = useState("A");
      return (
        <TextField
          aria-label="Controlled"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }

    render(<ControlledExample />);

    const input = screen.getByLabelText("Controlled") as HTMLInputElement;

    await user.type(input, "BC");
    expect(input.value).toBe("ABC");
  });

  it("handles empty state without label or helper", () => {
    render(<TextField placeholder="Search" aria-label="Search" />);

    const input = screen.getByLabelText("Search");

    expect(screen.queryByText("Search")).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("preserves min, max, and unexpected characters", () => {
    render(
      <TextField
        label="Quantity"
        type="number"
        min={1}
        max={10}
        placeholder="<script>alert(1)</script>"
      />,
    );

    const input = screen.getByLabelText("Quantity");

    expect(input).toHaveAttribute("min", "1");
    expect(input).toHaveAttribute("max", "10");
    expect(input).toHaveAttribute("placeholder", "<script>alert(1)</script>");
  });

  it("renders long helper text", () => {
    const longText =
      "This is a long helper message that should still be visible in the layout without truncation.";
    render(<TextField label="Long" helperText={longText} />);

    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it("renders all size variants correctly", () => {
    render(<TextField label="Small" inputSize="sm" data-testid="sm-input" />);
    render(<TextField label="Medium" inputSize="md" data-testid="md-input" />);
    render(<TextField label="Large" inputSize="lg" data-testid="lg-input" />);

    const smInput = screen.getByTestId("sm-input");
    const mdInput = screen.getByTestId("md-input");
    const lgInput = screen.getByTestId("lg-input");

    expect(smInput).toHaveClass("h-9", "text-sm");
    expect(mdInput).toHaveClass("h-11", "text-base");
    expect(lgInput).toHaveClass("h-12", "text-lg");
  });

  it("renders multiple color variants", () => {
    render(<TextField label="Blue" color="blue" data-testid="blue-input" />);
    render(<TextField label="Red" color="red" data-testid="red-input" />);
    render(
      <TextField label="Purple" color="purple" data-testid="purple-input" />,
    );

    const blueInput = screen.getByTestId("blue-input");
    const redInput = screen.getByTestId("red-input");
    const purpleInput = screen.getByTestId("purple-input");

    expect(blueInput).toHaveClass("border-blue-300");
    expect(redInput).toHaveClass("border-red-300");
    expect(purpleInput).toHaveClass("border-purple-300");
  });

  it("forwards ref to the input element", () => {
    const ref = { current: null as HTMLInputElement | null };

    function RefComponent() {
      return <TextField label="Ref test" ref={ref} />;
    }

    render(<RefComponent />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe("INPUT");
  });

  it("supports standard HTML input attributes", () => {
    render(
      <TextField
        label="Standard attrs"
        name="username"
        autoComplete="username"
        maxLength={50}
        pattern="[A-Za-z]+"
        data-testid="standard-input"
      />,
    );

    const input = screen.getByTestId("standard-input");

    expect(input).toHaveAttribute("name", "username");
    expect(input).toHaveAttribute("autocomplete", "username");
    expect(input).toHaveAttribute("maxlength", "50");
    expect(input).toHaveAttribute("pattern", "[A-Za-z]+");
  });

  it("supports autoFocus attribute", () => {
    render(
      <TextField label="Auto focus" autoFocus data-testid="focus-input" />,
    );

    const input = screen.getByTestId("focus-input");
    expect(input).toHaveFocus();
  });

  it("supports readOnly state", () => {
    render(
      <TextField
        label="Read only"
        readOnly
        defaultValue="Cannot edit"
        data-testid="readonly-input"
      />,
    );

    const input = screen.getByTestId("readonly-input") as HTMLInputElement;

    expect(input).toHaveAttribute("readonly");
    expect(input.value).toBe("Cannot edit");
  });

  it("fires keyboard event handlers", async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();
    const handleKeyUp = vi.fn();

    render(
      <TextField
        label="Keyboard"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />,
    );

    const input = screen.getByLabelText("Keyboard");

    await user.type(input, "a");

    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleKeyUp).toHaveBeenCalled();
  });

  it("fires onInput handler", async () => {
    const user = userEvent.setup();
    const handleInput = vi.fn();

    render(<TextField label="Input event" onInput={handleInput} />);

    const input = screen.getByLabelText("Input event");

    await user.type(input, "test");

    expect(handleInput).toHaveBeenCalled();
  });

  it("supports different input types", () => {
    render(<TextField label="Email" type="email" data-testid="email-input" />);
    render(<TextField label="Tel" type="tel" data-testid="tel-input" />);
    render(<TextField label="URL" type="url" data-testid="url-input" />);
    render(<TextField label="Date" type="date" data-testid="date-input" />);

    expect(screen.getByTestId("email-input")).toHaveAttribute("type", "email");
    expect(screen.getByTestId("tel-input")).toHaveAttribute("type", "tel");
    expect(screen.getByTestId("url-input")).toHaveAttribute("type", "url");
    expect(screen.getByTestId("date-input")).toHaveAttribute("type", "date");
  });

  it("handles long label text", () => {
    const longLabel =
      "This is a very long label that might wrap or affect layout in various screen sizes";
    render(<TextField label={longLabel} />);

    const label = screen.getByText(longLabel);
    expect(label).toBeInTheDocument();
  });

  it("supports step attribute for number inputs", () => {
    render(
      <TextField
        label="Price"
        type="number"
        step={0.01}
        data-testid="price-input"
      />,
    );

    const input = screen.getByTestId("price-input");
    expect(input).toHaveAttribute("step", "0.01");
  });

  it("supports minLength attribute", () => {
    render(
      <TextField
        label="Password"
        type="password"
        minLength={8}
        data-testid="password-input"
      />,
    );

    const input = screen.getByTestId("password-input");
    expect(input).toHaveAttribute("minlength", "8");
  });

  it("handles whitespace-only values", () => {
    render(
      <TextField
        label="Whitespace"
        defaultValue="   "
        data-testid="whitespace-input"
      />,
    );

    const input = screen.getByTestId("whitespace-input") as HTMLInputElement;
    expect(input.value).toBe("   ");
  });

  it("supports form attribute", () => {
    render(
      <TextField label="Form input" form="my-form" data-testid="form-input" />,
    );

    const input = screen.getByTestId("form-input");
    expect(input).toHaveAttribute("form", "my-form");
  });

  it("combines multiple props correctly", () => {
    render(
      <TextField
        label="Combined"
        color="indigo"
        inputSize="lg"
        fullWidth
        helperText="Multiple props at once"
        startAdornment={<span>→</span>}
        required
        maxLength={100}
        data-testid="combined-input"
      />,
    );

    const input = screen.getByTestId("combined-input");
    const label = screen.getByText("Combined");
    const helper = screen.getByText("Multiple props at once");

    expect(input).toHaveClass("border-indigo-300", "h-12", "text-lg", "pl-10");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("maxlength", "100");
    expect(label).toHaveClass("text-indigo-700");
    expect(helper).toBeInTheDocument();
    expect(input.closest("div")?.parentElement).toHaveClass("w-full");
  });

  it("handles error state with multiple other props", () => {
    render(
      <TextField
        label="Complex error"
        color="blue"
        errorText="Error overrides color"
        startAdornment={<span>$</span>}
        data-testid="complex-error"
      />,
    );

    const input = screen.getByTestId("complex-error");
    const label = screen.getByText("Complex error");
    const error = screen.getByText("Error overrides color");

    // Error styling should override color prop
    expect(label).toHaveClass("text-destructive");
    expect(input).toHaveClass("border-destructive");
    expect(error).toHaveClass("text-destructive");
  });

  it("ref can be used to focus input programmatically", () => {
    const ref = { current: null as HTMLInputElement | null };

    function RefFocusComponent() {
      return <TextField label="Ref focus" ref={ref} />;
    }

    render(<RefFocusComponent />);

    ref.current?.focus();

    expect(ref.current).toHaveFocus();
  });

  it("handles empty string values", () => {
    render(
      <TextField label="Empty" defaultValue="" data-testid="empty-input" />,
    );

    const input = screen.getByTestId("empty-input") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("supports accept attribute for file inputs", () => {
    render(
      <TextField
        label="File"
        type="file"
        accept="image/*"
        data-testid="file-input"
      />,
    );

    const input = screen.getByTestId("file-input");
    expect(input).toHaveAttribute("accept", "image/*");
  });
});
