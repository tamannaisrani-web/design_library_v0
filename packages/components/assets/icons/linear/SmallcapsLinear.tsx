import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const SmallcapsLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M1.99023 5.93007V4.42007C1.99023 3.40007 2.82023 2.57007 3.84023 2.57007H16.7602C17.7802 2.57007 18.6102 3.40007 18.6102 4.42007V5.93007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.2998 18.1001V3.32007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.8999 18.1001H12.4799" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.6802 10.3401H20.6902C21.4202 10.3401 22.0102 10.9301 22.0102 11.6601V12.4601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.0801 21.4301V10.8701" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.9399 21.4299H18.2199" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

SmallcapsLinear.displayName = 'SmallcapsLinear'

export { SmallcapsLinear }
export default SmallcapsLinear
