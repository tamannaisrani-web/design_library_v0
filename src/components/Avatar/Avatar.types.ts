/**
 * Avatar — public TypeScript types.
 *
 * Source spec: Avatar.ai.md + Avatar.stories.mdx (figmaNode 440:6502).
 *
 * Use Avatar to represent a person, entity, or country.
 * ❌ NOT for company/product logos — use `Logo`.
 * ❌ NOT for status indicators — use `Badge`.
 * ❌ NOT for file-type icons — use an icon from the icon library.
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../shared/types';

/**
 * Visual shape of the Avatar.
 * - `Initial Circle` — circular with text initials (most common, for people)
 * - `Initial Square` — square with text initials (for organisations / entities)
 * - `Icon Circle`    — circular with an icon (when no initials available)
 * - `Icon Square`    — square with an icon (for entities without initials)
 * - `Flag Circle`    — circular with a country flag SVG (for countries / locales)
 *
 * **Circles = people/individuals · Squares = organisations/entities**
 */
export type AvatarShape =
  | 'Initial Circle'
  | 'Initial Square'
  | 'Icon Circle'
  | 'Icon Square'
  | 'Flag Circle';

/**
 * Size of the Avatar.
 * - `Small`       — 24×24 px — dense tables, compact lists, inside Chips
 * - `Medium`      — 32×32 px — default for lists, comments, assignee rows
 * - `Large`       — 40×40 px — profile cards, detail views
 * - `Extra Large` — 48×48 px — page headers, profile pages, hero sections
 */
export type AvatarSize = 'Small' | 'Medium' | 'Large' | 'Extra Large';

/**
 * Props for the **Avatar** component.
 *
 * @example Person with initials (most common)
 * ```tsx
 * <Avatar shape="Initial Circle" size="Medium" initials="JD" />
 * ```
 *
 * @example Organisation entity (square = semantic signal)
 * ```tsx
 * <Avatar shape="Initial Square" size="Medium" initials="AC" />
 * ```
 *
 * @example Country flag — resolves to dcds-flags/flags/IN.svg
 * ```tsx
 * <Avatar shape="Flag Circle" size="Medium" country="IN" ariaLabel="India" />
 * ```
 *
 * @example Icon fallback (no initials available)
 * ```tsx
 * <Avatar shape="Icon Circle" size="Medium" icon={<MyUserIcon />} />
 * ```
 *
 * @example Table name cell (always use Small in table cells)
 * ```tsx
 * <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-8)' }}>
 *   <Avatar shape="Initial Circle" size="Small" initials="RK" />
 *   Rajesh Kumar
 * </div>
 * ```
 */
export interface AvatarProps extends BaseComponentProps {
  /**
   * Visual shape and semantic role of the avatar.
   * Circles → people/individuals. Squares → organisations/entities.
   * @default 'Initial Circle'
   */
  shape?: AvatarShape;

  /**
   * Pixel footprint. Match to context:
   * - Small → table cells / chips
   * - Medium → lists / comments (default)
   * - Large → profile cards / detail views
   * - Extra Large → page headers / hero sections
   * @default 'Medium'
   */
  size?: AvatarSize;

  /**
   * 1–2 uppercase characters shown inside `Initial Circle` / `Initial Square`.
   * Rendered `aria-hidden` — provide the full name in adjacent visible text or `ariaLabel`.
   * @default 'AM'
   */
  initials?: string;

  /**
   * Custom icon ReactNode for `Icon Circle` / `Icon Square` shapes.
   * When omitted the built-in user icon (icons/svg/bold/user.svg) is rendered.
   */
  icon?: ReactNode;

  /**
   * ISO 3166-1 alpha-2 country code (e.g. `"IN"`, `"US"`) used with `Flag Circle`.
   * Constructs flag src as `dcds-flags/flags/{COUNTRY}.svg`.
   * Override with `flagSrc` when serving assets from a CDN or custom path.
   */
  country?: string;

  /**
   * Explicit flag image `src` override.
   * Takes precedence over `country` when both are supplied.
   */
  flagSrc?: string;

  /**
   * Accessible label for the avatar element.
   * - Flag Circle: full country name, e.g. `"India"` (not the ISO code)
   * - Omit when the full name appears in adjacent visible text.
   */
  ariaLabel?: string;
}
