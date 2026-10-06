import React from 'react'

export default function Logo({ size = 28, className = '', color = 'currentColor', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      aria-label="QuadraID Logo"
    >
      {/* 'q' character */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51 28V81H40V65.8C38.6 66.1 37.1 66.3 35.5 66.3C29.7 66.3 25 61.6 25 55.8V38.5C25 32.7 29.7 28 35.5 28H51ZM36 35C38.2 35 40 36.8 40 39V55.3C40 57.5 38.2 59.3 36 59.3C33.8 59.3 32 57.5 32 55.3V39C32 36.8 33.8 35 36 35Z"
        fill={color}
      />
      {/* 'I' top bar */}
      <rect x="53" y="21" width="21" height="6.2" fill={color} />
      {/* 'I' vertical stem */}
      <rect x="53" y="29.2" width="11.5" height="36" fill={color} />
      {/* 'I' bottom bar */}
      <rect x="53" y="67.2" width="21" height="6.2" fill={color} />
    </svg>
  )
}
