import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth=".801981"
    >
      <path d="m13.765158 4.5758658h-3.123235c-.323119 0-.5828-.2597376-.5828-.5828318v-3.60469705" />
      <path d="m13.099754 15.599009h-10.1995646c-.3674357 0-.6588516-.297775-.6588516-.658907v-13.8802582c0-.36743567.2977516-.65885319.6588516-.65885319h6.8546618c.1899893 0 .3673878.0823562.4941008.22172936l3.344983 3.77574763c.107706.1203613.164727.2787446.164727.4371198v10.1045146c0 .367467-.297776.658907-.658908.658907z" />
      <path d="m3.9518114 3.5431867h4.5169827" />
      <path d="m3.9518114 5.2789948h4.5169827" />
      <path d="m3.9518114 7.0275304h4.5169827" />
    </g>
  </svg>
))