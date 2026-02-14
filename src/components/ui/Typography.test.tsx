import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Typography } from "./Typography";

describe("Typography", () => {
  afterEach(() => {
    cleanup();
  });

  // Variant rendering and element mapping
  describe("Variants", () => {
    it("renders h1 variant with correct element and styles", () => {
      render(<Typography variant="h1">Heading 1</Typography>);
      const element = screen.getByText("Heading 1");
      expect(element.tagName).toBe("H1");
      expect(element).toHaveClass("scroll-m-20");
      expect(element).toHaveClass("text-4xl");
      expect(element).toHaveClass("font-extrabold");
      expect(element).toHaveClass("tracking-tight");
    });

    it("renders h2 variant with correct element and styles", () => {
      render(<Typography variant="h2">Heading 2</Typography>);
      const element = screen.getByText("Heading 2");
      expect(element.tagName).toBe("H2");
      expect(element).toHaveClass("text-3xl");
      expect(element).toHaveClass("font-semibold");
    });

    it("renders h3 variant with correct element", () => {
      render(<Typography variant="h3">Heading 3</Typography>);
      const element = screen.getByText("Heading 3");
      expect(element.tagName).toBe("H3");
      expect(element).toHaveClass("text-2xl");
    });

    it("renders h4 variant with correct element", () => {
      render(<Typography variant="h4">Heading 4</Typography>);
      const element = screen.getByText("Heading 4");
      expect(element.tagName).toBe("H4");
      expect(element).toHaveClass("text-xl");
    });

    it("renders h5 variant with correct element", () => {
      render(<Typography variant="h5">Heading 5</Typography>);
      const element = screen.getByText("Heading 5");
      expect(element.tagName).toBe("H5");
      expect(element).toHaveClass("text-lg");
    });

    it("renders h6 variant with correct element", () => {
      render(<Typography variant="h6">Heading 6</Typography>);
      const element = screen.getByText("Heading 6");
      expect(element.tagName).toBe("H6");
      expect(element).toHaveClass("text-base");
    });

    it("renders subtitle1 variant with h6 element", () => {
      render(<Typography variant="subtitle1">Subtitle 1</Typography>);
      const element = screen.getByText("Subtitle 1");
      expect(element.tagName).toBe("H6");
      expect(element).toHaveClass("text-base");
      expect(element).toHaveClass("font-normal");
      expect(element).toHaveClass("leading-relaxed");
    });

    it("renders subtitle2 variant with h6 element", () => {
      render(<Typography variant="subtitle2">Subtitle 2</Typography>);
      const element = screen.getByText("Subtitle 2");
      expect(element.tagName).toBe("H6");
      expect(element).toHaveClass("text-sm");
      expect(element).toHaveClass("font-medium");
    });

    it("renders body1 variant with p element", () => {
      render(<Typography variant="body1">Body text 1</Typography>);
      const element = screen.getByText("Body text 1");
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("text-base");
      expect(element).toHaveClass("font-normal");
      expect(element).toHaveClass("leading-relaxed");
    });

    it("renders body2 variant with p element", () => {
      render(<Typography variant="body2">Body text 2</Typography>);
      const element = screen.getByText("Body text 2");
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("text-sm");
      expect(element).toHaveClass("leading-normal");
    });

    it("renders button variant with span element", () => {
      render(<Typography variant="button">Button Text</Typography>);
      const element = screen.getByText("Button Text");
      expect(element.tagName).toBe("SPAN");
      expect(element).toHaveClass("text-sm");
      expect(element).toHaveClass("font-medium");
      expect(element).toHaveClass("tracking-wide");
      expect(element).toHaveClass("uppercase");
    });

    it("renders caption variant with span element", () => {
      render(<Typography variant="caption">Caption text</Typography>);
      const element = screen.getByText("Caption text");
      expect(element.tagName).toBe("SPAN");
      expect(element).toHaveClass("text-xs");
      expect(element).toHaveClass("leading-snug");
    });

    it("renders overline variant with span element", () => {
      render(<Typography variant="overline">Overline</Typography>);
      const element = screen.getByText("Overline");
      expect(element.tagName).toBe("SPAN");
      expect(element).toHaveClass("text-xs");
      expect(element).toHaveClass("font-semibold");
      expect(element).toHaveClass("tracking-widest");
      expect(element).toHaveClass("uppercase");
    });

    it("renders inherit variant with span element and no default styles", () => {
      render(<Typography variant="inherit">Inherit</Typography>);
      const element = screen.getByText("Inherit");
      expect(element.tagName).toBe("SPAN");
      // Inherit variant still gets default color but no typography styles
      expect(element).toHaveClass("text-slate-700");
      expect(element).not.toHaveClass("text-4xl");
      expect(element).not.toHaveClass("font-extrabold");
    });

    it("defaults to body1 variant when no variant specified", () => {
      render(<Typography>Default text</Typography>);
      const element = screen.getByText("Default text");
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("text-base");
    });
  });

  // Component override
  describe("Component Override", () => {
    it("renders custom component when specified", () => {
      render(
        <Typography variant="h1" component="div">
          Div heading
        </Typography>,
      );
      const element = screen.getByText("Div heading");
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass("text-4xl");
    });

    it("renders body text as span when component override is used", () => {
      render(
        <Typography variant="body1" component="span">
          Span body
        </Typography>,
      );
      const element = screen.getByText("Span body");
      expect(element.tagName).toBe("SPAN");
      expect(element).toHaveClass("text-base");
    });

    it("can override h2 with p element", () => {
      render(
        <Typography variant="h2" component="p">
          P heading
        </Typography>,
      );
      const element = screen.getByText("P heading");
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("text-3xl");
    });
  });

  // Color prop with automatic dark mode
  describe("Colors", () => {
    it("defaults to slate color", () => {
      render(<Typography>Default color</Typography>);
      const element = screen.getByText("Default color");
      expect(element).toHaveClass("text-slate-700");
      expect(element).toHaveClass("dark:text-slate-300");
    });

    it("applies blue color with dark mode", () => {
      render(<Typography color="blue">Blue text</Typography>);
      const element = screen.getByText("Blue text");
      expect(element).toHaveClass("text-blue-700");
      expect(element).toHaveClass("dark:text-blue-300");
    });

    it("applies red color with dark mode", () => {
      render(<Typography color="red">Red text</Typography>);
      const element = screen.getByText("Red text");
      expect(element).toHaveClass("text-red-700");
      expect(element).toHaveClass("dark:text-red-300");
    });

    it("applies green color with dark mode", () => {
      render(<Typography color="green">Green text</Typography>);
      const element = screen.getByText("Green text");
      expect(element).toHaveClass("text-green-700");
      expect(element).toHaveClass("dark:text-green-300");
    });

    it("applies gray color with dark mode", () => {
      render(<Typography color="gray">Gray text</Typography>);
      const element = screen.getByText("Gray text");
      expect(element).toHaveClass("text-gray-700");
      expect(element).toHaveClass("dark:text-gray-300");
    });

    it("applies indigo color with dark mode", () => {
      render(<Typography color="indigo">Indigo text</Typography>);
      const element = screen.getByText("Indigo text");
      expect(element).toHaveClass("text-indigo-700");
      expect(element).toHaveClass("dark:text-indigo-300");
    });

    it("applies purple color with dark mode", () => {
      render(<Typography color="purple">Purple text</Typography>);
      const element = screen.getByText("Purple text");
      expect(element).toHaveClass("text-purple-700");
      expect(element).toHaveClass("dark:text-purple-300");
    });

    it("applies pink color with dark mode", () => {
      render(<Typography color="pink">Pink text</Typography>);
      const element = screen.getByText("Pink text");
      expect(element).toHaveClass("text-pink-700");
      expect(element).toHaveClass("dark:text-pink-300");
    });
  });

  // Font properties
  describe("Font Properties", () => {
    it("applies font family", () => {
      render(<Typography fontFamily="mono">Monospace text</Typography>);
      const element = screen.getByText("Monospace text");
      expect(element).toHaveClass("font-mono");
    });

    it("applies serif font family", () => {
      render(<Typography fontFamily="serif">Serif text</Typography>);
      const element = screen.getByText("Serif text");
      expect(element).toHaveClass("font-serif");
    });

    it("applies custom font size", () => {
      render(<Typography size="2xl">Large text</Typography>);
      const element = screen.getByText("Large text");
      expect(element).toHaveClass("text-2xl");
    });

    it("applies small font size", () => {
      render(<Typography size="xs">Small text</Typography>);
      const element = screen.getByText("Small text");
      expect(element).toHaveClass("text-xs");
    });

    it("applies font weight", () => {
      render(<Typography weight="bold">Bold text</Typography>);
      const element = screen.getByText("Bold text");
      expect(element).toHaveClass("font-bold");
    });

    it("applies light font weight", () => {
      render(<Typography weight="light">Light text</Typography>);
      const element = screen.getByText("Light text");
      expect(element).toHaveClass("font-light");
    });

    it("applies italic style", () => {
      render(<Typography italic>Italic text</Typography>);
      const element = screen.getByText("Italic text");
      expect(element).toHaveClass("italic");
    });

    it("applies antialiased smoothing", () => {
      render(<Typography smoothing="antialiased">Smooth text</Typography>);
      const element = screen.getByText("Smooth text");
      expect(element).toHaveClass("antialiased");
    });

    it("applies subpixel antialiased smoothing", () => {
      render(
        <Typography smoothing="subpixel-antialiased">
          Subpixel smooth
        </Typography>,
      );
      const element = screen.getByText("Subpixel smooth");
      expect(element).toHaveClass("subpixel-antialiased");
    });

    it("applies numeric variant", () => {
      render(<Typography numericVariant="tabular-nums">123456</Typography>);
      const element = screen.getByText("123456");
      expect(element).toHaveClass("tabular-nums");
    });
  });

  // Spacing and layout
  describe("Spacing and Layout", () => {
    it("applies letter spacing (tracking)", () => {
      render(<Typography tracking="wide">Wide tracking</Typography>);
      const element = screen.getByText("Wide tracking");
      expect(element).toHaveClass("tracking-wide");
    });

    it("applies tight letter spacing", () => {
      render(<Typography tracking="tight">Tight tracking</Typography>);
      const element = screen.getByText("Tight tracking");
      expect(element).toHaveClass("tracking-tight");
    });

    it("applies line height (leading)", () => {
      render(<Typography leading="loose">Loose leading</Typography>);
      const element = screen.getByText("Loose leading");
      expect(element).toHaveClass("leading-loose");
    });

    it("applies tight line height", () => {
      render(<Typography leading="tight">Tight leading</Typography>);
      const element = screen.getByText("Tight leading");
      expect(element).toHaveClass("leading-tight");
    });

    it("applies line clamp", () => {
      render(<Typography lineClamp="2">Clamped text</Typography>);
      const element = screen.getByText("Clamped text");
      expect(element).toHaveClass("line-clamp-2");
    });

    it("applies text indent", () => {
      render(<Typography indent="4">Indented text</Typography>);
      const element = screen.getByText("Indented text");
      expect(element).toHaveClass("indent-4");
    });
  });

  // Alignment
  describe("Alignment", () => {
    it("applies text alignment", () => {
      render(<Typography align="center">Centered text</Typography>);
      const element = screen.getByText("Centered text");
      expect(element).toHaveClass("text-center");
    });

    it("applies right alignment", () => {
      render(<Typography align="right">Right aligned</Typography>);
      const element = screen.getByText("Right aligned");
      expect(element).toHaveClass("text-right");
    });

    it("applies justify alignment", () => {
      render(<Typography align="justify">Justified text</Typography>);
      const element = screen.getByText("Justified text");
      expect(element).toHaveClass("text-justify");
    });

    it("applies vertical alignment", () => {
      render(<Typography verticalAlign="middle">Middle aligned</Typography>);
      const element = screen.getByText("Middle aligned");
      expect(element).toHaveClass("align-middle");
    });

    it("applies baseline vertical alignment", () => {
      render(<Typography verticalAlign="baseline">Baseline</Typography>);
      const element = screen.getByText("Baseline");
      expect(element).toHaveClass("align-baseline");
    });
  });

  // Text decoration
  describe("Text Decoration", () => {
    it("applies underline decoration", () => {
      render(<Typography decoration="underline">Underlined</Typography>);
      const element = screen.getByText("Underlined");
      expect(element).toHaveClass("underline");
    });

    it("applies line-through decoration", () => {
      render(<Typography decoration="line-through">Strikethrough</Typography>);
      const element = screen.getByText("Strikethrough");
      expect(element).toHaveClass("line-through");
    });

    it("applies decoration style", () => {
      render(
        <Typography decoration="underline" decorationStyle="wavy">
          Wavy underline
        </Typography>,
      );
      const element = screen.getByText("Wavy underline");
      expect(element).toHaveClass("decoration-wavy");
    });

    it("applies decoration thickness", () => {
      render(
        <Typography decoration="underline" decorationThickness="2">
          Thick underline
        </Typography>,
      );
      const element = screen.getByText("Thick underline");
      expect(element).toHaveClass("decoration-2");
    });

    it("applies underline offset", () => {
      render(
        <Typography decoration="underline" underlineOffset="4">
          Offset underline
        </Typography>,
      );
      const element = screen.getByText("Offset underline");
      expect(element).toHaveClass("underline-offset-4");
    });
  });

  // Text transform and overflow
  describe("Text Transform and Overflow", () => {
    it("applies uppercase transform", () => {
      render(<Typography transform="uppercase">uppercase text</Typography>);
      const element = screen.getByText("uppercase text");
      expect(element).toHaveClass("uppercase");
    });

    it("applies lowercase transform", () => {
      render(<Typography transform="lowercase">LOWERCASE TEXT</Typography>);
      const element = screen.getByText("LOWERCASE TEXT");
      expect(element).toHaveClass("lowercase");
    });

    it("applies capitalize transform", () => {
      render(<Typography transform="capitalize">capitalized</Typography>);
      const element = screen.getByText("capitalized");
      expect(element).toHaveClass("capitalize");
    });

    it("applies truncate overflow", () => {
      render(<Typography overflow="truncate">Long text...</Typography>);
      const element = screen.getByText("Long text...");
      expect(element).toHaveClass("truncate");
    });

    it("applies text wrap", () => {
      render(<Typography wrap="nowrap">No wrap text</Typography>);
      const element = screen.getByText("No wrap text");
      expect(element).toHaveClass("text-nowrap");
    });

    it("applies whitespace handling", () => {
      render(<Typography whitespace="pre">Preformatted text</Typography>);
      const element = screen.getByText("Preformatted text");
      expect(element).toHaveClass("whitespace-pre");
    });

    it("applies word break", () => {
      render(<Typography wordBreak="all">Break all words</Typography>);
      const element = screen.getByText("Break all words");
      expect(element).toHaveClass("break-all");
    });

    it("applies overflow wrap", () => {
      render(<Typography overflowWrap="break-word">Break word</Typography>);
      const element = screen.getByText("Break word");
      expect(element).toHaveClass("wrap-break-word");
    });

    it("applies hyphens", () => {
      render(<Typography hyphens="auto">Auto hyphens</Typography>);
      const element = screen.getByText("Auto hyphens");
      expect(element).toHaveClass("hyphens-auto");
    });
  });

  // Common HTML props
  describe("Common HTML Props", () => {
    it("applies custom className", () => {
      render(<Typography className="custom-class">Custom</Typography>);
      const element = screen.getByText("Custom");
      expect(element).toHaveClass("custom-class");
    });

    it("merges custom className with default classes", () => {
      render(
        <Typography variant="h1" className="custom-class">
          Merged classes
        </Typography>,
      );
      const element = screen.getByText("Merged classes");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("text-4xl");
      expect(element).toHaveClass("font-extrabold");
    });

    it("renders children correctly", () => {
      render(
        <Typography>
          <span>Nested content</span>
        </Typography>,
      );
      expect(screen.getByText("Nested content")).toBeInTheDocument();
    });

    it("renders ReactNode children", () => {
      render(
        <Typography>
          Text with <strong>bold</strong> content
        </Typography>,
      );
      expect(screen.getByText("bold")).toBeInTheDocument();
      const paragraph = screen.getByText((_content, element) => {
        return (
          element?.tagName === "P" &&
          element?.textContent === "Text with bold content"
        );
      });
      expect(paragraph).toBeInTheDocument();
    });
  });

  // Multiple props combination
  describe("Multiple Props Combination", () => {
    it("combines variant, color, weight, and align", () => {
      render(
        <Typography variant="h2" color="blue" weight="bold" align="center">
          Combined props
        </Typography>,
      );
      const element = screen.getByText("Combined props");
      expect(element.tagName).toBe("H2");
      expect(element).toHaveClass("text-blue-700");
      expect(element).toHaveClass("dark:text-blue-300");
      expect(element).toHaveClass("font-bold");
      expect(element).toHaveClass("text-center");
    });

    it("combines size override with variant default styles", () => {
      render(
        <Typography variant="body1" size="xl">
          Large body text
        </Typography>,
      );
      const element = screen.getByText("Large body text");
      // Size overrides variant default, but weight remains
      expect(element).toHaveClass("text-xl");
      expect(element).toHaveClass("font-normal");
      // Note: size override replaces text-base, so leading-relaxed from variant may not apply
    });

    it("combines decoration props", () => {
      render(
        <Typography
          decoration="underline"
          decorationStyle="wavy"
          decorationThickness="2"
          underlineOffset="4"
        >
          Styled decoration
        </Typography>,
      );
      const element = screen.getByText("Styled decoration");
      expect(element).toHaveClass("underline");
      expect(element).toHaveClass("decoration-wavy");
      expect(element).toHaveClass("decoration-2");
      expect(element).toHaveClass("underline-offset-4");
    });

    it("combines typography utilities", () => {
      render(
        <Typography
          fontFamily="mono"
          tracking="wide"
          leading="loose"
          transform="uppercase"
        >
          Full styling
        </Typography>,
      );
      const element = screen.getByText("Full styling");
      expect(element).toHaveClass("font-mono");
      expect(element).toHaveClass("tracking-wide");
      expect(element).toHaveClass("leading-loose");
      expect(element).toHaveClass("uppercase");
    });
  });

  // Edge cases
  describe("Edge Cases", () => {
    it("handles empty string children", () => {
      render(<Typography>{""}</Typography>);
      const element = screen.getByText((content, element) => {
        return element?.tagName === "P" && content === "";
      });
      expect(element).toBeInTheDocument();
    });

    it("handles very long text", () => {
      const longText = "Lorem ipsum ".repeat(100);
      render(<Typography>{longText}</Typography>);
      // Use a regex matcher for very long text
      expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
    });

    it("handles special characters in text", () => {
      render(<Typography>Special: &lt;&gt;&amp;©™</Typography>);
      expect(screen.getByText(/Special:/)).toBeInTheDocument();
    });

    it("handles multiple line breaks in content", () => {
      render(
        <Typography>
          Line 1{"\n"}Line 2{"\n"}Line 3
        </Typography>,
      );
      expect(screen.getByText(/Line 1/)).toBeInTheDocument();
    });

    it("handles numeric children", () => {
      render(<Typography>{12345}</Typography>);
      expect(screen.getByText("12345")).toBeInTheDocument();
    });

    it("handles boolean props gracefully", () => {
      render(
        <Typography italic={false} className="">
          No italic
        </Typography>,
      );
      const element = screen.getByText("No italic");
      expect(element).not.toHaveClass("italic");
    });
  });

  // Accessibility
  describe("Accessibility", () => {
    it("uses semantic HTML elements for headings", () => {
      const { container } = render(
        <>
          <Typography variant="h1">H1</Typography>
          <Typography variant="h2">H2</Typography>
          <Typography variant="h3">H3</Typography>
        </>,
      );

      expect(container.querySelector("h1")).toBeInTheDocument();
      expect(container.querySelector("h2")).toBeInTheDocument();
      expect(container.querySelector("h3")).toBeInTheDocument();
    });

    it("uses p element for body text", () => {
      const { container } = render(
        <Typography variant="body1">Paragraph</Typography>,
      );
      expect(container.querySelector("p")).toBeInTheDocument();
    });

    it("allows component override for custom semantics", () => {
      render(
        <Typography variant="h1" component="div">
          Non-semantic heading
        </Typography>,
      );
      const element = screen.getByText("Non-semantic heading");
      expect(element.tagName).toBe("DIV");
    });

    it("maintains readable contrast in color mappings", () => {
      // This test verifies that our color mappings use proper shades
      render(<Typography color="yellow">Yellow text</Typography>);
      const element = screen.getByText("Yellow text");
      // Yellow uses -700 for light mode which has better contrast than lighter shades
      expect(element).toHaveClass("text-yellow-700");
    });
  });

  // Component prop overrides variant element mapping
  describe("Component and Variant Interaction", () => {
    it("component prop overrides variant default element", () => {
      render(
        <Typography variant="body1" component="span">
          Span body
        </Typography>,
      );
      const element = screen.getByText("Span body");
      expect(element.tagName).toBe("SPAN");
      expect(element).toHaveClass("text-base");
    });

    it("preserves variant styles when overriding component", () => {
      render(
        <Typography variant="h1" component="p">
          P with H1 styles
        </Typography>,
      );
      const element = screen.getByText("P with H1 styles");
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("text-4xl");
      expect(element).toHaveClass("font-extrabold");
    });
  });
});
