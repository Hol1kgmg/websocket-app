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

/**
 * Pattern: jotai-state - Primitive atom for current connection count
 */
export const currentConnectionsAtom = atom<number>(0);

/**
 * Pattern: jotai-state - Primitive atom for max connection limit
 */
export const maxConnectionsAtom = atom<number>(0);

/**
 * Pattern: jotai-state - Primitive atom for connection error message
 */
export const connectionErrorAtom = atom<string | null>(null);

/**
 * Pattern: jotai-state - Primitive atom for counter minimum limit
 */
export const minCountAtom = atom<number | null>(null);

/**
 * Pattern: jotai-state - Primitive atom for counter maximum limit
 */
export const maxCountAtom = atom<number | null>(null);

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
export const setConnectionStatusAtom = atom(null, (_get, set, status: ConnectionStatus): void => {
  set(connectionStatusAtom, status);
});

/**
 * Pattern: jotai-state - Write-only atom for connection info
 */
export const setConnectionInfoAtom = atom(
  null,
  (_get, set, info: { currentConnections: number; maxConnections: number }): void => {
    set(currentConnectionsAtom, info.currentConnections);
    set(maxConnectionsAtom, info.maxConnections);
  },
);

/**
 * Pattern: jotai-state - Write-only atom for connection error
 */
export const setConnectionErrorAtom = atom(null, (_get, set, error: string | null): void => {
  set(connectionErrorAtom, error);
});

/**
 * Pattern: jotai-state - Write-only atom for counter limits
 */
export const setCounterLimitsAtom = atom(
  null,
  (_get, set, limits: { minCount: number; maxCount: number }): void => {
    set(minCountAtom, limits.minCount);
    set(maxCountAtom, limits.maxCount);
  },
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

/**
 * Pattern: jotai-state - Derived atom to check if count is at minimum
 */
export const isAtMinAtom = atom((get): boolean => {
  const count = get(countAtom);
  const minCount = get(minCountAtom);
  return minCount !== null && count <= minCount;
});

/**
 * Pattern: jotai-state - Derived atom to check if count is at maximum
 */
export const isAtMaxAtom = atom((get): boolean => {
  const count = get(countAtom);
  const maxCount = get(maxCountAtom);
  return maxCount !== null && count >= maxCount;
});
