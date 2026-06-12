import React from 'react';
import type { BadgeProps } from './Badge.types';
import { Warning2Linear } from '../../../icons/src/linear/Warning2Linear';
import { Warning2Bold } from '../../../icons/src/bold/Warning2Bold';
import { InfoCircleLinear } from '../../../icons/src/linear/InfoCircleLinear';
import { InfoCircleBold } from '../../../icons/src/bold/InfoCircleBold';
import { RefreshCircleLinear } from '../../../icons/src/linear/RefreshCircleLinear';
import { RefreshCircleBold } from '../../../icons/src/bold/RefreshCircleBold';
import { CloseCircleLinear } from '../../../icons/src/linear/CloseCircleLinear';
import { CloseCircleBold } from '../../../icons/src/bold/CloseCircleBold';
import { TickCircleLinear } from '../../../icons/src/linear/TickCircleLinear';
import { TickCircleBold } from '../../../icons/src/bold/TickCircleBold';
import './Badge.css';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;

const SUBTLE_ICONS: Record<string, IconComponent> = {
  neutral: Warning2Linear,
  info:    InfoCircleLinear,
  warning: RefreshCircleLinear,
  error:   CloseCircleLinear,
  success: TickCircleLinear,
};

const INTENSE_ICONS: Record<string, IconComponent> = {
  neutral: Warning2Bold,
  info:    InfoCircleBold,
  warning: RefreshCircleBold,
  error:   CloseCircleBold,
  success: TickCircleBold,
};

/**
 * Badge — short, non-interactive, read-only status label.
 *
 * Use for record status (Active, Pending, Rejected), severity indicators,
 * and category labels. Renders as a `<span>`.
 *
 * @example
 * ```tsx
 * <Badge size="M" emphasis="subtle" state="success">Active</Badge>
 * <Badge size="S" emphasis="subtle" state="warning">Expiring soon</Badge>
 * <Badge size="M" emphasis="intense" state="error">Overdue</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  size = 'XS',
  emphasis = 'subtle',
  state = 'neutral',
  showIcon = true,
  className,
  id,
  dataTestId,
  'aria-label': ariaLabel,
}) => {
  const classes = [
    'dcds-Badge',
    `dcds-Badge--size-${size}`,
    `dcds-Badge--emphasis-${emphasis}`,
    `dcds-Badge--state-${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconMap = emphasis === 'intense' ? INTENSE_ICONS : SUBTLE_ICONS;
  const IconComponent = iconMap[state];

  return (
    <span id={id} className={classes} data-testid={dataTestId} aria-label={ariaLabel}>
      {showIcon && IconComponent && <IconComponent className="dcds-Badge__icon" />}
      {children}
    </span>
  );
};
