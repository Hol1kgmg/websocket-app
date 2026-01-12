/**
 * Counter state management hook
 * Pattern: jotai-state - Custom hook encapsulating atom access
 */

import { useAtomValue, useSetAtom } from "jotai";
import type { CountValue } from "@/types";
import {
  countAtom,
  incrementAtom,
  decrementAtom,
  resetAtom,
  doubledAtom,
  isPositiveAtom,
} from "@/atoms/counter";

// =============================================================================
// Return Type Definition
// =============================================================================

/**
 * Pattern: typescript-patterns - Explicit return type definition
 */
export type UseCounterReturn = {
  /** Current counter value */
  readonly count: CountValue;
  /** Doubled value (derived) */
  readonly doubled: number;
  /** Whether count is positive (derived) */
  readonly isPositive: boolean;
  /** Increment counter by step */
  readonly increment: () => void;
  /** Decrement counter by step */
  readonly decrement: () => void;
  /** Reset counter to 0 */
  readonly reset: () => void;
};

// =============================================================================
// Custom Hook
// =============================================================================

/**
 * Counter state management hook
 * Pattern: jotai-state - Encapsulate atom access in custom hook
 * Pattern: static-webapp-scaffold - Components access state via hooks
 *
 * @returns Counter state and actions
 *
 * @example
 * const { count, doubled, isPositive, increment, decrement, reset } = useCounter();
 */
export const useCounter = (): UseCounterReturn => {
  // Pattern: jotai-state - useAtomValue for read-only access
  const count = useAtomValue(countAtom);
  const doubled = useAtomValue(doubledAtom);
  const isPositive = useAtomValue(isPositiveAtom);

  // Pattern: jotai-state - useSetAtom for write-only access
  const increment = useSetAtom(incrementAtom);
  const decrement = useSetAtom(decrementAtom);
  const reset = useSetAtom(resetAtom);

  return {
    count,
    doubled,
    isPositive,
    increment,
    decrement,
    reset,
  };
};
