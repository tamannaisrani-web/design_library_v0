import React from 'react';
import type { ChipProps, ChipGroupProps } from './Chip.types';
import { InfoCircleLinear } from '../../../icons/src/linear/InfoCircleLinear';
import { InfoCircleBold } from '../../../icons/src/bold/InfoCircleBold';
import './Chip.css';

/**
 * Chip — interactive, toggleable filter label.
 *
 * Use in filter bars so users can activate / deactivate a category.
 * Renders as `<button aria-pressed>` so toggled state is announced to assistive technology.
 *
 * Selected state uses the info blue palette (`fill-light-info` bg, `stroke-info` border, `text-info`).
 *
 * @example
 * ```tsx
 * <ChipGroup aria-label="Filter by status">
 *   <Chip size="M" isSelected onChange={(sel) => setFilter('all', sel)}>All</Chip>
 *   <Chip size="M" showIcon onChange={(sel) => setFilter('active', sel)}>Active</Chip>
 * </ChipGroup>
 * ```
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  size = 'M',
  isSelected = false,
  state = 'Default',
  showIcon = false,
  onClick,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  tooltip,
  className,
  id,
  dataTestId,
  'aria-label': ariaLabel,
}) => {
  if (process.env.NODE_ENV !== 'production' && state === 'Disabled' && !tooltip) {
    // eslint-disable-next-line no-console
    console.warn(
      '[dcds:Chip] A disabled Chip must have a `tooltip` prop explaining why it is unavailable.',
    );
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (state === 'Disabled') return;
    onClick?.(event);
    onChange?.(!isSelected, event);
  };

  const classes = [
    'dcds-Chip',
    `dcds-Chip--size-${size}`,
    `dcds-Chip--state-${state}`,
    isSelected ? 'dcds-Chip--selected' : 'dcds-Chip--unselected',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      id={id}
      className={classes}
      disabled={state === 'Disabled'}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
      title={tooltip}
      data-testid={dataTestId}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {showIcon && (isSelected
        ? <InfoCircleBold className="dcds-Chip__icon" />
        : <InfoCircleLinear className="dcds-Chip__icon" />
      )}
      {children}
    </button>
  );
};

/**
 * ChipGroup — horizontal wrapping container for a set of Chip elements.
 *
 * Applies `gap-8` spacing and `role="group"` for accessibility.
 *
 * @example
 * ```tsx
 * <ChipGroup aria-label="Filter by status">
 *   <Chip isSelected>All</Chip>
 *   <Chip>Active</Chip>
 * </ChipGroup>
 * ```
 */
export const ChipGroup: React.FC<ChipGroupProps> = ({
  children,
  className,
  dataTestId,
  role = 'group',
  'aria-label': ariaLabel,
}) => {
  const classes = ['dcds-ChipGroup', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role={role} aria-label={ariaLabel} data-testid={dataTestId}>
      {children}
    </div>
  );
};
