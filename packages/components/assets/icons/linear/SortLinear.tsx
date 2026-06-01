import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const SortLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={true}
    focusable="false"
    {...props}
  >
<path d="M3 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M10 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

SortLinear.displayName = 'SortLinear'

export { SortLinear }
export default SortLinear
