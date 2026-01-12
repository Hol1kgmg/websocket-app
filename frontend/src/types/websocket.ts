/**
 * WebSocket domain type definitions
 * Pattern: typescript-patterns - Type safety for WebSocket state
 */

// =============================================================================
// Connection State Types
// =============================================================================

/**
 * WebSocket connection status
 * Pattern: typescript-patterns - Union type for state machine
 */
export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

/**
 * WebSocket message from server
 */
export type WebSocketMessage = {
  readonly data: string;
  readonly timestamp: number;
};

/**
 * WebSocket connection configuration
 */
export type WebSocketConfig = {
  readonly host: string;
  readonly room: string;
};

// =============================================================================
// Type Guards
// =============================================================================

/**
 * Pattern: typescript-patterns - Type guard for ConnectionStatus
 */
export const isConnectionStatus = (value: unknown): value is ConnectionStatus => {
  return (
    value === "disconnected" ||
    value === "connecting" ||
    value === "connected" ||
    value === "error"
  );
};
