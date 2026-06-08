import React, { useState, useCallback, useId } from 'react';
import type { TabsProps } from './Tabs.types';
import { _BaseTabs } from './_BaseTabs';
import './Tabs.css';

/**
 * `Tabs` lets users switch between parallel views of related content
 * within the same page or section.
 *
 * ---
 *
 * **Two visual styles:**
 * - `Filled`     — active tab gets a dark-navy background. Requires `isFullwidth`.
 * - `Borderless` — active tab gets a 4 px green bottom border. Auto-width, left-aligned.
 *
 * **Controlled vs uncontrolled:**
 * - Controlled:   pass `activeIndex` + `onChange`.
 * - Uncontrolled: pass `defaultActiveIndex` (default `0`); state is managed internally.
 *
 * **Accessibility:**
 * - `role="tablist"` on the container.
 * - `role="tab"`, `aria-selected`, `aria-controls` on each tab button.
 * - Arrow keys (Left/Right) navigate between enabled tabs.
 * - Home / End jump to the first / last enabled tab.
 *
 * **DCDS design constraints:**
 * - Maximum 5–6 tabs per group. Use a dropdown for more.
 * - Tab labels: 1–3 words.
 * - `tabStyle="Filled"` requires `isFullwidth={true}`.
 * - `disabled` tabs only apply in Borderless style.
 *
 * @example
 * ```tsx
 * import { Tabs } from '@dcds/components';
 * import { TickCircleLinear } from 'icons/src/linear/TickCircleLinear';
 *
 * const [active, setActive] = React.useState(0);
 *
 * <Tabs
 *   tabs={[
 *     { label: 'Overview',  leadingIcon: <TickCircleLinear size={16} /> },
 *     { label: 'Documents', leadingIcon: <TickCircleLinear size={16} />, trailingBadge: 'new' },
 *     { label: 'Activity',  disabled: true },
 *   ]}
 *   tabStyle="Borderless"
 *   size="M"
 *   activeIndex={active}
 *   onChange={(i) => setActive(i)}
 * />
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeIndex,
  defaultActiveIndex = 0,
  isFullwidth = false,
  tabStyle = 'Borderless',
  size = 'M',
  onChange,
  className,
  id,
  dataTestId,
}) => {
  const instanceId = useId();
  const isControlled = activeIndex !== undefined;
  const [internalActive, setInternalActive] = useState<number>(defaultActiveIndex);
  const currentActive = isControlled ? (activeIndex as number) : internalActive;

  /** Indices of all non-disabled tabs, used for arrow-key wrap-around. */
  const enabledIndices = tabs.map((tab, i) => (tab.disabled ? -1 : i)).filter((i) => i !== -1);

  const handleTabClick = useCallback(
    (index: number, event: React.MouseEvent<HTMLButtonElement>): void => {
      if (!isControlled) {
        setInternalActive(index);
      }
      onChange?.(index, event);
    },
    [isControlled, onChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      const { key } = event;
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) {
        return;
      }

      event.preventDefault();

      const currentPos = enabledIndices.indexOf(currentActive);
      let nextPos = currentPos;

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        nextPos = (currentPos + 1) % enabledIndices.length;
      } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
        nextPos = (currentPos - 1 + enabledIndices.length) % enabledIndices.length;
      } else if (key === 'Home') {
        nextPos = 0;
      } else if (key === 'End') {
        nextPos = enabledIndices.length - 1;
      }

      const nextIndex = enabledIndices[nextPos];

      if (!isControlled) {
        setInternalActive(nextIndex);
      }
      onChange?.(nextIndex, event as unknown as React.MouseEvent<HTMLButtonElement>);

      document.getElementById(`dcds-tab-${instanceId}-${nextIndex}`)?.focus();
    },
    [enabledIndices, currentActive, isControlled, onChange, instanceId],
  );

  const containerClass = [
    'dcds-Tabs',
    `dcds-Tabs--${tabStyle.toLowerCase()}`,
    isFullwidth ? 'dcds-Tabs--fullwidth' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="tablist"
      id={id}
      className={containerClass}
      onKeyDown={handleKeyDown}
      data-testid={dataTestId}
    >
      {tabs.map((tab, index) => (
        <_BaseTabs
          key={`${tab.label}-${index}`}
          label={tab.label}
          isSelected={currentActive === index}
          isDisabled={tab.disabled}
          tabStyle={tabStyle}
          size={size}
          leading={tab.leading}
          trailing={tab.trailing}
          onClick={(e) => handleTabClick(index, e)}
          id={`dcds-tab-${instanceId}-${index}`}
          aria-controls={`dcds-tabpanel-${instanceId}-${index}`}
          tabIndex={currentActive === index ? 0 : -1}
          dataTestId={tab.dataTestId}
        />
      ))}
    </div>
  );
};
