import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m2 2.500005c0-.39782.15804-.77935.43934-1.06066.2813-.2813.66284-.43934 1.06066-.43934s.77936.15804 1.06066.43934c.2813.28131.43934.66284.43934 1.06066 0 .39783-.15804.77936-.43934 1.06066-.2813.28131-.66284.43934-1.06066.43934s-.77936-.15803-1.06066-.43934c-.2813-.2813-.43934-.66283-.43934-1.06066zm2 2.45c1.14062-.23125 2-1.24062 2-2.45 0-1.38125-1.11875-2.499999-2.5-2.499999s-2.5 1.118749-2.5 2.499999c0 1.20938.85938 2.21875 2 2.45v6.09999c-1.14062.231299-2 1.2406-2 2.45 0 1.3813 1.11875 2.499999 2.5 2.499999s2.5-1.118699 2.5-2.499999c0-1.2094-.85938-2.2187-2-2.45zm-2 8.54999c0-.3978.15804-.7793.43934-1.0606.2813-.2814.66284-.4394 1.06066-.4394s.77936.158 1.06066.4394c.2813.281301.43934.6628.43934 1.0606s-.15804.7794-.43934 1.0607-.66284.4393-1.06066.4393-.77936-.158-1.06066-.4393c-.2813-.281301-.43934-.662901-.43934-1.0607zm10.5-1.5c.3978 0 .7794.158 1.0607.4394.2813.281301.4393.6628.4393 1.0606s-.158.7794-.4393 1.0607c-.281301.2813-.6629.4393-1.0607.4393s-.7794-.158-1.0607-.4393c-.2813-.281301-.4393-.662901-.4393-1.0607s.158-.7793.4393-1.0606c.281301-.2814.6629-.4394 1.0607-.4394zm0 3.999999c.663 0 1.2989-.263399 1.7678-.732199.4688-.468901.7322-1.1047.7322-1.7678 0-.663-.2634-1.2989-.7322-1.7678-.468901-.4688-1.1048-.7322-1.7678-.7322s-1.2989.2634-1.7678.7322c-.4688.468901-.7322 1.1048-.7322 1.7678 0 .6631.2634 1.2989.7322 1.7678.468901.4688 1.1048.732199 1.7678.732199zm1-13.999989c0-.26522-.1054-.51957-.2929-.70711-.1875-.18753-.4419-.29289-.7071-.29289s-.5196.10536-.7071.29289c-.1875.18754-.2929.44189-.2929.70711s.1054.51957.2929.70711c.1875.18753.4419.29289.7071.29289s.5196-.10536.7071-.29289c.1875-.18754.2929-.44189.2929-.70711zm-1 6c.2652 0 .5196-.10536.7071-.29289.1875-.18754.2929-.44189.2929-.70711s-.1054-.51957-.2929-.70711c-.1875-.18753-.4419-.29289-.7071-.29289s-.5196.10536-.7071.29289c-.1875.18754-.2929.44189-.2929.70711s.1054.51957.2929.70711c.1875.18753.4419.29289.7071.29289z"
      fill={color}
    />
  </svg>
))
