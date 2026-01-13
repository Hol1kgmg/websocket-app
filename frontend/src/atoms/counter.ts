/**
 * Shared counter state management with Jotai
 * Pattern: jotai-state - Atom design patterns
 * Pattern: Server-authoritative state (server is source of truth)
 */

import { atom } from "jotai";
import { type CountValue, type ConnectionStatus, createCountValue } from "@/types";
import { double, isPositive } from "@/lib/counter";

// =============================================================================
// Primitive Atoms (Synced with Server)
// =============================================================================

/**
 * Pattern: jotai-state - Primitive atom for counter value
 * This value is synced from the PartyKit server
 */
export const countAtom = atom<CountValue>(createCountValue(0));

/**
 * Pattern: jotai-state - Primitive atom for connection status
 */
export const connectionStatusAtom = atom<ConnectionStatus>("disconnected");

// =============================================================================
// Write-Only Atoms (Actions)
// =============================================================================

/**
 * Pattern: jotai-state - Write-only atom with payload
 * Updates local state when server sends sync message
 */
export const setCountAtom = atom(null, (_get, set, newCount: CountValue): void => {
  set(countAtom, newCount);
});

/**
 * Pattern: jotai-state - Write-only atom for connection status
 */
export const setConnectionStatusAtom = atom(
  null,
  (_get, set, status: ConnectionStatus): void => {
    set(connectionStatusAtom, status);
  }
);

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

/**
 * Pattern: jotai-state - Derived atom for connection check
 */
export const isConnectedAtom = atom((get): boolean => {
  return get(connectionStatusAtom) === "connected";
});
