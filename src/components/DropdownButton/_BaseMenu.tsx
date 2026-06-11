/**
 * _BaseMenu — internal sub-component of DropdownButton and AvatarGroup.
 *
 * NOT exported from the package barrel. Per DCDS conventions, any name
 * starting with `_Base` is for internal composition only.
 *
 * Matches Figma nodes 795:68851 (_BaseMenu) + 788:68291 (_BaseMenuItem).
 *
 * Item states from Figma:
 *   Default       — white bg, regular text
 *   Hover         — Sky Blue-0 bg (CSS :hover)
 *   Selected      — Wealthy Green-100 bg, bold text, filled leading indicator
 *   Selected Hover— Sky Blue-0 bg + selected leading (CSS :hover on selected item)
 *   Disabled      — Cool Grey-100 bg, disabled text, cursor-not-allowed
 *
 * Item types (leading indicator):
 *   Multi-Select  — 24px checkbox (square, rd-XS)
 *   Single-Select — 24px radio button (circle, rd-Max)
 *   Flag          — 24×18px country flag (dcds-flags/flags/{COUNTRY}.svg)
 */

import React from 'react';
import { Badge } from '../Badge/Badge';
import type { DropdownMenuItem } from './DropdownButton.types';

/* ------------------------------------------------------------------ */
/* Inline leading indicator SVGs                                        */
/* Sourced from Figma _BaseMenuItem leading elements (node 788:68291)  */
/* ------------------------------------------------------------------ */

/** Multi-Select checkbox — unselected. 16×16 px per Figma node 788:68291. */
const CheckboxEmpty = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <rect x="0.667" y="0.667" width="14.667" height="14.667" rx="2.667" fill="white" stroke="currentColor" strokeWidth="1.333" />
  </svg>
);

/** Multi-Select checkbox — selected. */
const CheckboxChecked = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <rect width="16" height="16" rx="2.667" fill="currentColor" />
    <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Single-Select radio — unselected. */
const RadioEmpty = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <circle cx="8" cy="8" r="7.333" fill="white" stroke="currentColor" strokeWidth="1.333" />
  </svg>
);

/** Single-Select radio — selected. */
const RadioChecked = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <circle cx="8" cy="8" r="8" fill="currentColor" />
    <circle cx="8" cy="8" r="4" fill="white" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Leading element renderer                                             */
/* ------------------------------------------------------------------ */

interface LeadingProps {
  item: DropdownMenuItem;
}

function LeadingElement({ item }: LeadingProps) {
  if (item.leading) {
    return <span className="dcds-DropdownButton__menu-item-leading">{item.leading}</span>;
  }

  if (!item.type) return null;

  const showLeading = item.showLeading !== false;
  if (!showLeading) return null;

  if (item.type === 'Multi-Select') {
    return (
      <span className="dcds-DropdownButton__menu-item-leading dcds-DropdownButton__menu-item-leading--checkbox">
        {item.isSelected ? <CheckboxChecked /> : <CheckboxEmpty />}
      </span>
    );
  }

  if (item.type === 'Single-Select') {
    return (
      <span className="dcds-DropdownButton__menu-item-leading dcds-DropdownButton__menu-item-leading--radio">
        {item.isSelected ? <RadioChecked /> : <RadioEmpty />}
      </span>
    );
  }

  if (item.type === 'Flag') {
    const src = item.country
      ? `dcds-flags/flags/${item.country.toUpperCase()}.svg`
      : undefined;
    return src ? (
      <span className="dcds-DropdownButton__menu-item-leading dcds-DropdownButton__menu-item-leading--flag">
        <img src={src} alt={item.country ?? ''} width="16" height="12" />
      </span>
    ) : null;
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* Status badge (trailing)                                             */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/* Public interface                                                    */
/* ------------------------------------------------------------------ */

export interface BaseMenuProps {
  /** Items to render in the menu list. */
  items: DropdownMenuItem[];
  /** Called when an item is activated (clicked or keyboard-confirmed). */
  onSelect: (item: DropdownMenuItem) => void;
  /**
   * Header label text shown above the item list in a tinted band
   * (color/surface/4 bg, 12px Bold subdued text). Figma node 795:68454.
   * @example "20 searches found"
   */
  label?: string;
  /**
   * Show/hide the label band. Defaults to `true` — the band is rendered
   * whenever `label` is set. Set to `false` to suppress it.
   * @default true
   */
  showLabel?: boolean;
  /** Optional id applied to the menu container — wire via `aria-controls`. */
  menuId?: string;
  /** Optional className for layout-only overrides (not colour). */
  className?: string;
}

export const _BaseMenu: React.FC<BaseMenuProps> = ({ items, onSelect, label, showLabel = true, menuId, className }) => {
  const classes = ['dcds-DropdownButton__menu', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} id={menuId} role="menu">
      {/* Optional count / section header — Figma node 795:68454 */}
      {showLabel && label && (
        <div className="dcds-DropdownButton__menu-label" aria-hidden="true">
          {label}
        </div>
      )}

      {items.map((item) => {
        const itemClasses = [
          'dcds-DropdownButton__menu-item',
          item.isSelected && !item.disabled ? 'dcds-DropdownButton__menu-item--selected' : '',
          item.disabled ? 'dcds-DropdownButton__menu-item--disabled' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div role="none" key={item.id} className="dcds-DropdownButton__menu-item-row">
            <button
              type="button"
              role="menuitem"
              className={itemClasses}
              disabled={item.disabled}
              aria-disabled={item.disabled || undefined}
              aria-checked={item.type ? item.isSelected : undefined}
              onClick={() => {
                if (item.disabled) return;
                item.onClick?.();
                onSelect(item);
              }}
            >
              {/* Leading slot — checkbox / radio / flag / custom */}
              <LeadingElement item={item} />

              {/* Label */}
              <span className="dcds-DropdownButton__menu-item-label">{item.label}</span>

              {/* Trailing status badge — uses Badge component */}
              {item.showStatus && (
                <Badge
                  size={item.statusSize ?? 'S'}
                  emphasis={item.statusEmphasis ?? 'subtle'}
                  state={item.statusState ?? 'neutral'}
                  showIcon={item.statusShowIcon ?? true}
                >
                  {item.status ?? 'Status'}
                </Badge>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

_BaseMenu.displayName = '_BaseMenu';
