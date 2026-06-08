import React from 'react';
import type { AvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Default user icon — path from icons/svg/bold/user.svg.
 * Uses currentColor to inherit --color-icon-primary token.
 */
const UserIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      fill="currentColor"
    />
    <path
      d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
      fill="currentColor"
    />
  </svg>
);

/** Icon pixel size per avatar size — matches Figma layout measurements. */
const ICON_SIZES: Record<string, number> = {
  Small: 16,
  Medium: 16,
  Large: 24,
  'Extra Large': 32,
};

/**
 * **Avatar** — represents a person, entity, or country visually.
 *
 * Five shapes × four sizes. All colours and radii are token-driven;
 * never override via inline style or className.
 *
 * **Shape is semantic:**
 * - Circles → people / individuals
 * - Squares → organisations / entities
 * - Flag Circle → country / locale
 *
 * **Size must match context:**
 * - `Small` in table cells / chips
 * - `Medium` in lists / comments (default)
 * - `Large` in profile cards / detail views
 * - `Extra Large` in page headers / hero sections
 *
 * @see Avatar.ai.md · DripDesign.md RULE 8
 * @see Figma node 440:6502 — Design Language System (Claude)
 *
 * @example Person with initials (most common)
 * ```tsx
 * <Avatar shape="Initial Circle" size="Medium" initials="JD" />
 * ```
 *
 * @example Organisation entity
 * ```tsx
 * <Avatar shape="Initial Square" size="Medium" initials="AC" />
 * ```
 *
 * @example Country flag
 * ```tsx
 * <Avatar shape="Flag Circle" size="Medium" country="IN" ariaLabel="India" />
 * ```
 *
 * @example Custom icon (no initials available)
 * ```tsx
 * <Avatar shape="Icon Circle" size="Medium" icon={<MyUserIcon />} />
 * ```
 *
 * @example Table name cell (always Small in table cells)
 * ```tsx
 * <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-8)' }}>
 *   <Avatar shape="Initial Circle" size="Small" initials="RK" />
 *   Rajesh Kumar
 * </div>
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
  shape = 'Initial Circle',
  size = 'Medium',
  initials = 'AM',
  icon,
  country,
  flagSrc,
  ariaLabel,
  className,
  id,
  dataTestId,
}) => {
  // BEM modifiers: spaces in shape/size names become hyphens
  const shapeKey = shape.replace(/ /g, '-');
  const sizeKey = size.replace(/ /g, '-');

  const classes = [
    'dcds-Avatar',
    `dcds-Avatar--shape-${shapeKey}`,
    `dcds-Avatar--size-${sizeKey}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isInitial = shape === 'Initial Circle' || shape === 'Initial Square';
  const isIcon = shape === 'Icon Circle' || shape === 'Icon Square';
  const isFlag = shape === 'Flag Circle';

  const iconSize = ICON_SIZES[size] ?? 16;

  // Resolve flag src: explicit override > derived from country code
  const resolvedFlagSrc =
    flagSrc ?? (country ? `dcds-flags/flags/${country.toUpperCase()}.svg` : undefined);

  return (
    <div
      id={id}
      className={classes}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {/* Initial shapes — text initials, aria-hidden (name is in adjacent text or ariaLabel) */}
      {isInitial && (
        <span className="dcds-Avatar__initials" aria-hidden="true">
          {initials}
        </span>
      )}

      {/* Icon shapes — custom icon or default user icon */}
      {isIcon && (
        <span className="dcds-Avatar__icon" aria-hidden="true">
          {icon ?? <UserIcon size={iconSize} />}
        </span>
      )}

      {/* Flag Circle — img from dcds-flags/flags/ */}
      {isFlag && resolvedFlagSrc && (
        <img
          className="dcds-Avatar__flag"
          src={resolvedFlagSrc}
          alt={ariaLabel ?? country ?? ''}
          aria-hidden={!ariaLabel ? true : undefined}
        />
      )}
      {isFlag && !resolvedFlagSrc && icon && (
        <span className="dcds-Avatar__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
