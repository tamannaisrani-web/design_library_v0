/**
 * Switch — public TypeScript types.
 * Source: dcds-registry.json (id: switch, figmaNode 868:3060).
 * Figma axes: State (Enabled / Disabled) × Type (On / Off).
 */

import type { BaseComponentProps } from '../shared/types';

/** Interactive state. */
export type SwitchState = 'Enabled' | 'Disabled';

/**
 * Props for the Switch component.
 *
 * Use for an **instant-effect** boolean toggle (no form submit needed).
 * For form settings that require submit, use `Checkbox`.
 */
export interface SwitchProps extends BaseComponentProps {
  /**
   * Interactive state.
   * @default 'Enabled'
   */
  State?: SwitchState;

  /** Controlled checked value. `true` ⇒ Type="On". */
  checked?: boolean;

  /** Uncontrolled initial value. Ignored when `checked` is provided. */
  defaultChecked?: boolean;

  /** Form field name (use when inside a `<form>`). */
  name?: string;

  /** Visible label adjacent to the switch — strongly recommended for accessibility. */
  label?: string;

  /** Callback invoked when the user toggles the switch. */
  onChange?: (nextChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Focus and blur are surfaced for keyboard navigation hooks. */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}
