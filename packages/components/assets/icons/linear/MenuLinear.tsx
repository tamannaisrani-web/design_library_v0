import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const MenuLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M3 17H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

MenuLinear.displayName = 'MenuLinear'

export { MenuLinear }
export default MenuLinear
