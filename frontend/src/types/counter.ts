/**
 * Counter domain type definitions
 * Pattern: typescript-patterns - Branded Types for type safety
 */

// =============================================================================
// Branded Types
// =============================================================================

/**
 * Pattern: typescript-patterns - Branded type symbol
 * Prevents accidental mixing of CountValue with regular numbers
 */
declare const CountValueBrand: unique symbol;

/**
 * Branded type for counter value
 * Pattern: typescript-patterns - Nominal typing on primitives
 */
export type CountValue = number & {
  readonly [CountValueBrand]: typeof CountValueBrand;
};

// =============================================================================
// Type Guards
// =============================================================================

/**
 * Pattern: typescript-patterns - Type guard for runtime validation
 * @param value - Value to check
 * @returns True if value is a valid CountValue
 */
export const isCountValue = (value: unknown): value is CountValue => {
  return typeof value === "number" && Number.isFinite(value);
};

// =============================================================================
// Factory Functions
// =============================================================================

/**
 * Pattern: typescript-patterns - Factory function with validation
 * @param value - Number to convert to CountValue
 * @returns Branded CountValue
 * @throws Error if value is not a finite number
 */
export const createCountValue = (value: number): CountValue => {
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid count value: ${value}. Must be a finite number.`);
  }
  return value as CountValue;
};
