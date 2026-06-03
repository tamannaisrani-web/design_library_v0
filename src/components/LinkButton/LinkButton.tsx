import React from 'react';
import type { LinkButtonProps } from './LinkButton.types';
import { SendLinear } from '../../../icons/src/linear/SendLinear';
import './LinkButton.css';

/**
 * **LinkButton** — lowest-weight interactive affordance.
 *
 * Text-only hyperlink-style action. Renders `<a>` when `href` is set,
 * otherwise `<button>`. Colour is driven by `--color-hyperlink-*` tokens —
 * never override via className.
 *
 * @see ai-docs/LinkButton.ai.md
 *
 * @example
 * ```tsx
 * <LinkButton href="/records" size="M">View details</LinkButton>
 * ```
 */
export const LinkButton: React.FC<LinkButtonProps> = ({
  state = 'Default',
  size = 'M',
  isIconOnly = false,
  ariaLabel,
  href,
  target,
  rel,
  className,
  id,
  dataTestId,
  children,
  showIcon = true,
  fixedWidth,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
}) => {
  if (process.env.NODE_ENV !== 'production' && isIconOnly && !ariaLabel) {
    // eslint-disable-next-line no-console
    console.warn('[dcds:LinkButton] isIconOnly=true requires an `ariaLabel` for screen readers.');
  }

  const isDisabled = state === 'Disabled';

  // ESOverride: fixedWidth is a sanctioned override — inline style is intentional here.
  // eslint-disable-next-line react/forbid-component-props
  const overrideStyle = fixedWidth != null
    ? { width: typeof fixedWidth === 'number' ? `${fixedWidth}px` : fixedWidth }
    : undefined;

  // Icon size matches the text size at each scale step (Figma spec: figmaNode 868:3050).
  const iconSize = size === 'L' ? 16 : size === 'M' ? 14 : 12;

  const classes = [
    'dcds-LinkButton',
    `dcds-LinkButton--state-${state}`,
    `dcds-LinkButton--size-${size}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const ariaProps = {
    'aria-disabled': isDisabled || undefined,
    'aria-label': isIconOnly ? ariaLabel : undefined,
  };

  // Trailing send icon — shown by default on non-icon-only variants (Figma: figmaNode 868:3050).
  // The icon is drawn from icons/svg/linear/send.svg; transform matches the Figma rotation.
  const trailingIcon = showIcon && !isIconOnly
    ? (
      <span className="dcds-LinkButton__icon" aria-hidden="true" style={{ transform: 'scaleY(-1) rotate(180deg)' }}>
        <SendLinear size={iconSize} />
      </span>
    )
    : null;

  if (href) {
    return (
      <a
        id={id}
        className={classes}
        style={overrideStyle}
        href={isDisabled ? undefined : href}
        target={target}
        rel={rel}
        data-testid={dataTestId}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        onFocus={onFocus as React.FocusEventHandler<HTMLAnchorElement>}
        onBlur={onBlur as React.FocusEventHandler<HTMLAnchorElement>}
        onMouseEnter={onMouseEnter as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLAnchorElement>}
        onKeyDown={onKeyDown as React.KeyboardEventHandler<HTMLAnchorElement>}
        onKeyUp={onKeyUp as React.KeyboardEventHandler<HTMLAnchorElement>}
        {...ariaProps}
      >
        {children}
        {trailingIcon}
      </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      className={classes}
      style={overrideStyle}
      disabled={isDisabled}
      data-testid={dataTestId}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      onFocus={onFocus as React.FocusEventHandler<HTMLButtonElement>}
      onBlur={onBlur as React.FocusEventHandler<HTMLButtonElement>}
      onMouseEnter={onMouseEnter as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLButtonElement>}
      onKeyDown={onKeyDown as React.KeyboardEventHandler<HTMLButtonElement>}
      onKeyUp={onKeyUp as React.KeyboardEventHandler<HTMLButtonElement>}
      {...ariaProps}
    >
      {children}
      {trailingIcon}
    </button>
  );
};

LinkButton.displayName = 'LinkButton';
