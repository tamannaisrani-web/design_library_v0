import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const DirectDownLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M9.17005 19.2901L3.07005 7.70015C1.62005 4.95015 4.55005 1.96015 7.33005 3.35015L10.57 4.97015C11.47 5.42015 12.53 5.42015 13.43 4.97015L16.67 3.35015C19.45 1.96015 22.37 4.95015 20.93 7.70015L14.83 19.2901C13.63 21.5701 10.37 21.5701 9.17005 19.2901Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

DirectDownLinear.displayName = 'DirectDownLinear'

export { DirectDownLinear }
export default DirectDownLinear
