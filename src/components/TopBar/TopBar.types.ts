/**
 * TopBar — public TypeScript types.
 *
 * Source spec: DripDesign.md (Rule 8 · Navigation · TopBar).
 * Figma: https://www.figma.com/design/P52nmDshYaKr963q1zBwQj · node 673:16869
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../shared/types';

/**
 * A single tab item in the `TopBar` navigation.
 *
 * @example Active tab
 * ```ts
 * { id: 'invoices', label: 'Invoices', isActive: true }
 * ```
 *
 * @example Tab with dropdown indicator
 * ```ts
 * { id: 'payments', label: 'Payments', hasDropdown: true, onClick: handlePaymentsClick }
 * ```
 */
export interface TopBarTab {
  /** Unique key for this tab — used in `onTabClick`. */
  id: string;
  /** Visible label text. */
  label: string;
  /**
   * When `true`, renders this tab in its active/selected state:
   * bold green text + 4 px green bottom border.
   * Only **one** tab should be active at a time.
   * @default false
   */
  isActive?: boolean;
  /**
   * When `true`, renders a 16 px `arrow-down` icon after the label
   * to indicate a dropdown sub-navigation.
   * @default false
   */
  hasDropdown?: boolean;
  /**
   * Click handler fired when this specific tab button is clicked.
   * Also fires the parent `onTabClick` with this tab's `id`.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Props for the **TopBar** component.
 *
 * `TopBar` is the horizontal navigation bar rendered at the top of a page.
 * It consists of three zones:
 * 1. **Logo** — 240 px slot (accepts any `ReactNode`; pair with the `Logo` component)
 * 2. **Navigation tabs** — optional, inline horizontal tab strip (`showNavigation`)
 * 3. **Right utilities** — optional company selector (`showCompany`) + user avatar (`showUser`)
 *
 * ### Figma spec
 * - Height: 64 px (driven by logo and tab heights)
 * - Background: `color/surface/1` (white)
 * - Border: `1px solid color/stroke/subdued` on the bottom edge
 * - Active tab: `Desktop/Body/Body - Bold` (16 px), `color/text/action`, 4 px `color/stroke/action` bottom border
 * - Inactive tab: `Desktop/Body/Body - Regular` (16 px), `color/text/subdued`
 * - Company / user buttons: 48 px tall, `rd-S` (8 px), `color/surface/1` fill
 * - Avatars: 32×32 px, `color/fill/secondary-2` fill
 *
 * @see DripDesign.md · Rule 8 · Navigation · TopBar
 * @see Figma node 673:16869 — Design Language System (Claude)
 *
 * @example Full TopBar
 * ```tsx
 * <TopBar
 *   logoSlot={<img src={logo} alt="Drip Capital SCF" />}
 *   navigationTabs={[
 *     { id: 'dashboard', label: 'Dashboard' },
 *     { id: 'invoices',  label: 'Invoices', isActive: true },
 *     { id: 'payments',  label: 'Payments', hasDropdown: true },
 *   ]}
 *   companyName="Acme Corp"
 *   userInitials="AM"
 *   onTabClick={(id) => navigate(id)}
 *   onCompanyClick={openCompanySwitcher}
 *   onUserClick={openUserMenu}
 * />
 * ```
 *
 * @example Navigation hidden
 * ```tsx
 * <TopBar showNavigation={false} companyName="Acme Corp" userInitials="JD" />
 * ```
 */
export interface TopBarProps extends BaseComponentProps {
  /**
   * Figma variant identifier. Only `"Default"` exists in the design system.
   * @default 'Default'
   */
  property1?: 'Default';

  /**
   * When `true`, renders the tab navigation strip between the logo divider and the
   * right utility zone.
   * @default true
   */
  showNavigation?: boolean;

  /**
   * When `true`, renders the company selector (building icon + name + chevron)
   * in the right utility zone.
   * @default true
   */
  showCompany?: boolean;

  /**
   * When `true`, renders the user avatar button (initials + chevron)
   * in the right utility zone.
   * @default true
   */
  showUser?: boolean;

  /**
   * Content rendered inside the 240 px logo slot on the far left.
   * Pass the `Logo` component or any image/SVG.
   * If omitted, a design-system placeholder is rendered.
   */
  logoSlot?: ReactNode;

  /**
   * Tab items for the horizontal navigation strip.
   * Rendered when `showNavigation={true}`.
   * Mark the current route with `isActive: true` — only one tab should be active at a time.
   */
  navigationTabs?: TopBarTab[];

  /**
   * Company name shown in the company selector button.
   * Truncated with ellipsis when too long.
   * @default 'Company Name'
   */
  companyName?: string;

  /**
   * 1–2 character initials rendered inside the user avatar circle.
   * @default 'AM'
   */
  userInitials?: string;

  /**
   * Fired when any navigation tab is clicked.
   * Receives the `id` of the clicked tab.
   */
  onTabClick?: (tabId: string) => void;

  /**
   * Fired when the company selector button is clicked.
   */
  onCompanyClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Fired when the user avatar button is clicked.
   */
  onUserClick?: React.MouseEventHandler<HTMLButtonElement>;
}
