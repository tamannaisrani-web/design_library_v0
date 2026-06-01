/**
 * LinkButton — public TypeScript types.
 * Source: ai-docs/LinkButton.ai.md + dcds-registry.json (id: link-button, figmaNode 868:3050).
 */

import type { ReactNode } from 'react';
import type { ActionSize, BaseComponentProps, InteractiveEventHandlers } from '../shared/types';

/** Visual state of the link. Hover is CSS-driven; do not set explicitly. */
export type LinkButtonState = 'Default' | 'Disabled';

/**
 * Props for the LinkButton component.
 *
 * Renders as `<a>` when `href` is provided, otherwise `<button>`. Either way,
 * styling uses hyperlink tokens — `color/hyperlink/*` — never override.
 */
export interface LinkButtonProps
  extends BaseComponentProps,
    InteractiveEventHandlers<HTMLAnchorElement | HTMLButtonElement> {
  /**
   * Interactive state.
   * @default 'Default'
   */
  state?: LinkButtonState;

  /**
   * Size token.
   * @default 'M'
   */
  size?: ActionSize;

  /** When true, renders only the icon child; ariaLabel is REQUIRED. */
  isIconOnly?: boolean;

  /** Required when `isIconOnly` is true. */
  ariaLabel?: string;

  /**
   * Destination URL. When provided, LinkButton renders as `<a>`; otherwise `<button>`.
   */
  href?: string;

  /** Anchor target. Only used when `href` is set. */
  target?: '_self' | '_blank' | '_parent' | '_top';

  /** Anchor rel attribute. Only used when `href` is set. */
  rel?: string;

  /** Label and/or icon content. */
  children?: ReactNode;
}
