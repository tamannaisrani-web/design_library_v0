/* eslint-disable react/display-name */
import React from 'react';
import type { BaseTabsProps } from './_BaseTabs.types';
import './_BaseTabs.css';

/**
 * Internal single tab-item button.
 *
 * @internal Not exported from the library barrel.
 *           Compose tabs via the `tabs` prop on the public `Tabs` component.
 *
 * Renders as `<button role="tab">` for full keyboard / screen-reader support.
 * All colours and sizes are driven by DCDS token CSS custom properties.
 *
 * Variant matrix:
 *   Borderless × S/M × selected / unselected / disabled
 *   Filled     × S/M × selected / unselected
 */
export const _BaseTabs = React.memo(
  ({
    label,
    isSelected = false,
    isDisabled = false,
    tabStyle = 'Borderless',
    size = 'M',
    leading,
    trailing,
    onClick,
    onKeyDown,
    id,
    'aria-controls': ariaControls,
    tabIndex = -1,
    dataTestId,
  }: BaseTabsProps) => {
    const isFilled = tabStyle === 'Filled';

    const className = [
      'dcds-BaseTabs',
      isFilled ? 'dcds-BaseTabs--filled' : 'dcds-BaseTabs--borderless',
      `dcds-BaseTabs--size-${size}`,
      isSelected ? 'dcds-BaseTabs--selected' : '',
      isDisabled ? 'dcds-BaseTabs--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        role="tab"
        type="button"
        id={id}
        aria-selected={isSelected}
        aria-controls={ariaControls}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        tabIndex={tabIndex}
        className={className}
        onClick={onClick}
        onKeyDown={onKeyDown}
        data-testid={dataTestId}
      >
        <span className="dcds-BaseTabs__content">
          {leading !== undefined && (
            <span className="dcds-BaseTabs__icon" aria-hidden="true">
              <leading.icon size={16} />
            </span>
          )}
          <span className="dcds-BaseTabs__label">{label}</span>
          {trailing !== undefined && (
            <span className={`dcds-BaseTabs__badge dcds-BaseTabs__badge--${trailing.type}`}>
              {trailing.value}
            </span>
          )}
        </span>
      </button>
    );
  },
);
