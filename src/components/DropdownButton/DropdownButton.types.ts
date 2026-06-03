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
 * A single option inside the dropdown menu.
 */
export interface DropdownMenuItem {
  /** Stable identifier returned to `onSelect`. */
  id: string;
  /** Visible label. */
  label: ReactNode;
  /** When true, the item is rendered but not interactive. */
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
