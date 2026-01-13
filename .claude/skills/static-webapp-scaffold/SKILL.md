______________________________________________________________________

## name: static-webapp-scaffold description: Project structure template for Next.js + React 19 + TypeScript + Tailwind CSS static web applications. Covers directory organization, separation of concerns, and configuration setup. Use when creating new projects, designing directory structure, or setting up static export. Combines with jotai-state, tailwind-theming, frontend-design, and byethrow skills.

This skill guides creation of well-structured static web applications with clear separation of concerns. Designed for Cloudflare Pages or similar static hosting.

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Entry page
│   │   └── globals.css         # CSS variables & base styles
│   ├── components/
│   │   ├── ui/                 # Reusable UI components (shadcn/ui style)
│   │   │   ├── button.tsx
│   │   │   └── typography.tsx
│   │   └── {domain}/           # Domain-specific components
│   │       ├── DomainPage.tsx
│   │       └── DomainComponent.tsx
│   ├── atoms/                  # Jotai state management
│   │   └── {domain}.ts
│   ├── hooks/                  # Custom React hooks
│   │   └── use{Domain}.ts
│   ├── lib/                    # Business logic & utilities
│   │   ├── {domain}.ts         # Domain logic (pure functions)
│   │   ├── {domain}-guards.ts  # Type guards & factories
│   │   └── utils.ts            # Generic utilities (cn helper)
│   └── types/                  # Type definitions
│       ├── index.ts            # Centralized exports
│       ├── {domain}.ts         # Domain types
│       └── components.ts       # Component prop types
├── public/                     # Static assets
├── next.config.ts              # Next.js config (static export)
├── tailwind.config.ts          # Tailwind customization
├── tsconfig.json               # TypeScript config
└── package.json
```

## Configuration Templates

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",  // Static export for Cloudflare Pages
};

export default nextConfig;
```

### Centralized Type Exports

```typescript
// types/index.ts
export type { DomainType, OtherType } from "./domain";
export type { ComponentProps } from "./components";
```

## Separation of Concerns

| Layer | Location | Responsibility |
|-------|----------|----------------|
| State | `atoms/` | Jotai atoms (pure state) |
| Logic | `lib/` | Business logic (pure functions) |
| Access | `hooks/` | React-specific state access |
| UI | `components/ui/` | Reusable presentational |
| Feature | `components/{domain}/` | Domain-specific UI |
| Types | `types/` | Centralized definitions |

## Best Practices

- **Pure logic**: Keep `lib/` functions independent of React
- **Single source**: All types exported from `types/index.ts`
- **Domain separation**: Group related atoms, hooks, components by domain
- **Static export**: Use `output: "export"` for zero-server deployment
- **UI library**: Keep `components/ui/` framework-agnostic patterns

## Anti-Patterns

**BAD**: Mixing business logic with components

```typescript
// components/UserCard.tsx
const UserCard = ({ userId }) => {
  const user = calculateUserScore(userId); // Logic in component
};
```

**GOOD**: Logic in lib, access via hooks

```typescript
// lib/user.ts
export const calculateUserScore = (user: User): number => { ... };

// hooks/useUser.ts
export const useUser = () => {
  const user = useAtomValue(userAtom);
  return { ...user, score: calculateUserScore(user) };
};
```

**BAD**: Types scattered across files

```typescript
// Imports from multiple locations
import { User } from "./components/UserCard";
import { Score } from "./lib/scoring";
```

**GOOD**: Centralized type exports

```typescript
// Single import source
import type { User, Score } from "@/types";
```

**BAD**: Domain logic in atoms

```typescript
export const userAtom = atom((get) => {
  // Complex computation here
});
```

**GOOD**: Atoms call lib functions

```typescript
export const userAtom = atom((get) => {
  return computeUser(get(rawDataAtom)); // Logic in lib/
});
```

## Related Skills

- **jotai-state**: State management patterns
- **tailwind-theming**: CSS variables and dark mode
- **frontend-design**: UI design quality
- **byethrow**: Error handling with Result types
- **typescript-patterns**: Coding conventions (auto-applied rule)
