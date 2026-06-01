import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const ArchiveMinusLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M14.5 10.6499H9.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.8198 2H7.17982C5.04982 2 3.31982 3.74 3.31982 5.86V19.95C3.31982 21.75 4.60982 22.51 6.18982 21.64L11.0698 18.93C11.5898 18.64 12.4298 18.64 12.9398 18.93L17.8198 21.64C19.3998 22.52 20.6898 21.76 20.6898 19.95V5.86C20.6798 3.74 18.9498 2 16.8198 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

ArchiveMinusLinear.displayName = 'ArchiveMinusLinear'

export { ArchiveMinusLinear }
export default ArchiveMinusLinear
