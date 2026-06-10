/**
 * NavElement — public TypeScript types.
 *
 * Source spec: NavElement.ai.md + DripDesign.md (Rule 8 · Navigation).
 * Figma: https://www.figma.com/design/P52nmDshYaKr963q1zBwQj · node 673:17244 (NavElement), 1716:6592 (Navigation frame)
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps, IconComponent, InteractiveEventHandlers } from '../shared/types';

/**
 * Props for the **NavElement** component.
 *
 * `NavElement` is the individual navigation link item used inside `SideBar`.
 * It handles Default, Hover (CSS-driven), and Selected visual states, an optional
 * 16 px bold icon, and an optional inline accordion that expands to reveal
 * `BaseNav` subsection rows when the item is Selected.
 *
 * ### Constraints (NavElement.ai.md)
 * - Exactly **one** `NavElement` must have `style="Selected"` at any time — the active route.
 * - `style="Hover"` is CSS-driven — **never** set it explicitly in code.
 * - `showDropdown=true` expands **inline** (accordion) — does NOT open a floating `DropdownMenu`.
 * - `BaseNav` children are shown when `style="Selected"` AND `showDropdown={true}`.
 * - **Never** use `NavElement` as an action button — use `Button` or `LinkButton` for actions.
 * - Selected state → grey background (`color/surface/3`) + blue bold text — NOT green.
 * - Icon size is 16 px (bold style) — always use at 16 px.
 *
 * @see NavElement.ai.md
 * @see DripDesign.md · Rule 8 · Navigation · NavElement
 * @see Figma node 673:17244 — Design Language System (Claude)
 *
 * @example Selected direct link (current route, no sub-navigation)
 * ```tsx
 * import { Home2Bold } from '../../../icons/src/bold/Home2Bold';
 * <NavElement
 *   style="Selected"
 *   showDropdown={false}
 *   name="Dashboard"
 *   icon={Home2Bold}
 *   aria-current="page"
 * />
 * ```
 *
 * @example Selected with inline accordion (subsections visible)
 * ```tsx
 * import { MoneySendBold } from '../../../icons/src/bold/MoneySendBold';
 * <NavElement style="Selected" showDropdown name="Payments" icon={MoneySendBold}>
 *   <BaseNav property1="Default" name="Monthly" />
 *   <BaseNav property1="Selected" name="Quarterly" />
 *   <BaseNav property1="Default" name="Annual" />
 * </NavElement>
 * ```
 */
export interface NavElementProps
  extends BaseComponentProps,
    InteractiveEventHandlers<HTMLButtonElement> {
  /**
   * Visual state of the nav item.
   * - `Default` — idle; user is NOT on this route. Transparent background, regular-weight label.
   * - `Selected` — active; user IS on this route. `color/surface/3` background + bold label.
   *
   * **Do NOT set `"Hover"` in code** — hover is handled by CSS `:hover`. The Hover
   * state only exists in Figma for design documentation.
   * @default 'Default'
   */
  style?: 'Default' | 'Selected';

  /**
   * When `true`, shows a 16 px `vuesax/linear/arrow-down` icon on the right edge.
   * - `Default` state: arrow points down (accordion closed).
   * - `Selected` state: arrow rotates 180° (accordion open, `BaseNav` children visible).
   * When `false`, clicking navigates immediately — no sub-navigation.
   * @default true
   */
  showDropdown?: boolean;

  /**
   * When `true`, shows the 16 px bold icon to the left of the label.
   * Set `false` to render label only (icon hidden).
   * @default true
   */
  showIcon?: boolean;

  /**
   * The navigation label text. **Always replace the default with a real destination name.**
   * Never leave `"Content"` in production.
   * @default 'Content'
   */
  name?: string;

  /**
   * 16 px bold icon component rendered to the left of the label.
   * Pass the **component class** from `icons/src/bold/` — not a pre-rendered element.
   * The icon inherits `color/text/primary` via `currentColor` — do not apply custom colour.
   *
   * Required when `showIcon={true}`.
   *
   * @example
   * ```tsx
   * import { Home2Bold } from '../../../icons/src/bold/Home2Bold';
   * <NavElement icon={Home2Bold} name="Dashboard" />
   * ```
   */
  icon?: IconComponent;

  /**
   * `BaseNav` subsection rows. Rendered as an inline accordion below the item header
   * when `showDropdown={true}` **and** either `style="Selected"` or `isOpen={true}`.
   * Ignored when `showDropdown={false}`.
   */
  children?: ReactNode;

  /**
   * Explicitly controls whether the accordion is open, independent of `style`.
   * - When `true` — accordion is open regardless of `style`.
   * - When `false` — accordion is closed regardless of `style`.
   * - When `undefined` (default) — accordion opens automatically when `style="Selected"`.
   *
   * Use this to implement accordion toggle behaviour (click to open, click again to close)
   * while keeping the item visually Selected on its route.
   * @default undefined
   */
  isOpen?: boolean;

  /**
   * @internal
   * Injected by `SideBar` context when the sidebar is in the collapsed (56 px) state.
   * When `true`, only the icon is rendered (no label, no dropdown arrow).
   * **Do NOT set this prop directly** — it is managed by the `SideBar` component.
   * @default false
   */
  isCollapsed?: boolean;
}
