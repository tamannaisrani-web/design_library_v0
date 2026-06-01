import React from 'react';

/**
 * ChevronDownIcon — decorative icon used inside DropdownButton.
 *
 * Always renders with `aria-hidden="true"` so screen readers skip it (the
 * parent button conveys meaning). Inherits `currentColor`.
 */
export interface ChevronDownIconProps {
  /** Pixel size. Per DCDS icon rules: 16 (compact), 20 (default), 24 (emphasis). */
  size?: 16 | 20 | 24;
  /** Optional class override (for spacing only — never colour). */
  className?: string;
}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      d="M3.5 6L8 10.5L12.5 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
