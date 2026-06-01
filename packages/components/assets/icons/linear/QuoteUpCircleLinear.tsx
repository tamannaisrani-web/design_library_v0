import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const QuoteUpCircleLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M17.0004 11.84H14.3204C13.6104 11.84 13.1304 11.3 13.1304 10.65V9.15997C13.1304 8.50997 13.6104 7.96997 14.3204 7.96997H15.8104C16.4604 7.96997 17.0004 8.50997 17.0004 9.15997V11.84Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.0002 11.8401C17.0002 14.6301 16.4802 15.1001 14.9102 16.0301" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.8602 11.84H8.18022C7.47022 11.84 6.99023 11.3 6.99023 10.65V9.15997C6.99023 8.50997 7.47022 7.96997 8.18022 7.96997H9.67023C10.3202 7.96997 10.8602 8.50997 10.8602 9.15997V11.84Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.86 11.8401C10.86 14.6301 10.34 15.1001 8.77002 16.0301" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

QuoteUpCircleLinear.displayName = 'QuoteUpCircleLinear'

export { QuoteUpCircleLinear }
export default QuoteUpCircleLinear
