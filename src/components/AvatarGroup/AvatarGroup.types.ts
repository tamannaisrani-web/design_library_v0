/**
 * AvatarGroup — public TypeScript types.
 *
 * Source spec: AvatarGroup.ai.md + AvatarGroup.stories.mdx (figmaNode 645:9512, variant frame 1671:9406).
 *
 * AvatarGroup is a compact profile widget used in navigation bars and sidebars.
 * It renders a single Avatar (32 px, Initial Circle) alongside an optional name,
 * designation, and dropdown chevron.
 *
 * > **Note on Figma naming:** the Figma component is named `Avatar grgroup` (a known typo).
 * > Always use `AvatarGroup` in code.
 *
 * ❌ NOT for multiple stacked assignee avatars — compose individual `Avatar` components in a flex row.
 * ❌ NOT for organisation entities — use `Avatar shape="Initial Square"`.
 */

import type { BaseComponentProps, InteractiveEventHandlers } from '../shared/types';
import type { DropdownMenuItem } from '../DropdownButton/DropdownButton.types';

/* Re-export so consumers can import item type from AvatarGroup directly. */
export type { DropdownMenuItem };

/**
 * Whether the text block (name + designation) is shown.
 * - `true`  — shows name and optional designation (240 px wide)
 * - `false` — avatar + chevron only (compact, ~80 px wide)
 */
export type AvatarGroupDisplayName = boolean;

/**
 * Props for the **AvatarGroup** component.
 *
 * @example Default — name + designation + dropdown arrow
 * ```tsx
 * <AvatarGroup
 *   initials="AM"
 *   name="Alex Martin"
 *   designation="Product Designer"
 *   displayName
 *   showDropdown
 *   isExpanded={false}
 *   onClick={toggleMenu}
 * />
 * ```
 *
 * @example Compact (no name text)
 * ```tsx
 * <AvatarGroup
 *   initials="AM"
 *   displayName={false}
 *   showDropdown
 *   onClick={toggleMenu}
 * />
 * ```
 *
 * @example Expanded state (arrow up, bold text)
 * ```tsx
 * <AvatarGroup
 *   initials="AM"
 *   name="Alex Martin"
 *   designation="Product Designer"
 *   displayName
 *   isExpanded
 *   onClick={toggleMenu}
 * />
 * ```
 */
export interface AvatarGroupProps extends BaseComponentProps, InteractiveEventHandlers<HTMLButtonElement> {
  /**
   * 1–2 uppercase characters shown inside the internal Avatar (Initial Circle, Medium).
   * Rendered `aria-hidden` — the component's `ariaLabel` carries the accessible name.
   * @default 'AM'
   */
  initials?: string;

  /**
   * Person's full name displayed when `displayName` is true.
   * @default 'Alex Martin'
   */
  name?: string;

  /**
   * Job title / role shown as a sub-label above the name when `showDesignation` is true.
   * @default 'Designation'
   */
  designation?: string;

  /**
   * Show the name + designation text block (240 px wide variant).
   * When false, only the avatar and optional dropdown arrow are shown (~80 px).
   * @default true
   */
  displayName?: boolean;

  /**
   * Show the designation row above the name.
   * Only has an effect when `displayName` is also true.
   * @default true
   */
  showDesignation?: boolean;

  /**
   * Show the dropdown chevron icon.
   * @default true
   */
  showDropdown?: boolean;

  /**
   * Expanded state — renders the chevron pointing up and name in Bold weight.
   * Typically toggled by the parent in response to a menu open/close event.
   * @default false
   */
  isExpanded?: boolean;

  /**
   * Accessible label for the button element.
   * Defaults to the `name` prop when not provided.
   * @example "Open account menu for Alex Martin"
   */
  ariaLabel?: string;

  /**
   * `aria-haspopup` attribute — set when clicking opens a popup menu or listbox.
   * @default 'menu'
   */
  ariaHasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

  /**
   * `aria-expanded` — should be kept in sync with `isExpanded`.
   * Defaults to the value of `isExpanded` when not provided.
   */
  ariaExpanded?: boolean;

  /**
   * Menu items rendered in the `_BaseMenu` dropdown below the trigger when
   * `isExpanded=true`. If omitted, no menu is rendered even when expanded.
   *
   * @example
   * ```tsx
   * menuItems={[
   *   { id: 'profile', label: 'View profile' },
   *   { id: 'settings', label: 'Settings' },
   *   { id: 'logout', label: 'Log out' },
   * ]}
   * ```
   */
  menuItems?: DropdownMenuItem[];

  /**
   * Called when a menu item is activated (clicked or keyboard-confirmed).
   * Receives the full `DropdownMenuItem` object.
   */
  onSelect?: (item: DropdownMenuItem) => void;

  /**
   * `id` applied to the `_BaseMenu` `<ul>` element.
   * Wire to the trigger button via `aria-controls` when you need explicit linkage.
   */
  menuId?: string;

  /**
   * Visual theme variant.
   * - `Default` — white background, dark text (standard use on light surfaces).
   * - `Inverse` — dark navy (`color/fill/primary-9`) background, white text.
   *   Use when placing the AvatarGroup on an Inverse (dark) TopBar.
   *
   * @default 'Default'
   * @see Figma variant frame 1671:9461 — AvatarGroup type=Inverse
   */
  type?: 'Default' | 'Inverse';
}
