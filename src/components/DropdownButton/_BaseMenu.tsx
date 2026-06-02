/**
 * _BaseMenu — internal sub-component of DropdownButton.
 *
 * NOT exported from the package barrel. Per DCDS conventions, any name
 * starting with `_Base` is for internal composition only — never import this
 * file directly outside of DropdownButton.
 *
 * Renders the floating menu that appears beneath a DropdownButton when
 * `isOpen=true`. Items are clickable, keyboard-activatable, and dismiss the
 * parent menu on selection.
 */

import React from 'react';
import type { DropdownMenuItem } from './DropdownButton.types';

export interface BaseMenuProps {
  /** Items to render. Use `menuChildren` on the parent if you need custom content. */
  items: DropdownMenuItem[];
  /** Called when an item is activated. Wraps the per-item onClick. */
  onSelect: (item: DropdownMenuItem) => void;
  /** Optional element id, useful for `aria-controls` linkage. */
  menuId?: string;
  /** Optional className passthrough for layout (not colour). */
  className?: string;
}

export const _BaseMenu: React.FC<BaseMenuProps> = ({ items, onSelect, menuId, className }) => {
  const classes = ['dcds-DropdownButton__menu', className ?? ''].filter(Boolean).join(' ');

  return (
    <ul role="menu" id={menuId} className={classes}>
      {items.map((item) => (
        <li role="none" key={item.id}>
          <button
            type="button"
            role="menuitem"
            className="dcds-DropdownButton__menu-item"
            disabled={item.disabled}
            aria-disabled={item.disabled || undefined}
            onClick={() => {
              if (item.disabled) return;
              item.onClick?.();
              onSelect(item);
            }}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

_BaseMenu.displayName = '_BaseMenu';
