import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { CheckboxProps } from './Checkbox.types';
import './Checkbox.css';

/**
 * **Checkbox** — multi-select / single acknowledgement form control.
 *
 * Supports `indeterminate` (`aria-checked="mixed"`) for "select-all" patterns
 * where some — but not all — children are selected.
 *
 * @see ai-docs/Checkbox.stories.mdx
 *
 * @example Multi-select
 * ```tsx
 * <Checkbox name="perms" value="read" label="Read" defaultChecked />
 * <Checkbox name="perms" value="write" label="Write" />
 * ```
 *
 * @example Indeterminate
 * ```tsx
 * <Checkbox indeterminate label="Select all" onChange={handleSelectAll} />
 * ```
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  State = 'Enabled',
  name,
  value,
  label,
  checked,
  defaultChecked = false,
  indeterminate = false,
  required = false,
  id,
  className,
  dataTestId,
  onChange,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const resolved = isControlled ? Boolean(checked) : internal;
  const isDisabled = State === 'Disabled';

  // Either/or conditional: `indeterminate` and `checked` (true) are mutually exclusive.
  // When indeterminate=true the visual state is the dash (mixed); the tick must not show.
  // When resolved=true (checked) indeterminate is irrelevant — only the tick shows.
  // We force the DOM input's checked to false while indeterminate is active so the
  // :checked CSS selector never fires alongside the --indeterminate modifier class.
  const effectiveChecked = indeterminate ? false : resolved;

  const inputRef = useRef<HTMLInputElement>(null);

  // Indeterminate is not reflectable via HTML — set it imperatively on the DOM node.
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.target.checked;
      if (!isControlled) setInternal(next);
      onChange?.(next, event);
    },
    [isControlled, onChange]
  );

  const classes = [
    'dcds-Checkbox',
    `dcds-Checkbox--State-${State}`,
    indeterminate ? 'dcds-Checkbox--indeterminate' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const autoId = React.useId();
  const resolvedId = id ?? autoId;

  return (
    <label className={classes} htmlFor={resolvedId} data-testid={dataTestId}>
      <input
        id={resolvedId}
        ref={inputRef}
        type="checkbox"
        className="dcds-Checkbox__input"
        name={name}
        value={value}
        checked={effectiveChecked}
        disabled={isDisabled}
        required={required}
        aria-checked={indeterminate ? 'mixed' : effectiveChecked}
        aria-disabled={isDisabled || undefined}
        onChange={handleChange}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      <span className="dcds-Checkbox__indicator" />
      <span className="dcds-Checkbox__label">{label}</span>
    </label>
  );
};

Checkbox.displayName = 'Checkbox';
