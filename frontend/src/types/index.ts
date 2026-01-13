/**
 * Centralized type exports
 * Pattern: static-webapp-scaffold - Single source of truth for types
 */

// Counter domain types
export type {
  CountValue,
  CounterAction,
  CounterSync,
  CounterMessage,
  ConnectionStatus,
} from "./counter";
export { isCountValue, createCountValue, isCounterSync, isConnectionStatus } from "./counter";

// Component Props types
export type { CounterDisplayProps, CounterControlsProps } from "./components";
