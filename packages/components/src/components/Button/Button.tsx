import React from 'react';
import type { ButtonProps } from './Button.types';
import './Button.css';

/**
 * **Button** — the primary action trigger in the DCDS system.
 *
 * Use for any interactive element that **triggers an action** (form submit,
 * modal open, save, delete, send). For navigation use `LinkButton`.
 *
 * Visual weight × semantic colour × size are all token-driven; never override
 * background, border, or text colour via `className`.
 *
 * @see DripDesign.md · Rule 8 · Button
 * @see ai-docs/Button.ai.md
 *
 * @example Primary CTA
 * ```tsx
 * <Button variant="Primary" color="Primary" size="M" onClick={save}>
 *   Save changes
 * </Button>
 * ```
 *
 * @example Icon-only (aria-label required)
 * ```tsx
 * <Button variant="Tertiary" size="S" isIconOnly ariaLabel="Add item" onClick={add}>
 *   <AddIcon />
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'Primary',
  color = 'Primary',
  size = 'M',
  isDisabled = false,
  isFullWidth = false,
  isIconOnly = false,
  ariaLabel,
  ariaBusy,
  type = 'button',
  className,
  id,
  dataTestId,
  leadingIcon,
  trailingIcon,
  children,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
}) => {
  // Dev-time accessibility guard: icon-only buttons MUST carry an ariaLabel.
  if (process.env.NODE_ENV !== 'production' && isIconOnly && !ariaLabel) {
    // eslint-disable-next-line no-console
    console.warn('[dcds:Button] isIconOnly=true requires an `ariaLabel` for screen readers.');
  }

  const classes = [
    'dcds-Button',
    `dcds-Button--variant-${variant}`,
    `dcds-Button--color-${color}`,
    `dcds-Button--size-${size}`,
    isIconOnly ? 'dcds-Button--icon-only' : '',
    isFullWidth ? 'dcds-Button--full-width' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      id={id}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={ariaBusy || undefined}
      aria-label={isIconOnly ? ariaLabel : undefined}
      data-testid={dataTestId}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {leadingIcon && <span className="dcds-Button__icon">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="dcds-Button__icon">{trailingIcon}</span>}
    </button>
  );
};

Button.displayName = 'Button';
