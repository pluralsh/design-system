import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 8L7.89923 11.4412C7.9615 11.4775 8.0385 11.4775 8.10077 11.4412L14 8"
      stroke={color}
      strokeLinecap="round"
    />
    <path
      d="M2 11.5L7.89923 14.9412C7.9615 14.9775 8.0385 14.9775 8.10077 14.9412L14 11.5"
      stroke={color}
      strokeLinecap="round"
    />
    <g clipPath="url(#clip0_5875_37792)">
      <path
        d="M8 1C6.075 1 4.5 2.575 4.5 4.5C4.5 6.425 6.075 8 8 8C9.925 8 11.5 6.425 11.5 4.5C11.5 2.575 9.925 1 8 1ZM6.5125 4.89375C6.29375 4.89375 6.11875 4.71875 6.11875 4.5C6.11875 4.28125 6.29375 4.10625 6.5125 4.10625C6.73125 4.10625 6.90625 4.28125 6.90625 4.5C6.95 4.71875 6.73125 4.89375 6.5125 4.89375ZM8 4.89375C7.78125 4.89375 7.60625 4.71875 7.60625 4.5C7.60625 4.28125 7.78125 4.10625 8 4.10625C8.21875 4.10625 8.39375 4.28125 8.39375 4.5C8.39375 4.71875 8.21875 4.89375 8 4.89375ZM9.4875 4.89375C9.26875 4.89375 9.09375 4.71875 9.09375 4.5C9.09375 4.28125 9.26875 4.10625 9.4875 4.10625C9.70625 4.10625 9.88125 4.28125 9.88125 4.5C9.88125 4.71875 9.70625 4.89375 9.4875 4.89375Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_5875_37792">
        <rect
          width="7"
          height="7"
          fill="white"
          transform="translate(4.5 1)"
        />
      </clipPath>
    </defs>
  </svg>
))
