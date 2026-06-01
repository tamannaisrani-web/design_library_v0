import React from 'react';
import type { RadioButtonProps } from './RadioButton.types';
import './RadioButton.css';

/**
 * **RadioButton** — single choice from a small mutually-exclusive set.
 *
 * Always render at least two RadioButtons sharing the same `name` and wrap
 * them in `<fieldset>` + `<legend>`. For more than 5 options use a Dropdown.
 *
 * @see ai-docs/RadioButton.stories.mdx
 *
 * @example
 * ```tsx
 * <fieldset>
 *   <legend>Repayment frequency</legend>
 *   <RadioButton name="freq" value="monthly" label="Monthly" defaultChecked />
 *   <RadioButton name="freq" value="quarterly" label="Quarterly" />
 *   <RadioButton name="freq" value="annual" label="Annual" />
 * </fieldset>
 * ```
 */
export const RadioButton: React.FC<RadioButtonProps> = ({
  State = 'Enabled',
  name,
  value,
  label,
  checked,
  defaultChecked,
  id,
  className,
  dataTestId,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const isDisabled = State === 'Disabled';

  const classes = ['dcds-RadioButton', `dcds-RadioButton--State-${State}`, className ?? '']
    .filter(Boolean)
    .join(' ');

  const autoId = React.useId();
  const resolvedId = id ?? autoId;

  return (
    <label className={classes} htmlFor={resolvedId} data-testid={dataTestId}>
      <input
        id={resolvedId}
        type="radio"
        className="dcds-RadioButton__input"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      <span className="dcds-RadioButton__indicator" />
      <span className="dcds-RadioButton__label">{label}</span>
    </label>
  );
};

RadioButton.displayName = 'RadioButton';
