import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
    >
      <rect
        height="7.6"
        rx=".5"
        strokeWidth=".89"
        width="3.1"
        x="12.2394"
        y="1.1843"
      />
      <path
        d="m11.1394 7.6844v-5.9h-.9s-5.3-1.7-7.5-.5c0 0-.7.3-1.1 1.1l-.9 5.6s-.6 1.9 2 1.7l2.5-.5s-.6 1.8-.9 2.4c-1 1.8-1.5 4.4 1 3.2.5-.4 2.8-4.5 2.8-4.5s1.1-1.9 1.8-2.1c.7-.1 1.2-.2 1.2-.5z"
        strokeWidth="1.04"
      />
    </g>
  </svg>
))
