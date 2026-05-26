import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const MoreBold = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M22 16.19L22 7.81C22 4.17 19.83 2 16.19 2L7.82 2C4.17 2 2 4.17 2 7.81L2 16.18C2 19.82 4.17 21.99 7.81 21.99L16.19 21.99C19.83 22 22 19.83 22 16.19ZM10.69 7C10.69 6.28 11.28 5.69 12 5.69C12.72 5.69 13.31 6.28 13.31 7C13.31 7.72 12.72 8.31 12 8.31C11.28 8.31 10.69 7.72 10.69 7ZM10.69 12C10.69 11.28 11.28 10.69 12 10.69C12.72 10.69 13.31 11.28 13.31 12C13.31 12.72 12.72 13.31 12 13.31C11.28 13.31 10.69 12.72 10.69 12ZM10.69 17C10.69 16.28 11.28 15.69 12 15.69C12.72 15.69 13.31 16.28 13.31 17C13.31 17.72 12.72 18.31 12 18.31C11.28 18.31 10.69 17.72 10.69 17Z" fill="currentColor"/>
  </svg>
)

MoreBold.displayName = 'MoreBold'

export { MoreBold }
export default MoreBold
