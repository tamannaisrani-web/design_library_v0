/**
 * Button — public TypeScript types.
 *
 * Source spec: ai-docs/Button.ai.md + dcds-registry.json (id: button, figmaNode 850:10752).
 */

import type { ReactNode } from 'react';
import type {
  ActionColor,
  ActionSize,
  ActionVariant,
  BaseComponentProps,
  InteractiveEventHandlers,
} from '../shared/types';

/**
 * Props for the Button component.
 *
 * @example
 * ```tsx
 * <Button variant="Primary" color="Primary" size="M" onClick={save}>
 *   Save changes
 * </Button>
 * ```
 */
export interface ButtonProps
  extends BaseComponentProps,
    InteractiveEventHandlers<HTMLButtonElement> {
  /**
   * Visual weight of the button.
   * - `Primary` — filled (one per page section)
   * - `Secondary` — outlined
   * - `Tertiary` — ghost / text-only
   * @default 'Primary'
   */
  variant?: ActionVariant;

  /**
   * Semantic colour role.
   * - `Primary` — Wealthy Green; default for constructive actions
   * - `Error` — Zesty Orange; **irreversible** actions only (delete, revoke)
   * - `Warning` — Mustard Yellow; reversible caution actions
   * @default 'Primary'
   */
  color?: ActionColor;

  /**
   * Height token.
   * - `L` 48px — page-level hero CTA only
   * - `M` 40px — default
   * - `S` 32px — toolbars, dense layouts
   * - `XS` 24px — tables, tags only
   * @default 'M'
   */
  size?: ActionSize;

  /** When true, button is non-interactive and uses disabled colour tokens. */
  isDisabled?: boolean;

  /** When true, button fills the width of its container (used in mobile forms). */
  isFullWidth?: boolean;

  /**
   * When true, label is hidden and only the icon child is rendered.
   * **You MUST pass `ariaLabel`** when this is true.
   */
  isIconOnly?: boolean;

  /** Required accessible name when `isIconOnly` is true. */
  ariaLabel?: string;

  /** Button type attribute. Defaults to `'button'` to avoid accidental form submit. */
  type?: 'button' | 'submit' | 'reset';

  /** Communicates an in-flight async operation to assistive technology. */
  ariaBusy?: boolean;

  /**
   * Icon rendered **before** the label. Sized automatically to the button's scale
   * (16 px for L/M, 12 px for S/XS). Pass a single icon component.
   */
  leadingIcon?: ReactNode;

  /**
   * Icon rendered **after** the label. Same automatic sizing as `leadingIcon`.
   */
  trailingIcon?: ReactNode;

  /** Label text (and/or arbitrary content). For icon-only buttons, pass the icon here instead. */
  children?: ReactNode;
}
