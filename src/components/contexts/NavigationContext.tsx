import {
  ComponentProps,
  ReactElement,
  createContext,
  useContext,
} from 'react'

export type LinkProps = Omit<ComponentProps<'a'>, 'ref'> & { ref?: any }

export type MarkdocContextT = {
  Link: (props: LinkProps) => ReactElement
  usePathname: (href?: string) => string
  useNavigate: (location?: string) => void
}

const MarkdocContext = createContext<MarkdocContextT | null>(null)

export function NavigationContextProvider({
  value,
  ...props
}: { value: MarkdocContextT } & Omit<
  ComponentProps<typeof MarkdocContext.Provider>,
  'value'
>) {
  return (
    <MarkdocContext.Provider
      value={value}
      {...props}
    />
  )
}

export function useNavigationContext() {
  const context = useContext(MarkdocContext)

  if (!context) {
    throw Error('You must wrap your content in a MarkdocContextProvider to use useMarkdocContext()')
  }

  return context
}
