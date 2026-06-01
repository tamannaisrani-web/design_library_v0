import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const TagCrossLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M10.28 20.25H17C19.76 20.25 22 18.01 22 15.25V8.75C22 5.99 19.76 3.75 17 3.75H10.28C8.86999 3.75 7.52999 4.34 6.57999 5.39L3.04999 9.27C1.63999 10.82 1.63999 13.18 3.04999 14.73L6.57999 18.61C7.52999 19.66 8.86999 20.25 10.28 20.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16 14.47L11.06 9.53003" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M11.06 14.47L16 9.53003" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

TagCrossLinear.displayName = 'TagCrossLinear'

export { TagCrossLinear }
export default TagCrossLinear
