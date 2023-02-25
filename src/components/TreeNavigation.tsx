import {
  Children,
  PropsWithChildren,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type {
  ComponentProps,
  Key,
  MutableRefObject,
  ReactElement,
} from 'react'

// import NextLink from 'next/link'
// import { useRouter } from 'next/router'

import classNames from 'classnames'
import { animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'
import styled, { useTheme } from 'styled-components'

import { Div } from 'honorable'

import {
  ArrowRightIcon,
  CaretRightIcon,
  Tab,
  useNavigationContext,
  usePrevious,
} from '../index'

import { TAB_INDICATOR_THICKNESS } from './Tab'

export function removeTrailingSlashes(str?: unknown) {
  if (typeof str !== 'string') {
    return str
  }

  return str.replace(/\/+$/, '')
}

export type SideNavProps = {
  //   navData: NavMenu
  desktop: boolean
  padTop?: boolean
  hide?: boolean
  menuId?: Key
  //   setMenuId: Dispatch<SetStateAction<MenuId>>
}

const NavContext = createContext<{
  optimisticPathname: null | string
  scrollRef: MutableRefObject<HTMLDivElement | null>
  desktop: boolean
}>({
  optimisticPathname: null,
  scrollRef: { current: null },
  desktop: false,
})

const NavDepthContext = createContext<number>(0)

const KeyboardNavContext = createContext<{
  keyboardNavigable: boolean
}>({
  keyboardNavigable: true,
})

const StyledLink = styled.a<{ $desktop: boolean }>(({ $desktop, theme }) => ({
  display: 'flex',
  gap: theme.spacing.small,
  cursor: 'pointer',
  flexGrow: 1,
  flexShrink: 1,
  margin: 0,
  padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
  ...theme.partials.text.body2,
  textDecoration: 'none',
  color: theme.colors['text-light'],
  '.iconRight': {
    display: 'flex',
    justifyContent: 'right',
    flexGrow: 1,
  },
  '&:hover': {
    color: theme.colors.text,
  },
  '&:focus, &:focus-visible': {
    outline: 'none',
    boxShadow: 'none',
  },
  '&:focus-visible::after': {
    borderStartStartRadius: theme.borderRadiuses.medium,
    borderEndStartRadius: theme.borderRadiuses.medium,
    borderStartEndRadius: $desktop ? 0 : theme.borderRadiuses.medium,
    borderEndEndRadius: $desktop ? 0 : theme.borderRadiuses.medium,
    ...theme.partials.focus.insetAbsolute,
  },
}))

// type LinkBaseProps = Partial<ComponentProps<typeof StyledLink>> & {
//   iconLeft?: ReactElement
//   iconRight?: ReactElement
// }

// const LinkBase = forwardRef<HTMLAnchorElement, LinkBaseProps>(({
//   className, children, iconLeft, iconRight, href, ...props
// }, ref) => {
//   const { keyboardNavigable } = useContext(KeyboardNavContext)

//   return (
//     <StyledLink
//       href={href}
//       className={className}
//       tabIndex={keyboardNavigable ? 0 : -1}
//       ref={ref}
//       {...props}
//     >
//       {iconLeft && iconLeft}
//       {children}
//       <div className="iconRight">{iconRight && iconRight}</div>
//     </StyledLink>
//   )
// })

const CaretButton = styled(({
  isOpen = false,
  className,
  ...props
}: {
    isOpen: boolean
    className?: string
  } & ComponentProps<'button'>) => {
  const { keyboardNavigable } = useContext(KeyboardNavContext)
  const [showHoverState, setShowHoverState] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const wasOpen = usePrevious(isOpen)

  useEffect(() => {
    if (wasOpen !== isOpen) {
      if (isHovered) setShowHoverState(false)
    }
  }, [wasOpen, isOpen, isHovered])

  return (
    <button
      tabIndex={keyboardNavigable ? 0 : -1}
      type="button"
      className={classNames(className, { showHoverState })}
      aria-label={isOpen ? 'Collapse' : 'Expand'}
      onMouseEnter={() => {
        setShowHoverState(true)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setShowHoverState(true)
        setIsHovered(false)
      }}
      {...props}
    >
      <CaretRightIcon className="icon" />
    </button>
  )
})(({ theme, isOpen }) => ({
  ...theme.partials.reset.button,
  display: 'flex',
  alignSelf: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'center',
  paddingRight: theme.spacing.medium,
  paddingLeft: theme.spacing.medium,
  marginRight: -(TAB_INDICATOR_THICKNESS),
  cursor: 'pointer',
  color: theme.colors['text-light'],
  transition: 'color 0.1s ease',
  position: 'relative',
  '&:focus-visible::before': {
    ...theme.partials.focus.insetAbsolute,
    borderRadius: theme.borderRadiuses.medium,
    top: theme.spacing.xsmall,
    left: theme.spacing.xsmall,
    right: theme.spacing.xsmall,
    bottom: theme.spacing.xsmall,
  },
  '.icon': {
    transform: `rotate(${isOpen ? 90 : 0}deg)`,
    transition: 'all 0.175s cubic-bezier(.31,1.49,.64,1)',
  },
  '&.showHoverState:hover .icon': {
    transform: isOpen ? 'rotate(-45deg)' : 'rotate(45deg)',
    transitionDuration: '0.2s',
  },

}))

function NavLinkUnstyled({
  className,
  isSubSection = false,
  isOpen = false,
  childIsSelected = false,
  onOpenChange,
  icon,
  isSelected,
  children,
  ...props
}: {
  isSubSection?: boolean
  isOpen?: boolean
  childIsSelected: boolean
  icon?: ReactElement
  desktop: boolean
  isSelected: boolean
  onOpenChange?: () => void
} & Partial<ComponentProps<typeof StyledLink>>) {
  const { Link } = useNavigationContext()
  const depth = useContext(NavDepthContext)
  const theme = useTheme()

  // TODO: Figure out 'childIsSelected' styling for Tabs
  return (
    <li className={className}>
      <Tab
        active={isSelected}
        activeChildren={childIsSelected}
        vertical
        iconLeft={icon}
        onClick={onOpenChange}
        width="100%"
        innerProps={{
          display: 'flex',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          // justifyContent: 'space-between',
        }}
        {...(props.to ? { as: Link } : {})}
        {...props}
      >
        <Div
          flexGrow={1}
          paddingTop={theme.spacing.xsmall}
          paddingBottom={theme.spacing.xsmall}
          paddingLeft={(depth + 1) * theme.spacing.medium}
          paddingRight={isSubSection ? 0 : theme.spacing.medium}
        >
          {children}
        </Div>
        {isSubSection && (
          <CaretButton
            isOpen={isOpen}
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              onOpenChange()
            }}
          />
        )}
      </Tab>
    </li>
  )
}

const NavLink = styled(NavLinkUnstyled)(({ desktop, theme }) => ({
  margin: 0,
  padding: 0,
  listStyle: 'none',
}))

export const TopHeading = styled.h6(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing.medium,
  paddingTop: theme.spacing.xsmall,
  paddingBottom: theme.spacing.xsmall,
  ...theme.partials.marketingText.label,
}))

const SubSectionsListWrap = styled.ul<{ indentLevel: number }>(({ theme, indentLevel }) => ({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  ...(indentLevel
    ? {
      paddingLeft:
            indentLevel >= 2 ? theme.spacing.xsmall : theme.spacing.medium,
    }
    : {}),
}))

function SubSectionsListRef({ className, children, ...props }: PropsWithChildren<{ className?: string }>,
  ref: MutableRefObject<any>) {
  const navDepth = useContext(NavDepthContext)

  return (
    <SubSectionsListWrap
      indentLevel={navDepth}
      ref={ref}
      className={className}
      {...props}
    >
      <NavDepthContext.Provider value={navDepth + 1}>
        {children}
      </NavDepthContext.Provider>
    </SubSectionsListWrap>
  )
}

export const SubSectionsList = forwardRef(SubSectionsListRef)

export function TreeNavEntry({
  href,
  icon,
  defaultOpen = false,
  toMenu,
  onOpenChange,
  label,
  // isSelected = false,
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof NavLink>> & {
  indentLevel?: number
  defaultOpen?: boolean
  loading?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen)
    onOpenChange?.(!isOpen)
  }, [isOpen, onOpenChange])
  const [measureRef, { height }] = useMeasure()
  const prevHeight = usePrevious(height)

  const expand = useSpring({
    height: isOpen ? `${height}px` : '0px',
    immediate: !prevHeight,
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
  })

  const contextValue = useMemo(() => ({ keyboardNavigable: isOpen }), [isOpen])
  const { desktop } = useContext(NavContext)

  const hasSections = children && Children.count(children) > 0

  console.log(label, 'has sections', hasSections)
  console.log('children', children)
  console.log('children', Children.count(children))

  return (
    <>
      <NavLink
        isSubSection={hasSections}
        href={href}
        icon={icon}
        desktop={desktop}
        isOpen={isOpen && hasSections}
        childIsSelected={defaultOpen}
        onOpenChange={toggleOpen}
        toMenu={toMenu}
        {...props}
      >
        {label}
      </NavLink>
      {Children.count(children) > 0 && (
        <animated.div
          className="sturf"
          style={{
            ...(prevHeight ? expand : { height: isOpen ? 'auto' : '0' }),
            overflow: 'hidden',
          }}
        >
          <KeyboardNavContext.Provider value={contextValue}>
            <SubSectionsList
              ref={measureRef as unknown as MutableRefObject<any>}
            >
              {children}
            </SubSectionsList>
          </KeyboardNavContext.Provider>
        </animated.div>
      )}
    </>
  )
}
// const navLeftOffset = 1000

export const NavPositionWrapper = styled.nav(({ theme: _theme }) => ({
  position: 'sticky',
  height: 'calc(100vh - var(--top-nav-height))',
  top: 'var(--top-nav-height)',
  display: 'flex',
  flexDirection: 'column',
}))

// const NavScrollContainer = styled.div<{
//   $desktop: boolean
//   $padTop: boolean
//   $hide: boolean
// }>(({
//   $desktop: desktop, $padTop: padTop, $hide: hide = false, theme,
// }) => ({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   overflowY: 'auto',
//   backgroundColor: theme.colors['fill-one'],
//   borderRight: desktop ? theme.borders['fill-one'] : 'none',
//   paddingBottom: `calc(${theme.spacing.xlarge}px + var(--menu-extra-bpad))`,
//   paddingTop: padTop ? theme.spacing.large : 0,
//   paddingRight: desktop ? 0 : theme.spacing.medium,
//   paddingLeft: desktop ? 0 : theme.spacing.medium,
//   marginLeft: desktop ? -navLeftOffset : 0,
//   display: hide ? 'none' : 'block',
// }))

// const Nav = styled.nav<{ $desktop: boolean }>(({ $desktop: desktop, theme: _theme }) => ({
//   marginLeft: desktop ? navLeftOffset : 0,
// }))

// export function SideNav({
//   navData,
//   desktop,
//   padTop = true,
//   hide = false,
//   menuId = '',
//   setMenuId,
// }: SideNavProps) {
//   const router = useRouter()
//   const [optimisticPathname, setOptimisticPathname] = useState<string | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)
//   const contextValue = useMemo(() => ({
//     scrollRef,
//     desktop,
//     setMenuId,
//     // optimisticPathname:
//     //     optimisticPathname === null
//     //       ? getBarePathFromPath(router.asPath)
//     //       : optimisticPathname,
//   }),
//   [desktop, setMenuId, optimisticPathname, router.asPath])

//   useEffect(() => {
//     if (!router?.events?.on) {
//       return
//     }
//     const handleRouteChangeStart = url => {
//       setOptimisticPathname(url)
//     }
//     const handleRouteChangeComplete = _url => {
//       setOptimisticPathname(null)
//     }
//     const handleRouteChangeError = (_err, _url) => {
//       setOptimisticPathname(null)
//     }
//     const handleHashChangeStart = _url => {
//       console.debug('hashChangeStart', _url)
//     }
//     const handleHashChangeComplete = _url => {
//       console.debug('handleHashChangeComplete', _url)
//     }

//     router.events.on('routeChangeStart', handleRouteChangeStart)
//     router.events.on('routeChangeComplete', handleRouteChangeComplete)
//     router.events.on('routeChangeError', handleRouteChangeError)
//     router.events.on('hashChangeStart', handleHashChangeStart)
//     router.events.on('hashChangeComplete', handleHashChangeComplete)

//     return () => {
//       router.events.off('routeChangeStart', handleRouteChangeStart)
//       router.events.off('routeChangeComplete', handleRouteChangeComplete)
//       router.events.off('routeChangeError', handleRouteChangeError)
//     }
//   }, [router.events])

//   return (
//     <NavContext.Provider value={contextValue}>
//       <NavScrollContainer
//         key={menuId}
//         ref={scrollRef}
//         $desktop={desktop}
//         $padTop={padTop}
//         $hide={hide}
//       >
//         <Nav $desktop={desktop}>
//           {(navData || []).map(({ title, sections }) => (
//             <TopSection
//               title={title}
//               key={title}
//             >
//               {sections && <SubSectionsList sections={sections} />}
//             </TopSection>
//           ))}
//         </Nav>
//       </NavScrollContainer>
//     </NavContext.Provider>
//   )
// }

export function TreeNav({ children }: PropsWithChildren) {
  // const clonedChildren = Children.toArray(children).map(c => c)

  return (
    <NavDepthContext.Provider value={0}>
      <div role="navigation">{children}</div>
    </NavDepthContext.Provider>
  )
}
