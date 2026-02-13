import { useState } from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PasswordField from "./PasswordField";

describe("PasswordField", () => {
  afterEach(() => {
    cleanup();
  });

  // Basic rendering and props
  it("renders as password input by default", () => {
    render(<PasswordField label="Password" />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders with visibility toggle by default", () => {
    render(<PasswordField label="Password" />);

    expect(
      screen.queryByRole("button", { name: /password/i }),
    ).toBeInTheDocument();
  });

  it("renders visibility toggle when showVisibilityToggle is true", () => {
    render(<PasswordField label="Password" showVisibilityToggle />);

    const button = screen.getByRole("button", { name: "Show password" });
    expect(button).toBeInTheDocument();
  });

  // Toggle behavior
  it("toggles password visibility on button click", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Password" showVisibilityToggle />);

    const input = screen.getByLabelText("Password");
    const button = screen.getByRole("button", { name: "Show password" });

    expect(input).toHaveAttribute("type", "password");
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);

    expect(input).toHaveAttribute("type", "text");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAccessibleName("Hide password");

    await user.click(button);

    expect(input).toHaveAttribute("type", "password");
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAccessibleName("Show password");
  });

  it("prevents default on mousedown to avoid input blur", () => {
    render(<PasswordField label="Password" showVisibilityToggle />);

    const button = screen.getByRole("button", { name: "Show password" });
    const mouseDownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    const preventDefaultSpy = vi.spyOn(mouseDownEvent, "preventDefault");
    button.dispatchEvent(mouseDownEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("displays correct icon when password is hidden", () => {
    render(<PasswordField label="Password" showVisibilityToggle />);

    const button = screen.getByRole("button", { name: "Show password" });
    const svg = button.querySelector("svg");
    const path = button.querySelector("path");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");

    // Open eye icon path
    expect(path).toHaveAttribute(
      "d",
      "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3",
    );
  });

  it("displays correct icon when password is visible", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Password" showVisibilityToggle />);

    const button = screen.getByRole("button", { name: "Show password" });
    await user.click(button);

    const path = button.querySelector("path");

    // Closed eye icon path
    expect(path).toHaveAttribute(
      "d",
      "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z",
    );
  });

  // Disabled state
  it("disables toggle button when input is disabled", () => {
    render(<PasswordField label="Password" showVisibilityToggle disabled />);

    const input = screen.getByLabelText("Password");
    const button = screen.getByRole("button", { name: "Show password" });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("does not toggle when button is disabled", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Password" showVisibilityToggle disabled />);

    const input = screen.getByLabelText("Password");
    const button = screen.getByRole("button", { name: "Show password" });

    await user.click(button);

    expect(input).toHaveAttribute("type", "password");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  // TextField props integration
  it("renders label linked to the input", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Password" />);

    const input = screen.getByLabelText("Password");
    const label = screen.getByText("Password");

    expect(input).toHaveAttribute("id");
    expect(label).toHaveAttribute("for", input.getAttribute("id"));

    await user.click(label);
    expect(input).toHaveFocus();
  });

  it("renders helper text with aria-describedby", () => {
    render(
      <PasswordField label="Password" helperText="At least 8 characters" />,
    );

    const input = screen.getByLabelText("Password");
    const helper = screen.getByText("At least 8 characters");

    expect(helper).toHaveAttribute("id");
    expect(input).toHaveAttribute(
      "aria-describedby",
      helper.getAttribute("id"),
    );
  });

  it("prioritizes error text over helper text", () => {
    render(
      <PasswordField
        label="Password"
        helperText="Helper copy"
        errorText="Password is required"
      />,
    );

    expect(screen.queryByText("Helper copy")).not.toBeInTheDocument();
    const error = screen.getByText("Password is required");
    const input = screen.getByLabelText("Password");
    const label = screen.getByText("Password");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(label).toHaveClass("text-destructive");
    expect(input).toHaveClass("border-destructive");
    expect(error).toHaveClass("text-destructive");
  });

  it("supports fullWidth layout", () => {
    const { container: fullContainer } = render(
      <PasswordField label="Full" fullWidth />,
    );
    const { container: defaultContainer } = render(
      <PasswordField label="Default" />,
    );

    expect(fullContainer.firstChild).toHaveClass("w-full");
    expect(defaultContainer.firstChild).toHaveClass("w-64");
  });

  // Color variants
  it("applies color variants to input and icon", () => {
    render(
      <PasswordField
        label="Custom"
        color="emerald"
        showVisibilityToggle
        data-testid="emerald-input"
      />,
    );

    const input = screen.getByTestId("emerald-input");
    const label = screen.getByText("Custom");
    const button = screen.getByRole("button", { name: "Show password" });
    const svg = button.querySelector("svg");

    expect(label).toHaveClass("text-emerald-700");
    expect(input).toHaveClass("border-emerald-300");
    expect(svg).toHaveClass("text-emerald-500");

    // Check hover classes are applied
    expect(svg).toHaveClass("group-hover:text-emerald-700");
  });

  it("renders multiple color variants correctly", () => {
    const { container } = render(
      <div>
        <PasswordField
          label="Blue"
          color="blue"
          showVisibilityToggle
          data-testid="blue-input"
        />
        <PasswordField
          label="Red"
          color="red"
          showVisibilityToggle
          data-testid="red-input"
        />
        <PasswordField
          label="Purple"
          color="purple"
          showVisibilityToggle
          data-testid="purple-input"
        />
      </div>,
    );

    const blueInput = screen.getByTestId("blue-input");
    const redInput = screen.getByTestId("red-input");
    const purpleInput = screen.getByTestId("purple-input");

    expect(blueInput).toHaveClass("border-blue-300");
    expect(redInput).toHaveClass("border-red-300");
    expect(purpleInput).toHaveClass("border-purple-300");

    // Check icon colors - get the first button specifically for blue
    const buttons = container.querySelectorAll("button");
    const blueSvg = buttons[0].querySelector("svg");
    expect(blueSvg).toHaveClass("text-blue-500");
  });

  // Size variants
  it("renders all size variants correctly", () => {
    render(
      <div>
        <PasswordField label="Small" inputSize="sm" data-testid="sm-input" />
        <PasswordField label="Medium" inputSize="md" data-testid="md-input" />
        <PasswordField label="Large" inputSize="lg" data-testid="lg-input" />
      </div>,
    );

    const smInput = screen.getByTestId("sm-input");
    const mdInput = screen.getByTestId("md-input");
    const lgInput = screen.getByTestId("lg-input");

    expect(smInput).toHaveClass("h-9", "text-sm");
    expect(mdInput).toHaveClass("h-11", "text-base");
    expect(lgInput).toHaveClass("h-12", "text-lg");
  });

  // Common HTML props
  it("passes common HTML props to the input", () => {
    render(
      <PasswordField
        label="Props"
        id="custom-id"
        className="custom-wrapper"
        disabled
        required
        aria-label="Password input"
        data-testid="password-field"
      />,
    );

    const input = screen.getByTestId("password-field");
    const label = screen.getByText("Props");
    const wrapper = input.closest("div")?.parentElement;

    expect(input).toHaveAttribute("id", "custom-id");
    expect(label).toHaveAttribute("for", "custom-id");
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-label", "Password input");
    expect(wrapper).toHaveClass("custom-wrapper");
  });

  it("supports standard HTML input attributes", () => {
    render(
      <PasswordField
        label="Standard attrs"
        name="password"
        autoComplete="current-password"
        maxLength={128}
        minLength={8}
        data-testid="standard-input"
      />,
    );

    const input = screen.getByTestId("standard-input");

    expect(input).toHaveAttribute("name", "password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
    expect(input).toHaveAttribute("maxlength", "128");
    expect(input).toHaveAttribute("minlength", "8");
  });

  // Event handlers
  it("fires event handlers on input", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const handleChange = vi.fn();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(
      <PasswordField
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

    await user.type(input, "password");
    expect(handleChange).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("fires keyboard event handlers", async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();
    const handleKeyUp = vi.fn();

    render(
      <PasswordField
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

    render(<PasswordField label="Input event" onInput={handleInput} />);

    const input = screen.getByLabelText("Input event");

    await user.type(input, "test");

    expect(handleInput).toHaveBeenCalled();
  });

  // Controlled and uncontrolled
  it("supports uncontrolled usage with defaultValue", async () => {
    const user = userEvent.setup();
    render(<PasswordField aria-label="Uncontrolled" defaultValue="initial" />);

    const input = screen.getByLabelText("Uncontrolled") as HTMLInputElement;

    await user.type(input, "123");
    expect(input.value).toBe("initial123");
  });

  it("supports controlled usage", async () => {
    const user = userEvent.setup();

    function ControlledExample() {
      const [value, setValue] = useState("pass");
      return (
        <PasswordField
          aria-label="Controlled"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }

    render(<ControlledExample />);

    const input = screen.getByLabelText("Controlled") as HTMLInputElement;

    await user.type(input, "word");
    expect(input.value).toBe("password");
  });

  it("supports controlled usage with visibility toggle", async () => {
    const user = userEvent.setup();

    function ControlledPasswordExample() {
      const [value, setValue] = useState("secret");
      return (
        <PasswordField
          aria-label="Controlled with toggle"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          showVisibilityToggle
        />
      );
    }

    render(<ControlledPasswordExample />);

    const input = screen.getByLabelText(
      "Controlled with toggle",
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Show password" });

    expect(input.value).toBe("secret");
    expect(input).toHaveAttribute("type", "password");

    // Toggle visibility and type
    await user.click(button);
    expect(input).toHaveAttribute("type", "text");

    await user.clear(input);
    await user.type(input, "new");
    expect(input.value).toBe("new");

    await user.click(button);
    expect(input).toHaveAttribute("type", "password");
  });

  // Edge cases
  it("handles empty state without label or helper", () => {
    render(<PasswordField placeholder="Password" aria-label="Password" />);

    const input = screen.getByLabelText("Password");

    expect(screen.queryByText("Password")).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("handles long password values", async () => {
    const user = userEvent.setup();
    const longPassword = "a".repeat(100);

    render(
      <PasswordField aria-label="Long password" data-testid="long-password" />,
    );

    const input = screen.getByTestId("long-password") as HTMLInputElement;

    await user.type(input, longPassword);
    expect(input.value).toBe(longPassword);
  });

  it("renders long helper text", () => {
    const longText =
      "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    render(<PasswordField label="Password" helperText={longText} />);

    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it("handles empty string values", () => {
    render(
      <PasswordField label="Empty" defaultValue="" data-testid="empty-input" />,
    );

    const input = screen.getByTestId("empty-input") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("handles whitespace-only values", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Whitespace" data-testid="whitespace-input" />);

    const input = screen.getByTestId("whitespace-input") as HTMLInputElement;

    await user.type(input, "   ");
    expect(input.value).toBe("   ");
  });

  it("preserves special characters and symbols", async () => {
    const user = userEvent.setup();
    const specialPassword = "P@ssw0rd!#$%^&*()";

    render(<PasswordField aria-label="Special" data-testid="special-input" />);

    const input = screen.getByTestId("special-input") as HTMLInputElement;

    await user.type(input, specialPassword);
    expect(input.value).toBe(specialPassword);
  });

  // Accessibility
  it("has proper accessibility attributes on toggle button", () => {
    render(<PasswordField label="Password" showVisibilityToggle />);

    const button = screen.getByRole("button", { name: "Show password" });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-label", "Show password");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("updates aria-pressed when toggling", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Password" showVisibilityToggle />);

    const button = screen.getByRole("button", { name: "Show password" });

    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("has proper SVG accessibility attributes", () => {
    render(<PasswordField label="Password" showVisibilityToggle />);

    const button = screen.getByRole("button", { name: "Show password" });
    const svg = button.querySelector("svg");

    expect(svg).toHaveAttribute("focusable", "false");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("supports autoFocus attribute", () => {
    render(
      <PasswordField label="Auto focus" autoFocus data-testid="focus-input" />,
    );

    const input = screen.getByTestId("focus-input");
    expect(input).toHaveFocus();
  });

  it("supports readOnly state", () => {
    render(
      <PasswordField
        label="Read only"
        readOnly
        defaultValue="readonly-pass"
        data-testid="readonly-input"
      />,
    );

    const input = screen.getByTestId("readonly-input") as HTMLInputElement;

    expect(input).toHaveAttribute("readonly");
    expect(input.value).toBe("readonly-pass");
  });

  it("supports form attribute", () => {
    render(
      <PasswordField
        label="Form input"
        form="my-form"
        data-testid="form-input"
      />,
    );

    const input = screen.getByTestId("form-input");
    expect(input).toHaveAttribute("form", "my-form");
  });

  // Multiple props combined
  it("combines multiple props correctly", async () => {
    const user = userEvent.setup();
    render(
      <PasswordField
        label="Combined"
        color="indigo"
        inputSize="lg"
        fullWidth
        helperText="Multiple props at once"
        showVisibilityToggle
        required
        maxLength={100}
        data-testid="combined-input"
      />,
    );

    const input = screen.getByTestId("combined-input");
    const label = screen.getByText("Combined");
    const helper = screen.getByText("Multiple props at once");
    const button = screen.getByRole("button", { name: "Show password" });

    expect(input).toHaveClass("border-indigo-300", "h-12", "text-lg");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("maxlength", "100");
    expect(label).toHaveClass("text-indigo-700");
    expect(helper).toBeInTheDocument();
    expect(input.closest("div")?.parentElement).toHaveClass("w-full");
    expect(button).toBeInTheDocument();

    // Test toggle still works with all props
    await user.click(button);
    expect(input).toHaveAttribute("type", "text");
  });

  it("handles error state with multiple other props", () => {
    render(
      <PasswordField
        label="Complex error"
        color="blue"
        errorText="Error overrides color"
        showVisibilityToggle
        data-testid="complex-error"
      />,
    );

    const input = screen.getByTestId("complex-error");
    const label = screen.getByText("Complex error");
    const error = screen.getByText("Error overrides color");
    const button = screen.getByRole("button", { name: "Show password" });

    // Error styling should override color prop
    expect(label).toHaveClass("text-destructive");
    expect(input).toHaveClass("border-destructive");
    expect(error).toHaveClass("text-destructive");
    expect(button).toBeInTheDocument();
  });

  it("supports removeBackground styling", () => {
    render(<PasswordField label="Overlay" removeBackground />);

    const input = screen.getByLabelText("Overlay");
    expect(input).toHaveClass("bg-transparent");
    expect(input).toHaveClass("dark:bg-transparent");
  });

  it("handles placeholder attribute", () => {
    render(
      <PasswordField
        label="With placeholder"
        placeholder="Enter password"
        data-testid="placeholder-input"
      />,
    );

    const input = screen.getByTestId("placeholder-input");
    expect(input).toHaveAttribute("placeholder", "Enter password");
  });

  it("toggle button has proper styling classes", () => {
    render(<PasswordField label="Password" showVisibilityToggle />);

    const button = screen.getByRole("button", { name: "Show password" });

    expect(button).toHaveClass("group");
    expect(button).toHaveClass("cursor-pointer");
    expect(button).toHaveClass("bg-transparent");
    expect(button).toHaveClass("focus-visible:outline-none");
    expect(button).toHaveClass("focus-visible:ring-1");
    expect(button).toHaveClass("disabled:cursor-not-allowed");
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("does not allow type prop to be overridden", () => {
    render(
      <PasswordField
        label="Type override"
        // @ts-expect-error Testing that type prop is not allowed
        type="text"
        data-testid="type-override"
      />,
    );

    const input = screen.getByTestId("type-override");
    // Should still be password type
    expect(input).toHaveAttribute("type", "password");
  });

  it("does not allow endAdornment prop to be used", () => {
    const { container } = render(
      <PasswordField
        label="Adornment Test"
        // @ts-expect-error Testing that endAdornment is not allowed
        endAdornment={<span>Custom</span>}
        showVisibilityToggle
        data-testid="adornment-test"
      />,
    );

    // Only the visibility toggle should be present, not custom endAdornment
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveAttribute("aria-label", "Show password");
    expect(screen.queryByText("Custom")).not.toBeInTheDocument();
  });

  // Integration with visibility toggle focus behavior
  it("maintains input focus after toggle button click", async () => {
    const user = userEvent.setup();
    render(
      <PasswordField
        label="Focus Test Password"
        showVisibilityToggle
        data-testid="focus-test-input"
      />,
    );

    const input = screen.getByTestId("focus-test-input");
    const button = screen.getByRole("button", { name: "Show password" });

    await user.click(input);
    expect(input).toHaveFocus();

    await user.click(button);
    // Input should maintain focus after toggle (due to mousedown preventDefault)
    expect(input).toHaveFocus();
  });

  it("toggle button is keyboard accessible", async () => {
    const user = userEvent.setup();
    render(
      <PasswordField
        label="Keyboard Test Password"
        showVisibilityToggle
        data-testid="keyboard-test-input"
      />,
    );

    const input = screen.getByTestId("keyboard-test-input");
    const button = screen.getByRole("button", { name: "Show password" });

    // Tab to input, then to button
    await user.tab();
    expect(input).toHaveFocus();

    await user.tab();
    expect(button).toHaveFocus();

    // Activate with keyboard
    await user.keyboard("{Enter}");
    expect(input).toHaveAttribute("type", "text");
  });
});
