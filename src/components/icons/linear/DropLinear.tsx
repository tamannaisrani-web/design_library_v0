import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const DropLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M12.6098 2.21C12.2498 1.93 11.7498 1.93 11.3898 2.21C9.4898 3.66 3.87979 8.39 3.90979 13.9C3.90979 18.36 7.53979 22 12.0098 22C16.4798 22 20.1098 18.37 20.1098 13.91C20.1198 8.48 14.4998 3.67 12.6098 2.21Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
  </svg>
)

DropLinear.displayName = 'DropLinear'

export { DropLinear }
export default DropLinear
