// import {
//   Title,
//   Subtitle,
//   Description,
//   Canvas,
//   Story,
//   Source,
//   Meta,
// } from "@storybook/addon-docs/blocks";

// import * as ButtonStories from "./button.stories";

// export const ButtonDocs = () => {
//   return (
//     <>
//       <Meta of={ButtonStories} />
//       <Title>Button Docs</Title>
//       <Subtitle>
//         A versatile button component with support for multiple variants, sizes,
//         colors, and states.
//       </Subtitle>

//       <div>
//         {`
// ## Features

// - **6 Variants**: default, destructive, outline, secondary, ghost, link
// - **4 Sizes**: default, sm, lg, icon
// - **22 Colors**: Full Tailwind color palette with dark mode support
// - **Rounded**: Pill-shaped buttons with the \`rounded\` prop
// - **asChild**: Apply button styles to any element
// - **Responsive**: Works seamlessly across all screen sizes

// ## Installation

// \`\`\`bash
// npm install @radix-ui/react-slot class-variance-authority
// \`\`\`

// ## Basic Usage

// \`\`\`tsx
// import { Button } from "@/components/ui/button";

// export function MyComponent() {
//   return <Button>Click me</Button>;
// }
// \`\`\`
//         `}
//       </div>

//       <div>
//         {`
// ## Live Examples

// These examples show the intended usage style for the Button component.
//         `}
//       </div>

//       <Story of={ButtonStories.Default} />
//       <Source language="tsx" code={`<Button>Click me</Button>`} />

//       <Story of={ButtonStories.Outline} />
//       <Source
//         language="tsx"
//         code={`<Button variant="outline">Outline Button</Button>`}
//       />

//       <Story of={ButtonStories.AsChildLink} />
//       <Source
//         language="tsx"
//         code={`<Button asChild>
//   <a href="#">Navigate to Page</a>
// </Button>`}
//       />

//       <div>
//         {`
// ## Variants

// The Button component supports 6 different variants:

// ### Default
// Primary action button used for main calls-to-action.

// \`\`\`tsx
// <Button variant="default">Default Button</Button>
// \`\`\`

// ### Outline
// Bordered button with transparent background, good for secondary actions.

// \`\`\`tsx
// <Button variant="outline">Outline Button</Button>
// \`\`\`

// ### Secondary
// Subtle button with a light background, useful for tertiary actions.

// \`\`\`tsx
// <Button variant="secondary">Secondary</Button>
// \`\`\`

// ### Ghost
// Minimal button with only text, best for less prominent actions.

// \`\`\`tsx
// <Button variant="ghost">Ghost Button</Button>
// \`\`\`

// ### Link
// Text-styled button that looks like a hyperlink.

// \`\`\`tsx
// <Button variant="link">Link Button</Button>
// \`\`\`

// ### Destructive
// Red button for dangerous actions like delete or remove.

// \`\`\`tsx
// <Button variant="destructive">Delete</Button>
// \`\`\`

// ## Sizes

// Choose from 4 different sizes:

// - **default**: \`h-9 px-4 py-2\` - Standard button size
// - **sm**: \`h-8 px-3 text-xs\` - Compact button for dense layouts
// - **lg**: \`h-10 px-8\` - Large button for prominent actions
// - **icon**: \`h-9 w-9\` - Square button for icon-only actions

// \`\`\`tsx
// <Button size="sm">Small</Button>
// <Button size="default">Default</Button>
// <Button size="lg">Large</Button>
// <Button size="icon">
//   <ArrowDownIcon />
// </Button>
// \`\`\`

// ## Colors

// The Button component supports all 22 Tailwind colors with full dark mode support:

// **Available colors**: slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

// \`\`\`tsx
// <Button color="blue">Blue Button</Button>
// <Button color="green">Green Button</Button>
// <Button color="red">Red Button</Button>
// \`\`\`

// Colors work with all variants:

// \`\`\`tsx
// <Button color="blue" variant="outline">Blue Outline</Button>
// <Button color="green" variant="ghost">Green Ghost</Button>
// \`\`\`

// ## Rounded Buttons

// Create pill-shaped buttons with the \`rounded\` prop:

// \`\`\`tsx
// <Button rounded>Rounded Button</Button>
// <Button rounded variant="outline">Rounded Outline</Button>
// \`\`\`

// ## Icon Buttons

// Use the icon size for button-only icons:

// \`\`\`tsx
// import { ArrowDownIcon } from "@/stories/assets/ArrowDownIcon";

// <Button size="icon">
//   <ArrowDownIcon />
// </Button>
// \`\`\`

// ## Disabled State

// Use the standard \`disabled\` attribute:

// \`\`\`tsx
// <Button disabled>Disabled Button</Button>
// <Button disabled variant="destructive">Disabled Delete</Button>
// \`\`\`

// ## asChild Prop

// The \`asChild\` prop allows you to apply button styles to any element without wrapping:

// \`\`\`tsx
// <Button asChild>
//   <a href="/page">Navigate to Page</a>
// </Button>
// \`\`\`

// This is useful for semantic HTML, especially when you need an anchor tag for navigation but want it styled as a button.

// ## Using buttonVariants

// You can also use the \`buttonVariants\` CVA function directly to apply button styles to other elements:

// \`\`\`tsx
// import { buttonVariants } from "@/components/ui/button";

// export function MyComponent() {
//   return (
//     <a
//       href="/page"
//       className={buttonVariants({ variant: "outline", size: "lg" })}
//     >
//       Link styled as button
//     </a>
//   );
// }
// \`\`\`

// ## TypeScript

// ### ButtonProps Interface

// \`\`\`tsx
// interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
//   color?: ColorType;
//   rounded?: boolean;
// }

// type ColorType =
//   | "slate" | "gray" | "zinc" | "neutral" | "stone"
//   | "red" | "orange" | "amber" | "yellow" | "lime"
//   | "green" | "emerald" | "teal" | "cyan" | "sky"
//   | "blue" | "indigo" | "violet" | "purple" | "fuchsia"
//   | "pink" | "rose";
// \`\`\`

// ## Accessibility

// - Buttons use semantic \`<button>\` elements by default
// - Support for \`disabled\` state with proper styling and \`pointer-events-none\`
// - Focus-visible ring for keyboard navigation
// - Full color contrast in both light and dark modes
// - SVG icons inside buttons scale appropriately with \`[&_svg]:size-4\`

// ## Dark Mode

// All colors and variants automatically support dark mode through Tailwind's \`dark:\` prefix:

// \`\`\`tsx
// // Automatically handles light and dark themes
// <Button color="blue">Works in both themes</Button>
// \`\`\`
//         `}
//       </div>
//     </>
//   );
// };
