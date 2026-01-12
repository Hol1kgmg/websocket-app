/**
 * Counter state management with Jotai
 * Pattern: jotai-state - Atom design patterns
 */

import { atom } from "jotai";
import { type CountValue, createCountValue } from "@/types";
import { increment, decrement, double, isPositive } from "@/lib/counter";

// =============================================================================
// Primitive Atoms (Source of Truth)
// =============================================================================

/**
 * Pattern: jotai-state - Primitive atom for core state
 * Single source of truth for counter value
 */
export const countAtom = atom<CountValue>(createCountValue(0));

/**
 * Pattern: jotai-state - Primitive atom for configuration
 * Step size for increment/decrement operations
 */
export const stepAtom = atom<number>(1);

// =============================================================================
// Write-Only Atoms (Actions)
// =============================================================================

/**
 * Pattern: jotai-state - Write-only atom for increment action
 * First argument is null (no read value)
 */
export const incrementAtom = atom(null, (get, set): void => {
  const currentCount = get(countAtom);
  const step = get(stepAtom);
  set(countAtom, increment(currentCount, step));
});

/**
 * Pattern: jotai-state - Write-only atom for decrement action
 */
export const decrementAtom = atom(null, (get, set): void => {
  const currentCount = get(countAtom);
  const step = get(stepAtom);
  set(countAtom, decrement(currentCount, step));
});

/**
 * Pattern: jotai-state - Write-only atom for reset action
 */
export const resetAtom = atom(null, (_get, set): void => {
  set(countAtom, createCountValue(0));
});

/**
 * Pattern: jotai-state - Write-only atom with payload
 * Allows setting count to a specific value
 */
export const setCountAtom = atom(null, (_get, set, newCount: CountValue): void => {
  set(countAtom, newCount);
});

// =============================================================================
// Derived Atoms (Computed Values)
// =============================================================================

/**
 * Pattern: jotai-state - Derived atom for computed value
 * Automatically recalculates when countAtom changes
 */
export const doubledAtom = atom((get): number => {
  const count = get(countAtom);
  return double(count);
});

/**
 * Pattern: jotai-state - Derived atom for boolean state
 */
export const isPositiveAtom = atom((get): boolean => {
  const count = get(countAtom);
  return isPositive(count);
});
