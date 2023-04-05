import { Flex, Span } from 'honorable'

import { Key, useState } from 'react'

import {
  type Breadcrumb,
  BreadcrumbProvider,
  Breadcrumbs,
  useSetBreadcrumbs,
} from '../components/Breadcrumbs'

import { Select } from '../components/Select'
import { ListBoxItem } from '../components/ListBoxItem'

import { NavContextProviderStub } from './NavigationContextStub'

export default {
  title: 'Breadcrumbs',
  component: 'Breadcrumbs',
  argTypes: {
    maxLength: {},
  },
}

const crumbList: Breadcrumb[] = [
  {
    url: 'http://stuff.com/link1',
    label: 'Root level',
  },
  {
    url: 'http://stuff.com/link1/link2',
    label: <Span>Level 2</Span>,
    textValue: 'Level 2',
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
    textValue: 'Yet another level',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4/link5',
    label: 'Are well still going?',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4/link5',
    label: (
      <>
        You <b>bet</b> we are!
      </>
    ),
    textValue: 'You bet we are',
  },
  {
    url: 'http://stuff.com/link1/link2/link3/link4/link5/link6',
    label: 'This is getting out of hand',
  },
]

const crumbLists = crumbList.map((_, i) => crumbList.slice(0, i + 1))

function CrumbSetter() {
  const [selectedList, setSelectedList] = useState<Key>(
    String(crumbLists.length - 1)
  )

  useSetBreadcrumbs(crumbLists[selectedList])

  return (
    <Select
      label="Select a page"
      selectedKey={selectedList}
      onSelectionChange={(key) => setSelectedList(key)}
    >
      {crumbLists.map((crumbs, i) => {
        const lastCrumb = crumbs[crumbs.length - 1]

        return (
          <ListBoxItem
            key={i}
            textValue={lastCrumb.textValue}
            label={lastCrumb.label}
          />
        )
      })}
    </Select>
  )
}

function Template(args: any) {
  return (
    <NavContextProviderStub>
      <BreadcrumbProvider>
        <Flex
          flexDirection="column"
          gap="large"
        >
          {/* SINGLE SELECT */}
          <Breadcrumbs {...args} />
          <CrumbSetter />
        </Flex>
      </BreadcrumbProvider>
    </NavContextProviderStub>
  )
}

export const Default = Template.bind({})

Default.args = {
  minLength: undefined,
  maxLength: undefined,
  collapsible: true,
}
