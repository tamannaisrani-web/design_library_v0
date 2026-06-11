/**
 * DropdownMenu — public TypeScript types.
 *
 * `DropdownMenu` is a composite component: an InputFields-style trigger (label,
 * help text, arrow icon) plus a floating `_BaseMenu` option panel. The trigger
 * appearance is driven by `property1` (`'open'` | `'close'`).
 *
 * Design source: Figma file P52nmDshYaKr963q1zBwQj, node 1223:7582.
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps, InteractiveEventHandlers } from '../shared/types';
import type { DropdownMenuItem } from '../DropdownButton/DropdownButton.types';
import type { BadgeSize, BadgeEmphasis, BadgeState } from '../Badge/Badge.types';

// Re-export so consumers only need one import.
export type { DropdownMenuItem };

/**
 * Trigger visual state.
 * - `'open'`  — focus border (`color/stroke/focus-subtle`), help text visible, arrow rotated 180°
 * - `'close'` — neutral border (`color/stroke/neutral`), arrow pointing down
 *
 * Never set `property1="open"` on page load — always drive from user interaction.
 */
export type DropdownMenuProperty1 = 'open' | 'close';

/**
 * Props for the `DropdownMenu` component.
 *
 * @example Minimal controlled dropdown
 * ```tsx
 * import { DropdownMenu } from '@dcds/components';
 *
 * const [isOpen, setIsOpen] = React.useState(false);
 * const [selected, setSelected] = React.useState<string | null>(null);
 *
 * <DropdownMenu
 *   label="Country"
 *   placeholder="Select a country"
 *   property1={isOpen ? 'open' : 'close'}
 *   items={[
 *     { id: 'in', label: 'India',  type: 'Flag', country: 'IN' },
 *     { id: 'us', label: 'USA',    type: 'Flag', country: 'US' },
 *     { id: 'gb', label: 'UK',     type: 'Flag', country: 'GB' },
 *   ]}
 *   selectedId={selected}
 *   onToggle={setIsOpen}
 *   onSelect={(id) => { setSelected(id); setIsOpen(false); }}
 * />
 * ```
 */
export interface DropdownMenuProps
  extends BaseComponentProps,
    InteractiveEventHandlers<HTMLDivElement> {
  /**
   * Trigger + panel visual state.
   * - `'open'`  → focus border, help text, arrow up
   * - `'close'` → neutral border, arrow down
   * @default 'close'
   */
  property1?: DropdownMenuProperty1;

  /**
   * Label text rendered above the trigger.
   * Hidden when `showLabel=false`.
   */
  label?: string;

  /**
   * Shows the asterisk `*` mandatory marker beside the label.
   * @default true
   */
  isMandatory?: boolean;

  /**
   * Show/hide the label row.
   * @default true
   */
  showLabel?: boolean;

  /**
   * Placeholder text shown inside the trigger when no item is selected.
   * @default 'Select...'
   */
  placeholder?: string;

  /**
   * The currently selected item's `id`. Highlights the matching item with
   * `Variant4` state and shows its label in the trigger.
   * Use `selectedIds` instead when `type="Multi-Select"` items are present.
   */
  selectedId?: string | null;

  /**
   * Set of selected item ids for multi-select mode.
   * When provided, takes precedence over `selectedId` for `isSelected` resolution.
   * The trigger shows a count ("3 selected") when more than one id is in the set.
   */
  selectedIds?: ReadonlySet<string> | string[];

  /**
   * Menu items to render in the floating panel.
   */
  items?: DropdownMenuItem[];

  /**
   * Optional section-header label rendered above the item list in a tinted band.
   * Figma node 795:68454 — `color/surface/4` bg, 12px Bold subdued text.
   * @example "20 results found"
   */
  menuLabel?: string;

  /**
   * Show/hide the menu label band.
   * When `false` the label band is hidden even if `menuLabel` is set.
   * When `true` (and `menuLabel` is provided) the band is always visible.
   * @default true
   */
  showMenuLabel?: boolean;

  /**
   * Show/hide the help text row below the label.
   * @default false
   */
  showHelpText?: boolean;

  /**
   * Help text content — shown when `showHelpText=true` and trigger is open.
   */
  helpText?: string;

  /**
   * Disables the trigger; pointer-events none + disabled colour tokens.
   * @default false
   */
  disabled?: boolean;

  /**
   * Fired when the trigger is clicked or activated via keyboard.
   * Receives the next open state so the parent can toggle `property1`.
   */
  onToggle?: (nextOpen: boolean) => void;

  /**
   * Fired when the user activates a menu item.
   * Receives the item's `id` string.
   */
  onSelect?: (itemId: string) => void;

  /**
   * Show a trailing status Badge on every item. Per-item `showStatus` takes precedence.
   * @default false
   */
  showStatus?: boolean;

  /**
   * Default label text for the status badge. Per-item `status` takes precedence.
   * @default 'Status'
   */
  status?: string;

  /**
   * Default Badge size for all items. Mirrors `Badge.size`. Per-item `statusSize` takes precedence.
   * @default 'S'
   */
  statusSize?: BadgeSize;

  /**
   * Default Badge emphasis for all items. Mirrors `Badge.emphasis`. Per-item `statusEmphasis` takes precedence.
   * @default 'subtle'
   */
  statusEmphasis?: BadgeEmphasis;

  /**
   * Default Badge state for all items. Mirrors `Badge.state`. Per-item `statusState` takes precedence.
   * @default 'neutral'
   */
  statusState?: BadgeState;

  /**
   * Show the leading state icon inside the badge for all items. Mirrors `Badge.showIcon`. Per-item `statusShowIcon` takes precedence.
   * @default true
   */
  statusShowIcon?: boolean;

  /**
   * Optional ReactNode to fully replace the default `_BaseMenu` item list.
   * Useful for custom content inside the floating panel.
   */
  menuChildren?: ReactNode;
}
