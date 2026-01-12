/**
 * Counter page component
 * Pattern: static-webapp-scaffold - Domain component using hooks
 * Pattern: frontend-design - Clean, centered layout
 */

"use client";

import { useCounter } from "@/hooks/useCounter";
import { CounterDisplay } from "./CounterDisplay";
import { CounterControls } from "./CounterControls";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";

/**
 * Main counter page component
 * Pattern: static-webapp-scaffold - Container component orchestrating domain logic
 */
export const CounterPage = (): React.ReactElement => {
  const { count, doubled, isPositive, increment, decrement, reset } = useCounter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      {/* Header */}
      <header className="text-center">
        <TypographyH1>Counter Template</TypographyH1>
        <TypographyLead className="mt-2">
          A sample application demonstrating the template patterns
        </TypographyLead>
      </header>

      {/* Counter display */}
      <CounterDisplay count={count} doubled={doubled} isPositive={isPositive} />

      {/* Counter controls */}
      <CounterControls
        onIncrement={increment}
        onDecrement={decrement}
        onReset={reset}
      />

      {/* Pattern reference */}
      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>Skills: jotai-state, tailwind-theming, static-webapp-scaffold</p>
        <p>typescript-patterns, byethrow, frontend-design</p>
      </footer>
    </main>
  );
};
