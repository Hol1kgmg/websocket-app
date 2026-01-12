/**
 * WebSocket connection utilities using PartySocket
 * Pattern: static-webapp-scaffold - Pure utility functions
 *
 * TODO: Add message validation/parsing logic as the application grows
 * TODO: Consider using byethrow Result type for error handling
 *       Example: parseMessage(data: unknown): Result<string, ParseError>
 */

import PartySocket from "partysocket";
import type { WebSocketConfig } from "@/types/websocket";

// =============================================================================
// Default Configuration
// =============================================================================

/**
 * Default WebSocket configuration for local development
 */
export const DEFAULT_WS_CONFIG: WebSocketConfig = {
  host: "localhost:1999",
  room: "main",
} as const;

// =============================================================================
// Connection Factory
// =============================================================================

/**
 * Create a PartySocket connection
 * @param config - WebSocket configuration
 * @returns PartySocket instance
 */
export const createPartySocket = (
  config: Partial<WebSocketConfig> = {}
): PartySocket => {
  const mergedConfig = { ...DEFAULT_WS_CONFIG, ...config };

  return new PartySocket({
    host: mergedConfig.host,
    room: mergedConfig.room,
  });
};

// =============================================================================
// Message Utilities
// =============================================================================

/**
 * Parse incoming WebSocket message
 * @param event - MessageEvent from WebSocket
 * @returns Parsed message string
 */
export const parseMessage = (event: MessageEvent<unknown>): string => {
  if (typeof event.data === "string") {
    return event.data;
  }
  return String(event.data);
};
