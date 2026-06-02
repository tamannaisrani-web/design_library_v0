import React, { useCallback, useState } from 'react';
import type { SwitchProps } from './Switch.types';
import './Switch.css';

/**
 * **Switch** — instant-effect boolean toggle.
 *
 * Use for settings that take effect immediately. For form fields requiring
 * submission, use `Checkbox`. For mutually exclusive choices, use `RadioButton`.
 *
 * Supports both controlled (`checked` + `onChange`) and uncontrolled
 * (`defaultChecked`) usage.
 *
 * @see dcds-registry.json · id: switch · figmaNode 868:3060
 */
export const Switch: React.FC<SwitchProps> = ({
  State = 'Enabled',
  checked,
  defaultChecked = false,
  name,
  label,
  id,
  className,
  dataTestId,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const value = isControlled ? Boolean(checked) : internal;

  const isDisabled = State === 'Disabled';

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.target.checked;
      if (!isControlled) setInternal(next);
      onChange?.(next, event);
    },
    [isControlled, onChange]
  );

  const classes = ['dcds-Switch', `dcds-Switch--State-${State}`, className ?? '']
    .filter(Boolean)
    .join(' ');

  // Auto-generate an id so the visible label can use htmlFor for proper a11y.
  const autoId = React.useId();
  const resolvedId = id ?? autoId;

  return (
    <label className={classes} htmlFor={resolvedId} data-testid={dataTestId}>
      <input
        id={resolvedId}
        type="checkbox"
        role="switch"
        className="dcds-Switch__input"
        name={name}
        checked={value}
        disabled={isDisabled}
        aria-checked={value}
        aria-disabled={isDisabled || undefined}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      <span className="dcds-Switch__track">
        <span className="dcds-Switch__thumb" />
      </span>
      {label && <span className="dcds-Switch__label">{label}</span>}
    </label>
  );
};

Switch.displayName = 'Switch';
