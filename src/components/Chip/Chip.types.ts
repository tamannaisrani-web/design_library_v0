/**
 * Chip — public TypeScript types.
 *
 * Source spec: Chip.ai.md + Chip.stories.mdx (figmaNode 346:14776).
 *
 * Use Chip for **interactive, toggleable filter or category labels**.
 * ❌ NOT for read-only status labels — use `Badge`.
 * ❌ NOT for removable user-added tags — use `Tag`.
 * ❌ NOT for form multi-select — use `Checkbox`.
 */

import type React from 'react';
import type { BaseComponentProps, InteractiveEventHandlers } from '../shared/types';

/** Size variant for the Chip component. */
export type ChipSize = 'S' | 'M' | 'L';

/**
 * Visual/interactive state of the Chip.
 * - `Default`  — resting state
 * - `Hover`    — CSS handles this automatically; pass only to force override
 * - `Disabled` — chip unavailable; always supply a `tooltip` explaining why
 */
export type ChipState = 'Default' | 'Hover' | 'Disabled';

/**
 * Props for the **Chip** component.
 *
 * @example Filter bar
 * ```tsx
 * <Chip size="M" isSelected={true} onChange={(selected) => setFilter(selected)}>
 *   Active
 * </Chip>
 * ```
 *
 * @example Disabled with tooltip (required)
 * ```tsx
 * <Chip state="Disabled" tooltip="No data available for this filter">
 *   Archived
 * </Chip>
 * ```
 */
export interface ChipProps extends BaseComponentProps, InteractiveEventHandlers<HTMLButtonElement> {
  /** The label rendered inside the chip. */
  children: React.ReactNode;

  /**
   * Size of the chip.
   * - `S` — compact (10px font, auto height)
   * - `M` — default (14px font, 32px height)
   * - `L` — large (16px font, 40px height)
   * @default 'M'
   */
  size?: ChipSize;

  /**
   * Whether the chip is currently in the selected/active state.
   * Selected chips render with primary-blue fill (`fill-primary-2`) and `stroke-focus` border.
   * @default false
   */
  isSelected?: boolean;

  /**
   * Show a leading info-circle icon. Renders a linear (outline) icon when unselected
   * and a bold (filled) icon when selected.
   * @default false
   */
  showIcon?: boolean;

  /**
   * Visual and interactive state.
   * - `Default`  — resting unselected state
   * - `Hover`    — hovered (CSS handles automatically; pass to force)
   * - `Disabled` — unavailable; always supply `tooltip`
   * @default 'Default'
   */
  state?: ChipState;

  /**
   * Convenience handler invoked with the **new** selected state after each click.
   * Prefer over `onClick` when you only need the toggled boolean.
   */
  onChange?: (isSelected: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Tooltip text shown via native `title` attribute.
   * **Required** when `state === 'Disabled'` per DCDS accessibility rules —
   * always explain why the chip is unavailable.
   */
  tooltip?: string;

  /** Accessible label for screen readers. Defaults to text content of `children`. */
  'aria-label'?: string;
}

/**
 * Props for the **ChipGroup** subcomponent.
 *
 * Wraps a set of Chip elements in a horizontally-wrapping flex container
 * with correct `gap-8` spacing (per DCDS layout constraints).
 *
 * @example
 * ```tsx
 * <ChipGroup aria-label="Filter by status">
 *   <Chip isSelected>All</Chip>
 *   <Chip>Active</Chip>
 *   <Chip>Pending</Chip>
 * </ChipGroup>
 * ```
 */
export interface ChipGroupProps {
  /** `Chip` elements to render inside the group. */
  children: React.ReactNode;

  /** Additional CSS class name(s) for layout-only overrides. */
  className?: string;

  /** `data-testid` attribute for the group container. */
  dataTestId?: string;

  /**
   * `role` attribute for the group container.
   * @default 'group'
   */
  role?: string;

  /**
   * Accessible label describing the filter category.
   * @example 'Filter by status'
   */
  'aria-label'?: string;
}
