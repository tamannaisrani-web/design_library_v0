/**
 * Breadcrumbs — public TypeScript types.
 *
 * Source spec: Breadcrumbs.ai.md + DripDesign.md (Rule 8 · Navigation).
 * Figma: https://www.figma.com/design/P52nmDshYaKr963q1zBwQj · node 460:12313
 */

import type { BaseComponentProps, InteractiveEventHandlers } from '../shared/types';

/**
 * A single breadcrumb segment.
 *
 * @example Ancestor link (position=Previous)
 * ```ts
 * { label: 'Loans', href: '/loans' }
 * ```
 *
 * @example Current page (position=Current) — non-interactive plain text
 * ```ts
 * { label: 'Loan #1042', current: true }
 * ```
 */
export interface BreadcrumbItem {
  /** Visible text for this segment. For `showHome` on the first item, used as the accessible name. */
  label: string;
  /**
   * Navigation target. Required for all ancestor (Previous) items.
   * Omit on the current page item.
   */
  href?: string;
  /**
   * Marks this as the current page — renders as plain text in `color/text/primary`,
   * not a link. Only the last item should carry `current: true`.
   */
  current?: boolean;
  /** Click handler for ancestor link items and the home icon link. */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Props for the **Breadcrumbs** component.
 *
 * Maximum 5 items — truncate middle items with `…` if the hierarchy is deeper.
 *
 * @example 3-level with home icon
 * ```tsx
 * <Breadcrumbs
 *   showHome
 *   items={[
 *     { label: 'Loans', href: '/loans' },
 *     { label: 'Active', href: '/loans/active' },
 *     { label: 'Loan #1042', current: true },
 *   ]}
 * />
 * ```
 */
export interface BreadcrumbsProps
  extends BaseComponentProps,
    Pick<InteractiveEventHandlers<HTMLElement>, 'onFocus' | 'onBlur' | 'onMouseEnter' | 'onMouseLeave'> {
  /**
   * Breadcrumb segments in hierarchy order, from root to current page.
   * - Maximum **5 items**. Collapse deeper hierarchies with a `…` item.
   * - The last item should carry `current: true` — it renders as plain text.
   * - All other items should have an `href` so they navigate back to their level.
   */
  items: BreadcrumbItem[];

  /**
   * When `true`, the first item renders as the `_BaseHomeIcon` (16×16 home icon link)
   * instead of a text label. Do NOT add a "Home" text label alongside the icon.
   * @default false
   */
  showHome?: boolean;
}
