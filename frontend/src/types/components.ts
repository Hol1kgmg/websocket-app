/**
 * Component Props type definitions
 * Pattern: static-webapp-scaffold - Centralized component types
 */

import type { CountValue } from "./counter";

/**
 * CounterDisplay component Props
 * Pattern: typescript-patterns - readonly Props for immutability
 */
export type CounterDisplayProps = {
  /** Current counter value */
  readonly count: CountValue;
  /** Doubled value (derived) */
  readonly doubled: number;
  /** Whether count is positive (derived) */
  readonly isPositive: boolean;
};

/**
 * CounterControls component Props
 * Pattern: static-webapp-scaffold - Presentational component with callbacks
 */
export type CounterControlsProps = {
  /** Increment handler */
  readonly onIncrement: () => void;
  /** Decrement handler */
  readonly onDecrement: () => void;
  /** Reset handler */
  readonly onReset: () => void;
  /** Disable all controls (when disconnected) */
  readonly disabled?: boolean;
};
