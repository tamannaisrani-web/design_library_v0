import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const DirectUpLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M9.17005 4.71L3.07005 16.3C1.62005 19.05 4.55005 22.04 7.33005 20.65L10.57 19.03C11.47 18.58 12.53 18.58 13.43 19.03L16.67 20.65C19.45 22.04 22.37 19.05 20.93 16.3L14.83 4.71C13.63 2.43 10.37 2.43 9.17005 4.71Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

DirectUpLinear.displayName = 'DirectUpLinear'

export { DirectUpLinear }
export default DirectUpLinear
