import React from 'react';
import type { AvatarGroupProps } from './AvatarGroup.types';
import { _BaseMenu } from '../DropdownButton/_BaseMenu';
import './AvatarGroup.css';
import '../DropdownButton/DropdownButton.css';

/**
 * Dropdown chevron — sourced from icons/svg/linear/arrow-down.svg.
 * Figma: vuesax/linear/arrow-down (node 332:14052).
 * Rotated 180° via CSS when expanded (see .dcds-AvatarGroup--expanded).
 * Uses currentColor to inherit --color-icon-primary from the parent.
 */
const ChevronIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * **AvatarGroup** — compact profile widget for navigation bars and sidebars.
 *
 * Renders a single Medium Initial Circle avatar alongside an optional name,
 * designation, and dropdown chevron. The chevron direction and text weight flip
 * when `isExpanded` is true.
 *
 * > **Note on Figma naming:** the Figma component is named `Avatar grgroup` (typo).
 * > Always use `AvatarGroup` in code.
 *
 * @see AvatarGroup.ai.md · DripDesign.md RULE 8
 * @see Figma node 645:9512 — Design Language System (Claude)
 *
 * @example Standard — full width with name, designation and chevron
 * ```tsx
 * <AvatarGroup
 *   initials="AM"
 *   name="Alex Martin"
 *   designation="Product Designer"
 *   displayName
 *   showDropdown
 *   isExpanded={isOpen}
 *   ariaLabel="Open account menu for Alex Martin"
 *   onClick={() => setIsOpen((p) => !p)}
 * />
 * ```
 *
 * @example Compact — avatar + chevron only (no text)
 * ```tsx
 * <AvatarGroup
 *   initials="AM"
 *   displayName={false}
 *   showDropdown
 *   onClick={toggleMenu}
 * />
 * ```
 *
 * @example No dropdown (display only)
 * ```tsx
 * <AvatarGroup
 *   initials="RK"
 *   name="Rajesh Kumar"
 *   designation="Senior Engineer"
 *   displayName
 *   showDropdown={false}
 * />
 * ```
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  initials = 'AM',
  name = 'Alex Martin',
  designation = 'Designation',
  displayName = true,
  showDesignation = true,
  showDropdown = true,
  isExpanded = false,
  type = 'Default',
  ariaLabel,
  ariaHasPopup = 'menu',
  ariaExpanded,
  menuItems,
  onSelect,
  menuId,
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
  const classes = [
    'dcds-AvatarGroup',
    isExpanded ? 'dcds-AvatarGroup--expanded' : '',
    type === 'Inverse' ? 'dcds-AvatarGroup--inverse' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedAriaExpanded = ariaExpanded ?? isExpanded;
  const resolvedAriaLabel = ariaLabel ?? name;
  const showMenu = isExpanded && !!menuItems?.length;

  return (
    <div className="dcds-AvatarGroup__wrapper">
      <button
        id={id}
        type="button"
        className={classes}
        aria-label={resolvedAriaLabel}
        aria-haspopup={showDropdown ? ariaHasPopup : undefined}
        aria-expanded={showDropdown ? resolvedAriaExpanded : undefined}
        aria-controls={showMenu && menuId ? menuId : undefined}
        data-testid={dataTestId}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        {/* Avatar — always a 32 px Initial Circle */}
        <span className="dcds-AvatarGroup__avatar" aria-hidden="true">
          <span className="dcds-AvatarGroup__initials">{initials}</span>
        </span>

        {/* Text block — name + optional designation */}
        {displayName && (
          <span className="dcds-AvatarGroup__info">
            {showDesignation && (
              <span className="dcds-AvatarGroup__designation">{designation}</span>
            )}
            <span className="dcds-AvatarGroup__name">{name}</span>
          </span>
        )}

        {/* Dropdown chevron — rotates 180° via CSS when expanded */}
        {showDropdown && (
          <span className="dcds-AvatarGroup__arrow">
            <ChevronIcon />
          </span>
        )}
      </button>

      {/* _BaseMenu — floats below trigger when expanded and items are provided */}
      {showMenu && (
        <_BaseMenu
          items={menuItems!}
          onSelect={(item) => onSelect?.(item)}
          menuId={menuId}
          className="dcds-AvatarGroup__menu"
        />
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
