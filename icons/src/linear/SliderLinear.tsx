import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const SliderLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M15 22H9C6.5 22 5 20.2 5 18V6C5 3.8 6.5 2 9 2H15C17.5 2 19 3.8 19 6V18C19 20.2 17.5 22 15 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5 16.01H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

SliderLinear.displayName = 'SliderLinear'

export { SliderLinear }
export default SliderLinear
