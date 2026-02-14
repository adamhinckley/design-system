import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "../components/typography/Typography";

const meta = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "button",
        "caption",
        "overline",
        "inherit",
      ],
    },
    component: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div"],
    },
    fontFamily: {
      control: "select",
      options: ["sans", "serif", "mono"],
    },
    size: {
      control: "select",
      options: [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
        "8xl",
        "9xl",
      ],
    },
    weight: {
      control: "select",
      options: [
        "thin",
        "extralight",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black",
      ],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify", "start", "end"],
    },
    color: {
      control: "select",
      options: [
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
      ],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographyExample: Story = {
  args: {
    variant: "h1",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const AllVariants: Story = {
  args: {
    children: "",
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: "600px", padding: "2rem" }}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="subtitle1">
        Subtitle 1 - Lorem ipsum dolor sit amet
      </Typography>
      <Typography variant="subtitle2">
        Subtitle 2 - Lorem ipsum dolor sit amet
      </Typography>
      <Typography variant="body1">
        Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="body2">
        Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="button">Button Text</Typography>
      <br />
      <Typography variant="caption">
        Caption text - Additional descriptive text
      </Typography>
      <br />
      <Typography variant="overline">Overline Text</Typography>
    </div>
  ),
};

export const Body: Story = {
  args: {
    variant: "body1",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
};

export const CustomStyling: Story = {
  args: {
    variant: "h2",
    weight: "extrabold",
    align: "center",
    color: "blue",
    children: "Custom Styled Heading",
  },
};

export const ColorExamples: Story = {
  args: {
    children: "",
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: "800px", padding: "2rem" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <Typography variant="body1" color="slate">
          Slate - text-slate-700
        </Typography>
        <Typography variant="body1" color="gray">
          Gray - text-gray-700
        </Typography>
        <Typography variant="body1" color="zinc">
          Zinc - text-zinc-700
        </Typography>
        <Typography variant="body1" color="neutral">
          Neutral - text-neutral-700
        </Typography>
        <Typography variant="body1" color="stone">
          Stone - text-stone-700
        </Typography>
        <Typography variant="body1" color="red">
          Red - text-red-700
        </Typography>
        <Typography variant="body1" color="orange">
          Orange - text-orange-700
        </Typography>
        <Typography variant="body1" color="amber">
          Amber - text-amber-700
        </Typography>
        <Typography variant="body1" color="yellow">
          Yellow - text-yellow-700
        </Typography>
        <Typography variant="body1" color="lime">
          Lime - text-lime-700
        </Typography>
        <Typography variant="body1" color="green">
          Green - text-green-700
        </Typography>
        <Typography variant="body1" color="emerald">
          Emerald - text-emerald-700
        </Typography>
        <Typography variant="body1" color="teal">
          Teal - text-teal-700
        </Typography>
        <Typography variant="body1" color="cyan">
          Cyan - text-cyan-700
        </Typography>
        <Typography variant="body1" color="sky">
          Sky - text-sky-700
        </Typography>
        <Typography variant="body1" color="blue">
          Blue - text-blue-700
        </Typography>
        <Typography variant="body1" color="indigo">
          Indigo - text-indigo-700
        </Typography>
        <Typography variant="body1" color="violet">
          Violet - text-violet-700
        </Typography>
        <Typography variant="body1" color="purple">
          Purple - text-purple-700
        </Typography>
        <Typography variant="body1" color="fuchsia">
          Fuchsia - text-fuchsia-700
        </Typography>
        <Typography variant="body1" color="pink">
          Pink - text-pink-700
        </Typography>
        <Typography variant="body1" color="rose">
          Rose - text-rose-700
        </Typography>
      </div>
    </div>
  ),
};

export const DarkModeExample: Story = {
  args: {
    children: "",
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="dark rounded-xl bg-slate-900 p-8">
      <div style={{ width: "800px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <Typography variant="body1" color="slate">
            Slate - text-slate-300
          </Typography>
          <Typography variant="body1" color="gray">
            Gray - text-gray-300
          </Typography>
          <Typography variant="body1" color="zinc">
            Zinc - text-zinc-300
          </Typography>
          <Typography variant="body1" color="neutral">
            Neutral - text-neutral-300
          </Typography>
          <Typography variant="body1" color="stone">
            Stone - text-stone-300
          </Typography>
          <Typography variant="body1" color="red">
            Red - text-red-300
          </Typography>
          <Typography variant="body1" color="orange">
            Orange - text-orange-300
          </Typography>
          <Typography variant="body1" color="amber">
            Amber - text-amber-300
          </Typography>
          <Typography variant="body1" color="yellow">
            Yellow - text-yellow-300
          </Typography>
          <Typography variant="body1" color="lime">
            Lime - text-lime-300
          </Typography>
          <Typography variant="body1" color="green">
            Green - text-green-300
          </Typography>
          <Typography variant="body1" color="emerald">
            Emerald - text-emerald-300
          </Typography>
          <Typography variant="body1" color="teal">
            Teal - text-teal-300
          </Typography>
          <Typography variant="body1" color="cyan">
            Cyan - text-cyan-300
          </Typography>
          <Typography variant="body1" color="sky">
            Sky - text-sky-300
          </Typography>
          <Typography variant="body1" color="blue">
            Blue - text-blue-300
          </Typography>
          <Typography variant="body1" color="indigo">
            Indigo - text-indigo-300
          </Typography>
          <Typography variant="body1" color="violet">
            Violet - text-violet-300
          </Typography>
          <Typography variant="body1" color="purple">
            Purple - text-purple-300
          </Typography>
          <Typography variant="body1" color="fuchsia">
            Fuchsia - text-fuchsia-300
          </Typography>
          <Typography variant="body1" color="pink">
            Pink - text-pink-300
          </Typography>
          <Typography variant="body1" color="rose">
            Rose - text-rose-300
          </Typography>
        </div>
      </div>
    </div>
  ),
};

export const CustomComponent: Story = {
  args: {
    children: "",
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: "600px", padding: "2rem" }}>
      <Typography variant="h1" component="div">
        This is an h1 variant rendered as a div
      </Typography>
      <Typography variant="body1" component="span">
        This is body text rendered as a span
      </Typography>
    </div>
  ),
};

export const TextDecoration: Story = {
  args: {
    children: "",
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: "600px", padding: "2rem" }}>
      <Typography variant="body1" decoration="underline">
        Underlined text
      </Typography>
      <Typography
        variant="body1"
        decoration="underline"
        decorationColor="blue-500"
        decorationStyle="wavy"
      >
        Blue wavy underline
      </Typography>
      <Typography variant="body1" decoration="line-through">
        Strikethrough text
      </Typography>
      <Typography variant="body1" transform="uppercase">
        Uppercase text
      </Typography>
      <Typography variant="body1" transform="capitalize">
        capitalized text
      </Typography>
    </div>
  ),
};

export const Truncation: Story = {
  args: {
    children: "",
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: "300px", padding: "2rem" }}>
      <Typography variant="body1" overflow="truncate">
        This is a very long piece of text that will be truncated at the
        container edge with an ellipsis
      </Typography>
      <br />
      <Typography variant="body1" lineClamp="2">
        This text will be clamped to exactly two lines and then show an
        ellipsis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </div>
  ),
};
