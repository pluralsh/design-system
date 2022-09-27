import {
  ComponentPropsWithRef, Dispatch, ReactElement, useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import AnimateHeight from 'react-animate-height'
import styled from 'styled-components'

import CaretDownIcon from './icons/CaretDownIcon'
import DropdownArrowIcon from './icons/DropdownArrowIcon'
import SuccessIcon from './icons/SuccessIcon'

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

  '.arrowUp': {
    ...theme.partials.dropdown.arrowTransition({ isOpen: true }),
  },

  '.arrowDown': {
    ...theme.partials.dropdown.arrowTransition({ isOpen: false }),
  },
}))

const ChecklistItemInner = styled(ChecklistItemInnerUnstyled)(({ theme, completed }) => ({
  display: 'flex',
  flexDirection: 'column',

  '.stepHeader': {
    padding: `${theme.spacing.xsmall}px ${theme.spacing.large}px`,
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    color: theme.colors['action-link-inactive'],
    cursor: 'pointer',

    '&.active': {
      color: theme.colors['action-link-active'],

      '.stepCircle': {
        // borderColor: theme.colors['action-link-active'],
        '&:after': {
          position: 'absolute',
          content: '""',
          borderColor: theme.colors['action-link-active'],
        },
      },
    },

    ':hover': {
      background: theme.colors['fill-two-hover'],
    },

    '.stepCircle': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: '100%',
      border: theme.borders['fill-three'],
      background: theme.colors['fill-three'],
      ...theme.partials.text.body2,

      '> span:not(.pop)': {
        position: 'absolute',
        opacity: 0,
      },

      '> div': {
        opacity: completed ? 0 : 1,
      },
    },

    '.stepTitle': {
      flex: '1 1 auto',
    },
  },

  '.stepContainer': {
    padding: `0 ${theme.spacing.large}px`,
    display: 'flex',
    gap: 28,
    color: theme.colors['text-light'],

    '.stepLine': {
      width: 1,
      background: theme.colors['action-link-active'],
      marginLeft: 16,
    },

    '.stepContent': {
      padding: `${theme.spacing.xsmall}px 0`,
    },
  },

  '.pop': {
    position: 'absolute',
    opacity: 1,
    animation: 'popIcon 0.33s',
  },

  '@keyframes popIcon': {
    '0%': {
      transform: 'scale(0)',
    },
    '20%': {
      transform: 'scale(0.3)',
    },
    '40%': {
      transform: 'scale(0.6)',
    },
    '60%': {
      transform: 'scale(0.9)',
    },
    '80%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}))

const heightAnimationDuration = 666 // 666ms

export type ChecklistProps = ComponentPropsWithRef<'div'> & {
  headerTitle: string
  isOpen?: boolean
  active?: number,
  completed?: number,
  onSelectionChange?: Dispatch<number>
  dismiss?: boolean
  footerChildren?: ReactElement<ChecklistFooterProps> | ReactElement<ChecklistFooterProps>[]
  children: ReactElement<ChecklistItemProps>[]
}

function ChecklistUnstyled({
  headerTitle,
  active = 0,
  completed,
  isOpen = true,
  dismiss,
  onSelectionChange,
  children,
  footerChildren,
  ...props
}: ChecklistProps): JSX.Element {
  const [selected, setSelected] = useState(active)
  const [open, setOpen] = useState(isOpen)
  const prevCompletedRef = useRef<number>(active)

  const setSelectedWrapper = useCallback((idx: number) => {
    setSelected(idx)
    onSelectionChange(idx)
  }, [setSelected, onSelectionChange])

  const checklistItemInnerWrapper = useMemo(() => children.map((child, index) => (
    <ChecklistItemInner
      key={index}
      index={index}
      active={selected === index}
      setActive={setSelectedWrapper}
      completed={completed >= index}
      {...child.props}
    >{child}
    </ChecklistItemInner>
  )), [children, selected, setSelectedWrapper, completed])

  const next = useCallback(() => setSelectedWrapper(selected + 1), [setSelectedWrapper, selected])

  useEffect(() => {
    if (prevCompletedRef.current < completed) {
      next()
    }

    prevCompletedRef.current = completed
  }, [completed, next])

  return (
    <AnimateHeight
      height={dismiss ? 0 : 'auto'}
      {...props}
    >
      <div
        className="header"
        onClick={() => setOpen(!open)}
      >
        <div>{headerTitle}</div>
        <DropdownArrowIcon
          className={open ? 'arrowUp' : 'arrowDown'}
        />
      </div>
      <AnimateHeight
        height={open ? 'auto' : 0}
        duration={heightAnimationDuration}
      >
        <div className="content">
          {checklistItemInnerWrapper}
        </div>
        <ChecklistFooter>{footerChildren}</ChecklistFooter>
      </AnimateHeight>
    </AnimateHeight>
  )
}

export type ChecklistItemProps = ComponentPropsWithRef<'div'> & {
  children?: ReactElement | ReactElement[] | string
  title: string
}

function ChecklistItem({
  children,
  ...props
}: ChecklistItemProps): JSX.Element {
  return (
    <div
      {...props}
    >{children}
    </div>
  )
}

export type ChecklistItemInnerProps = Omit<ChecklistItemProps, 'children'> & {
  children: ReactElement<ChecklistItemProps>
  index: number
  setActive: Dispatch<number>
  active?: boolean
  completed?: boolean
}

function ChecklistItemInnerUnstyled({
  children,
  index,
  title,
  active,
  setActive,
  completed,
  ...props
}: ChecklistItemInnerProps): JSX.Element {
  return (
    <div
      className="step"
      key={index}
      {...props}
    >
      <div
        className={active ? 'stepHeader active' : 'stepHeader'}
        onClick={() => setActive(active ? null : index)}
      >
        <div className="stepCircle">
          <div>{index + 1}</div>
          <SuccessIcon
            size={16}
            color="icon-success"
            className={completed ? 'pop' : ''}
          />
        </div>
        <div className="stepTitle">{title}</div>
        <CaretDownIcon className={active ? 'arrowUp' : 'arrowDown'} />
      </div>
      <AnimateHeight
        height={active ? 'auto' : 0}
        duration={heightAnimationDuration}
      >
        <div className="stepContainer">
          <div className="stepLine" />
          <div className="stepContent">{children}</div>
        </div>
      </AnimateHeight>
    </div>
  )
}

export type ChecklistFooterProps = ComponentPropsWithRef<'div'>

function ChecklistFooterUnstyled({
  children,
  ...props
}: ChecklistFooterProps): JSX.Element {
  return (<div {...props}>{children}</div>)
}

const ChecklistFooter = styled(ChecklistFooterUnstyled)(({ theme }) => ({
  padding: `${theme.spacing.medium}px ${theme.spacing.large}px`,
  height: 64,
}))

export { Checklist, ChecklistItem }
