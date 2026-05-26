import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const RepeatLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M3.58008 5.15991H17.4201C19.0801 5.15991 20.4201 6.49991 20.4201 8.15991V11.4799" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.74008 2L3.58008 5.15997L6.74008 8.32001" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20.4201 18.84H6.58008C4.92008 18.84 3.58008 17.5 3.58008 15.84V12.52" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.2598 21.9999L20.4198 18.84L17.2598 15.6799" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

RepeatLinear.displayName = 'RepeatLinear'

export { RepeatLinear }
export default RepeatLinear
