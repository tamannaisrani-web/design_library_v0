import React from 'react';
import type { PaginationProps, PageStatus } from './Pagination.types';
import './Pagination.css';

// ─── Icons ────────────────────────────────────────────────────────────────────
// Paths sourced directly from icons/svg/linear/ in this repository.
// All icons: 16×16 viewport over a 24×24 coordinate space, stroke-based so
// they inherit `currentColor` from the parent button.

// Prev / Next: simple chevron-left / chevron-right (vuesax outline/arrow style).
// Bold variant on :active is handled via CSS stroke-width increase.
const ArrowLeftIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M15 19.92L8.48 13.4C7.71 12.63 7.71 11.37 8.48 10.6L15 4.08"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Skip-to-First: vuesax/linear/previous — left-pointing play-triangle + left vertical bar.
// SVG path sourced from icons/svg/linear/previous.svg in this repository.
const SkipFirstIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M20.24 7.21999V16.79C20.24 18.75 18.11 19.98 16.41 19L12.26 16.61L8.10996 14.21C6.40996 13.23 6.40996 10.78 8.10996 9.79998L12.26 7.39998L16.41 5.01C18.11 4.03 20.24 5.24999 20.24 7.21999Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.75977 18.1802V5.82025"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Skip-to-Last: vuesax/linear/next — right-pointing play-triangle + right vertical bar.
// SVG path sourced from icons/svg/linear/next.svg in this repository.
const SkipLastIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M3.75977 7.21999V16.79C3.75977 18.75 5.88975 19.98 7.58975 19L11.7397 16.61L15.8898 14.21C17.5898 13.23 17.5898 10.78 15.8898 9.79998L11.7397 7.39998L7.58975 5.01C5.88975 4.03 3.75977 5.24999 3.75977 7.21999Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.2397 18.1802V5.82025"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Truncation ellipsis: three horizontal hollow-ring dots — vuesax/outline/more style.
// The Figma _Truncation screenshot (node 640:9171) shows ○ ○ ○ (three horizontal hollow circles).
// Each dot is a filled donut (outer ring minus inner hole) path.
// Paths are the outline/more donut shape translated to cy=12, at cx=5, cx=12, cx=19.
const MoreIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    {/* Left dot at (5, 12) */}
    <path
      d="M2.25 12C2.25 10.48 3.48 9.25 5 9.25C6.52 9.25 7.75 10.48 7.75 12C7.75 13.52 6.52 14.75 5 14.75C3.48 14.75 2.25 13.52 2.25 12ZM6.25 12C6.25 11.31 5.69 10.75 5 10.75C4.31 10.75 3.75 11.31 3.75 12C3.75 12.69 4.31 13.25 5 13.25C5.69 13.25 6.25 12.69 6.25 12Z"
      fill="currentColor"
    />
    {/* Middle dot at (12, 12) */}
    <path
      d="M9.25 12C9.25 10.48 10.48 9.25 12 9.25C13.52 9.25 14.75 10.48 14.75 12C14.75 13.52 13.52 14.75 12 14.75C10.48 14.75 9.25 13.52 9.25 12ZM13.25 12C13.25 11.31 12.69 10.75 12 10.75C11.31 10.75 10.75 11.31 10.75 12C10.75 12.69 11.31 13.25 12 13.25C12.69 13.25 13.25 12.69 13.25 12Z"
      fill="currentColor"
    />
    {/* Right dot at (19, 12) */}
    <path
      d="M16.25 12C16.25 10.48 17.48 9.25 19 9.25C20.52 9.25 21.75 10.48 21.75 12C21.75 13.52 20.52 14.75 19 14.75C17.48 14.75 16.25 13.52 16.25 12ZM20.25 12C20.25 11.31 19.69 10.75 19 10.75C18.31 10.75 17.75 11.31 17.75 12C17.75 12.69 18.31 13.25 19 13.25C19.69 13.25 20.25 12.69 20.25 12Z"
      fill="currentColor"
    />
  </svg>
);

// ─── _PageNumber ──────────────────────────────────────────────────────────────

/**
 * @internal
 * _PageNumber — a single page-number button inside the Pagination component.
 * Do NOT use directly outside of Pagination.
 *
 * Figma variant set (640:9184 – 640:9189):
 * - Default: `color/surface/1` bg, `color/text/primary` text, regular weight.
 * - Selected: `color/fill/action` bg, `color/text/invert` text, bold weight.
 * - Hover: `color/fill/secondary-0` bg (CSS).
 */
export const _PageNumber: React.FC<{
  page: number;
  isActive: boolean;
  onClick?: (page: number) => void;
  onMouseEnter?: (page: number) => void;
  onMouseLeave?: (page: number) => void;
}> = ({ page, isActive, onClick, onMouseEnter, onMouseLeave }) => {
  const classes = [
    'dcds-Pagination__btn',
    'dcds-Pagination__page',
    isActive ? 'dcds-Pagination__page--active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-current={isActive ? 'page' : undefined}
      aria-label={`Page ${page}`}
      onClick={() => onClick?.(page)}
      onMouseEnter={() => onMouseEnter?.(page)}
      onMouseLeave={() => onMouseLeave?.(page)}
    >
      {page}
    </button>
  );
};

_PageNumber.displayName = '_PageNumber';

// ─── _Truncation ─────────────────────────────────────────────────────────────

/**
 * @internal
 * _Truncation — non-interactive "…" indicator between page-number ranges.
 * Indicates hidden pages but has no hover or click states.
 * Do NOT use directly outside of Pagination.
 */
export const _Truncation: React.FC<{
  side: 'left' | 'right';
}> = ({ side }) => (
  <span
    className="dcds-Pagination__btn dcds-Pagination__truncation"
    aria-hidden="true"
    data-side={side}
  >
    <span className="dcds-Pagination__icon">
      <MoreIcon />
    </span>
  </span>
);

_Truncation.displayName = '_Truncation';

// ─── Page range computation ───────────────────────────────────────────────────

type PageItem = number | 'left-ellipsis' | 'right-ellipsis';

/**
 * Builds the 7-slot page-number row, matching the Figma 640:9190 layout:
 *
 *   [first] [5 dynamic slots] [last]
 *
 * The 5 dynamic slots between the fixed first/last page numbers are each
 * either a `_PageNumber` or `_Truncation` sub-component.
 *
 * ### Truncation rules (from design + user spec)
 * - `_Truncation` is only shown where **2 or more** consecutive pages are hidden.
 * - When only **1** page sits between two visible pages, that page is shown directly
 *   instead of a truncation (e.g. no `1 ··· 2`, just `1 2`).
 * - Truncation is **never** placed immediately adjacent to the first or last page —
 *   the immediate neighbour page (2 or totalPages−1) must always be visible.
 *
 * ### Three layout zones
 * - **Near start** (currentPage ≤ 4): `[1, 2, 3, 4, 5, ···, last]`
 * - **Near end** (currentPage ≥ totalPages−3): `[1, ···, last-4, last-3, last-2, last-1, last]`
 * - **Middle**: `[1, ···, current-1, current, current+1, ···, last]`
 *
 * For totalPages ≤ 7 all pages are shown without truncation.
 *
 * @example currentPage=6, totalPages=12 → [1,'left-ellipsis',5,6,7,'right-ellipsis',12]
 * @example currentPage=1, totalPages=12 → [1,2,3,4,5,'right-ellipsis',12]
 * @example currentPage=12,totalPages=12 → [1,'left-ellipsis',8,9,10,11,12]
 */
function buildPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 1) return [1];
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  // Near start — show pages 1–5 consecutively then right truncation.
  // Handles currentPage 1, 2, 3, 4 (page 2 is always visible next to page 1).
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'right-ellipsis', totalPages];
  }

  // Near end — show left truncation then pages (last-4)–last consecutively.
  // Handles currentPage last, last-1, last-2, last-3 (page last-1 always visible next to last).
  if (currentPage >= totalPages - 3) {
    return [1, 'left-ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  // Middle — both truncations shown; each hides ≥ 2 pages so truncation is valid.
  return [1, 'left-ellipsis', currentPage - 1, currentPage, currentPage + 1, 'right-ellipsis', totalPages];
}

function resolveCurrentPage(pageStatus: PageStatus, currentPage?: number, totalPages?: number): number {
  if (currentPage !== undefined) return currentPage;
  if (pageStatus === 'First page') return 1;
  if (pageStatus === 'Last pages') return totalPages ?? 1;
  return 1;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

/**
 * **Pagination** — navigation controls for large datasets split across pages.
 *
 * ### Rules (DripDesign.md · Navigation · Pagination)
 * - `pageStatus` must always match the actual current page.
 * - `showPageNumber={true}` renders truncated page numbers — never render all pages manually.
 * - Always place a record-count label nearby: "Showing 41–60 of 248 records".
 * - Place below a data table, centre or right aligned.
 * - Never use `_PageNumber` or `_Truncation` directly in product code.
 *
 * @see DripDesign.md · Rule 8 · Navigation · Pagination
 * @see Pagination.ai.md
 * @see Figma node 640:9190 — Design Language System (Claude)
 *
 * @example Middle page with numbers
 * ```tsx
 * <Pagination
 *   pageStatus="Middle pages"
 *   showPageNumber
 *   currentPage={6}
 *   totalPages={12}
 *   onPageChange={setPage}
 * />
 * ```
 *
 * @example First page
 * ```tsx
 * <Pagination
 *   pageStatus="First page"
 *   showPageNumber
 *   currentPage={1}
 *   totalPages={12}
 *   onPageChange={setPage}
 * />
 * ```
 *
 * @example Minimal (no page numbers)
 * ```tsx
 * <Pagination
 *   pageStatus="Middle pages"
 *   showPageNumber={false}
 *   onPrev={handlePrev}
 *   onNext={handleNext}
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  pageStatus,
  showPageNumber = true,
  currentPage: currentPageProp,
  totalPages,
  // Page number handlers
  onPageChange,
  onPageMouseEnter,
  onPageMouseLeave,
  // Prev handlers
  onPrev,
  onPrevMouseEnter,
  onPrevMouseLeave,
  // Next handlers
  onNext,
  onNextMouseEnter,
  onNextMouseLeave,
  // Skip-First handlers
  onSkipFirst,
  onSkipFirstMouseEnter,
  onSkipFirstMouseLeave,
  // Skip-Last handlers
  onSkipLast,
  onSkipLastMouseEnter,
  onSkipLastMouseLeave,
  // General nav handler
  onNavClick,
  // Container handlers
  className,
  id,
  dataTestId,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isFirstPage = pageStatus === 'First page';
  const isLastPage = pageStatus === 'Last pages';
  const isUnknown = pageStatus === '-';
  const isDisabledPrev = isFirstPage || isUnknown;
  const isDisabledNext = isLastPage || isUnknown;

  const resolvedCurrentPage = resolveCurrentPage(pageStatus, currentPageProp, totalPages);
  const resolvedTotalPages = totalPages ?? 1;

  const pageItems: PageItem[] =
    showPageNumber && resolvedTotalPages > 0
      ? buildPageItems(resolvedCurrentPage, resolvedTotalPages)
      : [];

  const classes = ['dcds-Pagination', className ?? ''].filter(Boolean).join(' ');

  const handlePrev: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onPrev?.(e);
    onNavClick?.(e);
  };

  const handleNext: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onNext?.(e);
    onNavClick?.(e);
  };

  const handleSkipFirst: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onSkipFirst?.(e);
    onNavClick?.(e);
  };

  const handleSkipLast: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onSkipLast?.(e);
    onNavClick?.(e);
  };

  return (
    <nav
      id={id}
      className={classes}
      aria-label="Pagination"
      data-testid={dataTestId}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Skip-to-First — vuesax/linear/previous (play-triangle + left bar) */}
      <button
        type="button"
        className="dcds-Pagination__btn dcds-Pagination__nav"
        aria-label="Skip to first page"
        disabled={isDisabledPrev}
        aria-disabled={isDisabledPrev || undefined}
        onClick={handleSkipFirst}
        onMouseEnter={onSkipFirstMouseEnter}
        onMouseLeave={onSkipFirstMouseLeave}
      >
        <span className="dcds-Pagination__icon">
          <SkipFirstIcon />
        </span>
      </button>

      {/* Previous */}
      <button
        type="button"
        className="dcds-Pagination__btn dcds-Pagination__nav"
        aria-label="Previous page"
        disabled={isDisabledPrev}
        aria-disabled={isDisabledPrev || undefined}
        onClick={handlePrev}
        onMouseEnter={onPrevMouseEnter}
        onMouseLeave={onPrevMouseLeave}
      >
        <span className="dcds-Pagination__icon">
          <ArrowLeftIcon />
        </span>
      </button>

      {/* Page numbers with ellipsis */}
      {showPageNumber && pageItems.length > 0 && (
        <div className="dcds-Pagination__page-numbers">
          {pageItems.map((item, i) => {
            if (item === 'left-ellipsis' || item === 'right-ellipsis') {
              return (
                <_Truncation
                  key={item}
                  side={item === 'left-ellipsis' ? 'left' : 'right'}
                />
              );
            }
            return (
              <_PageNumber
                key={item}
                page={item}
                isActive={item === resolvedCurrentPage}
                onClick={onPageChange}
                onMouseEnter={onPageMouseEnter}
                onMouseLeave={onPageMouseLeave}
              />
            );
          })}
        </div>
      )}

      {/* Next */}
      <button
        type="button"
        className="dcds-Pagination__btn dcds-Pagination__nav"
        aria-label="Next page"
        disabled={isDisabledNext}
        aria-disabled={isDisabledNext || undefined}
        onClick={handleNext}
        onMouseEnter={onNextMouseEnter}
        onMouseLeave={onNextMouseLeave}
      >
        <span className="dcds-Pagination__icon">
          <ArrowRightIcon />
        </span>
      </button>

      {/* Skip-to-Last — vuesax/linear/next (play-triangle + right bar) */}
      <button
        type="button"
        className="dcds-Pagination__btn dcds-Pagination__nav"
        aria-label="Skip to last page"
        disabled={isDisabledNext}
        aria-disabled={isDisabledNext || undefined}
        onClick={handleSkipLast}
        onMouseEnter={onSkipLastMouseEnter}
        onMouseLeave={onSkipLastMouseLeave}
      >
        <span className="dcds-Pagination__icon">
          <SkipLastIcon />
        </span>
      </button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';
