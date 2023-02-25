import { LinkProps } from '../components/contexts/NavigationContext'

export function Link({ children, ...props }: LinkProps) {
  return <a {...props}>{children}</a>
}

export function usePathname() {
  return ''
}

export function useNavigate(path:string) {
  console.info(`Navigate to ${path}`)
}
