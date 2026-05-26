import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const MusicFilterLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M2 3H22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 9H11" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 15H8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 21H6" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.8402 22C13.0441 22 14.0202 21.024 14.0202 19.82C14.0202 18.616 13.0441 17.64 11.8402 17.64C10.6362 17.64 9.66016 18.616 9.66016 19.82C9.66016 21.024 10.6362 22 11.8402 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22 18.37V9.85999C22 8.04999 20.86 7.79999 19.71 8.10999L15.36 9.3C14.57 9.52 14.02 10.14 14.02 11.05V12.57V13.59V19.82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19.8201 20.55C21.0241 20.55 22.0001 19.574 22.0001 18.37C22.0001 17.166 21.0241 16.19 19.8201 16.19C18.6162 16.19 17.6401 17.166 17.6401 18.37C17.6401 19.574 18.6162 20.55 19.8201 20.55Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.02 13.6L22 11.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

MusicFilterLinear.displayName = 'MusicFilterLinear'

export { MusicFilterLinear }
export default MusicFilterLinear
