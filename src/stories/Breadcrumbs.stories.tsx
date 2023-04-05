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
    text: 'Root level',
  },
  {
    url: 'http://stuff.com/link1/link2',
    label: <Span>Level 2</Span>,
    text: 'One step up ',
  },
  {
    url: 'http://stuff.com/link1/link2/link3',
    label: 'Another',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4',
    label: (
      <>
        Yet <i>another</i> level
      </>
    ),
    text: 'Yet another level',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4/link5',
    text: 'Are well still going?',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4/link5',
    label: (
      <>
        You <b>bet</b> we are!
      </>
    ),
    text: 'You bet we are',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4/link5/link6',
    text: 'This is getting out of hand',
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
        <Flex
          flexDirection="column"
          gap="large"
        >
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
