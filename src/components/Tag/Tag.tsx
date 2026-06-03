import React from 'react';
import type { TagProps } from './Tag.types';
import { StarLinear } from '../../../icons/src/linear/StarLinear';
import { CloseOutline } from '../../../icons/src/outline/CloseOutline';
import './Tag.css';

/**
 * Tag — user-added, removable label with a leading icon and dismiss (×) affordance.
 *
 * Use for active search filters, user-entered keywords, or labels attached to a
 * record by the user. Renders a leading star icon (controlled by `showIcon`) and
 * a close button when `onRemove` is provided.
 *
 * @example
 * ```tsx
 * <Tag size="M" onRemove={() => removeFilter('status:active')}>Status: Active</Tag>
 * ```
 */
export const Tag: React.FC<TagProps> = ({
  children,
  size = 'M',
  state = 'Default',
  showIcon = true,
  onRemove,
  className,
  id,
  dataTestId,
  'aria-label': ariaLabel,
}) => {
  const classes = [
    'dcds-Tag',
    `dcds-Tag--size-${size}`,
    `dcds-Tag--state-${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelText = typeof children === 'string' ? children : 'tag';

  return (
    <span id={id} className={classes} data-testid={dataTestId} aria-label={ariaLabel}>
      {showIcon && <StarLinear className="dcds-Tag__icon" />}
      <span className="dcds-Tag__label">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="dcds-Tag__remove"
          onClick={state !== 'Disabled' ? onRemove : undefined}
          disabled={state === 'Disabled'}
          aria-label={`Remove ${labelText}`}
          tabIndex={state === 'Disabled' ? -1 : 0}
        >
          <CloseOutline />
        </button>
      )}
    </span>
  );
};
