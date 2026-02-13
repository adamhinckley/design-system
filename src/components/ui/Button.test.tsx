import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./Button";

describe("Button", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a default button with type=button", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("respects an explicit type prop", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("applies size variants", () => {
    render(
      <div>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Icon" />
      </div>,
    );

    expect(screen.getByRole("button", { name: "Small" })).toHaveClass(
      "h-8",
      "text-xs",
    );
    expect(screen.getByRole("button", { name: "Large" })).toHaveClass(
      "h-10",
      "px-8",
    );
    expect(screen.getByRole("button", { name: "Icon" })).toHaveClass(
      "h-9",
      "px-2",
      "w-fit",
    );
  });

  it("applies variant and color classes", () => {
    render(
      <Button variant="outline" color="emerald">
        Outline
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Outline" });
    expect(button).toHaveClass("border-emerald-300");
    expect(button).toHaveClass("dark:border-emerald-700");
  });

  it("supports rounded and fullWidth", () => {
    render(
      <div>
        <Button rounded fullWidth>
          Rounded
        </Button>
        <Button>Default</Button>
      </div>,
    );

    expect(screen.getByRole("button", { name: "Rounded" })).toHaveClass(
      "rounded-full",
      "w-full",
    );
    expect(screen.getByRole("button", { name: "Default" })).toHaveClass(
      "w-fit",
      "self-start",
      "justify-self-start",
    );
  });

  it("passes common HTML props", () => {
    render(
      <Button
        id="custom-id"
        className="custom-class"
        disabled
        aria-label="Accessible"
        data-testid="button"
      />,
    );

    const button = screen.getByTestId("button");
    expect(button).toHaveAttribute("id", "custom-id");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-label", "Accessible");
    expect(button).toHaveClass("custom-class");
  });

  it("fires event handlers", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    const handleKeyDown = vi.fn();
    const handleKeyUp = vi.fn();

    render(
      <Button
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        Events
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Events" });

    await user.click(button);
    expect(handleClick).toHaveBeenCalled();
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(button);
    expect(handleBlur).toHaveBeenCalled();

    await user.keyboard("{Enter}");
    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleKeyUp).toHaveBeenCalled();
  });

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Disabled" });

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards ref to the button element", () => {
    const ref = { current: null as HTMLButtonElement | null };

    function RefExample() {
      return <Button ref={ref}>Ref</Button>;
    }

    render(<RefExample />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe("BUTTON");
  });

  it("renders as child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/docs">Docs</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveClass("inline-flex");
    expect(link).not.toHaveAttribute("type");
  });

  it("passes type to child when provided", () => {
    render(
      <Button asChild type="button">
        <a href="/docs">Docs</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("type", "button");
  });

  it("warns when ref is provided with asChild", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const ref = { current: null as HTMLButtonElement | null };

    render(
      <Button asChild ref={ref}>
        <a href="/docs">Docs</a>
      </Button>,
    );

    expect(warnSpy).toHaveBeenCalledWith(
      "The 'ref' prop is not forwarded when 'asChild' is true. Please use the 'ref' prop on the child component instead.",
    );
    expect(ref.current).toBeNull();

    warnSpy.mockRestore();
  });
});
