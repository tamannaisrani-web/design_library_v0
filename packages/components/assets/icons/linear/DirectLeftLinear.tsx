import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const DirectLeftLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M4.71 9.1698L16.3 3.0698C19.05 1.6198 22.04 4.5498 20.65 7.3298L19.03 10.5698C18.58 11.4698 18.58 12.5298 19.03 13.4298L20.65 16.6698C22.04 19.4498 19.05 22.3698 16.3 20.9298L4.71 14.8298C2.43 13.6298 2.43 10.3698 4.71 9.1698Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

DirectLeftLinear.displayName = 'DirectLeftLinear'

export { DirectLeftLinear }
export default DirectLeftLinear
