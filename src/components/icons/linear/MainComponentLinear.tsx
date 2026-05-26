import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const MainComponentLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M20.9498 14.55L14.5598 20.94C13.1598 22.34 10.8598 22.34 9.44978 20.94L3.05977 14.55C1.65977 13.15 1.65977 10.85 3.05977 9.44001L9.44978 3.05C10.8498 1.65 13.1498 1.65 14.5598 3.05L20.9498 9.44001C22.3498 10.85 22.3498 13.15 20.9498 14.55Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.25 6.25L17.75 17.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.75 6.25L6.25 17.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

MainComponentLinear.displayName = 'MainComponentLinear'

export { MainComponentLinear }
export default MainComponentLinear
