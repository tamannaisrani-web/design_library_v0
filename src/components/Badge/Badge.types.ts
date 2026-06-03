/**
 * Badge — public TypeScript types.
 *
 * Source spec: Badge.ai.md + Badge.stories.mdx (figmaNode 349:2470).
 *
 * Use Badge for **short, non-interactive, read-only status labels**.
 * ❌ NOT for interactive filter chips — use `Chip`.
 * ❌ NOT for removable/dismissible labels — use `Tag`.
 * ❌ NOT for page-level feedback messages — use `Alert`.
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../shared/types';

/**
 * Size variant for the Badge component.
 * - `S` — smallest: dense data tables, compact lists (12px Bold)
 * - `M` — default: cards, lists, detail views (14px Bold)
 * - `L` — largest: headers, hero sections, high-emphasis labels (16px Bold)
 */
export type BadgeSize = 'S' | 'M' | 'L';

/**
 * Visual weight of the Badge.
 * - `subtle`  — light tinted background, coloured text (default)
 * - `intense` — bold filled background, inverted text (use sparingly)
 */
export type BadgeEmphasis = 'subtle' | 'intense';

/**
 * Semantic state of the Badge. Drives background colour, border, and text colour.
 * - `neutral` — grey, no semantic meaning (e.g. "Draft", "Archived")
 * - `info`    — blue, informational/passive (e.g. "In review", "Pending")
 * - `warning` — amber, caution/attention needed (e.g. "Expiring soon")
 * - `error`   — orange/red, problem/failed/blocked (e.g. "Rejected", "Failed")
 * - `success` — green, positive/complete/approved (e.g. "Active", "Paid")
 */
export type BadgeState = 'neutral' | 'info' | 'warning' | 'error' | 'success';

/**
 * Props for the **Badge** component.
 *
 * @example Record status
 * ```tsx
 * <Badge size="M" emphasis="subtle" state="success">Active</Badge>
 * <Badge size="M" emphasis="subtle" state="info">In review</Badge>
 * <Badge size="M" emphasis="subtle" state="error">Rejected</Badge>
 * <Badge size="M" emphasis="subtle" state="neutral">Draft</Badge>
 * ```
 *
 * @example High-emphasis (use sparingly)
 * ```tsx
 * <Badge size="M" emphasis="intense" state="error">Overdue</Badge>
 * ```
 *
 * @example In a data table (always use size="S")
 * ```tsx
 * <Badge size="S" emphasis="subtle" state="warning">Expiring soon</Badge>
 * ```
 */
export interface BadgeProps extends BaseComponentProps {
  /**
   * The short label text (1–3 words maximum).
   * Longer content should use a `Tag` or inline description instead.
   */
  children: ReactNode;

  /**
   * Size of the badge.
   * - `S` — 12px Bold, compact tables and lists
   * - `M` — 14px Bold, default for most contexts
   * - `L` — 16px Bold, headers and hero sections only
   * @default 'M'
   */
  size?: BadgeSize;

  /**
   * Visual emphasis level.
   * - `subtle`  — light tint bg + coloured text (default, use in most cases)
   * - `intense` — filled bg + inverted text (use sparingly for max emphasis)
   * @default 'subtle'
   */
  emphasis?: BadgeEmphasis;

  /**
   * Semantic state driving colour.
   * Use semantically correct values — screen readers rely on the semantic intent.
   * @default 'neutral'
   */
  state?: BadgeState;

  /**
   * Show a leading state icon (bulk style for subtle, bold style for intense).
   * Icon type is determined by `state`: neutral=⚠, info=ⓘ, warning=↻, error=✕, success=✓.
   * @default true
   */
  showIcon?: boolean;

  /** Accessible label for screen readers when badge text alone is insufficient. */
  'aria-label'?: string;
}
