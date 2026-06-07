import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { ArrowDownLinear } from '../../../icons/src/linear/ArrowDownLinear';
import type {
  AccordianProps,
  _AccordianLeadingProps,
  _AccordianActionsProps,
} from './Accordian.types';
import './Accordian.css';

/* --------------------------------------------------------------------------
   Internal sub-components — not exported, never use directly
   -------------------------------------------------------------------------- */

/**
 * @internal
 * 24×24 icon container for the Accordian header leading slot.
 * Renders the icon component at 16 px (Figma spec: 16 px icon inside 24 px slot).
 * Controlled via `AccordianProps.leadingIcon` + `AccordianProps.showLeading`.
 */
const _AccordianLeading: React.FC<_AccordianLeadingProps> = ({ icon: Icon }) => (
  <div className="dcds-Accordian__leading" aria-hidden="true">
    <Icon size={16} />
  </div>
);

/**
 * @internal
 * Button action slot rendered in the Accordian header trailing area.
 * Wraps `Button` from `src/components/Button` with Figma-specified defaults:
 * `variant='Secondary'`, `color='Primary'`, `size='S'`.
 * Controlled via `AccordianProps.actionConfig` + `AccordianProps.showAction`.
 */
const _AccordianActions: React.FC<_AccordianActionsProps> = ({ config }) => (
  <div className="dcds-Accordian__actions">
    <Button
      variant={config.variant}
      color={config.color}
      size={config.size}
      isDisabled={config.isDisabled}
      leadingIcon={config.leadingIcon}
      trailingIcon={config.trailingIcon}
      onClick={config.onClick}
      onFocus={config.onFocus}
      onBlur={config.onBlur}
    >
      {config.label}
    </Button>
  </div>
);

/* --------------------------------------------------------------------------
   Accordian — public component
   -------------------------------------------------------------------------- */

/**
 * `Accordian` provides a collapsible content section with a rich, configurable header.
 *
 * Use for FAQs, grouped settings, document sections, and filter panels.
 * Multiple items can be open simultaneously by default — implement exclusive-open
 * behaviour by managing the `state` prop externally.
 *
 * **Subcomponents from `src/components` used internally:**
 * - `Badge` (`src/components/Badge`) — header status chip, via `showStatus` / `statusConfig`
 * - `Button` (`src/components/Button`) — header action button, via `showAction` / `actionConfig`
 *
 * The internal `_AccordianLeading` and `_AccordianActions` sub-components are not
 * exported and must never be used directly outside this file.
 *
 * @note This component is intentionally spelled `Accordian` (with an 'a') to match
 * the DCDS Figma file (node 443:547) and design-system naming convention.
 *
 * @example Basic controlled accordion
 * ```tsx
 * import { Accordian } from '@dcds/components';
 * import { GalleryLinear } from '../../../icons/src/linear/GalleryLinear';
 *
 * const [open, setOpen] = React.useState(false);
 *
 * <Accordian
 *   state={open ? 'open' : 'close'}
 *   isRounded={true}
 *   title="What documents are required?"
 *   subtitle="Loan application checklist"
 *   showLeading={true}
 *   leadingIcon={GalleryLinear}
 *   onToggle={setOpen}
 * >
 *   <p>PAN card, Aadhaar, last 3 months' bank statements.</p>
 * </Accordian>
 * ```
 */
export const Accordian: React.FC<AccordianProps> = ({
  state = 'close',
  isRounded = false,
  title,
  subtitle,
  showLeading = true,
  showTitle = true,
  showSubtitle = true,
  showStatus = true,
  showAction = true,
  leadingIcon,
  statusConfig = {},
  actionConfig = {},
  children,
  onToggle,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onMouseEnter,
  onMouseLeave,
  className,
  id,
  dataTestId,
}) => {
  const isOpen = state === 'open';

  const rootClasses = [
    'dcds-Accordian',
    isRounded ? 'dcds-Accordian--rounded' : '',
    `dcds-Accordian--state-${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleHeaderClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    onToggle?.(!isOpen);
    onClick?.(e);
  };

  const resolvedStatus = {
    label: statusConfig.label ?? 'Status',
    state: statusConfig.state ?? 'neutral',
    emphasis: statusConfig.emphasis ?? 'subtle',
    size: statusConfig.size ?? 'S',
    showIcon: statusConfig.showIcon ?? false,
    'aria-label': statusConfig['aria-label'],
  } as const;

  const resolvedAction = {
    label: actionConfig.label ?? 'Button',
    variant: actionConfig.variant ?? 'Secondary',
    color: actionConfig.color ?? 'Primary',
    size: actionConfig.size ?? 'S',
    isDisabled: actionConfig.isDisabled ?? false,
    leadingIcon: actionConfig.leadingIcon,
    trailingIcon: actionConfig.trailingIcon,
    onClick: actionConfig.onClick,
    onFocus: actionConfig.onFocus,
    onBlur: actionConfig.onBlur,
  } as const;

  const showLeadingSlot = showLeading && Boolean(leadingIcon);
  const showTrailing = showStatus || showAction;

  return (
    <div className={rootClasses} id={id} data-testid={dataTestId}>
      <button
        type="button"
        className="dcds-Accordian__header"
        aria-expanded={isOpen}
        onClick={handleHeaderClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="dcds-Accordian__header-main">
          {showLeadingSlot && <_AccordianLeading icon={leadingIcon} />}
          <div className="dcds-Accordian__header-content">
            {(showTitle || showSubtitle) && (
              <div className="dcds-Accordian__text">
                {showTitle && title && (
                  <span className="dcds-Accordian__title">{title}</span>
                )}
                {showSubtitle && subtitle && (
                  <span className="dcds-Accordian__subtitle">{subtitle}</span>
                )}
              </div>
            )}
            {showTrailing && (
              <div className="dcds-Accordian__trailing">
                {showStatus && (
                  <Badge
                    size={resolvedStatus.size}
                    emphasis={resolvedStatus.emphasis}
                    state={resolvedStatus.state}
                    showIcon={resolvedStatus.showIcon}
                    aria-label={resolvedStatus['aria-label']}
                  >
                    {resolvedStatus.label}
                  </Badge>
                )}
                {showAction && <_AccordianActions config={resolvedAction} />}
              </div>
            )}
          </div>
        </div>

        <div className="dcds-Accordian__chevron" aria-hidden="true">
          <ArrowDownLinear size={24} />
        </div>
      </button>

      <div
        className="dcds-Accordian__body"
        role="region"
        aria-hidden={!isOpen}
        hidden={!isOpen ? true : undefined}
      >
        <div className="dcds-Accordian__body-slot">{children}</div>
      </div>
    </div>
  );
};
