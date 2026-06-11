import React, { useContext } from 'react';
import type { NavElementProps } from './NavElement.types';
import { SideBarContext } from '../SideBar/SideBar.context';
import './NavElement.css';

/* --------------------------------------------------------------------------
   Internal: Arrow-down icon (linear style, 16×16)
   Source: icons/svg/linear/arrow-down.svg
   Rotates 180° via CSS when accordion is open (Selected + showDropdown).
   -------------------------------------------------------------------------- */
const ArrowDownLinear: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * **NavElement** — the individual navigation link item inside `SideBar`.
 *
 * Handles Default, Hover (CSS-driven), and Selected visual states, an optional
 * 16 px bold icon, and an optional inline accordion that expands to reveal
 * `BaseNav` subsection rows when the item is Selected.
 *
 * When placed inside a `SideBar`, the `isCollapsed` flag is injected automatically
 * via React context — no manual prop forwarding needed.
 *
 * ### Key rules (NavElement.ai.md)
 * - Exactly **one** `NavElement` must have `style="Selected"` at any time.
 * - `style="Hover"` is CSS-driven — **never** set it in code.
 * - `showDropdown=true` expands **inline** — NOT a floating `DropdownMenu`.
 * - `BaseNav` children are visible only when `style="Selected"` AND `showDropdown={true}`.
 * - Selected state → grey background (`color/surface/3`) + blue bold text — NOT green.
 * - Icon is always 16 px bold style. Use `color/icon/primary` (inherited automatically).
 *
 * @see NavElement.ai.md
 * @see DripDesign.md · Rule 8 · Navigation · NavElement
 * @see Figma node 673:17244 — Design Language System (Claude)
 *
 * @example Selected direct link (no sub-navigation)
 * ```tsx
 * import { Home2Bold } from '../../../icons/src/bold/Home2Bold';
 * <NavElement style="Selected" showDropdown={false} name="Dashboard" icon={Home2Bold} />
 * ```
 *
 * @example Selected with accordion open
 * ```tsx
 * import { MoneySendBold } from '../../../icons/src/bold/MoneySendBold';
 * <NavElement style="Selected" showDropdown name="Payments" icon={MoneySendBold}>
 *   <BaseNav property1="Default" name="Monthly" />
 *   <BaseNav property1="Selected" name="Quarterly" />
 *   <BaseNav property1="Default" name="Annual" />
 * </NavElement>
 * ```
 */
export const NavElement: React.FC<NavElementProps> = ({
  style = 'Default',
  showDropdown = true,
  showIcon = true,
  name = 'Content',
  icon: Icon,
  children,
  isOpen,
  isCollapsed: isCollapsedProp,
  className,
  id,
  dataTestId,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
}) => {
  /* Prefer prop over context so consumers can override if needed */
  const context = useContext(SideBarContext);
  const isCollapsed = isCollapsedProp ?? context.isCollapsed;

  const isSelected = style === 'Selected';
  /* isOpen prop overrides the default "Selected → open" behaviour.
   * Use it to let consumers toggle the accordion independently of route selection. */
  const accordionOpen = (isOpen !== undefined ? isOpen : isSelected) && showDropdown;

  if (process.env.NODE_ENV !== 'production') {
    if (showIcon && !Icon) {
      // eslint-disable-next-line no-console
      console.warn(
        '[dcds:NavElement] showIcon=true but no icon was provided. ' +
          'Pass an icon component (e.g. from icons/src/bold/) via the `icon` prop.',
      );
    }
    if (name === 'Content') {
      // eslint-disable-next-line no-console
      console.warn(
        '[dcds:NavElement] The default name "Content" was not replaced. ' +
          'Always set a meaningful `name` — never leave "Content" in production.',
      );
    }
  }

  const classes = [
    'dcds-NavElement',
    isSelected ? 'dcds-NavElement--selected' : '',
    showDropdown && !isCollapsed ? 'dcds-NavElement--has-dropdown' : '',
    accordionOpen && !isCollapsed ? 'dcds-NavElement--accordion-open' : '',
    isCollapsed ? 'dcds-NavElement--collapsed' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  /*
   * ── Shared row content ───────────────────────────────────────────────────
   *
   * Matches the Figma structure exactly:
   *   <row>
   *     <content (flex:1)>   ← icon + label grouped together
   *       [icon]  12px gap  [label]
   *     </content>
   *     [arrow]              ← outside the content group, pushed to right edge
   *   </row>
   *
   * This prevents the gap from leaking between label and arrow.
   */
  const rowContent = (
    <span className="dcds-NavElement__row">
      {/* Icon + label group — takes flex:1 */}
      <span className="dcds-NavElement__content">
        {showIcon && Icon && (
          <span className="dcds-NavElement__icon" aria-hidden="true">
            <Icon size={16} />
          </span>
        )}
        {!isCollapsed && (
          <span className="dcds-NavElement__label">{name}</span>
        )}
      </span>
      {/* Arrow — separate from content group, sits at right edge */}
      {showDropdown && !isCollapsed && (
        <span className="dcds-NavElement__arrow" aria-hidden="true">
          <ArrowDownLinear />
        </span>
      )}
    </span>
  );

  /*
   * ── Accordion variant (showDropdown=true, NOT collapsed) ──────────────────
   *
   * When the accordion is present we CANNOT render as a single <button> because
   * the BaseNav children are also buttons — nested interactive content is invalid
   * HTML (spec: §4.11.6). Instead we use:
   *
   *   <div.dcds-NavElement>          ← visual / styling container
   *     <button.dcds-NavElement__trigger>  ← the actual click target (toggle)
   *       <span.dcds-NavElement__row />
   *     </button>
   *     <span.dcds-NavElement__accordion>  ← BaseNav children (each is a <button>/<a>)
   *       {children}
   *     </span>
   *   </div>
   *
   * Hover and focus styles are scoped to __trigger so the accordion rows do
   * not trigger the parent hover when hovered.
   */
  if (showDropdown && !isCollapsed) {
    return (
      <div id={id} className={classes} data-testid={dataTestId}>
        <button
          type="button"
          className="dcds-NavElement__trigger"
          aria-current={isSelected ? 'page' : undefined}
          aria-expanded={accordionOpen}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        >
          {rowContent}
        </button>
        {accordionOpen && children && (
          <span className="dcds-NavElement__accordion">
            {children}
          </span>
        )}
      </div>
    );
  }

  /* ── Direct-link / collapsed variant (showDropdown=false or collapsed) ───── */
  return (
    <button
      id={id}
      type="button"
      className={classes}
      aria-current={isSelected ? 'page' : undefined}
      data-testid={dataTestId}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {rowContent}
    </button>
  );
};

NavElement.displayName = 'NavElement';
