import { Button, Div, Flex } from 'honorable'
import { Key, useState } from 'react'
import styled from 'styled-components'

import {
  CheckIcon,
  Chip,
  DropdownArrowIcon,
  IconFrame,
  InfoIcon,
  ListBoxFooterAdd,
  ListBoxItem,
  ListBoxItemChipList,
  PersonIcon,
  SearchIcon,
  Select,
  SelectButton,
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
const chips = [
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
    severity="warning"
    {...chipProps}
  >
    Additional
  </Chip>,
  <Chip
    severity="error"
    {...chipProps}
  >
    Extra
  </Chip>,
  <Chip
    severity="info"
    {...chipProps}
  >
    More
  </Chip>,
]

const items = [
  {
    key: 'ratatouille',
    label: 'Ratatouille',
    description: 'With ham and cheese',
    chips: chips.slice(0, 1),
  },
  {
    key: 'pizza',
    label: 'Pizza',
    description: 'With ham and cheese',
    chips: chips.slice(1, 3),
  },
  {
    key: 'sushi',
    label: 'Sushi',
    description: 'With ham and cheese',
    chips: null,
  },
  {
    key: 'couscous',
    label: 'Couscous',
    description: 'With ham and cheese',
    chips: chips.slice(4),
  },
  {
    key: 'dim-sum',
    label: 'Dim Sum',
    description: 'With ham and cheese',
    chips: chips.slice(4, 5),
  },
  {
    key: 'ratatouille2',
    label: 'Ratatouille',
    description: 'With ham and cheese',
    chips: [chips[0], chips[3], chips[6]],
  },
  {
    key: 'pizza2',
    label: 'Pizza',
    description: 'With ham and cheese',
    chips: [chips[5], chips[0]],
  },
  {
    key: 'sushi2',
    label: 'Sushi',
    description: 'With ham and cheese',
    chips: chips.slice(0),
  },
  {
    key: 'couscous2',
    label: 'Couscous',
    description: 'With ham and cheese',
    chips: chips.slice(0).reverse(),
  },
  {
    key: 'dim-sum2',
    label: 'Dim Sum',
    description: 'With ham and cheese',
    chips: chips.slice(5).reverse(),
  },
]

const CustomTriggerButton = styled((props: {isOpen?: boolean}) => (
  <Button
    medium
    primary
    endIcon={<DropdownArrowIcon className="dropdownIcon" />}
    {...props}
  >
    Click me!
  </Button>
))(({ isOpen }) => ({
  '.dropdownIcon': {
    transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
    transition: 'transform 0.1s ease',
  },
}))

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
          leftContent={<SearchIcon />}
          rightContent={<ListBoxItemChipList chips={curItem?.chips} />}
          dropdownBottomContent={
            <ListBoxFooterAdd>Create new</ListBoxFooterAdd>
          }
        >
          {items.map(({
            key, label, description, chips,
          }) => (
            <ListBoxItem
              key={key}
              label={label}
              description={description}
              rightContent={<ListBoxItemChipList chips={chips} />}
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
          dropdownBottomContent={
            <ListBoxFooterAdd>Create new</ListBoxFooterAdd>
          }
          triggerButton={(
            <SelectButton leftContent={curItem ? <CheckIcon /> : <InfoIcon />}>
              {customLabel}
            </SelectButton>
          )}
        >
          {items.map(({
            key, label, description, chips,
          }) => (
            <ListBoxItem
              key={key}
              label={label}
              description={description}
              rightContent={<ListBoxItemChipList chips={chips} />}
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
          triggerButton={<CustomTriggerButton />}
          dropdownBottomContent={
            <ListBoxFooterAdd>Create new</ListBoxFooterAdd>
          }
        >
          {items.map(({
            key, label, description, chips,
          }) => (
            <ListBoxItem
              key={key}
              label={label}
              description={description}
              rightContent={<ListBoxItemChipList chips={chips} />}
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
