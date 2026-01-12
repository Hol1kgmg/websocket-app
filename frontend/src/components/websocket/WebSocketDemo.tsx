/**
 * WebSocket demo component
 * Pattern: static-webapp-scaffold - Domain component using hooks
 */

"use client";

import { useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * WebSocket connection demo component
 */
export const WebSocketDemo = (): React.ReactElement => {
  const {
    status,
    isConnected,
    messages,
    error,
    send,
    connect,
    disconnect,
    clearMessages,
  } = useWebSocket();

  const [inputMessage, setInputMessage] = useState("");

  const handleSend = (): void => {
    if (inputMessage.trim()) {
      send(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-md space-y-4 rounded-lg border p-4">
      {/* Connection status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              isConnected
                ? "bg-green-500"
                : status === "connecting"
                  ? "bg-yellow-500"
                  : status === "error"
                    ? "bg-red-500"
                    : "bg-gray-400"
            }`}
          />
          <span className="text-sm text-muted-foreground">
            {status}
          </span>
        </div>

        {/* Connection buttons */}
        <div className="flex gap-2">
          {!isConnected ? (
            <Button
              size="sm"
              onClick={connect}
              disabled={status === "connecting"}
            >
              Connect
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={disconnect}>
              Disconnect
            </Button>
          )}
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="rounded bg-red-100 p-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Message input */}
      <div className="flex gap-2">
        <Input
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isConnected}
        />
        <Button onClick={handleSend} disabled={!isConnected}>
          Send
        </Button>
      </div>

      {/* Messages list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Messages ({messages.length})
          </span>
          {messages.length > 0 && (
            <Button size="sm" variant="ghost" onClick={clearMessages}>
              Clear
            </Button>
          )}
        </div>
        <div className="max-h-40 space-y-1 overflow-y-auto rounded bg-muted p-2">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No messages yet</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={`${msg.timestamp}-${index}`}
                className="rounded bg-background p-2 text-sm"
              >
                {msg.data}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
