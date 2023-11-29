import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1441_438)">
      <path
        d="M1.83704 11.3917H0.529785V8.31027C0.529785 8.12352 0.716536 7.93677 0.903287 7.93677H2.21054V11.0182C2.21054 11.2049 2.11717 11.3917 1.83704 11.3917Z"
        fill={color}
      />
      <path
        d="M15.0968 11.3917H13.7896V8.31027C13.7896 8.12352 13.9763 7.93677 14.1631 7.93677H15.4703V11.0182C15.4703 11.2049 15.2836 11.3917 15.0968 11.3917Z"
        fill={color}
      />
      <path
        d="M8 1.5874V3.36154"
        stroke={color}
        strokeWidth="0.933754"
        strokeMiterlimit="10"
      />
      <path
        d="M8.00001 2.42776C8.67042 2.42776 9.21389 1.88429 9.21389 1.21388C9.21389 0.543473 8.67042 0 8.00001 0C7.32961 0 6.78613 0.543473 6.78613 1.21388C6.78613 1.88429 7.32961 2.42776 8.00001 2.42776Z"
        fill={color}
      />
      <path
        d="M3.51823 5.229C3.05135 5.229 2.58447 5.69588 2.58447 6.16276V14.4732H12.4823C12.9491 14.4732 13.416 14.0063 13.416 13.5394V5.229H3.51823Z"
        stroke={color}
        strokeWidth="0.933754"
        strokeMiterlimit="10"
      />
      <path
        d="M5.57275 11.7654H10.4283"
        stroke={color}
        strokeWidth="0.933754"
        strokeMiterlimit="10"
      />
      <path
        d="M5.6658 9.61774C5.10555 9.61774 4.63867 9.15086 4.63867 8.59061C4.63867 8.03035 5.10555 7.56348 5.6658 7.56348C6.22605 7.56348 6.69293 8.03035 6.69293 8.59061C6.69293 9.15086 6.22605 9.61774 5.6658 9.61774Z"
        fill={color}
      />
      <path
        d="M10.3347 9.61774C9.77449 9.61774 9.30762 9.15086 9.30762 8.59061C9.30762 8.03035 9.77449 7.56348 10.3347 7.56348C10.895 7.56348 11.3619 8.03035 11.3619 8.59061C11.3619 9.15086 10.895 9.61774 10.3347 9.61774Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_1441_438">
        <rect
          width={size}
          height={size}
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
))