import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const MonitorMobbileLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M10 16.95H6.21C2.84 16.95 2 16.11 2 12.74V6.74003C2 3.37003 2.84 2.53003 6.21 2.53003H16.74C20.11 2.53003 20.95 3.37003 20.95 6.74003" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10 21.4699V16.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 12.95H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.74023 21.47H10.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.9998 12.8001V18.5101C21.9998 20.8801 21.4098 21.4701 19.0398 21.4701H15.4898C13.1198 21.4701 12.5298 20.8801 12.5298 18.5101V12.8001C12.5298 10.4301 13.1198 9.84009 15.4898 9.84009H19.0398C21.4098 9.84009 21.9998 10.4301 21.9998 12.8001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.2445 18.25H17.2535" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

MonitorMobbileLinear.displayName = 'MonitorMobbile Linear'

export { MonitorMobbileLinear }
export default MonitorMobbileLinear
