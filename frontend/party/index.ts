/**
 * PartyKit server for shared counter
 * Pattern: Real-time state synchronization
 */

import type * as Party from "partykit/server";
import type { CounterAction, CounterSync, ConnectionInfo, ConnectionError } from "@/types/counter";

/** Default maximum connections if not set in environment */
const DEFAULT_MAX_CONNECTIONS = 10;

export default class Server implements Party.Server {
  /** Server-side counter state */
  private count: number = 0;

  constructor(readonly room: Party.Room) {}

  /** Get maximum connections from environment or default */
  private get maxConnections(): number {
    const envValue = this.room.env.MAX_CONNECTIONS;
    if (typeof envValue === "string") {
      const parsed = parseInt(envValue, 10);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_CONNECTIONS;
    }
    return DEFAULT_MAX_CONNECTIONS;
  }

  /**
   * Handle new connection
   * Sends current counter state to the newly connected client
   * Rejects connection if room is full
   */
  onConnect(conn: Party.Connection, _ctx: Party.ConnectionContext): void {
    const currentConnections = [...this.room.getConnections()].length;

    // Check connection limit
    if (currentConnections > this.maxConnections) {
      const errorMessage: ConnectionError = {
        type: "error",
        code: "ROOM_FULL",
        message: `Room is full (${this.maxConnections}/${this.maxConnections})`,
      };
      conn.send(JSON.stringify(errorMessage));
      conn.close(4000, "Room is full");
      return;
    }

    // Send current state to the new connection
    const syncMessage: CounterSync = { type: "sync", count: this.count };
    conn.send(JSON.stringify(syncMessage));

    // Send connection info to the new connection
    const connectionInfo: ConnectionInfo = {
      type: "connection_info",
      currentConnections,
      maxConnections: this.maxConnections,
    };
    conn.send(JSON.stringify(connectionInfo));

    // Broadcast updated connection info to all clients
    this.broadcastConnectionInfo();
  }

  /**
   * Handle connection close
   * Broadcasts updated connection count to remaining clients
   */
  onClose(_conn: Party.Connection): void {
    this.broadcastConnectionInfo();
  }

  /**
   * Handle incoming messages
   * Processes counter actions and broadcasts updated state
   */
  onMessage(message: string, _sender: Party.Connection): void {
    const action = this.parseAction(message);
    if (!action) return;

    // Update counter based on action
    switch (action.type) {
      case "increment":
        this.count += 1;
        break;
      case "decrement":
        this.count -= 1;
        break;
      case "reset":
        this.count = 0;
        break;
      default: {
        // Pattern: typescript-patterns - Exhaustiveness check
        action satisfies never;
      }
    }

    // Broadcast updated state to ALL connections
    this.broadcastSync();
  }

  /**
   * Parse incoming message as CounterAction
   */
  private parseAction(message: string): CounterAction | null {
    try {
      const parsed: unknown = JSON.parse(message);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "type" in parsed &&
        (parsed.type === "increment" || parsed.type === "decrement" || parsed.type === "reset")
      ) {
        return parsed as CounterAction;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Broadcast current counter state to all connections
   */
  private broadcastSync(): void {
    const syncMessage: CounterSync = { type: "sync", count: this.count };
    this.room.broadcast(JSON.stringify(syncMessage));
  }

  /**
   * Broadcast connection info to all connections
   */
  private broadcastConnectionInfo(): void {
    const currentConnections = [...this.room.getConnections()].length;
    const connectionInfo: ConnectionInfo = {
      type: "connection_info",
      currentConnections,
      maxConnections: this.maxConnections,
    };
    this.room.broadcast(JSON.stringify(connectionInfo));
  }
}

Server satisfies Party.Worker;
