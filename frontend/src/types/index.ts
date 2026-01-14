/**
 * Centralized type exports
 * Pattern: static-webapp-scaffold - Single source of truth for types
 */

// Counter domain types
export type {
  CountValue,
  CounterAction,
  CounterSync,
  ConnectionInfo,
  ConnectionError,
  ServerMessage,
  CounterMessage,
  ConnectionStatus,
} from "./counter";
export {
  isCountValue,
  createCountValue,
  isCounterSync,
  isConnectionInfo,
  isConnectionError,
  isConnectionStatus,
} from "./counter";

// Component Props types
export type { CounterDisplayProps, CounterControlsProps } from "./components";
