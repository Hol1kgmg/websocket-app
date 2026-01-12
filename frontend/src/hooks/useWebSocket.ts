/**
 * WebSocket connection management hook
 * Pattern: jotai-state - Custom hook encapsulating atom access
 */

import { useCallback, useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import type PartySocket from "partysocket";
import type { ConnectionStatus, WebSocketConfig } from "@/types/websocket";
import {
  connectionStatusAtom,
  messagesAtom,
  errorAtom,
  isConnectedAtom,
  addMessageAtom,
  clearMessagesAtom,
  setErrorAtom,
  setConnectionStatusAtom,
} from "@/atoms/websocket";
import { createPartySocket, parseMessage, DEFAULT_WS_CONFIG } from "@/lib/websocket";

// =============================================================================
// Return Type Definition
// =============================================================================

/**
 * Pattern: typescript-patterns - Explicit return type definition
 */
export type UseWebSocketReturn = {
  /** Current connection status */
  readonly status: ConnectionStatus;
  /** Whether currently connected */
  readonly isConnected: boolean;
  /** Received messages */
  readonly messages: readonly { readonly data: string; readonly timestamp: number }[];
  /** Error message if any */
  readonly error: string | null;
  /** Send a message to the server */
  readonly send: (message: string) => void;
  /** Connect to the server */
  readonly connect: () => void;
  /** Disconnect from the server */
  readonly disconnect: () => void;
  /** Clear all messages */
  readonly clearMessages: () => void;
};

// =============================================================================
// Custom Hook
// =============================================================================

/**
 * WebSocket connection management hook
 * Pattern: jotai-state - Encapsulate atom access in custom hook
 *
 * @param config - Optional WebSocket configuration
 * @returns WebSocket state and actions
 *
 * @example
 * const { status, isConnected, messages, send, connect, disconnect } = useWebSocket();
 */
export const useWebSocket = (
  config: Partial<WebSocketConfig> = {}
): UseWebSocketReturn => {
  const socketRef = useRef<PartySocket | null>(null);
  const configRef = useRef({ ...DEFAULT_WS_CONFIG, ...config });

  // Pattern: jotai-state - useAtomValue for read-only access
  const status = useAtomValue(connectionStatusAtom);
  const isConnected = useAtomValue(isConnectedAtom);
  const messages = useAtomValue(messagesAtom);
  const error = useAtomValue(errorAtom);

  // Pattern: jotai-state - useSetAtom for write-only access
  const addMessage = useSetAtom(addMessageAtom);
  const clearMessages = useSetAtom(clearMessagesAtom);
  const setError = useSetAtom(setErrorAtom);
  const setConnectionStatus = useSetAtom(setConnectionStatusAtom);

  const connect = useCallback((): void => {
    if (socketRef.current) {
      return;
    }

    setConnectionStatus("connecting");
    setError(null);

    const socket = createPartySocket(configRef.current);
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      setConnectionStatus("connected");
    });

    socket.addEventListener("message", (event) => {
      const message = parseMessage(event);
      addMessage(message);
    });

    socket.addEventListener("close", () => {
      setConnectionStatus("disconnected");
      socketRef.current = null;
    });

    socket.addEventListener("error", () => {
      setConnectionStatus("error");
      setError("WebSocket connection error");
    });
  }, [setConnectionStatus, setError, addMessage]);

  const disconnect = useCallback((): void => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setConnectionStatus("disconnected");
    }
  }, [setConnectionStatus]);

  const send = useCallback((message: string): void => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  return {
    status,
    isConnected,
    messages,
    error,
    send,
    connect,
    disconnect,
    clearMessages,
  };
};
