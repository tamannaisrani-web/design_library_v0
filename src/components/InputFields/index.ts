/**
 * InputFields — rich configurable input field for the DCDS design system.
 *
 * Supports six types: Default, Dropdown, Currency, Phone No., OTP, Search.
 * Supports seven states: Default, Focus, Typing, Filled, Error, Disabled, Read-only.
 *
 * Usage:
 * ```tsx
 * import { InputFields } from '@dcds/components';
 * import type { InputFieldsProps, InputFieldsType, InputFieldsState } from '@dcds/components';
 * ```
 *
 * Internal sub-components (`_BaseValidation`, `_BaseLeading`, `_BaseTrailng`,
 * `_BaseHelpText`, `_BaseElemFront`, `_BaseOTPBox`) are not exported and must
 * never be used directly outside `InputFields.tsx`.
 */
export { InputFields } from './InputFields';
export type {
  InputFieldsProps,
  InputFieldsType,
  InputFieldsState,
  InputFieldsValidationProperty,
  PrefixMenuItem,
} from './InputFields.types';
