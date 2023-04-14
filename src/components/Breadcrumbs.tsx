import React, {
  MutableRefObject,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { Flex, FlexProps, Nav, Ol } from 'honorable'
import styled, { useTheme } from 'styled-components'
import classNames from 'classnames'
import { SwitchTransition, Transition } from 'react-transition-group'
import { useVisuallyHidden } from '@react-aria/visually-hidden'

import useResizeObserver from '../hooks/useResizeObserver'
import usePrevious from '../hooks/usePrevious'

import { Select } from './Select'
import { ListBoxItem } from './ListBoxItem'
import { useNavigationContext } from './contexts/NavigationContext'
import { Breadcrumb, BreadcrumbsContext } from './contexts/BreadcrumbsContext'

function getCrumbKey(crumb: Breadcrumb) {
  const maybeKey = crumb?.key

  return typeof maybeKey === 'string'
    ? maybeKey
    : `${typeof crumb.label === 'string' ? crumb.label : crumb.textValue}-${
        crumb.url
      }`
}

const CrumbSeparator = styled(({ className }: { className?: string }) => (
  <div
    className={className}
    aria-hidden
  >
    /
  </div>
))(({ theme }) => ({
  ...theme.partials.text.caption,
  color: theme.colors['text-input-disabled'],
}))

function CrumbLink({
  crumb,
  isLast = true,
}: {
  crumb: Breadcrumb
  isLast?: boolean
}) {
  const { Link } = useNavigationContext()

  return (
    <CrumbLinkWrap>
      <CrumbLinkText className={classNames({ isLast })}>
        {isLast || typeof crumb.url !== 'string' ? (
          crumb.label
        ) : (
          <Link href={crumb.url}>{crumb.label}</Link>
        )}
      </CrumbLinkText>
      {!isLast && <CrumbSeparator />}
    </CrumbLinkWrap>
  )
}

const CrumbLinkWrap = styled.li(({ theme }) => ({
  ...theme.partials.reset.li,
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing.small,
}))

const CrumbLinkText = styled.span(({ theme }) => ({
  whiteSpace: 'nowrap',
  ...theme.partials.text.caption,
  color: theme.colors['text-xlight'],
  '&.isLast': {
    color: theme.colors.text,
  },
  'a:any-link': {
    textDecoration: 'none',
    color: theme.colors['text-xlight'],
    cursor: 'pointer',
    '&:focus, &:focus-visible': {
      outline: 'none',
    },
    '&:focus-visible': {
      textDecoration: 'underline',
      textDecorationColor: theme.colors['border-outline-focused'],
    },
    '&:hover': {
      color: theme.colors.text,
      textDecoration: 'underline',
    },
  },
}))

const CrumbSelectTriggerUnstyled = forwardRef<any, any>(
  ({ className, ...props }: { className?: string }, ref) => (
    <div
      className={className}
      ref={ref}
      {...props}
    >
      ...
    </div>
  )
)

const CrumbSelectTrigger = styled(CrumbSelectTriggerUnstyled)<{
  isOpen?: boolean
}>(({ theme }) => ({
  ...theme.partials.text.caption,
  cursor: 'pointer',
  color: theme.colors['text-xlight'],
  '&:focus, &:focus-visible': {
    outline: 'none',
  },
  '&:focus-visible': {
    textDecoration: 'underline',
    textDecorationColor: theme.colors['border-outline-focused'],
  },
}))

function CrumbSelect({
  breadcrumbs,
  isLast,
}: {
  breadcrumbs: Breadcrumb[]
  isLast: boolean
}) {
  const { useNavigate } = useNavigationContext()
  const navigate = useNavigate()

  return (
    <CrumbLinkWrap>
      <Select
        selectedKey={null}
        onSelectionChange={(key) => {
          const url = breadcrumbs[key as number]?.url

          if (url) {
            navigate(url)
          }
        }}
        placement="left"
        triggerButton={<CrumbSelectTrigger />}
        width="180px"
      >
        {breadcrumbs.map((crumb, i) => (
          <ListBoxItem
            key={String(i)}
            label={crumb.label}
            textValue={crumb.textValue || ''}
          />
        ))}
      </Select>
      {!isLast && <CrumbSeparator />}
    </CrumbLinkWrap>
  )
}

function CrumbListRef(
  {
    breadcrumbs,
    maxLength,
    visibleListId,
    ariaOnly = false,
    ...props
  }: {
    breadcrumbs: Breadcrumb[]
    maxLength: number
    visibleListId?: string
    ariaOnly?: boolean
  } & FlexProps,
  ref: MutableRefObject<HTMLDivElement>
) {
  const id = useId()
  const { visuallyHiddenProps } = useVisuallyHidden()
  const theme = useTheme()

  if (breadcrumbs?.length < 1) {
    return null
  }
  maxLength = Math.min(maxLength, breadcrumbs.length)
  const heightlessHidden = visibleListId !== id

  const head = maxLength > 1 ? [breadcrumbs[0]] : []
  const middle = breadcrumbs.slice(
    head.length,
    breadcrumbs.length + head.length - maxLength
  )
  const tail = breadcrumbs.slice(
    breadcrumbs.length + head.length - maxLength,
    breadcrumbs.length
  )

  console.log('ariaOnly', ariaOnly, visuallyHiddenProps)

  return (
    <Ol
      id={id}
      ref={ref}
      {...(heightlessHidden && !ariaOnly
        ? { height: 0, opacity: 0, overflow: 'hidden' }
        : {})}
      display="flex"
      {...theme.partials.reset.list}
      className={ariaOnly ? '' : 'crumbList'}
      direction="row"
      gap="small"
      maxWidth="max-content"
      {...props}
      {...(ariaOnly ? visuallyHiddenProps : {})}
    >
      {head.map((headCrumb) => (
        <CrumbLink
          key={getCrumbKey(headCrumb)}
          crumb={headCrumb}
          isLast={tail.length === 0}
        />
      ))}
      {middle.length > 0 && (
        <CrumbSelect
          breadcrumbs={middle}
          isLast={tail.length === 0}
        />
      )}

      {tail.map((crumb, i) => (
        <CrumbLink
          key={getCrumbKey(crumb)}
          crumb={crumb}
          isLast={i === tail.length - 1}
        />
      ))}
    </Ol>
  )
}

const CrumbList = forwardRef(CrumbListRef)

const transitionStyles = {
  entering: { opacity: 0, height: 0 },
  entered: { opacity: 1 },
  exiting: { display: 'none' },
  exited: { display: 'none' },
}

type BreadcrumbsProps = {
  minLength?: number
  maxLength?: number
  collapsible?: boolean
  breadcrumbs?: Breadcrumb[]
} & FlexProps

export function DynamicBreadcrumbs({
  minLength = 0,
  maxLength = Infinity,
  collapsible = true,
  breadcrumbs,
  wrapperRef: transitionRef,
}: BreadcrumbsProps & {
  breadcrumbs: Breadcrumb[]
  wrapperRef?: MutableRefObject<HTMLDivElement>
}) {
  const wrapperRef = useRef<HTMLDivElement | undefined>()
  const [visibleListId, setVisibleListId] = useState<string>('')
  const children: ReactNode[] = []

  if (!collapsible) {
    minLength = breadcrumbs.length
    maxLength = breadcrumbs.length
  } else {
    minLength = Math.min(Math.max(minLength, 0), breadcrumbs.length)
    maxLength = Math.min(maxLength, breadcrumbs.length)
  }

  for (let i = minLength; i <= maxLength; ++i) {
    children.push(
      <CrumbList
        key={i}
        breadcrumbs={breadcrumbs}
        maxLength={i}
        visibleListId={visibleListId}
      />
    )
  }

  const refitCrumbList = useCallback(
    ({ width: wrapperWidth }: { width: number }) => {
      const lists = Array.from(
        wrapperRef?.current?.getElementsByClassName('crumbList')
      )
      const { id } = lists.reduce(
        (prev, next) => {
          const prevWidth = prev.width
          const nextWidth = next?.scrollWidth

          if (
            (prevWidth > wrapperWidth &&
              (nextWidth <= prevWidth || nextWidth < wrapperWidth)) ||
            nextWidth <= wrapperWidth
          ) {
            return { width: nextWidth, id: next.id }
          }

          return prev
        },
        { width: Infinity, id: '' }
      )

      setVisibleListId(id)
    },
    [wrapperRef]
  )

  // Refit breadcrumb list on resize
  useResizeObserver(wrapperRef, refitCrumbList)

  // Make sure to also refit if breadcrumbs data changes
  useEffect(() => {
    const wrapperWidth =
      wrapperRef?.current?.getBoundingClientRect?.()?.width || 0

    refitCrumbList({ width: wrapperWidth })
  }, [breadcrumbs, refitCrumbList, wrapperRef])

  useEffect(() => {
    if (visibleListId) {
      wrapperRef.current?.dispatchEvent(new Event('refitdone'))
    }
  }, [visibleListId])

  return (
    <Flex
      // Hide dynamic breadcrumb list from screen readers.
      // A screen reader-only list is provided in root component.
      aria-hidden
      direction="column"
      ref={(elt: any) => {
        wrapperRef.current = elt
        if (transitionRef) transitionRef.current = elt
      }}
    >
      {children}
    </Flex>
  )
}

export function Breadcrumbs({
  minLength = 0,
  maxLength = Infinity,
  collapsible = true,
  breadcrumbs: propsCrumbs,
  ...props
}: BreadcrumbsProps) {
  const { breadcrumbs: contextCrumbs } = useContext(BreadcrumbsContext)
  const breadcrumbs = propsCrumbs || contextCrumbs

  if (!breadcrumbs) {
    throw Error(
      "<Breadcrumbs> must be provided a 'breadcrumbs' prop or used inside a <BreadcrumbProvider>"
    )
  }
  const prevBreadcrumbs = usePrevious(breadcrumbs)
  const transitionKey = useRef<number>(0)

  if (prevBreadcrumbs !== breadcrumbs) {
    transitionKey.current++
  }

  return (
    <Nav
      aria-label="breadcrumbs"
      {...props}
    >
      {/* Prevent flashing by swapping in new hidden component every time breadcrumbs
      change and waiting for refit before making visible and removing old breadcrumbs */}
      <SwitchTransition mode="in-out">
        <Transition
          key={String(transitionKey.current)}
          timeout={200}
          // Typing for 'addEndListener' on <Transition> component is incorrect
          // when not providing 'ref' prop
          // @ts-expect-error
          addEndListener={(node, done) => {
            node?.addEventListener('refitdone', done, false)
          }}
        >
          {(state) => (
            <DynamicBreadcrumbs
              minLength={minLength}
              maxLength={maxLength}
              collapsible={collapsible}
              breadcrumbs={breadcrumbs}
              style={transitionStyles[state]}
            />
          )}
        </Transition>
      </SwitchTransition>
      {/* Provide stable, but visually hidden crumb list for screen readers */}
      <CrumbList
        ariaOnly
        breadcrumbs={breadcrumbs}
        maxLength={Infinity}
      />
    </Nav>
  )
}
