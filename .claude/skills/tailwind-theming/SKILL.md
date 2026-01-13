______________________________________________________________________

## name: tailwind-theming description: CSS custom properties (variables) management with Tailwind CSS for light/dark mode theming. Covers HSL color system, semantic color tokens, system preference detection via prefers-color-scheme. Use when setting up theming, implementing dark mode, or managing design tokens.

This skill guides implementation of a robust theming system using CSS custom properties with Tailwind CSS. Automatically adapts to system light/dark mode preferences.

## CSS Variables Structure

### Base Setup in globals.css

```css
@layer base {
  :root {
    /* Semantic color tokens (HSL values without hsl()) */
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --border: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;

    /* Domain-specific tokens */
    --component-bg: 0 0% 100%;
    --component-border: 0 0% 82%;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: 0 0% 3.9%;
      --foreground: 0 0% 98%;
      --primary: 0 0% 98%;
      --primary-foreground: 0 0% 9%;
      /* ... dark mode overrides */
    }
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Tailwind Config Integration

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: "media", // System preference detection
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Nested structure for complex components
        component: {
          bg: "hsl(var(--component-bg))",
          border: "hsl(var(--component-border))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
```

## Color Token Naming Convention

| Token Type | Pattern | Example |
|------------|---------|---------|
| Semantic | `--{role}` | `--background`, `--foreground` |
| With variant | `--{role}-foreground` | `--primary-foreground` |
| Component-specific | `--{component}-{property}` | `--card-bg`, `--button-border` |
| State variants | `--{component}-{state}-{property}` | `--input-hover-border` |

## Best Practices

- **HSL format**: Store values as `H S% L%` without `hsl()` wrapper for flexibility
- **Semantic tokens**: Use role-based names (`--primary`) not color names (`--blue`)
- **Foreground pairing**: Every background token should have a foreground counterpart
- **System preference**: Use `darkMode: "media"` for automatic system detection
- **Layer organization**: Define variables in `@layer base` for proper cascade

## Anti-Patterns

**BAD**: Hardcoded colors in components

```typescript
<div className="bg-[#1a1a1a] text-[#ffffff]">
```

**GOOD**: Semantic tokens via CSS variables

```typescript
<div className="bg-background text-foreground">
```

**BAD**: Color names as tokens

```css
--blue-500: 221 83% 53%;
--dark-gray: 0 0% 20%;
```

**GOOD**: Role-based semantic tokens

```css
--primary: 221 83% 53%;
--muted: 0 0% 20%;
```

**BAD**: Separate dark mode classes

```typescript
<div className="bg-white dark:bg-gray-900">
```

**GOOD**: Single class with CSS variable adaptation

```typescript
<div className="bg-background"> /* Adapts automatically */
```

**BAD**: Including hsl() in variable value

```css
--primary: hsl(221 83% 53%); /* Cannot manipulate opacity */
```

**GOOD**: Raw HSL values for opacity support

```css
--primary: 221 83% 53%;
/* Usage: hsl(var(--primary)) or hsl(var(--primary) / 0.5) */
```
