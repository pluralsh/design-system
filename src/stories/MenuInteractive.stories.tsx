import { Div, Flex } from 'honorable'
import { useState } from 'react'

import {
  IconFrame, ListBox, ListBoxItem, PersonIcon,
} from '../index'

export default {
  title: 'Menu Interactive',
  component: ListBox,
}

const items = [
  {
    key: 'ratatouille',
    label: 'Ratatouille',
    heading: 'Ratatouille',
    subHeading: '',
    rightContent: '',
    leftContent: <PersonIcon size={16} />,
  },
  {
    key: 'pizza',
    label: 'Pizza',
    heading: 'Pizza',
    subHeading: 'With ham and cheese',
    rightContent: '',
    leftContent: '',
  },
  {
    key: 'sushi',
    label: 'Sushi',
    heading: 'Sushi',
    subHeading: 'With ham and cheese',
    rightContent: '',
    leftContent: <IconFrame
      spacing="none"
      size="xsmall"
      url="photo.png"
    />,
  },
  {
    key: 'couscous',
    label: 'Couscous',
    heading: 'Couscous',
    subHeading: 'With ham and cheese',
    rightContent: '',
    leftContent: '',
  },
  {
    key: 'dim-sum',
    label: 'Dim Sum',
    heading: 'Dim Sum',
    subHeading: 'With ham and cheese',
    rightContent: '',
    leftContent: '',
  },
  {
    key: 'ratatouille2',
    label: 'Ratatouille',
    heading: 'Ratatouille',
    subHeading: '',
    rightContent: '',
    leftContent: <PersonIcon size={16} />,
  },
  {
    key: 'pizza2',
    label: 'Pizza',
    heading: 'Pizza',
    subHeading: 'With ham and cheese',
    rightContent: '',
    leftContent: '',
  },
  {
    key: 'sushi2',
    label: 'Sushi',
    heading: 'Sushi',
    subHeading: 'With ham and cheese',
    rightContent: '',
    leftContent: <IconFrame
      spacing="none"
      size="xsmall"
      url="photo.png"
    />,
  },
  {
    key: 'couscous2',
    label: 'Couscous',
    heading: 'Couscous',
    subHeading: 'With ham and cheese',
    rightContent: '',
    leftContent: '',
  },
  {
    key: 'dim-sum2',
    label: 'Dim Sum',
    heading: 'Dim Sum',
    subHeading: 'With ham and cheese',
    rightContent: '',
    leftContent: '',
  },
]

function Template() {
  const [selectedKey, setSelectedKey] = useState<string>('sushi')

  return (
    <Flex
      flexDirection="column"
      gap="large"
    >
      <Div maxWidth={512}>
        <ListBox
          selectedKey={selectedKey}
          onSelectionChange={key => {
            console.log('keyz changed 2', key)
            setSelectedKey(key)
          }}
        >
          {items.slice(0, 4).map(({
            key, label, heading, subHeading, rightContent, leftContent,
          }) => (
            <ListBoxItem
              key={key}
              label={label}
              heading={heading}
              subHeading={subHeading}
              rightContent={rightContent}
              leftContent={leftContent}
            />
          ))}
        </ListBox>
      </Div>
      <Div
        maxWidth={512}
        maxHeight={400}
      >
        <ListBox
          selectedKey={selectedKey}
          onSelectionChange={key => {
            console.log('keyz changed 2', key)
            setSelectedKey(key)
          }}
        >
          {items.map(({
            key, label, heading, subHeading, rightContent, leftContent,
          }) => (
            <ListBoxItem
              key={key}
              label={label}
              heading={heading}
              subHeading={subHeading}
              rightContent={rightContent}
              leftContent={leftContent}
            />
          ))}
        </ListBox>
      </Div>
    </Flex>

  )
}

export const Default = Template.bind({})

Default.args = {}
