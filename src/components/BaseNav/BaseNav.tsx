import React from 'react';
import type { BaseNavProps } from './BaseNav.types';
import './BaseNav.css';

/**
 * **BaseNav** — subsection row rendered inside an expanded `NavElement` accordion.
 *
 * Represents a sub-destination within a section (e.g. Monthly / Quarterly / Annual
 * inside a Payments `NavElement`). Must only be used as a child of a `NavElement`
 * that has `showDropdown={true}` and `style="Selected"`.
 *
 * ### Constraints (NavElement.ai.md)
 * - Only **one** `BaseNav` should have `property1="Selected"` within any expanded NavElement.
 * - Text colour is `color/text/subdued` (`#4b4b4b`) — never `color/text/primary`.
 * - `property1="Hover"` is CSS-driven — **never** set it in code.
 *
 * @see NavElement.ai.md · BaseNav section
 * @see Figma node 694:17486 — Design Language System (Claude)
 *
 * @example Default subsection (idle)
 * ```tsx
 * <BaseNav property1="Default" name="Monthly" />
 * ```
 *
 * @example Selected subsection (current sub-route)
 * ```tsx
 * <BaseNav property1="Selected" name="Quarterly" />
 * ```
 */
export const BaseNav: React.FC<BaseNavProps> = ({
  property1 = 'Default',
  name = 'SubSection',
  href,
  className,
  id,
  dataTestId,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
}) => {
  const isSelected = property1 === 'Selected';

  const classes = [
    'dcds-BaseNav',
    isSelected ? 'dcds-BaseNav--selected' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    id,
    className: classes,
    'aria-current': isSelected ? ('page' as const) : undefined,
    'data-testid': dataTestId,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onKeyUp,
  };

  /* Render as <a> when href is provided; otherwise <button> */
  if (href) {
    return (
      <a
        {...sharedProps}
        href={href}
        onClick={onClick}
      >
        {name}
      </a>
    );
  }

  return (
    <button
      {...sharedProps}
      type="button"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

BaseNav.displayName = 'BaseNav';
