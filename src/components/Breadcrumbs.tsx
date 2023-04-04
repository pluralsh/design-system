import React, {
  type Key,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { Div, Flex, FlexProps } from 'honorable'
import styled from 'styled-components'
import classNames from 'classnames'

import useResizeObserver from '../hooks/useResizeObserver'

import { Select } from './Select'
import { ListBoxItem } from './ListBoxItem'
import { useNavigationContext } from './contexts/NavigationContext'

export type Breadcrumb = {
  url?: string
  label?: ReactNode
  text?: string
  key?: Key
}

function isKey(maybeKey: unknown): maybeKey is Key {
  return (
    (maybeKey && typeof maybeKey === 'string') ||
    (typeof maybeKey === 'number' && !Number.isNaN(maybeKey))
  )
}

type BreadcrumbsContextT = {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (crumbs: Breadcrumb[]) => void
}

const BreadcrumbsContext = React.createContext<BreadcrumbsContextT | null>(null)

export function BreadcrumbProvider({ children }: PropsWithChildren) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  )
}

export function useBreadcrumbs() {
  const ctx = useContext(BreadcrumbsContext)

  if (!ctx) {
    throw Error('useBreadcrumbs() must be used inside a <BreadcrumbProvider>')
  }

  return ctx
}

export function useSetBreadcrumbs(breadcrumbs?: Breadcrumb[]) {
  const ctx = useContext(BreadcrumbsContext)
  const { setBreadcrumbs } = ctx

  useEffect(() => {
    if (setBreadcrumbs && Array.isArray(breadcrumbs)) {
      setBreadcrumbs(breadcrumbs)
    }
  }, [breadcrumbs, setBreadcrumbs])

  if (!ctx) {
    throw Error(
      'useSetBreadcrumbs() must be used inside a <BreadcrumbProvider>'
    )
  }

  return ctx
}

function getCrumbKey(crumb: Breadcrumb) {
  const maybeKey = crumb?.key

  return isKey(maybeKey)
    ? maybeKey
    : `${typeof crumb.label === 'string' ? crumb.label : crumb.text}-${
        crumb.url
      }`
}

const CrumbSeparator = styled(({ className }: { className?: string }) => (
  <div className={className}>/</div>
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
  const label = crumb.label ?? crumb.text
  const { Link } = useNavigationContext()

  return (
    <CrumbLinkWrap>
      <CrumbLinkText className={classNames({ isLast })}>
        {isLast || typeof crumb.url !== 'string' ? (
          label
        ) : (
          <Link href={crumb.url}>{label}</Link>
        )}
      </CrumbLinkText>
      {!isLast && <CrumbSeparator />}
    </CrumbLinkWrap>
  )
}

const CrumbLinkWrap = styled.div(({ theme }) => ({
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
    '&:hover': {
      color: theme.colors.text,
      textDecoration: 'underline',
    },
  },
}))

const CrumbSelectTriggerUnstyled = forwardRef<any, any>(
  ({ className, ...props }: { className?: string }, ref) => (
    <div className={className} ref={ref} {...props}>
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
        selectedKey={0}
        onSelectionChange={key => {
          const url = breadcrumbs[key as number]?.url

          if (url) {
            navigate(url)
          }
        }}
        placement="left"
        triggerButton={<CrumbSelectTrigger />}
        width="200px"
      >
        {breadcrumbs.map((crumb, i) => (
          <ListBoxItem
            key={i}
            label={crumb.label || crumb.text}
            textValue={
              crumb.text
                ? crumb.text
                : typeof crumb.label === 'string'
                ? crumb.label
                : undefined
            }
          />
        ))}
      </Select>
      {!isLast && <CrumbSeparator />}
    </CrumbLinkWrap>
  )
}

function TruncatedCrumbListRef(
  {
    breadcrumbs,
    maxLen,
    visibleListId,
    ...props
  }: {
    breadcrumbs: Breadcrumb[]
    maxLen: number
    visibleListId: string
  } & FlexProps,
  ref: MutableRefObject<HTMLDivElement>
) {
  const id = useId()

  if (breadcrumbs?.length < 1) {
    return null
  }
  maxLen = Math.min(maxLen, breadcrumbs.length)
  const hidden = visibleListId !== id

  const head = maxLen > 1 ? [breadcrumbs[0]] : []
  const middle = breadcrumbs.slice(head.length, breadcrumbs.length - maxLen + 1)
  const tail = breadcrumbs.slice(
    breadcrumbs.length - maxLen + 1,
    breadcrumbs.length
  )

  return (
    <Flex
      id={id}
      ref={ref}
      {...(hidden
        ? { height: 0, overflow: 'hidden', 'aria-visible': 'false' }
        : {})}
      className="crumbList"
      direction="row"
      gap="small"
      maxWidth="max-content"
      {...props}
    >
      {head.map(headCrumb => (
        <CrumbLink
          key={getCrumbKey(headCrumb)}
          crumb={headCrumb}
          isLast={tail.length === 0}
        />
      ))}
      {middle.length > 0 && (
        <CrumbSelect breadcrumbs={middle} isLast={tail.length === 0} />
      )}

      {tail.map((crumb, i) => (
        <CrumbLink
          key={getCrumbKey(crumb)}
          crumb={crumb}
          isLast={i === tail.length - 1}
        />
      ))}
    </Flex>
  )
}

const TruncatedCrumbList = forwardRef(TruncatedCrumbListRef)

export function Breadcrumbs(props: FlexProps) {
  const { breadcrumbs } = useBreadcrumbs()
  const wrapperRef = useRef<HTMLDivElement | undefined>()
  //   const listRefs = useRef<HTMLDivElement[]>([])
  const [visibleListId, setVisibleListId] = useState<string>('')

  const children = []

  //   listRefs.current = []

  for (let i = 1; i <= breadcrumbs.length; ++i) {
    children.push(
      <TruncatedCrumbList
        // ref={elt => {
        //   listRefs.current[i] = elt
        // }}
        key={i}
        breadcrumbs={breadcrumbs}
        maxLen={i}
        visibleListId={visibleListId}
      />
    )
  }

  const onResize = useCallback((wrapperWidth: number) => {
    console.log('resized')
    const lists = Array.from(
      wrapperRef?.current?.getElementsByClassName('crumbList')
    )

    const { id } = lists.reduce(
      (prev, next) => {
        const prevWidth = prev.width ?? 0
        const nextWidth = next?.getBoundingClientRect?.()?.width

        if (nextWidth > prevWidth && nextWidth < wrapperWidth) {
          return { width: nextWidth, id: next.id }
        }

        return prev
      },
      { width: 0, id: '' }
    )

    console.log('index', id + 1)

    setVisibleListId(id)
  }, [])

  useEffect(() => {
    const wrapperWidth =
      wrapperRef?.current?.getBoundingClientRect?.()?.width || 0

    onResize(wrapperWidth)
  }, [breadcrumbs, onResize])

  useResizeObserver(wrapperRef, rect => {
    onResize(rect.width)
  })

  return (
    <Div {...props}>
      <Flex direction="column" ref={wrapperRef} overflow="hidden">
        {children}
      </Flex>
    </Div>
  )
}
