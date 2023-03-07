import styled from 'styled-components'
import {
  Dispatch,
  ReactNode,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import IsEmpty from 'lodash/isEmpty'

import { MoreIcon, SearchIcon } from '../icons'
import {
  AppIcon,
  Button,
  Card,
  CardProps,
  Input,
  ListBoxItem,
  Select,
} from '../index'

import { useWindowSize } from './wizard/hooks'

const AppList = styled(AppListUnstyled)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.medium,
  isolation: 'isolate',

  '.app-grid': {
    display: 'grid',
    rowGap: theme.spacing.medium,
    padding: theme.spacing.xxxsmall,
    minHeight: '200px',
    maxHeight: '100%',
    overflow: 'auto',

    '.promoted:not(:has(~ .promoted))': {
      marginBottom: theme.spacing.medium,
    },

    '&.scrollable': {
      paddingRight: '8px',
    },

    '.empty': {
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
      flexDirection: 'column',
      gap: theme.spacing.small,

      '.empty-message': {
        ...(theme.partials.text.body2),
        color: theme.colors['text-light'],
      },
    },
  },
}))

interface AppListProps {
  apps: Array<AppProps>
  onFilter?: Dispatch<string>
}

function AppListUnstyled({ apps, onFilter, ...props }: AppListProps): JSX.Element {
  const size = useWindowSize()
  const scrollRef = createRef<HTMLDivElement>()

  const [filter, setFilter] = useState<string>()
  const [scrollable, setScrollable] = useState(false)

  const isScrollbarVisible = (el: HTMLDivElement) => el?.scrollHeight > el?.clientHeight
  const sortByPromoted = useCallback((app: AppProps) => (app.promoted ? -1 : 1), [])
  const filterByName = useCallback((app: AppProps) => (filter ? app.name.toLowerCase().includes(filter?.toLowerCase()) : true), [filter])

  const filteredApps = useMemo(() => (onFilter ? apps : apps.filter(filterByName)), [apps, filterByName, onFilter])

  useEffect(() => {
    if (!scrollRef.current) return

    setScrollable(isScrollbarVisible(scrollRef.current))
  }, [scrollRef, size])

  return (
    <div {...props}>
      <Input
        prefix={<SearchIcon />}
        placeholder="Filter applications"
        value={filter}
        onChange={({ target: { value } }) => setFilter(value)}
      />

      <div
        className={scrollable ? 'app-grid scrollable' : 'app-grid'}
        ref={scrollRef}
      >
        {filteredApps.sort(sortByPromoted).map(app => (
          <App
            key={app.name}
            className={app.promoted ? 'promoted' : undefined}
            promoted={app.promoted}
            name={app.name}
            description={app.description}
            logoUrl={app.logoUrl}
            icon={app.icon}
            primaryAction={app.primaryAction}
            actions={app.actions}
            {...app}
          />
        ))}

        {IsEmpty(filteredApps) && (
          <div className="empty">
            <span className="empty-message">No applications found for "{filter}".</span>
            <Button
              secondary
              onClick={() => setFilter('')}
            >Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

const App = styled(AppUnstyled)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.small,
  padding: theme.spacing.medium,
  maxHeight: '80px',

  '&.promoted': {
    position: 'relative',
    border: 'none !important',

    '&::after': {
      '--border-width': '1px',
      '--border-angle': '0deg',
      '--color-1': 'rgba(69, 73, 84, .8)',
      '--color-2': 'rgba(73, 79, 242, .8)',
      '--color-3': 'rgba(92, 119, 255, .8)',

      content: '""',
      position: 'absolute',
      top: 'calc(-1 * var(--border-width))',
      right: 'calc(-1 * var(--border-width))',
      bottom: 'calc(-1 * var(--border-width))',
      left: 'calc(-1 * var(--border-width))',

      backgroundImage: `conic-gradient(from var(--border-angle),
        var(--color-1) 0deg,
        var(--color-1) 1deg,
        var(--color-2), 
        var(--color-3),
        var(--color-1) 359deg)
      `,
      borderRadius: theme.borderRadiuses.large,
      boxShadow: theme.boxShadows.slight,

      zIndex: -1,
      animation: 'ease-border 4s infinite linear',
    },

    '@property --border-angle': {
      syntax: '"<angle>"',
      inherits: 'false',
      initialValue: '0deg',
    },

    '@keyframes ease-border': {
      '0%': { '--border-angle': '0deg' },
      '20%': { '--border-angle': '75deg' },
      '35%': { '--border-angle': '110deg' },
      '65%': { '--border-angle': '250deg' },
      '80%': { '--border-angle': '285deg' },
      '100%': { '--border-angle': '360deg' },
    },
  },

  '.text-container': {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    gap: theme.spacing.xxsmall,

    '& > .title': {
      ...theme.partials.text.body1Bold,
    },

    '& > .description': {
      ...theme.partials.text.body2,
      color: theme.colors['text-light'],
    },
  },

  '.primary-action': {
    display: 'flex',
    alignItems: 'center',
  },

  '.actions': {
    display: 'flex',
    alignItems: 'center',
  },
}))

type AppProps = {
  logoUrl?: string
  icon?: JSX.Element
  name: string
  description: string,
  primaryAction?: JSX.Element
  actions?: Array<AppMenuAction>
  promoted?: boolean
} & CardProps

interface AppMenuAction {
  label: string,
  onSelect: Dispatch<void>
  leftContent?: ReactNode
  rightContent?: ReactNode
}

function AppUnstyled({
  logoUrl, icon, name, description, primaryAction, actions, ...props
}: AppProps): JSX.Element {
  return (
    <Card {...props}>
      <AppIcon
        name={name}
        url={logoUrl}
        icon={icon}
        size="xsmall"
      />
      <div className="text-container">
        <div className="title">{name}</div>
        <div className="description">{description}</div>
      </div>

      {primaryAction && (
        <div className="primary-action">
          {primaryAction}
        </div>
      )}

      {actions && (
        <div className="actions">
          <Select
            aria-label="moreMenu"
            selectedKey={null}
            onSelectionChange={key => actions.find(action => action.label === key)?.onSelect()}
            width="max-content"
            maxHeight={197}
            triggerButton={(
              <Button
                secondary
                width={32}
                minHeight={32}
              ><MoreIcon />
              </Button>
            )}
          >
            {actions.map(action => (
              <ListBoxItem
                key={action.label}
                label={action.label}
                textValue={action.label}
                leftContent={action.leftContent}
                rightContent={action.rightContent}
              />
            ))}
          </Select>

        </div>
      )}
    </Card>
  )
}

export type { AppProps }
export { AppList }
