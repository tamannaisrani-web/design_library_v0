import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const RefreshSquare2Linear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 12C17.5 15.04 15.04 17.5 12 17.5C8.96 17.5 7.10999 14.44 7.10999 14.44M7.10999 17.19V14.44H9.59M6.5 12C6.5 8.96 8.94 6.5 12 6.5C15.67 6.5 17.5 9.56 17.5 9.56M15.06 9.56H17.5V6.81" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

RefreshSquare2Linear.displayName = 'RefreshSquare2Linear'

export { RefreshSquare2Linear }
export default RefreshSquare2Linear
