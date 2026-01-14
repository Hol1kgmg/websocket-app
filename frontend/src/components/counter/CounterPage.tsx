/**
 * Shared counter page component
 * Pattern: static-webapp-scaffold - Domain component using hooks
 * Pattern: frontend-design - Clean, centered layout
 */

"use client";

import { useCounter } from "@/hooks/useCounter";
import { CounterDisplay } from "./CounterDisplay";
import { CounterControls } from "./CounterControls";
import { ConnectionIndicator } from "./ConnectionIndicator";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";

/**
 * Main shared counter page component
 * Pattern: static-webapp-scaffold - Container component orchestrating domain logic
 */
export const CounterPage = (): React.ReactElement => {
  const {
    count,
    doubled,
    isPositive,
    status,
    currentConnections,
    maxConnections,
    connectionError,
    increment,
    decrement,
    reset,
  } = useCounter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      {/* Header */}
      <header className="text-center">
        <TypographyH1>Shared Counter</TypographyH1>
        <TypographyLead className="mt-2">
          Real-time synchronized counter with PartyKit
        </TypographyLead>
      </header>

      {/* Connection status */}
      <ConnectionIndicator
        status={status}
        currentConnections={currentConnections}
        maxConnections={maxConnections}
      />

      {/* Connection error */}
      {connectionError && (
        <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
          {connectionError}
        </div>
      )}

      {/* Counter display */}
      <CounterDisplay count={count} doubled={doubled} isPositive={isPositive} />

      {/* Counter controls */}
      <CounterControls
        onIncrement={increment}
        onDecrement={decrement}
        onReset={reset}
        disabled={status !== "connected"}
      />

      {/* Pattern reference */}
      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>Patterns: jotai-state, partykit, typescript-patterns</p>
        <p>tailwind-theming, static-webapp-scaffold</p>
      </footer>
    </main>
  );
};
