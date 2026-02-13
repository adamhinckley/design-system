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

### Button

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

### TextField

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

### PasswordField

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

## Dark Mode

All components automatically adapt to dark mode. To enable dark mode support, add the `dark` class to your root element:

```tsx
<html className="dark">
  <body>
    <App />
  </body>
</html>
```

All colors are carefully chosen to provide excellent contrast in both light and dark modes.

## Styling

The package includes global styles that are automatically included when you import components. CSS is bundled as a separate entry point:

```tsx
import "@adamhinckley/design-system/styles.css";
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
