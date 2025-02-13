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
      d="M12.1305 4.94714H9.33503C9.04758 4.94714 8.81648 4.71939 8.81648 4.43608V1.27527"
      stroke={color}
      strokeMiterlimit="10"
    />
    <path
      d="M5.35958 14.5443H2.56143C2.24089 14.5443 1.98666 14.2845 1.98666 13.9695V1.86078C1.98666 1.54023 2.24641 1.28601 2.56143 1.28601H8.54119C8.70699 1.28601 8.86173 1.35786 8.97226 1.47944L11.6549 4.28673C11.6549 4.28673 12.0718 4.85529 12.0718 5.28306"
      stroke={color}
      strokeMiterlimit="10"
    />
    <path
      d="M3.47885 3.43188H7.4193"
      stroke={color}
      strokeMiterlimit="10"
    />
    <path
      d="M3.47885 4.94678H5.5403"
      stroke={color}
      strokeMiterlimit="10"
    />
    <path
      d="M11.1324 9.85148C11.1324 8.0254 9.62117 6.51416 7.79508 6.51416C5.969 6.51416 4.45776 8.0254 4.45776 9.85148C4.45776 11.6776 5.969 13.1888 7.79508 13.1888C9.62117 13.1888 11.1324 11.6776 11.1324 9.85148Z"
      stroke={color}
      strokeMiterlimit="10"
    />
    <path
      d="M13.9661 15.0779L12.8327 16.2114L10.6918 14.0704C10.5658 13.9445 10.5658 13.7556 10.6918 13.6926L11.8252 12.5592L13.9661 14.7001C14.0291 14.8261 14.0291 14.952 13.9661 15.0779Z"
      fill={color}
    />
  </svg>
))
