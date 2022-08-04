import { Button, Div, Flex } from 'honorable'
import { Key, useState } from 'react'

import {
  CheckIcon,
  Chip,
  IconFrame,
  InfoIcon,
  ListBoxFooterAdd,
  ListBoxItem,
  ListBoxItemChipList,
  PersonIcon,
  SearchIcon, Select, SelectButton,
} from '../index'

export default {
  title: 'Select',
  component: 'Select',
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
  hue: 'lighter',
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
  const [selectedKey, setSelectedKey] = useState<Key>()

  const curItem = items.find(item => item.key === selectedKey)
  const customLabel = curItem
    ? `You have selected ${curItem.label}`
    : 'Select an item please'

  return (
    <Flex
      flexDirection="column"
      gap="large"
    >
      <Div maxWidth={512}>
        <Select
          defaultOpen={false}
          label="Pick something"
          selectedKey={selectedKey}
          onSelectionChange={key => {
            setSelectedKey(key)
          }}
        >
          {items.slice(0, 4).map(({ key, label }) => (
            <ListBoxItem
              key={key}
              label={label}
              leftContent={smallIcon}
            />
          ))}
        </Select>
      </Div>

      <Div maxWidth={512}>
        <Select
          label="Pick something"
          selectedKey={selectedKey}
          onSelectionChange={key => {
            setSelectedKey(key)
          }}
          defaultOpen={false}
          onLoadMore={() => true}
          leftContent={<SearchIcon />}
          rightContent={<PersonIcon />}
          dropdownBottomContent={
            <ListBoxFooterAdd>Create new</ListBoxFooterAdd>
          }
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
        </Select>
      </Div>

      <Div maxWidth={512}>
        <Select
          label="Pick something"
          selectedKey={selectedKey}
          onSelectionChange={key => {
            setSelectedKey(key)
          }}
          defaultOpen={false}
          onLoadMore={() => true}
          dropdownBottomContent={
            <ListBoxFooterAdd>Create new</ListBoxFooterAdd>
          }
          triggerButton={(
            <SelectButton
              leftContent={curItem ? <CheckIcon /> : <InfoIcon />}
            >
              {customLabel}
            </SelectButton>
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
        </Select>
      </Div>

      <Div maxWidth={512}>
        <Select
          label="Pick something"
          selectedKey={selectedKey}
          onSelectionChange={key => {
            setSelectedKey(key)
          }}
          triggerButton={(
            <Button
              medium
              primary
            >
              Click me!
            </Button>
          )}
          dropdownBottomContent={
            <ListBoxFooterAdd>Create new</ListBoxFooterAdd>
          }
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
        </Select>
      </Div>
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {}
