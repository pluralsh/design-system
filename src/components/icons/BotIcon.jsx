import createIcon from './createIcon'

export default createIcon(({ size, color, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_519_126)">
      <path
        d="M1.4 12.2H0V8.9C0 8.7 0.2 8.5 0.4 8.5H1.8V11.8C1.8 12 1.7 12.2 1.4 12.2Z"
        fill={color}
      />
      <path
        d="M15.6002 12.2H14.2002V8.9C14.2002 8.7 14.4002 8.5 14.6002 8.5H16.0002V11.8C16.0002 12 15.8002 12.2 15.6002 12.2Z"
        fill={color}
      />
      <path
        d="M8 1.69995V3.59995"
        stroke={color}
        strokeMiterlimit="10"
      />
      <path
        d="M8.0002 2.6C8.71817 2.6 9.3002 2.01797 9.3002 1.3C9.3002 0.58203 8.71817 0 8.0002 0C7.28223 0 6.7002 0.58203 6.7002 1.3C6.7002 2.01797 7.28223 2.6 8.0002 2.6Z"
        fill={color}
      />
      <path
        d="M3.2002 5.59998C2.7002 5.59998 2.2002 6.09998 2.2002 6.59998V15.5H12.8002C13.3002 15.5 13.8002 15 13.8002 14.5V5.59998H3.2002Z"
        stroke={color}
        strokeMiterlimit="10"
      />
      <path
        d="M5.40039 12.6H10.6004"
        stroke={color}
        strokeMiterlimit="10"
      />
      <path
        d="M5.50039 10.3C4.90039 10.3 4.40039 9.79998 4.40039 9.19998C4.40039 8.59997 4.90039 8.09998 5.50039 8.09998C6.10039 8.09998 6.60039 8.59997 6.60039 9.19998C6.60039 9.79998 6.10039 10.3 5.50039 10.3Z"
        fill={color}
      />
      <path
        d="M10.5004 10.3C9.90039 10.3 9.40039 9.79998 9.40039 9.19998C9.40039 8.59997 9.90039 8.09998 10.5004 8.09998C11.1004 8.09998 11.6004 8.59997 11.6004 9.19998C11.6004 9.79998 11.1004 10.3 10.5004 10.3Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_519_126">
        <rect
          width="16"
          height="16"
          fill={color}
        />
      </clipPath>
    </defs>
  </svg>

))
