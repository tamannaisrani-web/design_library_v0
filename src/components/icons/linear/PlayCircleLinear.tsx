import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const PlayCircleLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M11.9702 22C17.4931 22 21.9702 17.5228 21.9702 12C21.9702 6.47715 17.4931 2 11.9702 2C6.44737 2 1.97021 6.47715 1.97021 12C1.97021 17.5228 6.44737 22 11.9702 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.74023 12.23V10.56C8.74023 8.48 10.2102 7.63 12.0102 8.67L13.4602 9.51L14.9102 10.35C16.7102 11.39 16.7102 13.09 14.9102 14.13L13.4602 14.97L12.0102 15.81C10.2102 16.85 8.74023 16 8.74023 13.92V12.23Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

PlayCircleLinear.displayName = 'PlayCircleLinear'

export { PlayCircleLinear }
export default PlayCircleLinear
