import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill={color}>
      <path d="m12.042 6.858 8.029 4.59v9.014l-8.029-4.594z" />
      <path d="m20.5 20.415 7.959-4.575v-8.953l-7.959 4.542z" />
      <path d="m3.541 11.01 8.03 4.589v-9.009l-8.03-4.59z" />
      <path d="m12.042 25.41 8.029 4.59v-9.043l-8.029-4.589z" />
    </g>
  </svg>
))
