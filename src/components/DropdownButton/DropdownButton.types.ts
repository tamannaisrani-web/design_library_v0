/**
 * DropdownButton — public TypeScript types.
 * Source: ai-docs/DropdownButton.ai.md + dcds-registry.json (id: dropdown-button, figmaNode 863:12173).
 *
 * When `isOpen=true` the button reveals a floating `_BaseMenu` (internal
 * sub-component) anchored below it. Each menu item is keyboard-activatable.
 */

import type { ReactNode } from 'react';
import type {
  ActionSize,
  ActionVariant,
  BaseComponentProps,
  InteractiveEventHandlers,
} from '../shared/types';

/** Visual/interactive state. */
export type DropdownButtonState = 'Default' | 'Open' | 'Disabled';

/**
 * Leading control type for a menu item.
 * Matches the Figma _BaseMenuItem `type` prop (node 788:68291).
 * - `Multi-Select` — 24px checkbox (square with rd-XS)
 * - `Single-Select` — 24px radio button (circle with rd-Max)
 * - `Flag` — 24×18px country flag image from dcds-flags/flags/{country}.svg
 */
export type DropdownMenuItemType = 'Multi-Select' | 'Single-Select' | 'Flag';

/**
 * A single option inside the dropdown menu.
 * Matches the Figma _BaseMenuItem spec (node 788:68291 / _BaseMenu 795:68851).
 */
export interface DropdownMenuItem {
  /** Stable identifier returned to `onSelect`. */
  id: string;

  /** Visible label — 16px Regular (bold when selected), color/text/primary. */
  label: ReactNode;

  /**
   * Leading element type — renders a checkbox, radio, or flag before the label.
   * When omitted, no leading element is shown.
   * - `Multi-Select` → checkbox (square)
   * - `Single-Select` → radio button (circle)
   * - `Flag` → country flag (requires `country` prop)
   */
  type?: DropdownMenuItemType;

  /**
   * ISO 3166-1 alpha-2 country code for `type="Flag"` items.
   * Resolves to `dcds-flags/flags/{COUNTRY}.svg`.
   * @example 'IN' | 'US' | 'GB'
   */
  country?: string;

  /**
   * Whether this item is in the selected state.
   * - Multi-Select: checkbox is filled with a checkmark
   * - Single-Select: radio is filled
   * - Applies green-100 (color/fill/light-action) background + bold label text
   * @default false
   */
  isSelected?: boolean;

  /**
   * Show the leading element (checkbox / radio / flag).
   * Defaults to true when `type` is set, false otherwise.
   */
  showLeading?: boolean;

  /**
   * Show a trailing status Badge (pill with label).
   * @default false
   */
  showStatus?: boolean;

  /**
   * Text displayed inside the trailing status badge when `showStatus=true`.
   * @default 'Status'
   */
  status?: string;

  /**
   * Custom leading ReactNode — overrides the type-based auto-leading.
   * Use for icons, avatars, or any custom element in the 24×24 slot.
   */
  leading?: ReactNode;

  /** When true, the item is non-interactive and uses disabled colour tokens. */
  disabled?: boolean;

  /** Optional per-item click handler. Fires before `onSelect`. */
  onClick?: () => void;
}

/**
 * Props for the DropdownButton component.
 *
 * Pass `menuItems` for a structured menu, or `menuChildren` for fully custom
 * content. Either way, the menu is rendered inside the same wrapper so that
 * absolute positioning + click-outside-to-close behaviour work automatically.
 */
export interface DropdownButtonProps
  extends BaseComponentProps,
    InteractiveEventHandlers<HTMLButtonElement> {
  /**
   * Visual weight. Mirrors Button.
   * @default 'Secondary'
   */
  variant?: ActionVariant;

  /**
   * Interactive state. `Open` reflects that the menu is currently expanded.
   * @default 'Default'
   */
  state?: DropdownButtonState;

  /**
   * Size token.
   * @default 'M'
   */
  size?: ActionSize;

  /** Reflects whether the menu is open. Sets `aria-expanded`. */
  isOpen?: boolean;

  /** Disabled flag — convenience over `state="Disabled"`. */
  isDisabled?: boolean;

  /**
   * Menu items shown when `isOpen=true`.
   * Ignored if `menuChildren` is provided.
   */
  menuItems?: DropdownMenuItem[];

  /**
   * Fully custom menu content (overrides `menuItems`). Renders inside the
   * floating menu container so positioning and click-outside still work.
   */
  menuChildren?: ReactNode;

  /**
   * Triggered when the user clicks to open/close the menu.
   * Receives the next open state.
   */
  onToggle?: (nextOpen: boolean) => void;

  /**
   * Triggered when the user selects a menu item. Receives the item's id.
   * The menu auto-closes after selection.
   */
  onSelect?: (itemId: string) => void;

  /** Button label (text and/or leading icon). The chevron is appended automatically. */
  children?: ReactNode;

  /**
   * ESOverride — sets a fixed pixel or CSS width on the dropdown wrapper.
   * Accepts any valid CSS width value (`'150px'`, `'12rem'`, etc.) or a raw
   * number that is treated as pixels.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  fixedWidth?: string | number;
}
