import React from 'react';
import { EyeSlashLinear } from '../../../icons/src/linear/EyeSlashLinear';
import { EyeLinear } from '../../../icons/src/linear/EyeLinear';
import { Calendar2Linear } from '../../../icons/src/linear/Calendar2Linear';
import { ArrowDownLinear } from '../../../icons/src/linear/ArrowDownLinear';
import { SearchNormalLinear } from '../../../icons/src/linear/SearchNormalLinear';
import { InformationBold } from '../../../icons/src/bold/InformationBold';
import { TickCircleBold } from '../../../icons/src/bold/TickCircleBold';
import { Tooltip } from '../Tooltip';
import type {
  InputFieldsProps,
  _BaseValidationProps,
  _BaseLeadingProps,
  _BaseTrailngProps,
  _BaseHelpTextProps,
  _BaseElemFrontProps,
  _BaseOTPBoxProps,
} from './InputFields.types';
import './InputFields.css';

/* --------------------------------------------------------------------------
   Internal sub-components — not exported, never use directly
   -------------------------------------------------------------------------- */

/**
 * @internal
 * Validation message row rendered below the input field.
 * Renders a 16 × 16 bold icon alongside 14 px message text.
 * - `error`   → InformationBold, --color-text-error
 * - `warning` → InformationBold, --color-text-warning
 * - `success` → TickCircleBold,  --color-text-success
 *
 * Controlled via `InputFieldsProps.showValidation`, `validationProperty`, `validationMessage`.
 */
const _BaseValidation: React.FC<_BaseValidationProps> = ({ property1, message }) => {
  const IconComp = property1 === 'success' ? TickCircleBold : InformationBold;
  return (
    <div className={`dcds-BaseValidation dcds-BaseValidation--${property1}`} role="alert" aria-live="polite">
      <span className="dcds-BaseValidation__icon" aria-hidden="true">
        <IconComp size={16} />
      </span>
      <span className="dcds-BaseValidation__text">{message}</span>
    </div>
  );
};

/**
 * @internal
 * Leading icon or symbol slot inside the input box.
 * - `'icon'`  → SearchNormalLinear at 16 px
 * - `'USD'`   → `$` text, 14 px, --color-text-neutral
 * - `'INR'`   → `₹` text, 14 px, --color-text-neutral
 * - `'Flag'`  → `<img>` from `dcds-flags/flags/{COUNTRY}.svg`, 16 × 12 px
 *
 * Controlled via `InputFieldsProps.showLeading`.
 */
const _BaseLeading: React.FC<_BaseLeadingProps> = ({ property1, country }) => {
  if (property1 === 'icon') {
    return (
      <div className="dcds-InputFields__leading" aria-hidden="true">
        <SearchNormalLinear size={16} />
      </div>
    );
  }
  if (property1 === 'Flag') {
    const src = `dcds-flags/flags/${(country ?? 'IN').toUpperCase()}.svg`;
    return (
      <div className="dcds-InputFields__leading" aria-hidden="true">
        <img src={src} width={16} height={12} alt="" />
      </div>
    );
  }
  const symbol = property1 === 'USD' ? '$' : '₹';
  return (
    <div className="dcds-InputFields__leading" aria-hidden="true">
      <span className="dcds-InputFields__leading-symbol">{symbol}</span>
    </div>
  );
};

/**
 * @internal
 * Trailing icon slot inside the input box.
 * All icons render at 20 × 20 px.
 * - `'eye-slash'`   → EyeSlashLinear
 * - `'eye'`         → EyeLinear
 * - `'calendar-2'`  → Calendar2Linear
 * - `'arrow-down'`  → ArrowDownLinear
 *
 * Note: the Figma component is named `_BaseTrailng` (typo preserved from design file).
 * Controlled via `InputFieldsProps.showTrailing`, `trailingIcon`, `onTrailingClick`.
 */
const _BaseTrailng: React.FC<_BaseTrailngProps> = ({ property1, onClick }) => {
  const icons: Record<_BaseTrailngProps['property1'], React.ReactElement> = {
    'eye-slash':   <EyeSlashLinear size={16} />,
    'eye':         <EyeLinear size={16} />,
    'calendar-2':  <Calendar2Linear size={16} />,
    'arrow-down':  <ArrowDownLinear size={16} />,
  };
  return (
    <button
      type="button"
      className="dcds-InputFields__trailing"
      onClick={onClick}
      aria-label={property1}
      tabIndex={-1}
    >
      {icons[property1]}
    </button>
  );
};

/**
 * @internal
 * Collapsible help text row with a 4 px left accent bar.
 * - `state=true`  → visible (opacity 1, natural height)
 * - `state=false` → collapsed (height 0, opacity 0)
 *
 * Controlled via `InputFieldsProps.showHelpText` + `helpText`.
 */
const _BaseHelpText: React.FC<_BaseHelpTextProps> = ({ state, helpText }) => (
  <div className={`dcds-BaseHelpText ${state ? 'dcds-BaseHelpText--open' : 'dcds-BaseHelpText--closed'}`}>
    <div className="dcds-BaseHelpText__inner">
      <div className="dcds-BaseHelpText__bar" aria-hidden="true" />
      <p className="dcds-BaseHelpText__text">{helpText}</p>
    </div>
  </div>
);

/**
 * @internal
 * 120 px prefix block used by Currency and Phone No. input types.
 *
 * State-specific design (from Figma node 1223:7456):
 * - `Default`  — 0.5 px `stroke-neutral` border, white bg, arrow 16 px
 * - `Open`     — 1 px `stroke-focus-subtle` border, arrow 20 px rotated 180°, dropdown shown
 * - `Disabled` — 1 px `stroke-disabled` border, `surface-3` bg (#f5f5f5), muted text
 * - `Read-Only`— 1 px `stroke-disabled` border, `surface-2` bg (#f9f9f9), neutral text
 *
 * The dropdown (`state='Open'`) renders items from `menuItems`: each 48 px tall,
 * flag 24 × 18 px, code text, separated by 0.5 px `stroke-subdued` dividers.
 */
const _BaseElemFront: React.FC<_BaseElemFrontProps> = ({
  type,
  state,
  country,
  codeText,
  menuItems = [],
  onPrefixClick,
  onMenuItemSelect,
}) => {
  const isDisabled = state === 'Disabled';
  const isReadOnly = state === 'Read-Only';
  const isOpen = state === 'Open';
  const flagSrc = `dcds-flags/flags/${(country ?? 'IN').toUpperCase()}.svg`;
  const accessLabel =
    type === 'Phone No.' ? `Dial code selector: ${codeText}` : `Currency selector: ${codeText}`;

  const btnClass = [
    'dcds-BaseElemFront',
    isOpen ? 'dcds-BaseElemFront--open' : '',
    isDisabled ? 'dcds-BaseElemFront--disabled' : '',
    isReadOnly ? 'dcds-BaseElemFront--readonly' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="dcds-BaseElemFront__wrap">
      <button
        type="button"
        className={btnClass}
        onClick={onPrefixClick}
        disabled={isDisabled}
        aria-label={accessLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={isDisabled ? -1 : 0}
      >
        {/* Left group: flag (16×12) + code text */}
        <span className="dcds-BaseElemFront__inner">
          <img
            className="dcds-BaseElemFront__flag"
            src={flagSrc}
            width={16}
            height={12}
            alt=""
            aria-hidden="true"
          />
          <span className="dcds-BaseElemFront__code">{codeText}</span>
        </span>
        {/* Arrow — 16 px default/disabled/readonly, 20 px when open, rotated 180° when open */}
        <span className={`dcds-BaseElemFront__arrow${isOpen ? ' dcds-BaseElemFront__arrow--open' : ''}`}
          aria-hidden="true"
        >
          <ArrowDownLinear size={16} />
        </span>
      </button>

      {/* Dropdown menu — only rendered when state='Open' and items are provided */}
      {isOpen && menuItems.length > 0 && (
        <div className="dcds-BaseElemFront__menu" role="menu" aria-label={accessLabel}>
          {menuItems.map((item, i) => (
            <div key={`${item.country}-${i}`} role="none" className="dcds-BaseElemFront__menu-item-row">
              <button
                type="button"
                role="menuitem"
                className="dcds-BaseElemFront__menu-item"
                onClick={() => onMenuItemSelect?.(item, i)}
              >
                <span className="dcds-BaseElemFront__menu-item-leading">
                  <img
                    src={`dcds-flags/flags/${item.country.toUpperCase()}.svg`}
                    width={24}
                    height={18}
                    alt={item.country}
                  />
                </span>
                <span className="dcds-BaseElemFront__menu-code">{item.code}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * @internal
 * Single numeric digit box used inside the OTP row.
 * Renders an `<input inputMode="numeric" maxLength={1} pattern="[0-9]*">` centred
 * inside a 48 px bordered box. Automatically focuses the next/previous box via
 * the `inputRef` callback array managed in the parent.
 *
 * Controlled via `InputFieldsProps.otpValues`, `onOtpChange`.
 */
const _BaseOTPBox: React.FC<_BaseOTPBoxProps> = ({
  index,
  value,
  isError,
  isDisabled,
  onChange,
  onKeyDown,
  inputRef,
}) => {
  const isFilled = value.length > 0;
  const boxClass = [
    'dcds-InputFields__otp-box',
    isFilled && !isError ? 'dcds-InputFields__otp-box--filled' : '',
    isError ? 'dcds-InputFields__otp-box--error' : '',
    isDisabled ? 'dcds-InputFields__otp-box--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={boxClass}>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        maxLength={1}
        pattern="[0-9]*"
        value={value}
        disabled={isDisabled}
        aria-label={`Digit ${index + 1} of 6`}
        className="dcds-InputFields__otp-input"
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, '');
          onChange(raw.slice(-1), index);
        }}
        onKeyDown={(e) => onKeyDown(e, index)}
        autoComplete="one-time-code"
      />
    </div>
  );
};

/* --------------------------------------------------------------------------
   InputFields — public component
   -------------------------------------------------------------------------- */

/**
 * `InputFields` provides a rich, configurable single/multi-input field for the DCDS
 * design system. It covers six field types and seven visual states, all driven by
 * CSS tokens from `src/theme/tokens.css`.
 *
 * **Supported types:**
 * - `'Default'`   — single-line text with optional password visibility toggle
 * - `'Dropdown'`  — click-only trigger; no validation row; arrow-down trailing icon
 * - `'Currency'`  — 120 px flag + currency code prefix + text input
 * - `'Phone No.'` — 120 px flag + dial code prefix + text input
 * - `'OTP'`       — 6 equal numeric boxes; auto-focuses on input, backspace nav
 * - `'Search'`    — leading search icon + full-height green action button
 *
 * **State summary:**
 * - `'Default'`  — neutral 0.5 px border
 * - `'Focus'`    — blue border (also driven by CSS `:focus-within`)
 * - `'Typing'`   — same as Focus (CSS-driven in production)
 * - `'Filled'`   — green border; also applied when `value !== ''`
 * - `'Error'`    — 1 px red border + red bg; forces `showValidation=true`
 * - `'Disabled'` — grey bg; `aria-disabled`, `pointer-events: none`
 * - `'Read-only'`— neutral border; `readOnly`, `aria-readonly="true"`
 *
 * @example Default text input with help text
 * ```tsx
 * import { InputFields } from '@dcds/components';
 *
 * <InputFields
 *   Type="Default"
 *   label="Full name"
 *   placeholder="Enter your name"
 *   isMandatory
 *   showHelpText
 *   helpText="As it appears on your Aadhaar card"
 *   onChange={(val) => setName(val)}
 * />
 * ```
 *
 * @example Currency input — India
 * ```tsx
 * <InputFields
 *   Type="Currency"
 *   label="Loan amount"
 *   prefixCountry="IN"
 *   prefixCode="INR"
 *   placeholder="0.00"
 * />
 * ```
 *
 * @example OTP entry
 * ```tsx
 * const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
 *
 * <InputFields
 *   Type="OTP"
 *   label="Enter OTP"
 *   otpValues={otp}
 *   onOtpChange={(values) => setOtp(values)}
 * />
 * ```
 *
 * @example Search field
 * ```tsx
 * <InputFields
 *   Type="Search"
 *   label="IFSC code"
 *   placeholder="e.g. SBIN0001234"
 *   searchButtonLabel="Search"
 *   onSearchClick={() => handleSearch()}
 * />
 * ```
 */
export const InputFields: React.FC<InputFieldsProps> = ({
  Type = 'Default',
  State = 'Default',
  label,
  isMandatory = true,
  showLabel = true,
  showTooltip = false,
  tooltipHeading,
  tooltipBody,
  showHelpText = false,
  helpText,
  placeholder,
  value,
  name,
  id: inputFieldId,
  showLeading = true,
  leadingProperty,
  showTrailing = true,
  trailingProperty,
  trailingIcon,
  showValidation = false,
  validationMessage,
  validationProperty = 'error',
  prefixCountry,
  prefixCode = '',
  prefixMenuItems,
  otpValues: otpValuesProp,
  searchButtonLabel = 'Search',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  onChange,
  onOtpChange,
  onFocus,
  onBlur,
  onClick,
  onKeyDown,
  onKeyUp,
  onMouseEnter,
  onMouseLeave,
  onSearchClick,
  onDropdownClick,
  onPrefixClick,
  onPrefixMenuItemSelect,
  onTrailingClick,
  className,
  dataTestId,
}) => {
  /* ---------------------------------------------------------------------- */
  /* Internal state                                                           */
  /* ---------------------------------------------------------------------- */
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isPrefixOpen, setIsPrefixOpen] = React.useState(false);
  const [internalOtpValues, setInternalOtpValues] = React.useState(['', '', '', '', '', '']);

  /* Use controlled otpValues when provided, otherwise use internal state */
  const isOtpControlled = otpValuesProp !== undefined;
  const otpValues = isOtpControlled ? otpValuesProp! : internalOtpValues;

  /* Close prefix dropdown on outside click or Escape */
  const prefixWrapRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!isPrefixOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (prefixWrapRef.current && !prefixWrapRef.current.contains(e.target as Node)) {
        setIsPrefixOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPrefixOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isPrefixOpen]);

  /* OTP refs — one per box for programmatic focus management */
  const otpRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  /* ---------------------------------------------------------------------- */
  /* Derived flags                                                            */
  /* ---------------------------------------------------------------------- */
  const isDisabled = State === 'Disabled';
  const isReadOnly = State === 'Read-only';
  const isError = State === 'Error';
  const isFilled = State === 'Filled' || (value != null && value !== '' && State !== 'Error');

  /* Error always forces validation row; Dropdown never shows it */
  const resolvedShowValidation = Type !== 'Dropdown' && (isError || showValidation);

  /* Validation message id for aria-describedby */
  const validationId = inputFieldId ? `${inputFieldId}-validation` : undefined;
  const helpTextId = inputFieldId ? `${inputFieldId}-helptext` : undefined;
  const inputId = inputFieldId;

  /* Combined aria-describedby */
  const describedByParts = [
    ariaDescribedBy,
    resolvedShowValidation && validationId ? validationId : undefined,
    showHelpText && helpTextId ? helpTextId : undefined,
  ].filter(Boolean);
  const resolvedAriaDescribedBy = describedByParts.length ? describedByParts.join(' ') : undefined;

  /* ---------------------------------------------------------------------- */
  /* Root CSS class                                                           */
  /* ---------------------------------------------------------------------- */
  const typeSlug = Type.toLowerCase().replace(/\s/g, '-').replace(/\./g, '-');
  const stateSlug = State.toLowerCase().replace(/-/g, '-');

  const rootClasses = [
    'dcds-InputFields',
    `dcds-InputFields--type-${typeSlug}`,
    `dcds-InputFields--state-${stateSlug}`,
    isFilled ? 'dcds-InputFields--state-filled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* ---------------------------------------------------------------------- */
  /* Prefix block state                                                       */
  /* ---------------------------------------------------------------------- */
  const prefixState: _BaseElemFrontProps['state'] = isDisabled
    ? 'Disabled'
    : isReadOnly
    ? 'Read-Only'
    : isPrefixOpen
    ? 'Open'
    : 'Default';

  /* ---------------------------------------------------------------------- */
  /* Trailing icon resolution                                                 */
  /* ---------------------------------------------------------------------- */
  const resolveTrailingProperty = (): _BaseTrailngProps['property1'] => {
    if (trailingProperty) return trailingProperty;
    if (Type === 'Dropdown') return 'arrow-down';
    if (Type === 'Default') return isPasswordVisible ? 'eye' : 'eye-slash';
    return 'eye-slash';
  };

  /* ---------------------------------------------------------------------- */
  /* OTP handlers                                                             */
  /* ---------------------------------------------------------------------- */
  const handleOtpChange = (digit: string, index: number): void => {
    const next = [...otpValues];
    next[index] = digit;
    if (!isOtpControlled) setInternalOtpValues(next);
    onOtpChange?.(next, index);
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
    const allowed = new Set(['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']);
    const isCtrl = e.ctrlKey || e.metaKey;
    if (!allowed.has(e.key) && !isCtrl && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Numeric-only key filter (Currency / Phone No.)                          */
  /* ---------------------------------------------------------------------- */
  const numericOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = new Set([
      'Backspace', 'Delete', 'Tab', 'Enter', 'Escape',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End',
    ]);
    // Allow: control combos (Ctrl+A/C/V/X/Z), decimal point for Currency
    const isCtrl  = e.ctrlKey || e.metaKey;
    const isDecimal = Type === 'Currency' && (e.key === '.' || e.key === ',');
    const isDigit = /^[0-9]$/.test(e.key);
    if (!allowed.has(e.key) && !isCtrl && !isDecimal && !isDigit) {
      e.preventDefault();
    }
    onKeyDown?.(e);
  };

  /* ---------------------------------------------------------------------- */
  /* Common input props                                                       */
  /* ---------------------------------------------------------------------- */
  const commonInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id: inputId,
    name,
    value,
    placeholder,
    disabled: isDisabled,
    readOnly: isReadOnly,
    'aria-required': isMandatory ? true : undefined,
    'aria-invalid': isError ? true : undefined,
    'aria-readonly': isReadOnly ? true : undefined,
    'aria-disabled': isDisabled ? true : undefined,
    'aria-label': ariaLabel,
    'aria-describedby': resolvedAriaDescribedBy,
    className: 'dcds-InputFields__input',
    onChange: (e) => onChange?.(e.target.value, e),
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
  };

  /* ---------------------------------------------------------------------- */
  /* Render helpers                                                           */
  /* ---------------------------------------------------------------------- */

  const renderLabelRow = (): React.ReactElement | null => {
    if (!showLabel) return null;
    return (
      <div className="dcds-InputFields__label-row">
        {label && (
          <label className="dcds-InputFields__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        {isMandatory && (
          <span className="dcds-InputFields__mandatory" aria-label="required">
            *
          </span>
        )}
        {showTooltip && (
          <Tooltip heading={tooltipHeading} bodyText={tooltipBody} Placement="Bottom" />
        )}
      </div>
    );
  };

  /* Help text — rendered when enabled, always starts closed; CSS :focus-within opens it */
  const renderHelpText = (): React.ReactElement | null => {
    if (!showHelpText) return null;
    return (
      <div id={helpTextId}>
        <_BaseHelpText state={false} helpText={helpText ?? ''} />
      </div>
    );
  };

  const renderValidation = (): React.ReactElement | null => {
    if (!resolvedShowValidation) return null;
    return (
      <div id={validationId}>
        <_BaseValidation property1={validationProperty} message={validationMessage ?? ''} />
      </div>
    );
  };

  /* ---------------------------------------------------------------------- */
  /* Type-specific field body                                                 */
  /* ---------------------------------------------------------------------- */

  /* OTP — 6 numeric boxes */
  if (Type === 'OTP') {
    return (
      <div
        className={rootClasses}
        data-testid={dataTestId}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {renderLabelRow()}
        {renderHelpText()}
        <div className="dcds-InputFields__otp-row" role="group" aria-label={label ?? 'OTP'}>
          {Array.from({ length: 6 }).map((_, i) => (
            <_BaseOTPBox
              key={i}
              index={i}
              value={otpValues[i] ?? ''}
              isError={isError}
              isDisabled={isDisabled}
              onChange={handleOtpChange}
              onKeyDown={handleOtpKeyDown}
              inputRef={(el) => {
                otpRefs.current[i] = el;
              }}
            />
          ))}
        </div>
        {renderValidation()}
      </div>
    );
  }

  /* Currency / Phone No. — prefix block + text input */
  if (Type === 'Currency' || Type === 'Phone No.') {
    return (
      <div
        className={rootClasses}
        data-testid={dataTestId}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {renderLabelRow()}
        {renderHelpText()}
        <div className="dcds-InputFields__field-row" ref={prefixWrapRef}>
          <_BaseElemFront
            type={Type}
            state={prefixState}
            country={prefixCountry}
            codeText={prefixCode}
            menuItems={prefixMenuItems}
            onPrefixClick={() => {
              if (!isDisabled && !isReadOnly) {
                setIsPrefixOpen((v) => !v);
                onPrefixClick?.();
              }
            }}
            onMenuItemSelect={(item, idx) => {
              setIsPrefixOpen(false);
              onPrefixMenuItemSelect?.(item, idx);
            }}
          />
          <div className="dcds-InputFields__box">
            <div className="dcds-InputFields__box-left">
              {showLeading && leadingProperty && (
                <_BaseLeading property1={leadingProperty} country={prefixCountry} />
              )}
              <input
                {...commonInputProps}
                type="text"
                inputMode={Type === 'Currency' ? 'decimal' : 'numeric'}
                pattern={Type === 'Currency' ? '[0-9]*[.,]?[0-9]*' : '[0-9]*'}
                onKeyDown={numericOnKeyDown}
                onClick={onClick as React.MouseEventHandler<HTMLInputElement>}
              />
            </div>
          </div>
        </div>
        {renderValidation()}
      </div>
    );
  }

  /* Search — leading search icon + input + search button */
  if (Type === 'Search') {
    return (
      <div
        className={rootClasses}
        data-testid={dataTestId}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {renderLabelRow()}
        {renderHelpText()}
        <div className="dcds-InputFields__box dcds-InputFields__box--search">
          <div className="dcds-InputFields__box-left">
            {showLeading && (
              <_BaseLeading property1={leadingProperty ?? 'icon'} country={prefixCountry} />
            )}
            <input
              {...commonInputProps}
              type="text"
              onClick={onClick as React.MouseEventHandler<HTMLInputElement>}
            />
          </div>
          <button
            type="button"
            className="dcds-InputFields__search-btn"
            onClick={onSearchClick}
            disabled={isDisabled}
            aria-label={searchButtonLabel}
          >
            {searchButtonLabel}
          </button>
        </div>
        {renderValidation()}
      </div>
    );
  }

  /* Dropdown — click-driven, arrow-down trailing, no validation row */
  if (Type === 'Dropdown') {
    return (
      <div
        className={rootClasses}
        data-testid={dataTestId}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {renderLabelRow()}
        {renderHelpText()}
        <div
          className="dcds-InputFields__box"
          role="combobox"
          aria-expanded={false}
          aria-haspopup="listbox"
          tabIndex={isDisabled ? -1 : 0}
          aria-label={ariaLabel ?? label}
          aria-disabled={isDisabled ? true : undefined}
          aria-readonly={isReadOnly ? true : undefined}
          onClick={onDropdownClick as React.MouseEventHandler<HTMLDivElement>}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onDropdownClick?.();
            }
          }}
        >
          <div className="dcds-InputFields__box-left">
            <span
              className="dcds-InputFields__input"
              style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}
            >
              {value || (
                <span style={{ color: 'var(--color-text-disabled)' }}>{placeholder}</span>
              )}
            </span>
          </div>
          {showTrailing && (
            <_BaseTrailng property1="arrow-down" onClick={onDropdownClick} />
          )}
        </div>
      </div>
    );
  }

  /* Default — single-line text, optional password toggle */
  const inputType = isPasswordVisible ? 'text' : 'password';
  const isPasswordField = !trailingIcon && showTrailing;

  return (
    <div
      className={rootClasses}
      data-testid={dataTestId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {renderLabelRow()}
      {renderHelpText()}
      <div className="dcds-InputFields__box">
        <div className="dcds-InputFields__box-left">
          {showLeading && leadingProperty && (
            <_BaseLeading property1={leadingProperty} country={prefixCountry} />
          )}
          <input
            {...commonInputProps}
            type={isPasswordField ? inputType : 'text'}
            onClick={onClick as React.MouseEventHandler<HTMLInputElement>}
          />
        </div>
        {showTrailing && (
          trailingIcon
            ? (() => {
                const CustomIcon = trailingIcon;
                return (
                  <button
                    type="button"
                    className="dcds-InputFields__trailing"
                    onClick={onTrailingClick}
                    tabIndex={-1}
                    aria-label="trailing action"
                  >
                    <CustomIcon size={24} />
                  </button>
                );
              })()
            : (
              <_BaseTrailng
                property1={resolveTrailingProperty()}
                onClick={() => {
                  setIsPasswordVisible((v) => !v);
                  onTrailingClick?.();
                }}
              />
            )
        )}
      </div>
      {renderValidation()}
    </div>
  );
};
