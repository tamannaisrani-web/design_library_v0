import React from 'react';
import { AvatarGroup } from '../AvatarGroup';
import type { TopBarProps, TopBarTab } from './TopBar.types';
import './TopBar.css';

/* --------------------------------------------------------------------------
   Internal: Arrow-down SVG (bold style, 24×24) — used for chevrons
   Source: icons/svg/bold/arrow-down.svg
   -------------------------------------------------------------------------- */
const ChevronDownBold: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M17.9202 8.17993H11.6902H6.08024C5.12024 8.17993 4.64024 9.33993 5.32024 10.0199L10.5002 15.1999C11.3302 16.0299 12.6802 16.0299 13.5102 15.1999L15.4802 13.2299L18.6902 10.0199C19.3602 9.33993 18.8802 8.17993 17.9202 8.17993Z"
      fill="currentColor"
    />
  </svg>
);

/* --------------------------------------------------------------------------
   Internal: Arrow-down SVG (linear style, 16×16) — used inside tabs
   Source: icons/svg/linear/arrow-down.svg
   -------------------------------------------------------------------------- */
const TabDropdownArrow: React.FC = () => (
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

/* --------------------------------------------------------------------------
   Internal: Building-4 icon (outline style, 16×16) — company avatar
   Source: icons/svg/outline/building-4.svg (outline variant)
   -------------------------------------------------------------------------- */
const BuildingIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M1 22H23"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.0195 2H9.98047C8.07047 2 7.01047 3.07 7.01047 4.97V22H16.9905V4.97C16.9805 3.07 15.9305 2 14.0195 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.00977 8.95996H7.00977V22H3.00977C2.45977 22 2.00977 21.55 2.00977 21V9.95996C2.00977 9.40996 2.45977 8.95996 3.00977 8.95996Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.9902 8.95996H16.9902V22H20.9902C21.5402 22 21.9902 21.55 21.9902 21V9.95996C21.9902 9.40996 21.5402 8.95996 20.9902 8.95996Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 8H14M10 11.5H14M10 15H14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* --------------------------------------------------------------------------
   Default navigation tabs — shown when no `navigationTabs` prop is supplied.
   Mirrors the Figma default state (5 tabs, second active).
   -------------------------------------------------------------------------- */
const DEFAULT_TABS: TopBarTab[] = [
  { id: 'opt-1', label: 'Option' },
  { id: 'opt-2', label: 'Option', isActive: true },
  { id: 'opt-3', label: 'Option' },
  { id: 'opt-4', label: 'Option', hasDropdown: true },
  { id: 'opt-5', label: 'Option', hasDropdown: true },
];

/**
 * **TopBar** — horizontal navigation bar at the top of the page.
 *
 * Three zones (left → right):
 * 1. **Logo slot** — 240 px wide; pass any content via `logoSlot`.
 * 2. **Navigation tabs** — optional horizontal tab strip (`showNavigation`).
 *    One tab should carry `isActive: true`. Tabs with `hasDropdown: true` render
 *    a 16 px arrow indicator.
 * 3. **Right utilities** — optional company selector (`showCompany`) and user
 *    avatar button (`showUser`).
 *
 * ### Figma spec (node 673:16869)
 * - 64 px tall, full-width, white background, 1 px subdued bottom border.
 * - Active tab: 16 px bold, `color/text/action`, 4 px `color/stroke/action` border-bottom.
 * - Inactive tab: 16 px regular, `color/text/subdued`.
 * - Company + user buttons: 48 px tall, `rd-S`, `color/fill/secondary-2` avatar fill.
 *
 * @see DripDesign.md · Rule 8 · Navigation · TopBar
 * @see Figma node 673:16869 — Design Language System (Claude)
 *
 * @example Complete TopBar
 * ```tsx
 * <TopBar
 *   logoSlot={<img src={logo} alt="Drip Capital SCF" height={40} />}
 *   navigationTabs={[
 *     { id: 'invoices', label: 'Invoices', isActive: true },
 *     { id: 'payments', label: 'Payments', hasDropdown: true },
 *   ]}
 *   companyName="Acme Corp"
 *   userInitials="AM"
 *   onTabClick={(id) => navigate(id)}
 *   onCompanyClick={openCompanySwitcher}
 *   onUserClick={openUserMenu}
 * />
 * ```
 */
export const TopBar: React.FC<TopBarProps> = ({
  showNavigation = true,
  showCompany = true,
  showUser = true,
  logoSlot,
  navigationTabs = DEFAULT_TABS,
  companyName = 'Company Name',
  userInitials = 'AM',
  onTabClick,
  onCompanyClick,
  onUserClick,
  className,
  id,
  dataTestId,
}) => {
  const classes = ['dcds-TopBar', className ?? ''].filter(Boolean).join(' ');

  return (
    <header
      id={id}
      className={classes}
      data-testid={dataTestId}
    >
      {/* ── Left: logo + divider + nav tabs ── */}
      <div className="dcds-TopBar__left">
        {/* Logo slot — 240px × 64px */}
        <div className="dcds-TopBar__logo">
          {logoSlot ?? (
            <span className="dcds-TopBar__logo-placeholder" aria-label="DCDS">
              DCDS
            </span>
          )}
        </div>

        {/* Vertical divider */}
        <div className="dcds-TopBar__divider" aria-hidden="true" />

        {/* Navigation tab strip */}
        {showNavigation && (
          <nav className="dcds-TopBar__nav" aria-label="Site navigation">
            {navigationTabs.map((tab) => {
              const tabClasses = [
                'dcds-TopBar__tab',
                tab.isActive ? 'dcds-TopBar__tab--active' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={tabClasses}
                  aria-current={tab.isActive ? 'page' : undefined}
                  onClick={(e) => {
                    if (tab.onClick) tab.onClick(e);
                    if (onTabClick) onTabClick(tab.id);
                  }}
                >
                  {tab.label}
                  {tab.hasDropdown && (
                    <span className="dcds-TopBar__tab-arrow">
                      <TabDropdownArrow />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* ── Right: company selector + user avatar ── */}
      <div className="dcds-TopBar__right">
        {/* Company selector — AvatarGroup with name display; Inverse type on dark TopBar */}
        {showCompany && (
          <AvatarGroup
            initials={companyName.slice(0, 2).toUpperCase()}
            name={companyName}
            displayName={true}
            showDesignation={false}
            showDropdown={true}
            type={type === 'Inverse' ? 'Inverse' : 'Default'}
            ariaLabel={`Switch company: ${companyName}`}
            onClick={onCompanyClick}
          />
        )}

        {/* User avatar — AvatarGroup compact; Inverse type on dark TopBar */}
        {showUser && (
          <AvatarGroup
            initials={userInitials}
            displayName={false}
            showDropdown={true}
            type={type === 'Inverse' ? 'Inverse' : 'Default'}
            ariaLabel="Open user menu"
            onClick={onUserClick}
          />
        )}
      </div>
    </header>
  );
};

TopBar.displayName = 'TopBar';
