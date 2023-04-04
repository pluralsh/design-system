import { Div, Flex, Span } from 'honorable'

import {
  type Breadcrumb,
  BreadcrumbProvider,
  Breadcrumbs,
  useSetBreadcrumbs,
} from '../components/Breadcrumbs'

import { NavContextProviderStub } from './NavigationContextStub'

export default {
  title: 'Breadcrumbs',
  component: 'Breadcrumbs',
}

const crumbs: Breadcrumb[] = [
  {
    url: 'http://stuff.com/link1',
    text: 'Level 1',
  },
  {
    url: 'http://stuff.com/link1/link2',
    label: <Span>Level 2</Span>,
    text: 'Level 2',
  },
  {
    url: 'http://stuff.com/link1/link2/link3',
    label: 'Level 3',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4',
    label: (
      <>
        Level <b>4</b>
      </>
    ),
    text: 'Level 4',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4/link5',
    text: 'Level 5',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4/link5/link6',
    text: 'Level 6',
  },
]

function CrumbSetter() {
  useSetBreadcrumbs(crumbs)

  return <Div>Page Content</Div>
}

function Template() {
  return (
    <NavContextProviderStub>
      <BreadcrumbProvider>
        <Flex flexDirection="column" gap="large">
          {/* SINGLE SELECT */}
          <Breadcrumbs />
          <CrumbSetter />
        </Flex>
      </BreadcrumbProvider>
    </NavContextProviderStub>
  )
}

export const Default = Template.bind({})

Default.args = {}
