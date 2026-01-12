/**
 * Counter business logic
 * Pattern: static-webapp-scaffold - Pure functions in lib/
 */

import { Result } from "@praha/byethrow";
import { type CountValue, createCountValue } from "@/types";

// =============================================================================
// Pure Functions
// =============================================================================

/**
 * Increment count by step
 * Pattern: static-webapp-scaffold - Pure function, no side effects
 *
 * @param count - Current count value
 * @param step - Step to increment by
 * @returns New count value
 */
export const increment = (count: CountValue, step: number): CountValue => {
  return createCountValue(count + step);
};

/**
 * Decrement count by step
 * Pattern: static-webapp-scaffold - Pure function, no side effects
 *
 * @param count - Current count value
 * @param step - Step to decrement by
 * @returns New count value
 */
export const decrement = (count: CountValue, step: number): CountValue => {
  return createCountValue(count - step);
};

/**
 * Calculate doubled value
 * Pattern: static-webapp-scaffold - Derived computation in lib/
 *
 * @param count - Count value
 * @returns Doubled value
 */
export const double = (count: CountValue): number => {
  return count * 2;
};

/**
 * Check if count is positive
 * Pattern: static-webapp-scaffold - Derived computation in lib/
 *
 * @param count - Count value
 * @returns True if positive
 */
export const isPositive = (count: CountValue): boolean => {
  return count > 0;
};

// =============================================================================
// Result Type Examples (byethrow)
// =============================================================================

/**
 * Parse string input to CountValue with error handling
 * Pattern: byethrow - Result type for fallible operations
 *
 * @param input - String to parse
 * @returns Result containing CountValue or Error
 *
 * @example
 * const result = parseCountInput("42");
 * if (Result.isSuccess(result)) {
 *   console.log(result.value); // CountValue(42)
 * } else {
 *   console.error(result.error.message);
 * }
 */
export const parseCountInput = (
  input: string
): Result.Result<CountValue, Error> => {
  return Result.try({
    try: (): CountValue => {
      const trimmed = input.trim();
      if (trimmed === "") {
        throw new Error("Input cannot be empty");
      }

      const num = Number(trimmed);
      if (!Number.isFinite(num)) {
        throw new Error(`Invalid number: "${input}"`);
      }

      return createCountValue(num);
    },
    catch: (error): Error => {
      if (error instanceof Error) {
        return error;
      }
      return new Error(`Failed to parse input: ${String(error)}`);
    },
  });
};

/**
 * Clamp count within bounds
 * Pattern: byethrow - Result type for validation
 *
 * @param count - Count value to clamp
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns Result containing clamped CountValue or Error
 */
export const clampCount = (
  count: CountValue,
  min: number,
  max: number
): Result.Result<CountValue, Error> => {
  if (min > max) {
    return Result.fail(new Error(`Invalid bounds: min (${min}) > max (${max})`));
  }

  const clamped = Math.max(min, Math.min(max, count));
  return Result.succeed(createCountValue(clamped));
};
