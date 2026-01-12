/**
 * Counter display component
 * Pattern: tailwind-theming - Using CSS variables for theming
 * Pattern: frontend-design - Accessible, dark mode compatible
 */

import type { CounterDisplayProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Displays the current counter value with derived states
 * Pattern: static-webapp-scaffold - Presentational component
 */
export const CounterDisplay = ({
  count,
  doubled,
  isPositive,
}: CounterDisplayProps): React.ReactElement => {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main count display */}
      <div
        className={cn(
          "flex items-center justify-center",
          "w-48 h-48 rounded-2xl",
          "bg-counter-display text-counter-display-foreground",
          "border-2 border-counter-border",
          "shadow-lg transition-colors duration-200"
        )}
      >
        <span
          className={cn(
            "text-7xl font-bold tabular-nums",
            isPositive ? "text-counter-positive" : count < 0 ? "text-counter-negative" : ""
          )}
        >
          {count}
        </span>
      </div>

      {/* Derived values */}
      <div className="flex gap-8 text-sm text-muted-foreground">
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wide">Doubled</span>
          <span className="text-lg font-semibold text-foreground">{doubled}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wide">Status</span>
          <span
            className={cn(
              "text-lg font-semibold",
              isPositive ? "text-counter-positive" : "text-counter-negative"
            )}
          >
            {isPositive ? "Positive" : count < 0 ? "Negative" : "Zero"}
          </span>
        </div>
      </div>
    </div>
  );
};
