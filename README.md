# Design System

A modern, accessible React component library built with TypeScript and Tailwind CSS. This design system provides a collection of production-ready UI components with built-in dark mode support and extensive color customization options.

[Check out the Storybook](https://design-system-hazel-mu.vercel.app/)

## Features

- 🎨 **Multiple Color Themes** - Support for all Tailwind CSS palette colors (slate, gray, zinc, blue, red, green, and more)
- 🌙 **Dark Mode** - First-class dark mode support across all components
- ♿ **Accessible** - Built with accessibility in mind, tested with a11y tools
- 📦 **TypeScript** - Fully typed for type safety and IDE support
- 🎯 **Customizable** - Flexible props for sizing, variants, and layout
- 🚀 **Lightweight** - Minimal dependencies, optimized bundle size

## Installation

```bash
npm install @adamhinckley/design-system
```

or with pnpm:

```bash
pnpm add @adamhinckley/design-system
```

or with yarn:

```bash
yarn add @adamhinckley/design-system
```

## Setup

Add the design system styles to your global css file:

```tsx
@import "@adamhinckley/design-system/styles.css";
@import "tailwindcss";
```

## Usage

<details>
<summary><strong>Button</strong></summary>

A versatile button component with multiple variants, sizes, and full color theme support.

```tsx
import { Button } from "@adamhinckley/design-system";

export default function App() {
  return <Button>Click me</Button>;
}
```

#### Props

- `variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"` - Visual style variant (default: 'default')
- `size?: "default" | "sm" | "lg" | "icon"` - Size variant (default: 'default')
- `color?: ColorType` - Color theme for the component (default: 'slate')
- `rounded?: boolean` - Apply pill-shaped rounded corners (default: false)
- `fullWidth?: boolean` - Make the button stretch to full width (default: false)
- `asChild?: boolean` - Merge props into child element instead of rendering a button (default: false)
- All standard HTML button props are supported

#### Variants

The Button component supports 6 different visual styles:

```tsx
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

#### Sizes

Choose from 4 different sizes:

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Icon />
</Button>
```

#### Color Options

Supports all Tailwind CSS palette colors (same as TextField):

- Neutral: `slate`, `gray`, `zinc`, `neutral`, `stone`
- Red: `red`, `orange`, `amber`
- Yellow: `yellow`, `lime`
- Green: `green`, `emerald`, `teal`
- Cyan: `cyan`, `sky`
- Blue: `blue`, `indigo`, `violet`
- Purple: `purple`, `fuchsia`, `pink`, `rose`

```tsx
<Button color="blue">Blue Button</Button>
<Button color="green">Green Button</Button>
<Button color="red">Red Button</Button>
```

#### Examples

Rounded buttons:

```tsx
<Button rounded>Rounded Button</Button>
<Button rounded variant="outline">
  Rounded Outline
</Button>
```

Full width:

```tsx
<Button fullWidth>Full Width Button</Button>
```

As a link (using asChild):

```tsx
<Button asChild>
  <a href="/page">Navigate to Page</a>
</Button>
```

With icons:

```tsx
import { Download } from "lucide-react";

<Button>
  <Download className="mr-2 h-4 w-4" />
  Download
</Button>;
```

</details>

<details>
<summary><strong>TextField</strong></summary>

A customizable text input component with optional label, helper text, error text, and adornments.

```tsx
import { TextField } from "@adamhinckley/design-system";

export default function App() {
  return (
    <TextField
      label="Email"
      placeholder="Enter your email"
      type="email"
      helperText="We'll never share your email"
    />
  );
}
```

#### Props

- `label?: string` - Label text displayed above the input
- `placeholder?: string` - Placeholder text
- `helperText?: string` - Helper text displayed below the input in normal state
- `errorText?: string` - Error text displayed below the input in error state
- `fullWidth?: boolean` - Whether the input should take full width (default: false)
- `disabled?: boolean` - Whether the input is disabled (default: false)
- `startAdornment?: React.ReactNode` - Content displayed at the start of the input
- `endAdornment?: React.ReactNode` - Content displayed at the end of the input
- `color?: InputColor` - Color theme for the component (default: 'slate')
- `removeBackground?: boolean` - Remove the background color
- `inputSize?: InputSize` - Size variant of the input
- All standard HTML input props are supported

#### Color Options

Supports all Tailwind CSS palette colors:

- Neutral: `slate`, `gray`, `zinc`, `neutral`, `stone`
- Red: `red`, `orange`, `amber`
- Yellow: `yellow`, `lime`
- Green: `green`, `emerald`, `teal`
- Cyan: `cyan`, `sky`
- Blue: `blue`, `indigo`, `violet`
- Purple: `purple`, `fuchsia`, `pink`, `rose`

```tsx
<TextField color="blue" label="Blue themed input" />
<TextField color="green" label="Green themed input" />
<TextField color="red" label="Red themed input" />
```

#### Examples

With helper and error text:

```tsx
<TextField
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
  errorText="Password is too short"
/>
```

With adornments:

```tsx
import { Mail, Lock } from "lucide-react";

<TextField
  label="Email"
  startAdornment={<Mail size={18} />}
/>

<TextField
  label="Password"
  type="password"
  startAdornment={<Lock size={18} />}
/>
```

</details>

<details>
<summary><strong>PasswordField</strong></summary>

A specialized text input component for password entry with built-in show/hide toggle.

```tsx
import { PasswordField } from "@adamhinckley/design-system";

export default function LoginForm() {
  return <PasswordField label="Password" placeholder="Enter your password" />;
}
```

#### Props

Same as `TextField` - inherits all props and behaviors with a built-in visibility toggle.

```tsx
<PasswordField
  label="Password"
  color="blue"
  helperText="Must contain uppercase, lowercase, and numbers"
/>
```

</details>

<details>
<summary><strong>Typography</strong></summary>

A flexible typography component with comprehensive text styling options and Material-UI compatible variant API. Supports automatic dark mode color adaptation.

```tsx
import { Typography } from "@adamhinckley/design-system";

export default function App() {
  return (
    <>
      <Typography variant="h1">Page Title</Typography>
      <Typography variant="body1">This is body text.</Typography>
      <Typography variant="caption" color="gray">
        Caption text
      </Typography>
    </>
  );
}
```

#### Props

- `variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "button" | "caption" | "overline" | "inherit"` - Typography variant that determines element and default styles (default: 'body1')
- `component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"` - Override the default HTML element for this variant
- `color?: TailwindColors` - Color theme with automatic dark mode (default: 'slate')
- `fontFamily?: "sans" | "serif" | "mono"` - Font family
- `size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"` - Font size (overrides variant default)
- `weight?: "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"` - Font weight
- `italic?: boolean` - Apply italic style
- `align?: "left" | "center" | "right" | "justify" | "start" | "end"` - Text alignment
- `decoration?: "underline" | "overline" | "line-through" | "no-underline"` - Text decoration
- `transform?: "uppercase" | "lowercase" | "capitalize" | "normal-case"` - Text transform
- `tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest"` - Letter spacing
- `leading?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose"` - Line height
- `lineClamp?: "1" | "2" | "3" | "4" | "5" | "6"` - Limit text to specific number of lines
- `overflow?: "truncate" | "ellipsis" | "clip"` - Text overflow behavior
- All standard HTML element props are supported

#### Variants

The Typography component supports 14 different variants with sensible defaults:

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>
<Typography variant="subtitle1">Subtitle 1</Typography>
<Typography variant="subtitle2">Subtitle 2</Typography>
<Typography variant="body1">Body text 1</Typography>
<Typography variant="body2">Body text 2</Typography>
<Typography variant="button">Button Text</Typography>
<Typography variant="caption">Caption text</Typography>
<Typography variant="overline">Overline Text</Typography>
```

#### Color Options

Supports all Tailwind CSS palette colors with automatic dark mode adaptation:

- Neutral: `slate`, `gray`, `zinc`, `neutral`, `stone`
- Red: `red`, `orange`, `amber`
- Yellow: `yellow`, `lime`
- Green: `green`, `emerald`, `teal`
- Cyan: `cyan`, `sky`
- Blue: `blue`, `indigo`, `violet`
- Purple: `purple`, `fuchsia`, `pink`, `rose`

Each color automatically uses:

- **Light mode**: `text-{color}-700`
- **Dark mode**: `text-{color}-300`

```tsx
<Typography color="blue">Blue text with automatic dark mode</Typography>
<Typography color="green">Green text with automatic dark mode</Typography>
<Typography color="red">Red text with automatic dark mode</Typography>
```

#### Examples

Custom component override:

```tsx
<Typography variant="h1" component="div">
  This is an h1 variant rendered as a div
</Typography>
```

Custom styling:

```tsx
<Typography variant="h2" weight="extrabold" align="center" color="blue">
  Bold centered blue heading
</Typography>
```

Text decoration:

```tsx
<Typography decoration="underline">Underlined text</Typography>
<Typography decoration="line-through">Strikethrough text</Typography>
<Typography transform="uppercase">Uppercase text</Typography>
```

Truncation:

```tsx
<Typography overflow="truncate">
  This text will be truncated with an ellipsis
</Typography>

<Typography lineClamp="2">
  This text will be clamped to exactly two lines
</Typography>
```

</details>

## Dark Mode

All components automatically adapt to dark mode. To enable dark mode support, add the `dark` class to your root element:

```tsx
<html className="dark">
  <body>
    <App />
  </body>
</html>
```

Components use Tailwind CSS for styling, so customization can be done through Tailwind's configuration or by extending class names.

## TypeScript Support

Full TypeScript support is included. Import types for components:

```tsx
import { Button, TextField } from "@adamhinckley/design-system";
import type { ButtonProps, InputProps } from "@adamhinckley/design-system";

function MyButton(props: ButtonProps) {
  return <Button {...props} />;
}

function MyInput(props: InputProps) {
  return <TextField {...props} />;
}
```

## Browser Support

This package supports all modern browsers that support ES2020 and CSS Grid.

## License

MIT
