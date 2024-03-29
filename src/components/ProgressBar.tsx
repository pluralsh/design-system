import { Div } from 'honorable'

import { keyframes } from '@emotion/react'

export type Props = {
  mode?: 'indeterminate' | 'determinate'
  paused?: boolean
  progress?: number
  complete?: boolean
  height?: number
  progressColor?: string
  completeColor?: string
}

const keyframesOuter = keyframes`
0% {
  transform: translateX(-65%);
}

49% {
  transform: translateX(0);
}

98%, 100% {
  transform: translateX(65%);
}
`

const keyframesInner = keyframes`
0%{
 transform: scaleX(0.0);
}
7% {
  transform: scaleX(0.04)
}
49% {
  transform: scaleX(0.5);
}
91% {
  transform: scaleX(0.04);
}
98%, 100% {
  transform: scaleX(0.0);
}
`

type IndeterminateFillProps = {
  complete: boolean
  paused: boolean
}

function IndeterminateFill({ complete, paused }: IndeterminateFillProps) {
  const commonStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
  }
  const commonAnimStyles = {
    animationDuration: '3s',
    animationTimingFunction: 'cubic-bezier(.20,.55,.80,.45)',
    animationIterationCount: 'infinite',
    animationPlayState: paused ? 'paused' : 'running',
  }

  return (
    <>
      {/* Animated fill */}
      <Div
        opacity={complete ? 0 : 1}
        transition="opacity .05s ease"
      >
        <Div
          {...commonStyles}
          {...commonAnimStyles}
          animationName={keyframesOuter}
          _after={{
            ...commonStyles,
            ...commonAnimStyles,
            content: '" "',
            backgroundColor: 'blue.200',
            animationName: keyframesInner,
          }}
        />
      </Div>
      {/* Complete fill */}
      <Div
        {...commonStyles}
        opacity={complete ? 1 : 0}
        transform={complete ? 'translateX(0)' : 'translateX(-100%)'}
        transition="transform 0.15s ease-out"
        backgroundColor="border-success"
      />
    </>
  )
}

export default function ProgressBar({
  mode = 'indeterminate',
  complete = false,
  paused = false,
  progress,
  height = 6,
  progressColor = 'blue.200',
  completeColor = 'border-success',
  ...props
}: Props) {
  let fill

  if (mode !== 'determinate') {
    fill = (
      <IndeterminateFill
        complete={complete}
        paused={paused}
      />
    )
  } else {
    fill = (
      <Div
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        backgroundColor={
          progress >= 1 || complete ? completeColor : progressColor
        }
        right={`${(1 - progress) * 100}%`}
      />
    )
  }

  return (
    <Div
      position="relative"
      width="100%"
      height={height}
      borderRadius={height / 2}
      backgroundColor="fill-three"
      overflow="hidden"
      {...props}
    >
      {fill}
    </Div>
  )
}
