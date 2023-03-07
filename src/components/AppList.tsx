import styled from 'styled-components'

import { ArrowTopRightIcon, MoreIcon, SearchIcon } from '../icons'
import {
  AppIcon,
  Button,
  Card,
  Input,
  ListBoxItem,
  Select,
} from '../index'

const AppList = styled(AppListUnstyled)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.medium,
  isolation: 'isolate',

  '.app-grid': {
    display: 'grid',
    rowGap: theme.spacing.medium,
  },
}))

interface AppListProps {

}

function AppListUnstyled({ ...props }: AppListProps): JSX.Element {
  return (
    <div {...props}>
      <Input
        prefix={<SearchIcon />}
        placeholder="Filter applications"
      />

      <div className="app-grid">
        <App
          promoted
          name="Console"
          description="Manage your cluster and applications."
          logoUrl="logos/console-logo.png"
          primaryAction={(
            <Button
              minHeight={32}
              height={32}
            >
              <div style={{ marginRight: '8px' }}>Launch</div>
              <ArrowTopRightIcon />
            </Button>
          )}
          actions={(
            <ListBoxItem
              key="test"
              label="test"
              textValue="test"
              onSelect={() => console.log('hi')}
            />
          )}
        />

        <App
          name="Airbyte"
          description="v1.24"
          primaryAction={(
            <Button
              secondary
              minHeight={32}
              height={32}
            >
              <div style={{ marginRight: '8px' }}>Launch</div>
              <ArrowTopRightIcon />
            </Button>
          )}
          actions={(
            <ListBoxItem
              key="test"
              label="test"
              textValue="test"
              onSelect={() => console.log('hi')}
            />
          )}
        />
      </div>
    </div>
  )
}

const App = styled(AppUnstyled)(({ theme, promoted }) => ({
  display: 'flex',
  gap: theme.spacing.small,
  padding: theme.spacing.medium,

  ...(!!promoted && {
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
  }),

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

interface AppProps {
  logoUrl?: string
  name: string
  description: string,
  primaryAction?: JSX.Element
  actions?: Array<JSX.Element> | JSX.Element
  promoted?: boolean
}

function AppUnstyled({
  logoUrl, name, description, primaryAction, actions, ...props
}: AppProps): JSX.Element {
  return (
    <Card
      {...props}
    >
      {logoUrl && (
        <AppIcon
          url={logoUrl}
          size="xsmall"
        />
      )}
      {!logoUrl && (
        <AppIcon
          name={name}
          size="xsmall"
        />
      )}
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
            {actions}
          </Select>

        </div>
      )}
    </Card>
  )
}

export { AppList }
