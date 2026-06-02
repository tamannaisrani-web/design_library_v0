import React from 'react';
import type { BreadcrumbItemProps, BreadcrumbsProps } from './Breadcrumbs.types';
import './Breadcrumbs.css';

// ─── _BaseHomeIcon ────────────────────────────────────────────────────────────
// SVG paths sourced from icons/svg/linear/home-2.svg (default) and
// icons/svg/bold/home-2.svg (hover). CSS swaps between them on :hover.
// Do NOT use this component directly outside of Breadcrumbs.

const HomeLinearSvg: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17.99V14.99"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HomeBoldSvg: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M20.04 6.82L14.28 2.79C12.71 1.69 10.3 1.75 8.78999 2.92L3.77999 6.83C2.77999 7.61 1.98999 9.21 1.98999 10.47V17.37C1.98999 19.92 4.05999 22 6.60999 22H17.39C19.94 22 22.01 19.93 22.01 17.38V10.6C22.01 9.25 21.14 7.59 20.04 6.82ZM12.75 18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * @internal
 * _BaseHomeIcon — 16×16 home icon for the first breadcrumb slot.
 *
 * Mirrors all four Figma variants:
 * - `position="Previous"` → `<a>` link, `color/icon/secondary` (Sky Blue-500).
 *   Swaps linear→bold SVG on hover.
 * - `position="Current"` → non-interactive `<div>`, `color/icon/primary` (Noble Blue-500).
 *   Swaps linear→bold SVG on hover. Not a link — current page cannot navigate to itself.
 *
 * Do NOT use directly outside Breadcrumbs.
 */
export const _BaseHomeIcon: React.FC<{
  position?: 'Previous' | 'Current';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}> = ({ position = 'Previous', href, onClick }) => {
  const icons = (
    <>
      <span className="dcds-BaseHomeIcon__linear"><HomeLinearSvg /></span>
      <span className="dcds-BaseHomeIcon__bold"><HomeBoldSvg /></span>
    </>
  );

  if (position === 'Current') {
    return (
      <div className="dcds-BaseHomeIcon--current" aria-label="Home">
        {icons}
      </div>
    );
  }

  return (
    <a
      className="dcds-BaseHomeIcon"
      href={href ?? '#'}
      aria-label="Home"
      onClick={onClick}
    >
      {icons}
    </a>
  );
};

_BaseHomeIcon.displayName = '_BaseHomeIcon';

// ─── _BaseBreadcrumbItems ─────────────────────────────────────────────────────
// Mirrors the Figma sub-component: States=Default/Hover × Position=Previous/Current.
// Do NOT use directly outside Breadcrumbs.

/**
 * @internal
 * _BaseBreadcrumbItems — one text segment in the breadcrumb trail.
 * - `position="Previous"`: renders as an `<a>` link in `color/text/secondary`.
 * - `position="Current"`: renders as a `<span>` in `color/text/primary`, non-interactive.
 * Do NOT use directly outside Breadcrumbs.
 */
export const _BaseBreadcrumbItems: React.FC<{
  label: string;
  position: 'Previous' | 'Current';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}> = ({ label, position, href, onClick }) => {
  if (position === 'Current') {
    return (
      <span className="dcds-BaseBreadcrumbItems--current" aria-current="page">
        {label}
      </span>
    );
  }

  return (
    <a
      className="dcds-BaseBreadcrumbItems--previous"
      href={href ?? '#'}
      onClick={onClick}
    >
      {label}
    </a>
  );
};

_BaseBreadcrumbItems.displayName = '_BaseBreadcrumbItems';

// ─── Separator ────────────────────────────────────────────────────────────────

const Separator: React.FC = () => (
  <li aria-hidden="true">
    <span className="dcds-Breadcrumbs__separator">/</span>
  </li>
);

// ─── Breadcrumbs ─────────────────────────────────────────────────────────────

/**
 * **Breadcrumbs** — shows the user's current location in a multi-level hierarchy
 * and allows navigation back to parent levels.
 *
 * ### Rules (DripDesign.md · Navigation · Breadcrumbs)
 * - Maximum **5 items** — collapse deeper hierarchies with a `…` item.
 * - The **current page** item (last) is plain text (`color/text/primary`), not a link.
 * - All **ancestor** items are links in `color/text/secondary`.
 * - `showHome={true}` replaces the first text label with a home icon (`_BaseHomeIcon`).
 * - Never render on the home/root page — there is no parent to navigate to.
 *
 * @see DripDesign.md · Rule 8 · Navigation · Breadcrumbs
 * @see Breadcrumbs.ai.md
 * @see Figma node 460:12313 — Design Language System (Claude)
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
 *
 * @example 2-level without home icon
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: 'Applications', href: '/applications' },
 *     { label: 'Application #204', current: true },
 *   ]}
 * />
 * ```
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHome = false,
  className,
  id,
  dataTestId,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (items.length > 5) {
      // eslint-disable-next-line no-console
      console.warn(
        `[dcds:Breadcrumbs] Maximum 5 items allowed. Received ${items.length}. ` +
          'Collapse middle items into a "…" truncation item.',
      );
    }
  }

  const classes = ['dcds-Breadcrumbs', className ?? ''].filter(Boolean).join(' ');

  return (
    <nav
      id={id}
      className={classes}
      aria-label="Breadcrumb"
      data-testid={dataTestId}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ol className="dcds-Breadcrumbs__list">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          const position: 'Previous' | 'Current' = isLast ? 'Current' : 'Previous';

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              {!isFirst && <Separator />}
              <li>
                {isFirst && showHome ? (
                  <_BaseHomeIcon position={position} href={item.href} onClick={item.onClick} />
                ) : (
                  <_BaseBreadcrumbItems
                    label={item.label}
                    position={position}
                    href={item.href}
                    onClick={item.onClick}
                  />
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
