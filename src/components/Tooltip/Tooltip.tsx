import React, { useCallback, useId, useRef, useState } from 'react';
import type { TooltipIconSize, TooltipPlacement, TooltipProps } from './Tooltip.types';
import './Tooltip.css';

/**
 * Directional arrow SVG — matches the Figma _Tooltip/arrow asset (14×8 px for
 * Top/Bottom, 8×14 px for Left/Right). Color inherits from the parent via
 * `currentColor` which is set to `var(--color-surface-4)` in the CSS.
 */
const TooltipArrow: React.FC<{ placement: TooltipPlacement }> = ({ placement }) => {
  if (placement === 'Top') {
    /* downward-pointing triangle — sits below bubble, caret toward trigger */
    return (
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true" focusable="false">
        <path d="M0 0L14 0L7 8Z" fill="currentColor" />
      </svg>
    );
  }
  if (placement === 'Bottom') {
    /* upward-pointing triangle — sits above bubble, caret toward trigger */
    return (
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true" focusable="false">
        <path d="M0 8L14 8L7 0Z" fill="currentColor" />
      </svg>
    );
  }
  if (placement === 'Left') {
    /* rightward-pointing triangle — sits to the right of bubble, caret toward trigger */
    return (
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true" focusable="false">
        <path d="M0 0L0 14L8 7Z" fill="currentColor" />
      </svg>
    );
  }
  /* Right — leftward-pointing triangle — sits to the left of bubble, caret toward trigger */
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M8 0L8 14L0 7Z" fill="currentColor" />
    </svg>
  );
};

/**
 * Default trigger — vuesax/linear/info-circle.
 * Rendered when no `children` are passed to Tooltip.
 * Size is controlled by the `iconSize` prop (small = 16px, medium = 24px).
 */
const InfoCircleIcon: React.FC<{ size: TooltipIconSize }> = ({ size }) => (
  <button
    type="button"
    className={`dcds-Tooltip__info-trigger dcds-Tooltip__info-trigger--${size}`}
    aria-label="More information"
  >
    <InfoCircleSvg size={size} />
  </button>
);

const InfoCircleSvg: React.FC<{ size: TooltipIconSize }> = ({ size }) => {
  const px = size === 'medium' ? 24 : 16;
  return (
    <svg width={px} height={px} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9945 8H12.0035"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Tooltip
 *
 * Wraps any trigger element and shows a bubble on hover or keyboard focus.
 * The bubble contains an optional bold heading (18 px) and body text (16 px)
 * on a light-grey `color/surface/4` background with a directional arrow caret.
 *
 * Design reference: Figma node 478:30949 — Design Language System (Claude)
 *
 * @example
 * ```tsx
 * // Default info-icon trigger
 * <Tooltip heading="Upload limit" bodyText="Files must be under 10 MB each." />
 *
 * // Custom trigger, bottom placement
 * <Tooltip bodyText="Reset all filters" Placement="Bottom">
 *   <button aria-label="Reset"><ResetIcon size={16} /></button>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  heading,
  bodyText,
  children,
  Placement = 'Top',
  iconSize = 'small',
  forceVisible = false,
  onShow,
  onHide,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onKeyDown,
  className,
  id,
  dataTestId,
}) => {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setVisible(true);
    onShow?.();
  }, [onShow]);

  const hide = useCallback(() => {
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      onHide?.();
    }, 80);
  }, [onHide]);

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    show();
    onMouseEnter?.(e);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    hide();
    onMouseLeave?.(e);
  };

  const handleFocus: React.FocusEventHandler<HTMLDivElement> = (e) => {
    show();
    onFocus?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    hide();
    onBlur?.(e);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape' && visible) {
      setVisible(false);
      onHide?.();
    }
    onKeyDown?.(e);
  };

  /* Inject aria-describedby onto a React child so AT can read the bubble */
  const trigger = children ?? <InfoCircleIcon size={iconSize} />;

  const triggerWithA11y = React.isValidElement(trigger)
    ? React.cloneElement(trigger as React.ReactElement<Record<string, unknown>>, {
        'aria-describedby': tooltipId,
      })
    : trigger;

  const overlayClasses = [
    'dcds-Tooltip__overlay',
    `dcds-Tooltip__overlay--${Placement}`,
    visible || forceVisible ? 'dcds-Tooltip__overlay--visible' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClasses = ['dcds-Tooltip__wrapper', className ?? '']
    .filter(Boolean)
    .join(' ');

  /* Arrow placement: Top and Left → arrow after bubble; Bottom and Right → arrow before bubble */
  const arrowEl = (
    <span className="dcds-Tooltip__arrow" aria-hidden="true">
      <TooltipArrow placement={Placement} />
    </span>
  );

  const bubble = (
    <div className="dcds-Tooltip__bubble">
      {heading && <p className="dcds-Tooltip__heading">{heading}</p>}
      {bodyText && <p className="dcds-Tooltip__body">{bodyText}</p>}
    </div>
  );

  return (
    <div
      id={id}
      className={wrapperClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-testid={dataTestId}
    >
      {triggerWithA11y}
      <div
        id={tooltipId}
        role="tooltip"
        className={overlayClasses}
        aria-hidden={!visible}
      >
        {/* Top / Left: bubble first, then arrow pointing toward trigger */}
        {(Placement === 'Top' || Placement === 'Left') && (
          <>
            {bubble}
            {arrowEl}
          </>
        )}
        {/* Bottom / Right: arrow first (pointing toward trigger), then bubble */}
        {(Placement === 'Bottom' || Placement === 'Right') && (
          <>
            {arrowEl}
            {bubble}
          </>
        )}
      </div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
