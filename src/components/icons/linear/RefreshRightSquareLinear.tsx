import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const RefreshRightSquareLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M13.67 7.51001C13.17 7.36001 12.62 7.26001 12 7.26001C9.24 7.26001 7 9.50001 7 12.26C7 15.02 9.24 17.26 12 17.26C14.76 17.26 17 15.02 17 12.26C17 11.23 16.69 10.28 16.16 9.48001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.3802 7.64999L12.7202 5.73999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.3799 7.6499L12.4399 9.0699" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

RefreshRightSquareLinear.displayName = 'RefreshRightSquareLinear'

export { RefreshRightSquareLinear }
export default RefreshRightSquareLinear
