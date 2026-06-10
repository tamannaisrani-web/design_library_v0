/**
 * enumToMenuItems — convert a TypeScript enum to DropdownMenuItem[].
 *
 * Works with both string enums and numeric enums. For numeric enums the
 * reverse-mapping entries (number keys) are automatically filtered out so you
 * only get one item per member.
 *
 * @example String enum — Flag items
 * ```ts
 * enum Country { IN = 'India', US = 'United States', GB = 'United Kingdom' }
 *
 * const items = enumToMenuItems(Country, {
 *   type: 'Flag',
 *   country: (id) => id,        // id IS the ISO code for string enums keyed by code
 * });
 * // → [{ id: 'IN', label: 'India', type: 'Flag', country: 'IN' }, ...]
 * ```
 *
 * @example Numeric enum — Single-Select
 * ```ts
 * enum Priority { Low, Medium, High }
 *
 * const items = enumToMenuItems(Priority, {
 *   type: 'Single-Select',
 *   disabled: ['Low'],          // disable by enum key
 * });
 * // → [
 * //   { id: 'Low',    label: 'Low',    type: 'Single-Select', disabled: true  },
 * //   { id: 'Medium', label: 'Medium', type: 'Single-Select', disabled: false },
 * //   { id: 'High',   label: 'High',   type: 'Single-Select', disabled: false },
 * // ]
 * ```
 *
 * @example Custom labels
 * ```ts
 * enum Status { ACTIVE = 'active', INACTIVE = 'inactive' }
 *
 * const items = enumToMenuItems(Status, {
 *   type: 'Single-Select',
 *   label: (id, value) => value.charAt(0).toUpperCase() + value.slice(1),
 * });
 * ```
 */

import type { DropdownMenuItem, DropdownMenuItemType } from '../DropdownButton/DropdownButton.types';

export interface EnumToMenuItemsOptions {
  /**
   * Leading element type applied to every item.
   * - `'Multi-Select'` → checkbox
   * - `'Single-Select'` → radio
   * - `'Flag'` → country flag (also set `country`)
   */
  type?: DropdownMenuItemType;

  /**
   * Derive the ISO 3166-1 alpha-2 country code for each item when
   * `type="Flag"`. Receives the enum key (id) and the enum value (label).
   *
   * Pass a string to use the same country for all items, or a function for
   * per-item codes.
   *
   * @example (id) => id                  // enum key IS the country code
   * @example (id, value) => value        // enum value IS the country code
   * @example 'US'                        // same code for every item
   */
  country?: string | ((id: string, value: string) => string);

  /**
   * Mark specific items as disabled. Pass an array of enum keys to disable,
   * or a predicate function.
   *
   * @example ['Singapore', 'Malta']
   * @example (id) => id.startsWith('_')
   */
  disabled?: string[] | ((id: string) => boolean);

  /**
   * Override the visible label text. By default the enum value (for string
   * enums) or the enum key (for numeric enums) is used as the label.
   *
   * @param id    Enum key (always a string)
   * @param value Enum value (string for string enums; numeric string for numeric enums)
   */
  label?: (id: string, value: string) => string;
}

/**
 * Convert a TypeScript enum object to an array of `DropdownMenuItem` objects
 * ready to pass to `DropdownButton` or `DropdownMenu`.
 *
 * The `id` of each item is always the enum *key* (a string), so `onSelect`
 * returns a value you can compare directly against `MyEnum.SomeKey`.
 */
export function enumToMenuItems<T extends Record<string, string | number>>(
  enumObj: T,
  options: EnumToMenuItemsOptions = {},
): DropdownMenuItem[] {
  const { type, country, disabled, label: labelFn } = options;

  /* Filter out numeric reverse-mapping entries that TypeScript adds for
   * non-string enums (e.g. { 0: 'Low', Low: 0 } → keep only 'Low'). */
  const keys = Object.keys(enumObj).filter(
    (key) => typeof enumObj[key as keyof T] !== 'number' || isNaN(Number(key)),
  );

  const disabledSet = Array.isArray(disabled) ? new Set(disabled) : null;
  const isDisabled = (id: string): boolean => {
    if (disabledSet) return disabledSet.has(id);
    if (typeof disabled === 'function') return disabled(id);
    return false;
  };

  return keys.map((key): DropdownMenuItem => {
    const rawValue = enumObj[key as keyof T];
    /* For string enums rawValue is the string value; for numeric enums use the key as label. */
    const valueStr = typeof rawValue === 'string' ? rawValue : key;

    const resolvedLabel = labelFn ? labelFn(key, valueStr) : valueStr;

    const resolvedCountry =
      type === 'Flag'
        ? typeof country === 'function'
          ? country(key, valueStr)
          : typeof country === 'string'
            ? country
            : undefined
        : undefined;

    return {
      id: key,
      label: resolvedLabel,
      ...(type ? { type } : {}),
      ...(resolvedCountry ? { country: resolvedCountry } : {}),
      disabled: isDisabled(key),
    };
  });
}
