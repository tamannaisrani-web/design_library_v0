import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const ShoppingBagLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M8.40002 6.5H15.6C19 6.5 19.34 8.09 19.57 10.03L20.47 17.53C20.76 19.99 20 22 16.5 22H7.51003C4.00003 22 3.24002 19.99 3.54002 17.53L4.44003 10.03C4.66003 8.09 5.00002 6.5 8.40002 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8 8V4.5C8 3 9 2 10.5 2H13.5C15 2 16 3 16 4.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20.41 17.0298H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

ShoppingBagLinear.displayName = 'ShoppingBagLinear'

export { ShoppingBagLinear }
export default ShoppingBagLinear
