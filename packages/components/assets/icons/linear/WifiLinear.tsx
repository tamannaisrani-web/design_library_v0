import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const WifiLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M4.90991 11.84C9.20991 8.51998 14.7999 8.51998 19.0999 11.84" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 8.35998C8.06 3.67998 15.94 3.67998 22 8.35998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.79004 15.49C9.94004 13.05 14.05 13.05 17.2 15.49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.3999 19.1502C10.9799 17.9302 13.0299 17.9302 14.6099 19.1502" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

WifiLinear.displayName = 'WifiLinear'

export { WifiLinear }
export default WifiLinear
