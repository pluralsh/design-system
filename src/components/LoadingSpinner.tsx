import { Div, Flex, Img } from 'honorable'
import type { DivProps } from 'honorable'
import { forwardRef } from 'react'
import { keyframes } from '@emotion/react'

const bgKeyframes = keyframes`
0% {
  transform: translateX(0);
}

100% {
  transform: translate(calc(-200% / 3));
}
`

const commonAnimStyles = {
  animationDuration: '3s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
}

export type LoadingSpinnerProps = DivProps & {
    paused?: boolean
    spinnerWidth?: number
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ paused, spinnerWidth = 96, ...props }, ref) => (
    <Div>
      <Div
        ref={ref}
        {...props}
        mask="url(/logos/plural-logomark-only-white.svg) 0 0 / contain no-repeat"
        maskRepeat="none"
        maxSize="cover"
        backgroundColor="blue"
        width={spinnerWidth}
        height={spinnerWidth}
        position="relative"
      >
        {/* <Div position="relative"> */}
        <Flex
          flexWrap="nowrap"
          height="100%"
          position="absolute"
          animationName={bgKeyframes}
          animationPlayState={paused ? 'paused' : 'running'}
          {...commonAnimStyles}
        >
          <Img
            display="block"
            height="100%"
            objectFit="contain"
            src="/design-system/loading-spinner-bg.png"
          />
          <Img
            display="block"
            height="100%"
            objectFit="contain"
            src="/design-system/loading-spinner-bg.png"
            transform="rotate(180deg)"
          />
          <Img
            display="block"
            height="100%"
            objectFit="contain"
            src="/design-system/loading-spinner-bg.png"
          />
        </Flex>
        {/* </Div> */}
      </Div>
      Loading
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </Div>
  )
)

export default LoadingSpinner
