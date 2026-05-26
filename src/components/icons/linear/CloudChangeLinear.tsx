import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const CloudChangeLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M8.10979 11.85C5.28979 12.05 5.29979 16.15 8.10979 16.35H14.7798C15.5898 16.36 16.3698 16.05 16.9698 15.51C18.9498 13.78 17.8898 10.31 15.2898 9.98001C14.3598 4.34001 6.20982 6.48 8.13982 11.85" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 15C2 18.87 5.13 22 9 22L7.95001 20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

CloudChangeLinear.displayName = 'CloudChangeLinear'

export { CloudChangeLinear }
export default CloudChangeLinear
