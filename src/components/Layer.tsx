import { useOutsideClick } from 'honorable'
import {
  MutableRefObject,
  PropsWithChildren,
  forwardRef,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import {
  TransitionFrom,
  TransitionTo,
  animated,
  useTransition,
} from 'react-spring'
import styled, { useTheme } from 'styled-components'

type GetTransitionProps = {
  isOpen: boolean
  type: 'slide' | 'fade' | 'scale'
  direction: 'up' | 'down' | 'right' | 'left'
}

type AnimationType =
  | 'fade'
  | 'scale'
  | 'slide'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'slide-horizontal'
  | 'slide-vertical'

const getTransitionProps = ({
  isOpen,
  type,
  direction,
}: GetTransitionProps) => {
  const translateKey = `translate${
    direction === 'up' || direction === 'down' ? 'Y' : 'X'
  }`
  let from:Record<string, any> = {
    opacity: 0,
  }
  let to:Record<string, any> = {
    opacity: 1,
  }

  if (type === 'slide') {
    from = {
      ...from,
      [translateKey]:
        direction === 'down' || direction === 'right' ? '-100%' : '100%',
    }
    to = {
      ...to,
      [translateKey]: '0%',
    }
  }

  if (type === 'scale') {
    from = {
      ...from,
      scale: '30%',
    }
    to = {
      ...to,
      scale: '100%',
    }
  }

  return {
    from,
    enter: to,
    leave: from,
    config: isOpen
      ? {
        mass: 0.6,
        tension: 280,
        velocity: 0.02,
      }
      : {
        mass: 0.6,
        tension: 400,
        velocity: 0.02,
        restVelocity: 0.1,
      },
  }
}

export type LayerPositionType =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'hidden'
  | 'left'
  | 'right'
  | 'top'
  | 'top-left'
  | 'top-right'

export type MarginType = {
  vertical?: string | number | undefined | null
  horizontal?: string | number | undefined | null
  top?: string | number | undefined | null
  bottom?: string | number | undefined | null
  left?: string | number | undefined | null
  right?: string | number | undefined | null
}

const LayerWrapper = styled.div<{ position: LayerPositionType }>(({ position }) => ({
  position: 'absolute',

  pointerEvents: 'none',
  '& > *': {
    pointerEvents: 'auto',
  },
  display: position === 'hidden' ? 'hidden' : 'flex',
  alignItems: position.startsWith('top')
    ? 'start'
    : position.startsWith('bottom')
      ? 'end'
      : 'center',
  justifyContent: position.endsWith('left')
    ? 'start'
    : position.endsWith('right')
      ? 'end'
      : 'center',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}))

function LayerRef({
  position,
  animation = 'slide',
  margin,
  children,
  onClickOutside,
  show,
}: PropsWithChildren<{
    show: boolean
    position: LayerPositionType
    animation?: AnimationType
  margin?: MarginType
    onClickOutside?: ()=>void
  }>,
ref: MutableRefObject<HTMLDivElement>) {
  const theme = useTheme()
  const internalRef = useRef<HTMLDivElement>()
  const finalRef = ref || internalRef

  useOutsideClick(finalRef, () => {
    onClickOutside?.()
  })

  if (typeof margin === 'string' || typeof margin === 'number') {
    margin = {
      vertical: margin,
      horizontal: margin,
    }
  }
  if (typeof margin === 'object') {
    margin = {
      ...(margin.top ? { top: margin.top } : {}),
      ...(margin.bottom ? { top: margin.bottom } : {}),
      ...(margin.left ? { top: margin.left } : {}),
      ...(margin.right ? { top: margin.right } : {}),
      ...(margin.vertical
        ? {
          top: margin.vertical,
          bottom: margin.vertical,
        }
        : {}),
      ...(margin.horizontal
        ? {
          left: margin.horizontal,
          right: margin.horizontal,
        }
        : {}),
    }
  }
  else {
    margin = {}
  }
  for (const [key, value] of Object.entries(margin)) {
    margin[key] = theme.spacing[value] || value
  }
  let animationDirection: GetTransitionProps['direction'] = 'down'
  let animationType: GetTransitionProps['type'] = 'slide'

  if (animation.startsWith('fade')) {
    animationType = 'fade'
    animationDirection = undefined
  }
  else if (animation === 'scale') {
    animationType = 'scale'
    animationDirection = undefined
  }
  else if (animation === 'slide') {
    if (position === 'center') {
      animationType = 'scale'
      animationDirection = undefined
    }
    else {
      animationType = 'slide'
      animationDirection = position.startsWith('top')
        ? 'down'
        : position.startsWith('bottom')
          ? 'up'
          : position.endsWith('left')
            ? 'right'
            : position.endsWith('right')
              ? 'left'
              : 'down'
    }
  }
  else if (animation.startsWith('slide')) {
    animationType = 'slide'
    const tempDir = animation.split('-')[1]

    animationDirection = tempDir === 'up' ? 'up' : 'down'
    if (tempDir === 'horizontal') {
      animationDirection = position.endsWith('right') ? 'left' : 'right'
    }
    else if (tempDir === 'vertical') {
      animationDirection = position.endsWith('bottom') ? 'up' : 'down'
    }
  }

  const transitionProps = getTransitionProps({
    isOpen: show,
    direction: animationDirection,
    type: animationType,
  })
  const transitions = useTransition(show ? [true] : [], transitionProps)

  if (!document) {
    return null
  }
  const portalElt = document?.getElementById(theme.portals.default.id)

  const portalContent = (
    <LayerWrapper position={position}>
      {transitions(styles => {
        console.log('transitions inner', styles)

        return (
          <animated.div
            className="animated"
            ref={finalRef}
            style={{ ...styles }}
          >
            {children}
          </animated.div>
        )
      })}
    </LayerWrapper>
  )

  return createPortal(portalContent, portalElt)
}

const Layer = forwardRef(LayerRef)

export default Layer
