import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const MessageMinusLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.5 12H15.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

MessageMinusLinear.displayName = 'MessageMinusLinear'

export { MessageMinusLinear }
export default MessageMinusLinear
