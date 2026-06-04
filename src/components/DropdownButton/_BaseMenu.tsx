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
import type { DropdownMenuItem } from './DropdownButton.types';

/* ------------------------------------------------------------------ */
/* Inline leading indicator SVGs                                        */
/* Sourced from Figma _BaseMenuItem leading elements (node 788:68291)  */
/* ------------------------------------------------------------------ */

/** Multi-Select checkbox — unselected. Uses currentColor for border. */
const CheckboxEmpty = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <rect x="1" y="1" width="22" height="22" rx="4" fill="white" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/** Multi-Select checkbox — selected (filled with checkmark). Uses currentColor for fill. */
const CheckboxChecked = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <rect width="24" height="24" rx="4" fill="currentColor" />
    <path d="M5 12L10 17L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Single-Select radio — unselected. Uses currentColor for border. */
const RadioEmpty = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="11" fill="white" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/** Single-Select radio — selected (filled with inner white dot). Uses currentColor for fill. */
const RadioChecked = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <circle cx="12" cy="12" r="6" fill="white" />
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
        <img src={src} alt={item.country ?? ''} width="24" height="18" />
      </span>
    ) : null;
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* Status badge (trailing)                                             */
/* ------------------------------------------------------------------ */

function StatusBadge({ text }: { text?: string }) {
  return (
    <span className="dcds-DropdownButton__menu-item-status">
      {text ?? 'Status'}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Public interface                                                    */
/* ------------------------------------------------------------------ */

export interface BaseMenuProps {
  /** Items to render in the menu list. */
  items: DropdownMenuItem[];
  /** Called when an item is activated (clicked or keyboard-confirmed). */
  onSelect: (item: DropdownMenuItem) => void;
  /**
   * Optional header label shown above the item list in a tinted band
   * (color/surface/4 bg, 12px Bold subdued text).
   * @example "20 searches found"
   */
  label?: string;
  /** Optional id applied to the menu container — wire via `aria-controls`. */
  menuId?: string;
  /** Optional className for layout-only overrides (not colour). */
  className?: string;
}

export const _BaseMenu: React.FC<BaseMenuProps> = ({ items, onSelect, label, menuId, className }) => {
  const classes = ['dcds-DropdownButton__menu', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} id={menuId} role="menu">
      {/* Optional count / section header */}
      {label && (
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

              {/* Trailing status badge */}
              {item.showStatus && <StatusBadge text={item.status} />}
            </button>
          </div>
        );
      })}
    </div>
  );
};

_BaseMenu.displayName = '_BaseMenu';
