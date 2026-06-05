import type { MouseEvent } from 'react';
import type { BaseComponentProps } from '../shared/types';
import type { TabLeadingProps, TabTrailingProps } from './_BaseTabs.types';

/**
 * Visual style of the Tabs strip.
 *
 * - `'Filled'`     — active tab has a dark-navy filled background (pill style).
 *                    **Only valid when `isFullwidth={true}`.**
 * - `'Borderless'` — active tab uses a 4 px green bottom border as the indicator.
 */
export type TabStyle = 'Filled' | 'Borderless';

/**
 * Height / font-size variant.
 *
 * - `'S'` — compact: Filled 32 px height / 14 px label text.
 * - `'M'` — default: Filled 48 px height / 16 px body text.
 */
export type TabSize = 'S' | 'M';

/**
 * Configuration object for a single tab inside `Tabs`.
 */
export interface TabItem {
  /**
   * Tab label text. Keep to **1–3 words** — longer labels break the layout.
   */
  label: string;

  /**
   * Optional leading icon slot (16 × 16).
   *
   * Source icons live in `icons/svg/{linear,bold}/tick-circle.svg` and are
   * exposed as React components in `icons/src/{linear,bold}/`.
   * - Borderless style: `<TickCircleLinear size={16} />` from `icons/src/linear/`
   * - Filled style: `<TickCircleBold size={16} />` from `icons/src/bold/`
   *
   * Colour inherits via `currentColor` and switches automatically per state.
   * Omit for a label-only tab (`showLeading = false` in Figma).
   *
   * @example
   * ```tsx
   * import { TickCircleLinear } from 'icons/src/linear/TickCircleLinear';
   * leading={{ icon: <TickCircleLinear size={16} /> }}
   * ```
   */
  leading?: TabLeadingProps;

  /**
   * Optional trailing badge slot.
   * - `type: 'counter'` — numeric count (e.g. `33`). Fills blue in Filled style.
   * - `type: 'tag'`     — text keyword (e.g. `'new'`). Fills green in Borderless style.
   *
   * Omit to hide the badge (`showTrailing = false` in Figma).
   *
   * @example
   * ```tsx
   * trailing={{ type: 'tag', value: 'new' }}
   * trailing={{ type: 'counter', value: 33 }}
   * ```
   */
  trailing?: TabTrailingProps;

  /**
   * Disables this tab — non-interactive and visually dimmed.
   * Only applies to **Borderless** style; ignored for Filled.
   */
  disabled?: boolean;

  /** `data-testid` attribute on the tab button. */
  dataTestId?: string;
}

/**
 * Props for the `Tabs` component.
 *
 * @example Controlled full-width filled tabs
 * ```tsx
 * import { Tabs } from '@dcds/components';
 * import { TickCircleBold } from '@dcds/icons/bold';
 *
 * const [active, setActive] = React.useState(0);
 *
 * <Tabs
 *   tabs={[
 *     { label: 'Overview',  leadingIcon: <TickCircleBold size={16} /> },
 *     { label: 'Documents', leadingIcon: <TickCircleBold size={16} />, trailingBadge: 33 },
 *     { label: 'Activity',  leadingIcon: <TickCircleBold size={16} /> },
 *   ]}
 *   tabStyle="Filled"
 *   size="M"
 *   isFullwidth
 *   activeIndex={active}
 *   onChange={(i) => setActive(i)}
 * />
 * ```
 *
 * @example Uncontrolled borderless tabs
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { label: 'All loans' },
 *     { label: 'Active' },
 *     { label: 'Closed', disabled: true },
 *   ]}
 *   tabStyle="Borderless"
 *   size="M"
 *   onChange={(i) => console.log('tab', i)}
 * />
 * ```
 */
export interface TabsProps extends BaseComponentProps {
  /**
   * Ordered list of tab items. **Maximum 5–6 tabs per group.**
   * Use a dropdown for more options.
   */
  tabs: TabItem[];

  /**
   * Zero-based index of the active tab (**controlled** mode).
   * When provided the component does not manage internal state.
   */
  activeIndex?: number;

  /**
   * Default active tab index for **uncontrolled** mode.
   * Ignored when `activeIndex` is supplied.
   * @default 0
   */
  defaultActiveIndex?: number;

  /**
   * Stretch tab items equally to fill the full container width.
   * **Required when `tabStyle="Filled"`** — Filled + `isFullwidth={false}` is not a valid combination.
   * @default false
   */
  isFullwidth?: boolean;

  /**
   * Visual style of the tab strip.
   * - `'Filled'`     — requires `isFullwidth={true}`.
   * - `'Borderless'` — auto-width tabs, left-aligned.
   * @default 'Borderless'
   */
  tabStyle?: TabStyle;

  /**
   * Height / text-size variant.
   * - `'S'` — compact.
   * - `'M'` — default.
   * @default 'M'
   */
  size?: TabSize;

  /**
   * Fired when the user activates a tab.
   * Receives the new zero-based index and the originating mouse event.
   */
  onChange?: (index: number, event: MouseEvent<HTMLButtonElement>) => void;
}
