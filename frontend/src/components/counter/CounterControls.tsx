/**
 * Counter controls component
 * Pattern: static-webapp-scaffold - Presentational component with callbacks
 * Pattern: frontend-design - Button variants from UI library
 */

import type { CounterControlsProps } from "@/types";
import { Button } from "@/components/ui/button";

/**
 * Control buttons for counter operations
 * Pattern: static-webapp-scaffold - Dumb component receiving handlers via props
 */
export const CounterControls = ({
  onIncrement,
  onDecrement,
  onReset,
  disabled = false,
  disabledIncrement = false,
  disabledDecrement = false,
}: CounterControlsProps): React.ReactElement => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main controls */}
      <div className="flex items-center gap-4">
        <Button
          onClick={onDecrement}
          size="lg"
          variant="outline"
          className="w-16 h-16 text-2xl font-bold"
          aria-label="Decrement counter"
          disabled={disabled || disabledDecrement}
        >
          -
        </Button>

        <Button
          onClick={onIncrement}
          size="lg"
          className="w-16 h-16 text-2xl font-bold"
          aria-label="Increment counter"
          disabled={disabled || disabledIncrement}
        >
          +
        </Button>
      </div>

      {/* Reset button */}
      <Button
        onClick={onReset}
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        disabled={disabled}
      >
        Reset
      </Button>
    </div>
  );
};
