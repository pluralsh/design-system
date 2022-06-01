import { Div, DivProps } from 'honorable'

import { keyframes } from '@emotion/react'

export type Props = {
  mode?: 'indeterminate' | 'determinate',
  paused?: boolean,
  progress?: number, 
  complete?: boolean,
}

const keyframes1 = keyframes`
0% {
  transform: translateX(${-(50 + (50 * 0.5))}%);
}

${100 - (50 * 0.5)}%, 100% {
  transform: translateX(${(50 + (50 * 0.5))}%);
}
`

const keyframes2 = keyframes`
0% {
  transform: translateX(${-(50 + (50 * 0.5))}%);
}

100% {
  transform: translateX(${(50 + (50 * 0.5))}%);
}
`

const keyframes3 = keyframes`
0% {
  transform: translateX(${-(50 + (50 * 0.5))}%);
}

65%, 100% {
  transform: translateX(${(50 + (50 * 0.5))}%);
}
`

const keyframes4 = keyframes`
0% {
  transform: translateX(${-(50 + (100 * 0.5))}%);
}

100% {
  transform: translateX(${(50 + (100 * 0.5))}%);
}
`

function ProgressFill({ fillWidth, fillColor = 'blue.200', ...props }: { fillWidth:number } & DivProps) {
  return (
    <Div
      position="absolute"
      width="100%"
      height="100%"
      animationIterationCount="infinite"
      transform={props.animationName && `translateX(${-(50 + (fillWidth * 0.5))}%)`}
      transition="all 2s ease"
      _after={{
        content: '" "',
        position: 'absolute',
        backgroundColor: fillColor,
        left: '0',
        top: '0',
        bottom: '0',
        right: '0',
        transform: `scaleX(${fillWidth}%)`,
        transition: 'all 0.25s ease',
      }}
      {...props}
    />
  )

}

function IndeterminateFill1({ complete, paused }:{complete: boolean, paused:boolean}) {
  const fillWidth = 50
  const animDur = 3
  const timingFunction = 'linear'
  const anim = keyframes1

  const animationProps:DivProps = {
    animationName: anim,
    animationDuration: `${animDur}s`,
    animationTimingFunction: timingFunction,
  }
  if (paused) {
    animationProps.animationPlayState = 'paused'
  }

  return (
    <>
      <Div
        opacity={complete ? '0' : 1}
        transition="opacity .05s ease"
      >
        <ProgressFill
          fillWidth={fillWidth}
          {...animationProps}
        />
        <ProgressFill
          fillWidth={fillWidth}
          {...animationProps}
          animationDelay={`${animDur / 2}s`}
        />
      </Div>
      <ProgressFill
        opacity={complete ? '1' : '0'}
        fillWidth={100}
        transform={complete ? 'translateX(0)' : 'translateX(-100%)'}
        transition="transform 0.15s ease-out"
        fillColor="border-success"
      />
    </>
  )
}

export function ProgressBar1({ mode = 'indeterminate', complete = false, paused = false, progress, ...props }: Props) {
  let fill
  if (mode !== 'determinate') {
    fill = (
      <IndeterminateFill1
        complete={complete}
        paused={paused}
      />
    )
  }
  else {
    fill = (
      <Div
        position="absolute"
        left="0"
        top="0"
        bottom="0"
        backgroundColor={progress >= 1 || complete ? 'border-success' : 'blue.200'}
        right={`${(1 - progress) * 100}%`}
      />
    )
  }

  return (
    <Div
      position="relative"
      width="100%"
      height="6px"
      borderRadius="6px"
      backgroundColor="fill-two-selected"
      overflow="hidden"
      {...props}
    >{fill}
    </Div>
  )
}

export function ProgressBar2({ complete = false, paused = false, ...props }: Props) {
  const fillWidth = 50
  const animDur = 1.75
  const timingFunction = 'cubic-bezier(.52,-0.01,.74,.99)'
  const anim = keyframes2
  
  const animationProps:DivProps = {
    animationName: anim,
    animationDuration: `${animDur}s`,
    animationTimingFunction: timingFunction,
  }
  if (paused) {
    animationProps.animationPlayState = 'paused'
  }

  return (
    <Div
      position="relative"
      width="100%"
      height="6px"
      borderRadius="6px"
      backgroundColor="fill-two-selected"
      overflow="hidden"
      {...props}
    >
      <Div
        opacity={complete ? '0' : 1}
        transition="opacity .05s ease"
      >
        <ProgressFill
          fillWidth={fillWidth}
          {...animationProps}
        />
      </Div>
      <ProgressFill
        opacity={complete ? '1' : '0'}
        fillWidth={100}
        transform={complete ? 'translateX(0)' : 'translateX(-100%)'}
        transition="transform 0.15s ease-out"
        fillColor="border-success"
      />
    </Div>
  )
}

export function ProgressBar3({ complete = false, paused = false, ...props }: Props) {
  const fillWidth = 50
  const animDur = 5
  const timingFunction = 'ease-in-out'
  const anim = keyframes3
  
  const animationProps:DivProps = {
    animationName: anim,
    animationDuration: `${animDur}s`,
    animationTimingFunction: timingFunction,
  }
  if (paused) {
    animationProps.animationPlayState = 'paused'
  }

  return (
    <Div
      position="relative"
      width="100%"
      height="6px"
      borderRadius="6px"
      backgroundColor="fill-two-selected"
      overflow="hidden"
      {...props}
    >
      <Div
        opacity={complete ? '0' : 1}
        transition="opacity .05s ease"
      >
        <ProgressFill
          fillWidth={fillWidth}
          {...animationProps}
        />
        <ProgressFill
          fillWidth={fillWidth}
          {...animationProps}
          animationDelay={`${animDur * 0.333333}s`}
        />
        <ProgressFill
          fillWidth={fillWidth}
          {...animationProps}
          animationDelay={`${animDur * 0.666666}s`}
        />
      </Div>
      <ProgressFill
        opacity={complete ? '1' : '0'}
        fillWidth={100}
        transform={complete ? 'translateX(0)' : 'translateX(-100%)'}
        transition="transform 0.15s ease-out"
        fillColor="border-success"
      />
    </Div>
  )
}

export function ProgressBar4({ complete = false, paused = false, ...props }: Props) {
  const fillWidth = 100
  const animDur = 1.75
  const timingFunction = 'cubic-bezier(.52,-0.01,.74,.99)'
  const anim = keyframes4
  
  const animationProps:DivProps = {
    animationName: anim,
    animationDuration: `${animDur}s`,
    animationTimingFunction: timingFunction,
  }
  if (paused) {
    animationProps.animationPlayState = 'paused'
  }

  return (
    <Div
      position="relative"
      width="100%"
      height="6px"
      borderRadius="6px"
      backgroundColor="fill-two-selected"
      overflow="hidden"
      {...props}
    >
      <Div
        opacity={complete ? '0' : 1}
        transition="opacity .05s ease"
      >
        <ProgressFill
          fillWidth={fillWidth}
          {...animationProps}
        />
      </Div>
      <ProgressFill
        opacity={complete ? '1' : '0'}
        fillWidth={100}
        transform={complete ? 'translateX(0)' : 'translateX(-100%)'}
        transition="transform 0.15s ease-out"
        fillColor="border-success"
      />
    </Div>
  )
}

const keyframes5 = keyframes`
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

const keyframes5inner = keyframes`
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

export function ProgressBar5({ complete = false, paused = false, ...props }: Props) {  
  const animationProps:DivProps = {
    animationName: keyframes5,
    animationDuration: '2.5s',
  }
  if (paused) {
    animationProps.animationPlayState = 'paused'
  }

  return (
    <Div
      position="relative"
      width="100%"
      height="6px"
      borderRadius="6px"
      backgroundColor="fill-two-selected"
      overflow="hidden"
      {...props}
    >
      <Div
        opacity={complete ? '0' : 1}
        transition="opacity .05s ease"
      >
        <Div
          position="absolute"
          width="100%"
          height="100%"
          animationName={animationProps.animationName}
          animationDuration={animationProps.animationDuration}
          animationTimingFunction="cubic-bezier(.20,.55,.80,.45)"
          animationIterationCount="infinite"
          _after={{
            content: '" "',
            position: 'absolute',
            backgroundColor: 'blue.200',
            left: '0',
            top: '0',
            bottom: '0',
            right: '0',
            animationName: keyframes5inner,
            animationDuration: animationProps.animationDuration,
            animationTimingFunction: 'cubic-bezier(.20,.55,.80,.45)',
            animationIterationCount: 'infinite',
          }}
        />
      </Div>
      <ProgressFill
        opacity={complete ? '1' : '0'}
        fillWidth={100}
        transform={complete ? 'translateX(0)' : 'translateX(-100%)'}
        transition="transform 0.15s ease-out"
        fillColor="border-success"
      />
    </Div>
  )
}
