import createIcon from './createIcon'

export default createIcon(({ size, color, secondaryColor = 'transparent' }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="14"
      height="14"
      rx={2.5}
      ry={2.5}
      fill={secondaryColor}
    />
    <path
      d="m3 0c-1.6619983 0-3 1.3380017-3 3v10c0 1.661998 1.3380017 3 3 3h10c1.661998 0 3-1.338002 3-3v-10c0-1.6619983-1.338002-3-3-3zm4.328125 3.8320313h1.3125v5.9199216h-1.3125zm.65625 7.4941407a.918033.918033 0 0 1 .9179688.917969.918033.918033 0 0 1 -.9179688.917969.918033.918033 0 0 1 -.9179687-.917969.918033.918033 0 0 1 .9179687-.917969z"
      fill={color}
    />
  </svg>
))
