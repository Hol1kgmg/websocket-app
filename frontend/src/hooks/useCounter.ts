/**
 * Shared counter state management hook
 * Pattern: jotai-state - Custom hook encapsulating atom access
 * Pattern: PartyKit integration for real-time synchronization
 */

import { useCallback, useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import PartySocket from "partysocket";
import {
  type CountValue,
  type ConnectionStatus,
  type CounterAction,
  createCountValue,
  isCounterSync,
  isConnectionInfo,
  isConnectionError,
} from "@/types";
import {
  countAtom,
  connectionStatusAtom,
  currentConnectionsAtom,
  maxConnectionsAtom,
  connectionErrorAtom,
  minCountAtom,
  maxCountAtom,
  doubledAtom,
  isPositiveAtom,
  isConnectedAtom,
  isAtMinAtom,
  isAtMaxAtom,
  setCountAtom,
  setConnectionStatusAtom,
  setConnectionInfoAtom,
  setConnectionErrorAtom,
  setCounterLimitsAtom,
} from "@/atoms/counter";

// =============================================================================
// Configuration
// =============================================================================

const WS_CONFIG = {
  host: process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? "localhost:1999",
  room: "counter",
} as const;

// =============================================================================
// Return Type Definition
// =============================================================================

/**
 * Pattern: typescript-patterns - Explicit return type definition
 */
export type UseCounterReturn = {
  /** Current counter value (synced from server) */
  readonly count: CountValue;
  /** Doubled value (derived) */
  readonly doubled: number;
  /** Whether count is positive (derived) */
  readonly isPositive: boolean;
  /** Connection status */
  readonly status: ConnectionStatus;
  /** Whether connected to server */
  readonly isConnected: boolean;
  /** Current number of connections */
  readonly currentConnections: number;
  /** Maximum allowed connections */
  readonly maxConnections: number;
  /** Connection error message */
  readonly connectionError: string | null;
  /** Minimum counter value limit */
  readonly minCount: number | null;
  /** Maximum counter value limit */
  readonly maxCount: number | null;
  /** Whether count is at minimum limit */
  readonly isAtMin: boolean;
  /** Whether count is at maximum limit */
  readonly isAtMax: boolean;
  /** Increment counter (sends to server) */
  readonly increment: () => void;
  /** Decrement counter (sends to server) */
  readonly decrement: () => void;
  /** Reset counter (sends to server) */
  readonly reset: () => void;
};

// =============================================================================
// Custom Hook
// =============================================================================

/**
 * Shared counter state management hook
 * Pattern: jotai-state - Encapsulate atom access in custom hook
 * Pattern: Server-authoritative - Server is source of truth
 *
 * @returns Counter state and actions
 *
 * @example
 * const { count, doubled, isPositive, status, increment, decrement, reset } = useCounter();
 */
export const useCounter = (): UseCounterReturn => {
  const socketRef = useRef<PartySocket | null>(null);

  // Pattern: jotai-state - useAtomValue for read-only access
  const count = useAtomValue(countAtom);
  const doubled = useAtomValue(doubledAtom);
  const isPositive = useAtomValue(isPositiveAtom);
  const status = useAtomValue(connectionStatusAtom);
  const isConnected = useAtomValue(isConnectedAtom);
  const currentConnections = useAtomValue(currentConnectionsAtom);
  const maxConnections = useAtomValue(maxConnectionsAtom);
  const connectionError = useAtomValue(connectionErrorAtom);
  const minCount = useAtomValue(minCountAtom);
  const maxCount = useAtomValue(maxCountAtom);
  const isAtMin = useAtomValue(isAtMinAtom);
  const isAtMax = useAtomValue(isAtMaxAtom);

  // Pattern: jotai-state - useSetAtom for write-only access
  const setCount = useSetAtom(setCountAtom);
  const setConnectionStatus = useSetAtom(setConnectionStatusAtom);
  const setConnectionInfo = useSetAtom(setConnectionInfoAtom);
  const setConnectionError = useSetAtom(setConnectionErrorAtom);
  const setCounterLimits = useSetAtom(setCounterLimitsAtom);

  // Connect to server on mount
  useEffect(() => {
    setConnectionStatus("connecting");

    const socket = new PartySocket({
      host: WS_CONFIG.host,
      room: WS_CONFIG.room,
    });
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      setConnectionStatus("connected");
    });

    socket.addEventListener("message", (event) => {
      try {
        const data: unknown = JSON.parse(String(event.data));
        if (isCounterSync(data)) {
          setCount(createCountValue(data.count));
          setCounterLimits({
            minCount: data.minCount,
            maxCount: data.maxCount,
          });
        } else if (isConnectionInfo(data)) {
          setConnectionInfo({
            currentConnections: data.currentConnections,
            maxConnections: data.maxConnections,
          });
        } else if (isConnectionError(data)) {
          setConnectionError(data.message);
        }
      } catch {
        // Ignore invalid messages
      }
    });

    socket.addEventListener("close", () => {
      setConnectionStatus("disconnected");
    });

    socket.addEventListener("error", () => {
      setConnectionStatus("error");
    });

    // Cleanup on unmount
    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [setConnectionStatus, setCount, setConnectionInfo, setConnectionError, setCounterLimits]);

  // Send action to server
  const sendAction = useCallback((action: CounterAction): void => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(action));
    }
  }, []);

  const increment = useCallback((): void => {
    sendAction({ type: "increment" });
  }, [sendAction]);

  const decrement = useCallback((): void => {
    sendAction({ type: "decrement" });
  }, [sendAction]);

  const reset = useCallback((): void => {
    sendAction({ type: "reset" });
  }, [sendAction]);

  return {
    count,
    doubled,
    isPositive,
    status,
    isConnected,
    currentConnections,
    maxConnections,
    connectionError,
    minCount,
    maxCount,
    isAtMin,
    isAtMax,
    increment,
    decrement,
    reset,
  };
};
