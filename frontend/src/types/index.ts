/**
 * Centralized type exports
 * Pattern: static-webapp-scaffold - Single source of truth for types
 */

// Counter domain types
export type { CountValue } from "./counter";
export { isCountValue, createCountValue } from "./counter";

// WebSocket domain types
export type { ConnectionStatus, WebSocketMessage, WebSocketConfig } from "./websocket";
export { isConnectionStatus } from "./websocket";

// Component Props types
export type { CounterDisplayProps, CounterControlsProps } from "./components";
