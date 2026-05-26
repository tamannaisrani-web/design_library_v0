import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const FlagLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M5.1499 2V22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.1499 4H16.3499C19.0499 4 19.6499 5.5 17.7499 7.4L16.5499 8.6C15.7499 9.4 15.7499 10.7 16.5499 11.4L17.7499 12.6C19.6499 14.5 18.9499 16 16.3499 16H5.1499" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

FlagLinear.displayName = 'FlagLinear'

export { FlagLinear }
export default FlagLinear
