import { Div, Flex, H1, Img, Span } from 'honorable'
import type { DivProps } from 'honorable'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { keyframes } from '@emotion/react'
import { CSSTransition } from 'react-transition-group'

import { usePrevious } from '..'

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
    show: boolean
    spinnerWidth?: number
    spinnerDelay?: number
}

const logoEnterStyles = {
  '.enter &': {
    opacity: 0,
    transform: 'scale(0.3)',
  },
  '.enter-active &, .enter-done &': {
    opacity: 1,
    transform: 'scale(1)',
    visibility: 'visible',
  },
  '.enter-active &': {
    transition: 'all 0.3s cubic-bezier(.37,1.4,.62,1)',
  },
}

const textEnterStyles = {
  '.enter &': {
    opacity: 0,
  },
  '.enter-active &, .enter-done &': {
    opacity: 1,
  },
  '.enter-active &': {
    transition: 'all 0.3s ease',
  },
}

const exitStyles = {
  '&.exit': {
    opacity: 1,
  },
  '&.exit-active, &.exit-done': {
    opacity: 0,
  },
  '&.exit-active': {
    transition: 'all 0.3s ease-in',
  },
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ show, paused, spinnerWidth = 96, spinnerDelay = 200, ...props }, ref) => {
    const [delayFinished, setDelayFinished] = useState(false)
    const previousShow = usePrevious(show)
    const [tickCount, setTickCount] = useState(0)

    if (!show && delayFinished) {
      setDelayFinished(false)
    }

    useEffect(() => {
      if (show) {
        console.log('setTimeout')
        const timeoutId = setTimeout(() => {
          console.log('DELAY DONE')
          setDelayFinished(true)
        }, spinnerDelay)

        return () => {
          console.log('clearTimeout')
          clearTimeout(timeoutId)
        }
      }
    }, [show, spinnerDelay])

    useEffect(() => {
      const interval = setTimeout(() => {
        setTickCount(tickCount >= 4 ? 0 : tickCount + 1)
      }, 200)

      return () => clearTimeout(interval)
    }, [tickCount])

    return (
      <CSSTransition
        in={delayFinished && show}
        timeout={700}
        unmountOnExit
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyItems="center"
          {...exitStyles}
          {...props}
        >
          <Div
            ref={ref}
            mask="url(/logos/plural-logomark-only-white.svg) 0 0 / contain no-repeat"
            width={spinnerWidth}
            height={spinnerWidth}
            position="relative"
            {...logoEnterStyles}
          >
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
          </Div>
          <H1
            body1
            bold
            color="text"
            marginTop="large"
            textAlign="center"
            {...textEnterStyles}
          >
            Loading Plural
            <Span opacity={tickCount >= 1 ? 1 : 0}>.</Span>
            <Span opacity={tickCount >= 2 ? 1 : 0}>.</Span>
            <Span opacity={tickCount >= 3 ? 1 : 0}>.</Span>
          </H1>
        
        </Flex>
      </CSSTransition>
    )
  }
)

export default LoadingSpinner
