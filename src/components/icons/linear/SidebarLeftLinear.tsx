import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const SidebarLeftLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M21.9697 15V9C21.9697 4 19.9697 2 14.9697 2H8.96973C3.96973 2 1.96973 4 1.96973 9V15C1.96973 20 3.96973 22 8.96973 22H14.9697C19.9697 22 21.9697 20 21.9697 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.96973 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.9702 9.43994L12.4102 11.9999L14.9702 14.5599" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

SidebarLeftLinear.displayName = 'SidebarLeftLinear'

export { SidebarLeftLinear }
export default SidebarLeftLinear
