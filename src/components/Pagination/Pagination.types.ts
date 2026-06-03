/**
 * Pagination — public TypeScript types.
 *
 * Source spec: Pagination.ai.md + DripDesign.md (Rule 8 · Navigation).
 * Figma: https://www.figma.com/design/P52nmDshYaKr963q1zBwQj · node 640:9190
 * Playground node: 1558:3888
 */

import type { BaseComponentProps, InteractiveEventHandlers } from '../shared/types';

/**
 * Controls which navigation buttons are active.
 *
 * - `"First page"` — Previous and Skip-First disabled; Next and Skip-Last enabled.
 * - `"Middle pages"` — All buttons enabled.
 * - `"Last pages"` — Next and Skip-Last disabled; Previous and Skip-First enabled.
 * - `"-"` — Unknown / loading state; all buttons disabled.
 *
 * **Rule:** `pageStatus` must always match the actual current page.
 */
export type PageStatus = 'First page' | 'Middle pages' | 'Last pages' | '-';

/**
 * Props for the **Pagination** component.
 *
 * ### Rules (DripDesign.md · Navigation · Pagination)
 * - `pageStatus` must always reflect the real current position.
 * - `showPageNumber={true}` renders truncated page numbers (never all pages for large sets).
 * - Always display a record-count label nearby (e.g. "Showing 41–60 of 248 records").
 * - Place below a data table, centre or right aligned.
 * - Do NOT use `PageNumber` directly — it is internal.
 *
 * @see DripDesign.md · Rule 8 · Pagination
 * @see Pagination.ai.md
 * @see Figma node 640:9190 — Design Language System (Claude)
 *
 * @example Standard pagination on a middle page
 * ```tsx
 * <Pagination
 *   pageStatus="Middle pages"
 *   showPageNumber
 *   currentPage={6}
 *   totalPages={12}
 *   onPageChange={handlePageChange}
 * />
 * ```
 *
 * @example Minimal (Prev / Next only — no page numbers)
 * ```tsx
 * <Pagination
 *   pageStatus="Middle pages"
 *   showPageNumber={false}
 *   onPrev={handlePrev}
 *   onNext={handleNext}
 * />
 * ```
 */
export interface PaginationProps
  extends BaseComponentProps,
    Pick<
      InteractiveEventHandlers<HTMLElement>,
      'onFocus' | 'onBlur' | 'onMouseEnter' | 'onMouseLeave'
    > {
  /**
   * Required. Controls button enabled/disabled states.
   * Must always reflect the true current page position.
   */
  pageStatus: PageStatus;

  /**
   * When `true`, renders individual page-number buttons between Prev and Next.
   * Uses `...` truncation for large page ranges — never renders all pages.
   * When `false`, renders only Previous / Next (and Skip) buttons.
   * @default true
   */
  showPageNumber?: boolean;

  /**
   * The currently active page number (1-based).
   * Required when `showPageNumber={true}` for correct active highlighting.
   * Inferred from `pageStatus` when omitted (1 for "First page", `totalPages` for "Last pages").
   */
  currentPage?: number;

  /**
   * Total number of pages.
   * Required when `showPageNumber={true}` for correct truncation rendering.
   */
  totalPages?: number;

  // ── Page number handlers ────────────────────────────────────────────────────

  /**
   * Fired when the user clicks a numbered page button.
   * Receives the target page number (1-based).
   */
  onPageChange?: (page: number) => void;

  /** Fired when the pointer enters a page-number button. Receives the page number. */
  onPageMouseEnter?: (page: number) => void;

  /** Fired when the pointer leaves a page-number button. Receives the page number. */
  onPageMouseLeave?: (page: number) => void;

  // ── Previous button handlers ────────────────────────────────────────────────

  /**
   * Fired when the user clicks the Previous (←) button.
   * Only fires when `pageStatus` is not `"First page"`.
   */
  onPrev?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired when the pointer enters the Previous button. */
  onPrevMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired when the pointer leaves the Previous button. */
  onPrevMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;

  // ── Next button handlers ────────────────────────────────────────────────────

  /**
   * Fired when the user clicks the Next (→) button.
   * Only fires when `pageStatus` is not `"Last pages"`.
   */
  onNext?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired when the pointer enters the Next button. */
  onNextMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired when the pointer leaves the Next button. */
  onNextMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;

  // ── Skip-First button handlers ──────────────────────────────────────────────

  /**
   * Fired when the user clicks the Skip-to-First (⏮) button.
   * Only fires when `pageStatus` is not `"First page"`.
   */
  onSkipFirst?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired when the pointer enters the Skip-to-First button. */
  onSkipFirstMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired when the pointer leaves the Skip-to-First button. */
  onSkipFirstMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;

  // ── Skip-Last button handlers ───────────────────────────────────────────────

  /**
   * Fired when the user clicks the Skip-to-Last (⏭) button.
   * Only fires when `pageStatus` is not `"Last pages"`.
   */
  onSkipLast?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired when the pointer enters the Skip-to-Last button. */
  onSkipLastMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired when the pointer leaves the Skip-to-Last button. */
  onSkipLastMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;

  // ── General nav handler ─────────────────────────────────────────────────────

  /**
   * Fired when the user clicks any navigation button (Prev, Next, Skip-First, Skip-Last).
   * Fires in addition to the specific per-button handlers.
   */
  onNavClick?: React.MouseEventHandler<HTMLButtonElement>;
}
