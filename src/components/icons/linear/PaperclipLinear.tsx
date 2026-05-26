import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const PaperclipLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M11.9702 12V15.5C11.9702 17.43 13.5402 19 15.4702 19C17.4002 19 18.9702 17.43 18.9702 15.5V10C18.9702 6.13 15.8402 3 11.9702 3C8.10022 3 4.97021 6.13 4.97021 10V16C4.97021 19.31 7.66022 22 10.9702 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

PaperclipLinear.displayName = 'PaperclipLinear'

export { PaperclipLinear }
export default PaperclipLinear
