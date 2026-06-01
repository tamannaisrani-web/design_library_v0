import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const DirectRightLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M19.29 9.1698L7.70002 3.0698C4.95002 1.6198 1.96002 4.5498 3.35002 7.3298L4.97002 10.5698C5.42002 11.4698 5.42002 12.5298 4.97002 13.4298L3.35002 16.6698C1.96002 19.4498 4.95002 22.3698 7.70002 20.9298L19.29 14.8298C21.57 13.6298 21.57 10.3698 19.29 9.1698Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

DirectRightLinear.displayName = 'DirectRightLinear'

export { DirectRightLinear }
export default DirectRightLinear
