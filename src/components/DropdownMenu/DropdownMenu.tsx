/**
 * DropdownMenu — composite trigger + floating menu panel.
 *
 * Combines an InputFields-style dropdown trigger (label, help text, arrow icon)
 * with a floating item panel (`_BaseMenu` pattern). The trigger styling is
 * identical to `InputFields` `Type="Dropdown"` and reuses the same CSS tokens.
 *
 * Design source: Figma P52nmDshYaKr963q1zBwQj nodes 1223:7582 and 1709:8974.
 *
 * @example
 * ```tsx
 * import { DropdownMenu } from '@dcds/components';
 *
 * const [open, setOpen] = React.useState(false);
 * const [selected, setSelected] = React.useState<string | null>(null);
 *
 * <DropdownMenu
 *   label="Country"
 *   placeholder="Select a country"
 *   property1={open ? 'open' : 'close'}
 *   items={[
 *     { id: 'in', label: 'India', type: 'Flag', country: 'IN' },
 *     { id: 'us', label: 'USA',   type: 'Flag', country: 'US' },
 *   ]}
 *   selectedId={selected}
 *   onToggle={setOpen}
 *   onSelect={(id) => { setSelected(id); setOpen(false); }}
 * />
 * ```
 */

import React, { useId, useEffect, useRef } from 'react';
import { ArrowDownLinear } from '../../../icons/src/linear/ArrowDownLinear';
import { Badge } from '../Badge/Badge';
import type { DropdownMenuProps, DropdownMenuItem } from './DropdownMenu.types';
import './DropdownMenu.css';

/* --------------------------------------------------------------------------
   Internal sub-components — never export, never use directly
   -------------------------------------------------------------------------- */

/**
 * @internal
 * Collapsible help text with 4 px left accent bar.
 * Shown when trigger is open (`property1="open"`).
 */
const _BaseHelpText: React.FC<{ text: string; visible: boolean }> = ({ text, visible }) => (
  <div className={`dcds-DropdownMenu__helptext${visible ? ' dcds-DropdownMenu__helptext--open' : ''}`}
    aria-hidden={!visible}
  >
    <div className="dcds-DropdownMenu__helptext-inner">
      <div className="dcds-DropdownMenu__helptext-bar" />
      <p className="dcds-DropdownMenu__helptext-text">{text}</p>
    </div>
  </div>
);

_BaseHelpText.displayName = '_BaseHelpText';

/**
 * @internal
 * Arrow icon that rotates 180° when the menu is open.
 * Matches `_BaseTrailng` with `property1="arrow-down"` from InputFields.
 */
const _BaseTrailng: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span
    className="dcds-DropdownMenu__arrow"
    aria-hidden="true"
    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <ArrowDownLinear size={16} />
  </span>
);

_BaseTrailng.displayName = '_BaseTrailng';

/* Inline leading SVGs — same as _BaseMenu in DropdownButton */

/* Figma node 788:68291: checkbox and radio are 16×16 px; flag is 16×12 px */

const CheckboxEmpty = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <rect x="0.667" y="0.667" width="14.667" height="14.667" rx="2.667" fill="white" stroke="currentColor" strokeWidth="1.333" />
  </svg>
);

const CheckboxChecked = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <rect width="16" height="16" rx="2.667" fill="currentColor" />
    <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RadioEmpty = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <circle cx="8" cy="8" r="7.333" fill="white" stroke="currentColor" strokeWidth="1.333" />
  </svg>
);

const RadioChecked = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <circle cx="8" cy="8" r="8" fill="currentColor" />
    <circle cx="8" cy="8" r="4" fill="white" />
  </svg>
);

/**
 * @internal
 * Leading element (checkbox / radio / flag / custom) for a menu item.
 */
const _BaseMenuItemLeading: React.FC<{ item: DropdownMenuItem }> = ({ item }) => {
  if (item.leading) {
    return (
      <span className="dcds-DropdownMenu__menu-item-leading">{item.leading}</span>
    );
  }

  if (!item.type) return null;
  if (item.showLeading === false) return null;

  if (item.type === 'Multi-Select') {
    return (
      <span className="dcds-DropdownMenu__menu-item-leading dcds-DropdownMenu__menu-item-leading--checkbox">
        {item.isSelected ? <CheckboxChecked /> : <CheckboxEmpty />}
      </span>
    );
  }

  if (item.type === 'Single-Select') {
    return (
      <span className="dcds-DropdownMenu__menu-item-leading dcds-DropdownMenu__menu-item-leading--radio">
        {item.isSelected ? <RadioChecked /> : <RadioEmpty />}
      </span>
    );
  }

  if (item.type === 'Flag') {
    const src = item.country
      ? `dcds-flags/flags/${item.country.toUpperCase()}.svg`
      : undefined;
    return src ? (
      <span className="dcds-DropdownMenu__menu-item-leading dcds-DropdownMenu__menu-item-leading--flag">
        <img src={src} alt={item.country ?? ''} width="16" height="12" />
      </span>
    ) : null;
  }

  return null;
};

/**
 * @internal
 * Floating menu panel with optional section-header label and item rows.
 * Matches Figma `_BaseMenu` (node 1709:8974) with DropdownMenu-namespaced classes.
 */
const _BaseMenu: React.FC<{
  items: DropdownMenuItem[];
  label?: string;
  showLabel?: boolean;
  menuId?: string;
  onSelect: (item: DropdownMenuItem) => void;
}> = ({ items, label, showLabel = true, menuId, onSelect }) => (
  <div className="dcds-DropdownMenu__panel">
    <div className="dcds-DropdownMenu__menu" id={menuId} role="menu">
      {showLabel && label && (
        <div className="dcds-DropdownMenu__menu-label" aria-hidden="true">
          {label}
        </div>
      )}
      {items.map((item) => {
        const itemClass = [
          'dcds-DropdownMenu__menu-item',
          item.isSelected && !item.disabled ? 'dcds-DropdownMenu__menu-item--selected' : '',
          item.disabled ? 'dcds-DropdownMenu__menu-item--disabled' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div role="none" key={item.id} className="dcds-DropdownMenu__menu-item-row">
            <button
              type="button"
              role="menuitem"
              className={itemClass}
              disabled={item.disabled}
              aria-disabled={item.disabled || undefined}
              aria-checked={item.type ? item.isSelected : undefined}
              onClick={() => {
                if (item.disabled) return;
                item.onClick?.();
                onSelect(item);
              }}
            >
              <_BaseMenuItemLeading item={item} />
              <span className="dcds-DropdownMenu__menu-item-label">{item.label}</span>
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
  </div>
);

_BaseMenu.displayName = '_BaseMenu';

/* --------------------------------------------------------------------------
   DropdownMenu — public component
   -------------------------------------------------------------------------- */

/**
 * `DropdownMenu` is a self-contained composite dropdown.
 *
 * The trigger input (with label, help text, and arrow icon) and the floating
 * menu panel are both managed internally. Items support three types:
 * - `Multi-Select` — checkbox leading icon
 * - `Single-Select` — radio button leading icon
 * - `Flag` — country flag from `dcds-flags/flags/{COUNTRY}.svg`
 *
 * **Rules:**
 * - Never render as `open` on page load — drive from user interaction only.
 * - Never import or use `_BaseHelpText`, `_BaseTrailng`, `_BaseMenuItemLeading`,
 *   or `_BaseMenu` directly in product code.
 * - Dismiss on `Escape` key and outside click — both are handled internally.
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  property1 = 'close',
  label,
  isMandatory = true,
  showLabel = true,
  placeholder = 'Select...',
  selectedId = null,
  selectedIds,
  items = [],
  menuLabel,
  showMenuLabel = true,
  showHelpText = false,
  helpText,
  disabled = false,
  showStatus = false,
  status,
  statusSize = 'S',
  statusEmphasis = 'subtle',
  statusState = 'neutral',
  statusShowIcon = true,
  onToggle,
  onSelect,
  menuChildren,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
  className,
  id,
  dataTestId,
}) => {
  const isOpen = property1 === 'open' && !disabled;
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Normalise selectedIds to a Set for O(1) lookup */
  const selectedIdSet: ReadonlySet<string> = selectedIds instanceof Set
    ? selectedIds
    : selectedIds
      ? new Set(selectedIds)
      : new Set();

  const isMultiMode = selectedIds != null;

  /* Resolve trigger display value */
  const selectedItem = !isMultiMode && selectedId != null ? items.find((i) => i.id === selectedId) : undefined;
  const multiCount = isMultiMode ? selectedIdSet.size : 0;
  const displayValue = isMultiMode
    ? multiCount === 0 ? null : multiCount === 1 ? items.find(i => selectedIdSet.has(i.id))?.label ?? null : `${multiCount} selected`
    : selectedItem?.label ?? null;

  /* Close on outside click */
  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onToggle?.(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen, onToggle]);

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onToggle?.(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onToggle]);

  const rootClass = [
    'dcds-DropdownMenu',
    isOpen ? 'dcds-DropdownMenu--open' : '',
    disabled ? 'dcds-DropdownMenu--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleTriggerClick = () => {
    if (disabled) return;
    onToggle?.(!isOpen);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTriggerClick();
    }
    onKeyDown?.(e);
  };

  const handleSelect = (item: DropdownMenuItem) => {
    onSelect?.(item.id);
  };

  /* Enrich items — merge component-level badge defaults, then per-item overrides */
  const resolvedItems: DropdownMenuItem[] = items.map((item) => ({
    showStatus,
    status,
    statusSize,
    statusEmphasis,
    statusState,
    statusShowIcon,
    ...item,
    isSelected: item.isSelected ?? (isMultiMode ? selectedIdSet.has(item.id) : item.id === selectedId),
  }));

  return (
    <div
      ref={wrapperRef}
      className={rootClass}
      id={id}
      data-testid={dataTestId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Label row */}
      {showLabel && label && (
        <div className="dcds-DropdownMenu__label-row">
          <label className="dcds-DropdownMenu__label">{label}</label>
          {isMandatory && (
            <span className="dcds-DropdownMenu__mandatory" aria-label="required">*</span>
          )}
        </div>
      )}

      {/* Help text — collapsible, visible when open */}
      {showHelpText && helpText && (
        <_BaseHelpText text={helpText} visible={isOpen} />
      )}

      {/* Trigger */}
      <div
        className="dcds-DropdownMenu__trigger"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={(e) => { handleTriggerClick(); onClick?.(e); }}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleTriggerKeyDown}
        onKeyUp={onKeyUp}
      >
        <span className="dcds-DropdownMenu__value-wrap">
          {selectedItem && <_BaseMenuItemLeading item={selectedItem} />}
          <span className={`dcds-DropdownMenu__value${!displayValue ? ' dcds-DropdownMenu__value--placeholder' : ''}`}>
            {displayValue ?? placeholder}
          </span>
        </span>
        <_BaseTrailng isOpen={isOpen} />
      </div>

      {/* Floating panel */}
      {isOpen && (
        menuChildren ? (
          <div className="dcds-DropdownMenu__panel" id={menuId}>
            {menuChildren}
          </div>
        ) : (
          <_BaseMenu
            items={resolvedItems}
            label={menuLabel}
            showLabel={showMenuLabel}
            menuId={menuId}
            onSelect={handleSelect}
          />
        )
      )}
    </div>
  );
};

DropdownMenu.displayName = 'DropdownMenu';
