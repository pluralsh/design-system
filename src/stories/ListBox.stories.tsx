import { Div, Flex } from 'honorable'
import { useState } from 'react'

import {
  Chip,
  IconFrame,
  ListBox,
  ListBoxFooter,
  ListBoxFooterAdd,
  ListBoxItem,
  ListBoxItemChipList,
  PersonIcon,
} from '../index'

export default {
  title: 'List Box',
  component: ListBox,
}

const portrait = (
  <IconFrame
    spacing="none"
    size="xsmall"
    url="photo.png"
  />
)
const smallIcon = <PersonIcon size={16} />

const chipProps = {
  size: 'small',
}
const chips = (
  <ListBoxItemChipList
    chips={[
      <Chip
        severity="success"
        {...chipProps}
      >
        Installed
      </Chip>,
      <Chip
        severity="neutral"
        {...chipProps}
      >
        Warm
      </Chip>,
      <Chip
        severity="neutral"
        {...chipProps}
      >
        Latest
      </Chip>,
      <Chip
        severity="neutral"
        {...chipProps}
      >
        Additional
      </Chip>,
      <Chip
        severity="neutral"
        {...chipProps}
      >
        Extra
      </Chip>,
      <Chip
        severity="neutral"
        {...chipProps}
      >
        More
      </Chip>,
    ]}
  />
)

const items = [
  {
    key: 'ratatouille',
    label: 'Ratatouille',
    description: 'With ham and cheese',
  },
  {
    key: 'pizza',
    label: 'Pizza',
    description: 'With ham and cheese',
  },
  {
    key: 'sushi',
    label: 'Sushi',
    description: 'With ham and cheese',
  },
  {
    key: 'couscous',
    label: 'Couscous',
    description: 'With ham and cheese',
  },
  {
    key: 'dim-sum',
    label: 'Dim Sum',
    description: 'With ham and cheese',
  },
  {
    key: 'ratatouille2',
    label: 'Ratatouille',
    description: 'With ham and cheese',
  },
  {
    key: 'pizza2',
    label: 'Pizza',
    description: 'With ham and cheese',
  },
  {
    key: 'sushi2',
    label: 'Sushi',
    description: 'With ham and cheese',
  },
  {
    key: 'couscous2',
    label: 'Couscous',
    description: 'With ham and cheese',
  },
  {
    key: 'dim-sum2',
    label: 'Dim Sum',
    description: 'With ham and cheese',
  },
]

function Template() {
  const [selectedKey, setSelectedKey] = useState<string>()

  return (
    <Flex
      flexDirection="column"
      gap="large"
    >
      <Div maxWidth={512}>
        <ListBox
          selectedKey={selectedKey}
          onSelectionChange={key => {
            setSelectedKey(key)
          }}
          extendStyle={{
            width: 'max-content',
          }}
        >
          {items.slice(0, 4).map(({ key, label }) => (
            <ListBoxItem
              key={key}
              label={label}
              leftContent={smallIcon}
              reserveSelectedIndicatorSpace
            />
          ))}
        </ListBox>
      </Div>
      <Div
        display="flex"
        flexDirection="column"
        maxWidth={512}
        maxHeight={200}
        overflow="hidden"
      >
        <ListBox
          selectedKey={selectedKey}
          onSelectionChange={key => {
            setSelectedKey(key)
          }}
          bottomContent={(
            <ListBoxFooter onClick={() => alert('You clicked the footer')}>
              Footer - Default
            </ListBoxFooter>
          )}
        >
          {items.map(({ key, label, description }) => (
            <ListBoxItem
              key={key}
              label={label}
              description={description}
              leftContent={portrait}
            />
          ))}
        </ListBox>
      </Div>

      <Div
        display="flex"
        flexDirection="column"
        maxWidth={512}
        maxHeight={200}
        overflow="hidden"
      >
        <ListBox
          selectedKey={selectedKey}
          onSelectionChange={key => {
            setSelectedKey(key)
          }}
          bottomContent={(
            <ListBoxFooterAdd onClick={() => alert('You clicked the footer')}>
              Footer - Add
            </ListBoxFooterAdd>
          )}
        >
          {items.map(({ key, label, description }) => (
            <ListBoxItem
              key={key}
              label={label}
              description={description}
              rightContent={chips}
              leftContent={portrait}
            />
          ))}
        </ListBox>
      </Div>
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {}
