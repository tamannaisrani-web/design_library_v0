import type { MouseEvent, KeyboardEvent } from 'react';
import type { IconComponent } from '../shared/types';

/**
 * @internal
 * Props for the `_BaseTabs` sub-component.
 * Never import or use this type directly in product code — use `TabsProps` / `TabItem` instead.
 */

/** Visual style — drives colour, border, and background rules. */
export type BaseTabStyle = 'Filled' | 'Borderless';

/** Height / font-size variant. */
export type BaseTabSize = 'S' | 'M';

/**
 * Props for the Leading icon slot on a single tab.
 *
 * Source icons live in `icons/svg/{linear,bold}/` and are exposed as
 * React components via `icons/src/{linear,bold}/`.
 *
 * Icon colour inherits via `currentColor` and switches automatically per state.
 */
export interface TabLeadingProps {
  /**
   * Icon component from `icons/src/linear/` or `icons/src/bold/`.
   * Pass the component class — the tab renders it at 16 px internally.
   *
   * @example
   * ```tsx
   * import { TickCircleLinear } from 'icons/src/linear/TickCircleLinear';
   * leading={{ icon: TickCircleLinear }}
   * ```
   */
  icon: IconComponent;
}

/**
 * Props for the Trailing badge slot on a single tab.
 *
 * Matches the Figma `Trailing` sub-component (`property1: "counter" | "tag"`).
 *
 * - `'counter'` — numeric count, e.g. `33`. Used in Filled style.
 * - `'tag'`     — short keyword, e.g. `'new'`. Used in Borderless style.
 *
 * Badge background colour is driven by CSS (`--color-fill-action` for Borderless,
 * `--color-fill-invert-info` for Filled, `--color-surface-disabled` when disabled).
 */
export interface TabTrailingProps {
  /** Semantic variant — numeric count or text label. */
  type: 'counter' | 'tag';
  /** Text or number displayed inside the pill. */
  value: string | number;
}

export interface BaseTabsProps {
  /** Tab label text. Keep to 1–3 words. */
  label: string;

  /** Whether this is the currently active tab. */
  isSelected?: boolean;

  /** Whether the tab is non-interactive (Borderless only). */
  isDisabled?: boolean;

  /** Visual style, forwarded from the parent `Tabs`. */
  tabStyle?: BaseTabStyle;

  /** Size, forwarded from the parent `Tabs`. */
  size?: BaseTabSize;

  /**
   * Optional leading icon slot (16 × 16).
   * When omitted, no icon is rendered (`showLeading = false` in Figma terms).
   * @see TabLeadingProps
   */
  leading?: TabLeadingProps;

  /**
   * Optional trailing badge slot.
   * When omitted, no badge is rendered (`showTrailing = false` in Figma terms).
   * @see TabTrailingProps
   */
  trailing?: TabTrailingProps;

  /** Click handler. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

  /** KeyDown handler forwarded from the parent tablist for arrow-key navigation. */
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;

  /** DOM id — used for focus management and `aria-controls`. */
  id?: string;

  /** Id of the associated tab-panel (`aria-controls` value). */
  'aria-controls'?: string;

  /**
   * Tab-key position: `0` for the active tab, `-1` for all others.
   * @default -1
   */
  tabIndex?: number;

  /** `data-testid` for automated tests. */
  dataTestId?: string;
}
