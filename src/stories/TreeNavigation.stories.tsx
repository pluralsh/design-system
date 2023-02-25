import { Div } from 'honorable'
import { useEffect, useState } from 'react'

import { TreeNav, TreeNavEntry } from '../components/TreeNavigation'

import { NavigationContextProvider } from '../components/contexts/NavigationContext'

import * as navContextStub from './NavigationContextStub'

export default {
  title: 'Tree Navigation',
  component: TreeNav,
  argTypes: {},
}

const getDirectory = () => [
  { path: 'dashboards', label: 'Dashboards', enabled: true },
  { path: 'runbooks', label: 'Runbooks', enabled: true },
  {
    path: 'components',
    label: 'Components',
    enabled: true,
  },
  { path: 'logs', label: 'Logs', enabled: true },
  { path: 'cost', label: 'Cost analysis', enabled: true },
  { path: 'oidc', label: 'User management', enabled: true },
  {
    path: 'config',
    label: 'Configuration',
    enabled: true,
  },
  {
    path: 'docs',
    label: 'Airbyte docs',
    enabled: true,
    subpaths: [
      {
        path: 'page1',
        label: 'Page 1',
      },
      {
        path: 'page2',
        label: 'Page 2',
      },
      {
        path: 'page3',
        label: 'Page 3',
      },
      {
        path: 'page4',
        label: 'Page 4',
      },
    ],
  },
]

async function loadSubpathsOf(path: string) {
  if (path.startsWith('docs')) {
    await new Promise(resolve => {
      setTimeout(resolve, 2000)
    })

    return (
      [
        {
          'docs/page1': [
            { label: 'A longer title' },
            { label: 'Short one' },
            { label: 'A yet even longer title' },
          ],
          'docs/page2': [
            { label: 'A longer title' },
            { label: 'Short one' },
            { label: 'A yet even longer title' },
          ],
          'docs/page3': [
            { label: 'A longer title' },
            { label: 'Short one' },
            { label: 'A yet even longer title' },
          ],
          'docs/page4': [
            { label: 'A longer title' },
            { label: 'Short one' },
            { label: 'A yet even longer title' },
          ],
        },
      ][path] || null
    )
  }

  return null
}

function Template() {
  const [currentPath, setCurrentPath] = useState('/')
  const [loadingSubpaths, setLoadingSubpaths] = useState(false)
  const [subpaths, setSubpaths] = useState<any[] | null | undefined>()

  useEffect(() => {
    console.log('useEffect')
    let isSubscribed = true

    loadSubpathsOf(currentPath).then(subpaths => {
      if (isSubscribed) {
        setSubpaths(subpaths)
      }
    })

    setLoadingSubpaths(true)

    return () => {
      isSubscribed = false
    }
  }, [currentPath])

  return (
    <NavigationContextProvider value={navContextStub}>
      <Div maxWidth={200}>
        <TreeNav>
          {getDirectory().map(entry => {
            const isCurrentPath = currentPath.startsWith(entry.path)
            const isExactCurrentPath = currentPath === entry.path

            return (
              <TreeNavEntry
                key={entry.path}
                label={entry.label}
                onClick={() => setCurrentPath(entry.path)}
                defaultOpen={isCurrentPath}
                isSelected={isExactCurrentPath}
              >
                {entry.subpaths?.map(entry => {
                  const isCurrentPath = currentPath.startsWith(entry.path)

                  return (
                    <TreeNavEntry
                      key={entry.path}
                      label={entry.label}
                      loading={isCurrentPath && loadingSubpaths}
                      onClick={() => setCurrentPath(entry.path)}
                    // defaultOpen={isCurrentPath}
                    >
                      {isCurrentPath
                    && subpaths?.map(entry => (
                      <TreeNavEntry
                        key={entry.path}
                        label={entry.label}
                        onClick={() => setCurrentPath(entry.path)}
                      />
                    ))}
                    </TreeNavEntry>
                  )
                })}
              </TreeNavEntry>
            )
          })}
        </TreeNav>
      </Div>
    </NavigationContextProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}
