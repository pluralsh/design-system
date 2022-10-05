import { DOMProps } from '@react-types/shared'
import {
  ComponentPropsWithRef, Dispatch, ReactElement, useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import AnimateHeight from 'react-animate-height'
import styled from 'styled-components'

import { ChecklistFooter, ChecklistFooterProps } from './ChecklistFooter'
import { ChecklistItemInner, ChecklistItemProps } from './ChecklistItem'
import DropdownArrowIcon from './icons/DropdownArrowIcon'

const heightAnimationDuration = 666 // 666ms

const Checklist = styled(ChecklistUnstyled)(({ theme }) => ({
  background: theme.colors['fill-two'],
  color: theme.colors.text,
  display: 'flex',
  flexDirection: 'column',
  width: 480,

  '> div': {
    borderTop: theme.borders['outline-focused'],
    borderWidth: 4,
    borderTopRightRadius: theme.borderRadiuses.large,
  },

  '.header': {
    ...theme.partials.text.subtitle1,
    borderBottom: theme.borders['fill-two'],
    padding: `${theme.spacing.medium}px ${theme.spacing.large}px`,
    cursor: 'pointer',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  '.content': {
    padding: `${theme.spacing.xsmall}px 0`,
    borderBottom: theme.borders['fill-two'],
    display: 'flex',
    flexDirection: 'column',
  },

  '.finishContainer': {
    paddingTop: `${theme.spacing.large}px`,
    paddingBottom: `${theme.spacing.medium}px`,
  },

  '.shrink': {
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 333ms linear, max-height 333ms linear',
  },

  '.grow': {
    transition: 'opacity 333ms linear, max-height 333ms linear',
  },

  '.arrowUp': {
    ...theme.partials.dropdown.arrowTransition({ isOpen: true }),
  },

  '.arrowDown': {
    ...theme.partials.dropdown.arrowTransition({ isOpen: false }),
  },
}))

type ChecklistProps = ComponentPropsWithRef<'div'> & {
  label: string
  stateProps: ChecklistStateProps
  footerChildren: ReactElement<ChecklistFooterProps> | ReactElement<ChecklistFooterProps>[]
  completeChildren: ReactElement
  children: ReactElement<ChecklistItemProps>[]
}

type ChecklistStateProps = DOMProps & {
  onSelectionChange?: Dispatch<number>
  selectedKey?: number,
  completedKey?: number,
  isOpen?: boolean
  isDismissed?: boolean
}

function ChecklistUnstyled({
  label,
  stateProps,
  children,
  footerChildren,
  completeChildren,
  ...props
}: ChecklistProps): JSX.Element {
  const {
    isOpen = true, isDismissed, selectedKey, completedKey, onSelectionChange,
  } = stateProps
  const [open, setOpen] = useState(isOpen)
  const [finished, setFinished] = useState(false)

  const isFirstRender = useRef(true)
  const itemsContainerRef = useRef<HTMLDivElement>(null)
  const finishedContainerRef = useRef<HTMLDivElement>(null)

  const [itemContainerHeight, setItemContainerHeight] = useState<number>(-1)
  const [finishedContainerHeight, setFinishedContainerHeight] = useState<number>(-1)

  const onSelectionChangeWrapper = useCallback((idx: number) => (idx < children.length && idx > -1 ? onSelectionChange(idx) : undefined),
    [children, onSelectionChange])

  const checklistItemInnerWrapper = useMemo(() => children.map((child, index) => (
    <ChecklistItemInner
      {...child.props}
      key={index}
      index={index}
      selected={selectedKey === index}
      completed={completedKey >= index}
      onSelectionChange={onSelectionChangeWrapper}
    >{child}
    </ChecklistItemInner>
  )), [children, selectedKey, completedKey, onSelectionChangeWrapper])

  useEffect(() => {
    setFinished(completedKey === children.length - 1)
  }, [completedKey, children.length, setFinished])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    }
  })

  useEffect(() => {
    const maxItemContainerHeight = Math.max(itemContainerHeight, itemsContainerRef.current.getBoundingClientRect().height)
    const maxFinishedContainerHeight = Math.max(finishedContainerHeight, finishedContainerRef.current.getBoundingClientRect().height)

    setItemContainerHeight(maxItemContainerHeight)
    setFinishedContainerHeight(maxFinishedContainerHeight)
  }, [itemsContainerRef, finishedContainerRef, setItemContainerHeight, setFinishedContainerHeight, itemContainerHeight, finishedContainerHeight])

  return (
    <AnimateHeight
      height={isDismissed ? 0 : 'auto'}
      {...props}
    >
      <div
        className={finished ? 'shrink' : 'grow'}
        style={finished ? { maxHeight: 0 } : { maxHeight: itemContainerHeight }}
        ref={itemsContainerRef}
      >
        <div
          className="header"
          onClick={() => setOpen(!open)}
        >
          <div>{label}</div>
          <DropdownArrowIcon
            className={open ? 'arrowUp' : 'arrowDown'}
          />
        </div>
        <AnimateHeight
          height={open ? 'auto' : 0}
          duration={heightAnimationDuration}
        >
          <div
            className="content"
          >
            {checklistItemInnerWrapper}
          </div>
          <ChecklistFooter>{footerChildren}</ChecklistFooter>
        </AnimateHeight>
      </div>
      <div
        className={finished ? 'finishContainer grow' : 'finishContainer shrink'}
        style={isFirstRender.current || finished ? { maxHeight: finishedContainerHeight } : { maxHeight: 0, padding: 0 }}
        ref={finishedContainerRef}
      >
        {completeChildren}
      </div>
    </AnimateHeight>
  )
}

export { Checklist, ChecklistStateProps, ChecklistProps }
