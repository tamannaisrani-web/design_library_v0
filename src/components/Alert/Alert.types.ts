/**
 * Alert — public TypeScript types.
 *
 * Source spec: ai-docs/Alert.ai.md + dcds-registry.json (figmaNode 334:4997).
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps, InteractiveEventHandlers } from '../shared/types';

/** Semantic state of the Alert. Drives background colour, border, and icon. */
export type AlertState = 'success' | 'error' | 'warning' | 'info';

/**
 * Visual weight of the Alert.
 * - `subtle`  — default. Light background tint + 1px coloured border (inline)
 *              or 4px left border only (toast).
 * - `subtler` — lower weight. White/surface-1 background + 2px coloured border.
 *              Use when the Alert is secondary to surrounding page content.
 */
export type AlertEmphasis = 'subtle' | 'subtler';

/**
 * Props for the Alert component.
 *
 * @example Inline success
 * ```tsx
 * <Alert state="success" title="Saved">
 *   Your changes have been saved successfully.
 * </Alert>
 * ```
 *
 * @example Toast (auto-dismisses, onClose required)
 * ```tsx
 * <Alert state="info" isFlag onClose={dismiss}>
 *   Invoice #1042 has been sent.
 * </Alert>
 * ```
 */
export interface AlertProps extends BaseComponentProps, InteractiveEventHandlers<HTMLDivElement> {
  /**
   * Semantic state. Determines background, border, and icon colour.
   */
  state: AlertState;

  /**
   * Visual emphasis level.
   * @default 'subtle'
   */
  emphasis?: AlertEmphasis;

  /**
   * When `true`, renders as a floating snackbar/toast (left-border accent only).
   * Auto-dismisses after ~5 s when `onClose` is supplied.
   * @default false
   */
  isFlag?: boolean;

  /**
   * Optional bold title at 14 px. Omit for single-line message-only alerts.
   */
  title?: string;

  /**
   * Message text at 12 px regular.
   */
  children?: ReactNode;

  /**
   * Called when the close button is clicked (subtle only) OR when the toast
   * timeout expires (`isFlag=true`). Omit to suppress the close button.
   */
  onClose?: () => void;

  /**
   * Optional action row (e.g. `<Button>` + `<LinkButton>`).
   * Only rendered when `emphasis="subtle"`.
   */
  actions?: ReactNode;
}
