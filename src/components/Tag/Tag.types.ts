/**
 * Tag — public TypeScript types.
 *
 * Source spec: Tag.ai.md + Tag.stories.mdx (figmaNode 387:23150).
 *
 * Use Tag for **user-added, removable labels** with a dismiss (×) affordance.
 * ❌ NOT for non-interactive status labels — use `Badge`.
 * ❌ NOT for interactive toggleable filters — use `Chip`.
 * ❌ NOT for form multi-select options — use `Checkbox`.
 */

import type React from 'react';
import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../shared/types';

/**
 * Size variant for the Tag component.
 * - `S` — compact: dense layouts with limited vertical space
 * - `M` — default: search bars, filter rows, record detail views
 */
export type TagSize = 'S' | 'M';

/**
 * State of the Tag.
 * - `Default`  — active, can be dismissed by the user
 * - `Disabled` — locked, cannot be dismissed; explain the constraint in nearby text
 */
export type TagState = 'Default' | 'Disabled';

/**
 * Props for the **Tag** component.
 *
 * Tags **must always** have an `onRemove` handler — a Tag with no remove handler
 * is non-functional. If the label cannot be removed, use `Badge` instead.
 *
 * @example User-applied search filter
 * ```tsx
 * <Tag size="M" state="Default" onRemove={() => removeFilter('status:active')}>
 *   Status: Active
 * </Tag>
 * ```
 *
 * @example Multiple tags in a wrapping row
 * ```tsx
 * <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-4)' }}>
 *   <Tag size="M" onRemove={() => remove('loans')}>Loans</Tag>
 *   <Tag size="M" onRemove={() => remove('q1')}>Q1 2026</Tag>
 * </div>
 * ```
 */
export interface TagProps extends BaseComponentProps {
  /** The label text (user-added content). */
  children: ReactNode;

  /**
   * Size of the tag.
   * - `S` — compact, dense layouts
   * - `M` — default, search bars and filter rows
   * @default 'M'
   */
  size?: TagSize;

  /**
   * State of the tag.
   * - `Default`  — can be dismissed
   * - `Disabled` — locked, cannot be dismissed
   * @default 'Default'
   */
  state?: TagState;

  /**
   * Show the leading star icon before the label.
   * @default true
   */
  showIcon?: boolean;

  /**
   * Called when the user clicks the dismiss (×) button.
   * **Required for removable tags** — omit only if state is `Disabled`.
   * A Tag without `onRemove` renders no close button.
   */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Accessible label for screen readers when tag text alone is insufficient. */
  'aria-label'?: string;
}
