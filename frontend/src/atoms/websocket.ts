/**
 * WebSocket state management with Jotai
 * Pattern: jotai-state - Atom design patterns
 */

import { atom } from "jotai";
import type { ConnectionStatus, WebSocketMessage } from "@/types/websocket";

// =============================================================================
// Primitive Atoms (Source of Truth)
// =============================================================================

/**
 * Pattern: jotai-state - Primitive atom for connection status
 */
export const connectionStatusAtom = atom<ConnectionStatus>("disconnected");

/**
 * Pattern: jotai-state - Primitive atom for received messages
 */
export const messagesAtom = atom<readonly WebSocketMessage[]>([]);

/**
 * Pattern: jotai-state - Primitive atom for error state
 */
export const errorAtom = atom<string | null>(null);

// =============================================================================
// Write-Only Atoms (Actions)
// =============================================================================

/**
 * Pattern: jotai-state - Write-only atom for adding message
 */
export const addMessageAtom = atom(null, (_get, set, message: string): void => {
  set(messagesAtom, (prev) => [
    ...prev,
    { data: message, timestamp: Date.now() },
  ]);
});

/**
 * Pattern: jotai-state - Write-only atom for clearing messages
 */
export const clearMessagesAtom = atom(null, (_get, set): void => {
  set(messagesAtom, []);
});

/**
 * Pattern: jotai-state - Write-only atom for setting error
 */
export const setErrorAtom = atom(null, (_get, set, error: string | null): void => {
  set(errorAtom, error);
});

/**
 * Pattern: jotai-state - Write-only atom for setting connection status
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
 * Pattern: jotai-state - Derived atom for connection check
 */
export const isConnectedAtom = atom((get): boolean => {
  return get(connectionStatusAtom) === "connected";
});

/**
 * Pattern: jotai-state - Derived atom for message count
 */
export const messageCountAtom = atom((get): number => {
  return get(messagesAtom).length;
});
