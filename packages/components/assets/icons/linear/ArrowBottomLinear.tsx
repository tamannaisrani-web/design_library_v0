import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const ArrowBottomLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M11.9996 6H14.6696C17.9796 6 19.3396 8.35 17.6796 11.22L16.3396 13.53L14.9996 15.84C13.3396 18.71 10.6296 18.71 8.96956 15.84L7.62956 13.53L6.28956 11.22C4.65956 8.35 6.00956 6 9.32956 6H11.9996Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

ArrowBottomLinear.displayName = 'ArrowBottomLinear'

export { ArrowBottomLinear }
export default ArrowBottomLinear
