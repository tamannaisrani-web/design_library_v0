import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const MicrophoneLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M12 19C15.31 19 18 16.31 18 13V8C18 4.69 15.31 2 12 2C8.69 2 6 4.69 6 8V13C6 16.31 8.69 19 12 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 11V13C3 17.97 7.03 22 12 22C16.97 22 21 17.97 21 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.11011 7.47999C10.8901 6.82999 12.8301 6.82999 14.6101 7.47999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.03 10.48C11.23 10.15 12.5 10.15 13.7 10.48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

MicrophoneLinear.displayName = 'MicrophoneLinear'

export { MicrophoneLinear }
export default MicrophoneLinear
