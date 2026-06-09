import React from 'react';
import type { LogoProps } from './Logo.types';
import './Logo.css';

/**
 * **Logo** — renders the correct brand asset for a given `company` × `onWhite` × `portal`
 * combination.
 *
 * **Always use this component.** Never recreate logos manually — all spacing, sizing,
 * and asset selection logic is encapsulated here.
 *
 * ### Image assets
 * Logo images are **not bundled** with this component — pass a self-hosted URL via
 * `imageSrc`. The playground uses temporary Figma asset URLs; replace with permanent
 * CDN URLs before deploying.
 *
 * ### Variant matrix
 * | company  | onWhite | portal  | Renders |
 * |----------|---------|---------|---------|
 * | `drip`   | `true`  | `SCF`   | DRIP/c Supply Chain Finance |
 * | `drip`   | `true`  | `RF`    | Portal by DRIP/c |
 * | `drip`   | `false` | `Blue`  | DRIP/c wordmark (dark bg, default drip) |
 * | `drip`   | `false` | `Green` | DRIP/c green-slash (dark bg) |
 * | `drip`   | `false` | `White` | DRIP/c white-slash (dark bg) |
 * | `voyager`| `false` | `ZOHO`  | VOYAGER TRADING large (dark bg) |
 * | `voyager`| `true`  | `ZOHO`  | Voyager Trading (light bg) |
 * | `voyager`| `true`  | `Blue`  | Voyager vector logo (light bg) |
 *
 * @see Logo.types.ts for full prop documentation
 * @see DripDesign.md · Rule 8 · Logo
 * @see Figma node 673:16477 — Design Language System (Claude)
 *
 * @example Drip Capital SCF (most common TopBar usage)
 * ```tsx
 * <Logo company="drip" onWhite portal="SCF" imageSrc="/assets/drip-scf.png" />
 * ```
 *
 * @example Voyager Trading on dark background (sidebar header)
 * ```tsx
 * <Logo company="voyager" onWhite={false} portal="ZOHO"
 *   imageSrc="/assets/voyager-dark-mark.png" alt="Voyager Trading" />
 * ```
 */
export const Logo: React.FC<LogoProps> = ({
  company = 'drip',
  onWhite = true,
  portal = 'SCF',
  imageSrc,
  alt,
  className,
  id,
  dataTestId,
}) => {
  /* Derive sensible alt text when not provided */
  const defaultAlt = company === 'drip' ? 'Drip Capital' : 'Voyager Trading';
  const resolvedAlt = alt ?? defaultAlt;

  /*
   * The Logo IS its own 240×64 container — it owns its dimensions and padding.
   *
   * Figma structure (node 673:16488):
   *   outer div  → 240×64, flex-col, items-start, pl-24 pr-12 py-12, overflow-hidden
   *   wrapper div → flex:1, aspect-ratio, position:relative
   *   img         → absolute inset-0, size-full, object-cover, max-width:none
   *
   * aspect-ratio drives the wrapper width from the slot height (40px):
   *   SCF 488/93 → ~209.7px wide  |  RF 130/50 → 104px  |  wordmark 118/40 → 118px
   */

  /* ── Voyager: outer column div → inner flex-row wrapper → mark + wordmark ── */
  /*
   * Figma structure (node 673:16469 / 673:16470):
   *   .dcds-Logo (column flex, 240×64, pl-24 pr-12 py-12, overflow-hidden)
   *     .dcds-Logo__inner (flex:1 0 0, width:100%, flex-row, gap-8, items-center)
   *       .dcds-Logo__voyager-mark (44.444×38.889px, shrink-0, relative img fill)
   *       .dcds-Logo__voyager-wordmark (flex:1, min-width:0, truncates with ellipsis)
   *
   * onWhite=false (dark bg) → dark mark + 21.88px white text
   * onWhite=true  (light bg) → light mark + 20.22px #0a2e57 text
   */
  if (company === 'voyager') {
    const isLight = onWhite;
    const classes = ['dcds-Logo', className ?? ''].filter(Boolean).join(' ');

    return (
      <div id={id} className={classes} data-testid={dataTestId}>
        <div className="dcds-Logo__voyager-inner">
          {imageSrc && (
            <div className="dcds-Logo__voyager-mark-wrap">
              <img
                src={imageSrc}
                alt=""
                aria-hidden="true"
                className="dcds-Logo__voyager-mark-img"
              />
            </div>
          )}
          <span
            className={[
              'dcds-Logo__voyager-wordmark',
              !isLight ? 'dcds-Logo__voyager-wordmark--light' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            Voyager Trading
          </span>
        </div>
      </div>
    );
  }

  /* ── Drip: image at height:40px, width:auto ────────────────────────────── */
  const classes = ['dcds-Logo', className ?? ''].filter(Boolean).join(' ');

  return (
    <div id={id} className={classes} data-testid={dataTestId}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={resolvedAlt}
          className="dcds-Logo__img"
        />
      ) : (
        /* Fallback placeholder — replace with self-hosted imageSrc in production */
        <span className="dcds-Logo__placeholder" aria-label={resolvedAlt}>
          DRIP/c
        </span>
      )}
    </div>
  );
};

Logo.displayName = 'Logo';
