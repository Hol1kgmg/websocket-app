/**
 * PartyKit server for shared counter
 * Pattern: Real-time state synchronization
 */

import type * as Party from "partykit/server";
import type { CounterAction, CounterSync } from "@/types/counter";

export default class Server implements Party.Server {
  /** Server-side counter state */
  private count: number = 0;

  constructor(readonly room: Party.Room) {}

  /**
   * Handle new connection
   * Sends current counter state to the newly connected client
   */
  onConnect(conn: Party.Connection, _ctx: Party.ConnectionContext): void {
    // Send current state to the new connection
    const syncMessage: CounterSync = { type: "sync", count: this.count };
    conn.send(JSON.stringify(syncMessage));
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
}

Server satisfies Party.Worker;
