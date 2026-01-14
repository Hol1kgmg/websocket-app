/**
 * Connection status indicator component
 * Pattern: static-webapp-scaffold - Presentational component
 * Pattern: tailwind-theming - Using CSS variables for theming
 */

import type { ConnectionStatus } from "@/types";
import { cn } from "@/lib/utils";

// =============================================================================
// Props Type
// =============================================================================

export type ConnectionIndicatorProps = {
  readonly status: ConnectionStatus;
  readonly currentConnections?: number;
  readonly maxConnections?: number;
};

// =============================================================================
// Component
// =============================================================================

/**
 * Displays current WebSocket connection status and connection count
 */
export const ConnectionIndicator = ({
  status,
  currentConnections,
  maxConnections,
}: ConnectionIndicatorProps): React.ReactElement => {
  const statusConfig = getStatusConfig(status);
  const showConnectionCount = currentConnections !== undefined && maxConnections !== undefined && maxConnections > 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className={cn("w-2.5 h-2.5 rounded-full", statusConfig.dotClass)} />
        <span className="text-sm text-muted-foreground">{statusConfig.label}</span>
      </div>
      {showConnectionCount && (
        <span className="text-sm text-muted-foreground">
          ({currentConnections}/{maxConnections})
        </span>
      )}
    </div>
  );
};

// =============================================================================
// Helper
// =============================================================================

type StatusConfig = {
  readonly label: string;
  readonly dotClass: string;
};

const getStatusConfig = (status: ConnectionStatus): StatusConfig => {
  switch (status) {
    case "connected":
      return { label: "Connected", dotClass: "bg-green-500" };
    case "connecting":
      return { label: "Connecting...", dotClass: "bg-yellow-500 animate-pulse" };
    case "disconnected":
      return { label: "Disconnected", dotClass: "bg-gray-400" };
    case "error":
      return { label: "Connection Error", dotClass: "bg-red-500" };
    default: {
      // Pattern: typescript-patterns - Exhaustiveness check
      status satisfies never;
      return { label: "Unknown", dotClass: "bg-gray-400" };
    }
  }
};
