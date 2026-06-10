/**
 * Logo — public TypeScript types.
 *
 * Source spec: DripDesign.md (Rule 8 · Display & Indicators · Logo).
 * Figma: https://www.figma.com/design/P52nmDshYaKr963q1zBwQj · node 673:16477
 */

import type { BaseComponentProps } from '../shared/types';

/**
 * Brand company.
 * - `drip`    — Drip Capital brand family
 * - `voyager` — Voyager Trading brand
 */
export type LogoCompany = 'drip' | 'voyager';

/**
 * Portal/variant selector.
 *
 * **Drip portals:**
 * - `SCF`   — Supply Chain Finance (on white only)
 * - `RF`    — Receivables Finance / Portal by DRIP/c (on white only)
 * - `Blue`  — Default Drip Capital mark (dark background)
 * - `Green` — Drip Capital mark with green slash (dark background)
 * - `White` — Drip Capital mark with white slash (dark background)
 *
 * **Voyager portals:**
 * - `ZOHO`  — Voyager Trading (supports both light and dark backgrounds)
 * - `Blue`  — Voyager logo vector only (on white)
 */
export type LogoPortal = 'SCF' | 'RF' | 'ZOHO' | 'Green' | 'White' | 'Blue';

/**
 * Props for the **Logo** component.
 *
 * `Logo` renders the correct brand asset for the given `company` × `onWhite` × `portal`
 * combination. Always use this component — **never** recreate logos manually.
 *
 * ### Variant matrix
 * | company  | onWhite | portal | Renders |
 * |----------|---------|--------|---------|
 * | `drip`   | `true`  | `SCF`  | DRIP/c Supply Chain Finance (light bg) |
 * | `drip`   | `true`  | `RF`   | Portal by DRIP/c (light bg) |
 * | `drip`   | `false` | `Blue` | DRIP/c wordmark (dark bg, default) |
 * | `drip`   | `false` | `Green`| DRIP/c with green slash (dark bg) |
 * | `drip`   | `false` | `White`| DRIP/c with white slash (dark bg) |
 * | `voyager`| `false` | `ZOHO` | VOYAGER TRADING large (dark bg) |
 * | `voyager`| `true`  | `ZOHO` | Voyager Trading (light bg) |
 * | `voyager`| `true`  | `Blue` | Voyager vector logo (light bg) |
 *
 * ### Image assets
 * Logo images must be self-hosted by the consuming application.
 * Pass the `imageSrc` prop with the correct URL for the active variant.
 * The playground uses Figma asset URLs (expire after 7 days) — replace with
 * permanent CDN URLs before deploying to production.
 *
 * @see DripDesign.md · Rule 8 · Logo
 * @see Figma node 673:16477 — Design Language System (Claude)
 *
 * @example Drip Capital SCF on white background
 * ```tsx
 * <Logo company="drip" onWhite portal="SCF" imageSrc="/assets/logo-drip-scf.png" />
 * ```
 *
 * @example Voyager Trading on dark background
 * ```tsx
 * <Logo company="voyager" onWhite={false} portal="ZOHO" imageSrc="/assets/logo-voyager-dark.png" />
 * ```
 */
export interface LogoProps extends BaseComponentProps {
  /**
   * Brand company.
   * @default 'drip'
   */
  company?: LogoCompany;

  /**
   * Background context.
   * - `true`  — light / white background → use dark logo variants (SCF, RF, ZOHO light)
   * - `false` — dark background → use light / reverse logo variants
   * @default true
   */
  onWhite?: boolean;

  /**
   * Portal or logo variant within the chosen company.
   * See variant matrix in the component JSDoc above.
   * @default 'SCF'
   */
  portal?: LogoPortal;

  /**
   * URL of the logo image asset for the active `company` × `onWhite` × `portal` combination.
   * Self-host the asset and pass the URL here.
   * Falls back to a text placeholder when omitted.
   */
  imageSrc?: string;

  /**
   * Accessible alternative text for the logo image.
   * Defaults to the brand name derived from `company`.
   */
  alt?: string;
}
