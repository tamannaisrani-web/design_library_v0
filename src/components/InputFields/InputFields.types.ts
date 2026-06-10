import type React from 'react';
import type { BaseComponentProps, IconComponent } from '../shared/types';

export type { IconComponent };

/**
 * The input field variant — controls layout, trailing icon, and prefix behaviour.
 * - `'Default'`   — single-line text input with optional eye-slash toggle
 * - `'Dropdown'`  — opens a dropdown; no validation row
 * - `'Currency'`  — 120 px prefix (flag + currency code + arrow-down) + text input
 * - `'Phone No.'` — 120 px prefix (flag + dial code + arrow-down) + text input
 * - `'OTP'`       — 6 equal numeric boxes in a flex row
 * - `'Search'`    — leading search icon + trailing green action button
 */
export type InputFieldsType =
  | 'Default'
  | 'Dropdown'
  | 'Currency'
  | 'Phone No.'
  | 'OTP'
  | 'Search';

/**
 * Visual / interaction state of the field.
 * - `'Default'`   — neutral resting state
 * - `'Focus'`     — field is focused (CSS :focus-within also drives this)
 * - `'Typing'`    — user is actively typing (CSS-driven; also forced via prop for Storybook)
 * - `'Filled'`    — field has a value (border `--color-stroke-action`)
 * - `'Error'`     — validation failed; forces `showValidation=true`
 * - `'Disabled'`  — non-interactive; `aria-disabled`, `pointer-events: none`
 * - `'Read-only'` — focusable but not editable; `readOnly`, `aria-readonly="true"`
 */
export type InputFieldsState =
  | 'Default'
  | 'Focus'
  | 'Typing'
  | 'Filled'
  | 'Error'
  | 'Disabled'
  | 'Read-only';

/**
 * Semantic colour of the validation row beneath the field.
 * - `'error'`   — red `InformationBold` icon + red text
 * - `'warning'` — amber `InformationBold` icon + amber text
 * - `'success'` — green `TickCircleBold` icon + green text
 */
export type InputFieldsValidationProperty = 'error' | 'warning' | 'success';

/**
 * Props for the public `InputFields` component.
 *
 * **DCDS rules (Figma + InputFields.ai.md):**
 * - All field heights are 48 px; horizontal padding 12 px.
 * - `State='Error'` always forces `showValidation=true` internally.
 * - `Type='Dropdown'` never renders a validation row.
 * - `Type='OTP'` renders 6 numeric boxes; use `otpValues` + `onOtpChange`.
 * - `Type='Search'` uses a full-height green action button as the trailing element.
 * - Password visibility is managed internally for `Type='Default'`.
 * - Focus/Typing visual states are CSS-driven via `:focus-within` in production;
 *   set `State` to `'Focus'` or `'Typing'` to force the appearance in Storybook.
 * - `Filled` appearance is applied when `State='Filled'` OR `value !== ''`.
 *
 * @example Default text input
 * ```tsx
 * import { InputFields } from '@dcds/components';
 *
 * <InputFields
 *   Type="Default"
 *   label="Full Name"
 *   placeholder="Enter your name"
 *   isMandatory
 *   showHelpText
 *   helpText="As it appears on your PAN card"
 *   onChange={(val) => setName(val)}
 * />
 * ```
 *
 * @example Phone number with country prefix
 * ```tsx
 * <InputFields
 *   Type="Phone No."
 *   label="Mobile Number"
 *   prefixCountry="IN"
 *   prefixCode="+91"
 *   placeholder="98765 43210"
 * />
 * ```
 *
 * @example OTP entry
 * ```tsx
 * <InputFields
 *   Type="OTP"
 *   label="Enter OTP"
 *   otpValues={['', '', '', '', '', '']}
 *   onOtpChange={(values) => setOtp(values)}
 * />
 * ```
 */
export interface InputFieldsProps extends BaseComponentProps {
  /* ------------------------------------------------------------------ */
  /* Field type and state                                                  */
  /* ------------------------------------------------------------------ */

  /**
   * Input variant controlling layout and trailing decoration.
   * @default 'Default'
   */
  Type?: InputFieldsType;

  /**
   * Visual/interaction state.
   * `'Focus'` and `'Typing'` are usually CSS-driven; pass them only when
   * forcing the appearance (e.g. in Storybook stories).
   * @default 'Default'
   */
  State?: InputFieldsState;

  /* ------------------------------------------------------------------ */
  /* Label row                                                             */
  /* ------------------------------------------------------------------ */

  /** Label text rendered above the field. */
  label?: string;

  /**
   * Show the red mandatory asterisk next to the label.
   * Also sets `aria-required="true"` on the input.
   * @default true
   */
  isMandatory?: boolean;

  /**
   * Show the label row entirely (label + mandatory marker + tooltip trigger).
   * @default true
   */
  showLabel?: boolean;

  /**
   * Show an info-circle tooltip trigger icon after the label.
   * @default false
   */
  showTooltip?: boolean;

  /** Heading text shown inside the tooltip popover. */
  tooltipHeading?: string;

  /** Body text shown inside the tooltip popover. */
  tooltipBody?: string;

  /* ------------------------------------------------------------------ */
  /* Help text                                                             */
  /* ------------------------------------------------------------------ */

  /**
   * Show the collapsible help text row below the field.
   * @default false
   */
  showHelpText?: boolean;

  /** Help text string displayed below the input when `showHelpText=true`. */
  helpText?: string;

  /* ------------------------------------------------------------------ */
  /* Field body                                                            */
  /* ------------------------------------------------------------------ */

  /** Placeholder string shown when the field is empty. */
  placeholder?: string;

  /** Controlled value of the input. */
  value?: string;

  /** HTML `name` attribute. */
  name?: string;

  /** HTML `id` attribute; auto-linked to `<label htmlFor>`. */
  id?: string;

  /* ------------------------------------------------------------------ */
  /* Leading / trailing slots                                              */
  /* ------------------------------------------------------------------ */

  /**
   * Show the leading slot (search icon for `Type='Search'`; symbol for
   * `Type='Currency'`/`'Phone No.'` is handled via `_BaseElemFront`).
   * @default true
   */
  showLeading?: boolean;

  /**
   * Override which leading variant renders inside the input box.
   * - `'icon'`  — search icon (default for `Type='Search'`)
   * - `'INR'`   — ₹ symbol
   * - `'USD'`   — $ symbol
   * - `'Flag'`  — country flag (requires `prefixCountry`)
   * When omitted the component chooses based on `Type`.
   */
  leadingProperty?: 'icon' | 'INR' | 'USD' | 'Flag';

  /**
   * Show the trailing slot (eye-slash for Default, arrow-down for Dropdown).
   * @default true
   */
  showTrailing?: boolean;

  /**
   * Override which trailing icon renders.
   * - `'eye-slash'`  — password hidden (default toggle for `Type='Default'`)
   * - `'eye'`        — password visible
   * - `'calendar-2'` — date picker trigger
   * - `'arrow-down'` — dropdown chevron (default for `Type='Dropdown'`)
   * When omitted the component chooses based on `Type`.
   */
  trailingProperty?: 'eye-slash' | 'eye' | 'calendar-2' | 'arrow-down';

  /**
   * Override the system-default trailing icon component.
   * Pass `null` to suppress entirely; omit to use the type-appropriate default.
   */
  trailingIcon?: IconComponent | null;

  /* ------------------------------------------------------------------ */
  /* Validation                                                            */
  /* ------------------------------------------------------------------ */

  /**
   * Show the validation message row below the field.
   * Automatically forced to `true` when `State='Error'`.
   * Has no effect when `Type='Dropdown'`.
   * @default false
   */
  showValidation?: boolean;

  /** Message shown in the validation row. */
  validationMessage?: string;

  /**
   * Semantic colour of the validation row.
   * @default 'error'
   */
  validationProperty?: InputFieldsValidationProperty;

  /* ------------------------------------------------------------------ */
  /* Currency / Phone prefix                                               */
  /* ------------------------------------------------------------------ */

  /**
   * ISO 3166-1 alpha-2 country code used to load the flag SVG
   * from `dcds-flags/flags/{COUNTRY}.svg`.
   * @example 'IN', 'US', 'GB'
   */
  prefixCountry?: string;

  /**
   * Currency code (`'INR'`, `'USD'`) or dial code (`'+91'`, `'+1'`) shown
   * in the `_BaseElemFront` prefix block.
   */
  prefixCode?: string;

  /**
   * Items rendered in the `_BaseElemFront` dropdown when it is opened.
   * Only relevant for `Type='Currency'` and `Type='Phone No.'`.
   * Clicking a menu item fires `onPrefixMenuItemSelect`.
   */
  prefixMenuItems?: PrefixMenuItem[];

  /* ------------------------------------------------------------------ */
  /* OTP                                                                   */
  /* ------------------------------------------------------------------ */

  /**
   * Controlled values for the 6 OTP boxes.
   * Each element is a single character string (or empty string).
   * @example ['1', '2', '3', '', '', '']
   */
  otpValues?: string[];

  /* ------------------------------------------------------------------ */
  /* Search                                                                */
  /* ------------------------------------------------------------------ */

  /**
   * Label text for the search action button (trailing element when `Type='Search'`).
   * @default 'Search'
   */
  searchButtonLabel?: string;

  /* ------------------------------------------------------------------ */
  /* Accessibility                                                          */
  /* ------------------------------------------------------------------ */

  /** Accessible label when a visible label is not present. */
  'aria-label'?: string;

  /** ID of an external element that describes the field. */
  'aria-describedby'?: string;

  /* ------------------------------------------------------------------ */
  /* Event handlers                                                        */
  /* ------------------------------------------------------------------ */

  /**
   * Fires on every keystroke for single-line inputs.
   * Receives the current string value and the native change event.
   */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Fires on every OTP digit change.
   * Receives the full 6-element array and the index that changed.
   */
  onOtpChange?: (values: string[], index: number) => void;

  /** Focus handler on the underlying `<input>`. */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;

  /** Blur handler on the underlying `<input>`. */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /** Click handler; `HTMLDivElement` for Dropdown/Search wrapper clicks. */
  onClick?: React.MouseEventHandler<HTMLInputElement | HTMLDivElement>;

  /** Key-down handler on the underlying `<input>`. */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

  /** Key-up handler on the underlying `<input>`. */
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;

  /** Mouse-enter handler on the field root `<div>`. */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;

  /** Mouse-leave handler on the field root `<div>`. */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

  /** Fires when the search button is clicked (`Type='Search'`). */
  onSearchClick?: () => void;

  /** Fires when the field box is clicked (`Type='Dropdown'`). */
  onDropdownClick?: () => void;

  /** Fires when the `_BaseElemFront` prefix button is clicked (toggles the dropdown). */
  onPrefixClick?: () => void;

  /**
   * Fires when an item is selected from the `_BaseElemFront` open dropdown.
   * Receives the selected `PrefixMenuItem` and its 0-based index in `prefixMenuItems`.
   */
  onPrefixMenuItemSelect?: (item: PrefixMenuItem, index: number) => void;

  /** Fires when the trailing icon element is clicked. */
  onTrailingClick?: () => void;

  /**
   * Override the `aria-expanded` attribute on the Dropdown box.
   * Only used when `Type='Dropdown'`. Allows composing components (e.g. Datepicker)
   * to drive the open/closed aria state externally.
   * @default false
   */
  ariaExpanded?: boolean;
}

/* --------------------------------------------------------------------------
   Internal sub-component prop types (not exported from the package barrel)
   -------------------------------------------------------------------------- */

/**
 * @internal
 * Props for `_BaseValidation` — the validation message row.
 * Controlled via `InputFieldsProps.showValidation` + `validationProperty` + `validationMessage`.
 */
export interface _BaseValidationProps {
  /** Semantic colour and icon selection. */
  property1: InputFieldsValidationProperty;
  /** Validation message text. */
  message: string;
}

/**
 * @internal
 * Props for `_BaseLeading` — the leading icon/symbol slot inside the input box.
 * Controlled via `InputFieldsProps.showLeading`.
 */
export interface _BaseLeadingProps {
  /** Which variant to render. */
  property1: 'icon' | 'USD' | 'INR' | 'Flag';
  /** ISO 3166-1 alpha-2 country code for `property1='Flag'`. */
  country?: string;
}

/**
 * @internal
 * Props for `_BaseTrailng` (Figma typo preserved) — the trailing icon slot.
 * Controlled via `InputFieldsProps.showTrailing` + `trailingIcon`.
 */
export interface _BaseTrailngProps {
  /** Which icon to render. */
  property1: 'eye-slash' | 'eye' | 'calendar-2' | 'arrow-down';
  /** Click handler forwarded from the parent. */
  onClick?: () => void;
}

/**
 * @internal
 * Props for `_BaseHelpText` — the collapsible help text row.
 * Controlled via `InputFieldsProps.showHelpText` + `helpText`.
 */
export interface _BaseHelpTextProps {
  /** `true` = expanded; `false` = collapsed (height 0, opacity 0). */
  state: boolean;
  /** Help text content. */
  helpText: string;
}

/**
 * @internal
 * Props for `_BaseElemFront` — the 120 px prefix block used by Currency and Phone No.
 * Controlled via `InputFieldsProps.prefixCountry` + `prefixCode` + `onPrefixClick`.
 */
/**
 * A single item inside the `_BaseElemFront` open dropdown.
 *
 * Designed to map directly from a backend currency or dial-code enum:
 * ```ts
 * // Backend shape → PrefixMenuItem
 * const currencies: PrefixMenuItem[] = backendEnum.map(c => ({
 *   country: c.country_code,   // 'IN'
 *   code:    c.currency_code,  // 'INR'
 *   label:   c.currency_name,  // 'Indian Rupee'
 *   value:   c.currency_code,  // emitted on select; defaults to `code`
 * }));
 * ```
 */
export interface PrefixMenuItem {
  /** ISO 3166-1 alpha-2 country code used to load the flag SVG. */
  country: string;
  /** Short code shown in the prefix block and in the dropdown row (e.g. `'INR'`, `'+91'`). */
  code: string;
  /**
   * Human-readable display name shown alongside the code in the dropdown
   * (e.g. `'Indian Rupee'`, `'India'`).
   * Sourced directly from a backend enum's `name` / `currency_name` / `country_name` field.
   */
  label?: string;
  /**
   * The value emitted by `onPrefixMenuItemSelect` and used for form submission.
   * Defaults to `code` when omitted — allows the backend enum's primary key to
   * differ from the display code without extra mapping.
   */
  value?: string;
}

export interface _BaseElemFrontProps {
  /** Input type that determines labelling semantics. */
  type: 'Currency' | 'Phone No.';
  /**
   * Visual state of the prefix block.
   * - `'Default'`  — 0.5 px `stroke-neutral` border, white bg
   * - `'Open'`     — 1 px `stroke-focus-subtle` border, arrow rotated 180°, dropdown shown
   * - `'Disabled'` — 1 px `stroke-disabled` border, `surface-3` bg, muted text
   * - `'Read-Only'`— 1 px `stroke-disabled` border, `surface-2` bg, neutral text
   */
  state: 'Default' | 'Open' | 'Disabled' | 'Read-Only';
  /** ISO 3166-1 alpha-2 country code for the flag (e.g. `'IN'`). */
  country?: string;
  /** Currency code or dial code text, e.g. `'INR'` or `'+91'`. */
  codeText: string;
  /**
   * Items to display in the dropdown when `state='Open'`.
   * Each item renders a 24×18 px flag + code text.
   */
  menuItems?: PrefixMenuItem[];
  /** Click handler fired when the prefix button is clicked (toggle open/close). */
  onPrefixClick?: () => void;
  /** Fired when a menu item is selected; receives the item and its 0-based index. */
  onMenuItemSelect?: (item: PrefixMenuItem, index: number) => void;
}

/**
 * @internal
 * Props for `_BaseOTPBox` — a single digit box inside the OTP row.
 */
export interface _BaseOTPBoxProps {
  /** 0-based index within the 6-box row. */
  index: number;
  /** Current digit value (single char or empty string). */
  value: string;
  /** Whether the field is in error state. */
  isError: boolean;
  /** Whether the field is disabled. */
  isDisabled: boolean;
  /** Change handler — passes the new single-char value and index. */
  onChange: (value: string, index: number) => void;
  /** Key-down handler — used for backspace navigation. */
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  /** Ref callback used to store the DOM node for programmatic focus. */
  inputRef: (el: HTMLInputElement | null) => void;
}
