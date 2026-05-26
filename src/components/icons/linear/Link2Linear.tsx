import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const Link2Linear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M13.0598 10.9399C15.3098 13.1899 15.3098 16.8299 13.0598 19.0699C10.8098 21.3099 7.16985 21.3199 4.92985 19.0699C2.68985 16.8199 2.67985 13.1799 4.92985 10.9399" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.59 13.4099C8.24996 11.0699 8.24996 7.26988 10.59 4.91988C12.93 2.56988 16.73 2.57988 19.08 4.91988C21.43 7.25988 21.42 11.0599 19.08 13.4099" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

Link2Linear.displayName = 'Link2Linear'

export { Link2Linear }
export default Link2Linear
