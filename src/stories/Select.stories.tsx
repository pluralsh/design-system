import { Div, Flex } from 'honorable'
import { Key, forwardRef, useState } from 'react'
import styled from 'styled-components'

import {
  Button,
  CheckIcon,
  Chip,
  DropdownArrowIcon,
  IconFrame,
  InfoIcon,
  ListBoxFooterPlus,
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
    Another
  </Chip>,
]

const items = [
  {
    key: 'ratatouille',
    label: 'Ratatouille',
    description: 'With ham and cheese',
    chips: chips.slice(0, 1),
    version: '0.2.24',
  },
  {
    key: 'pizza',
    label: 'Pizza',
    description: 'With ham and cheese',
    chips: chips.slice(1, 3),
    version: '0.2.25',
  },
  {
    key: 'sushi',
    label: 'Sushi',
    description: 'With ham and cheese',
    chips: null,
    version: '0.2.26',
  },
  {
    key: 'couscous',
    label: 'Couscous',
    description: 'With ham and cheese',
    chips: chips.slice(4),
    version: '0.3.00',
  },
  {
    key: 'dim-sum',
    label: 'Dim Sum',
    description: 'With ham and cheese',
    chips: chips.slice(4, 5),
    version: '0.3.01',
  },
  {
    key: 'ratatouille2',
    label: 'Ratatouille',
    description: 'With ham and cheese',
    chips: [chips[0], chips[3], chips[5]],
    version: '0.3.02',
  },
  {
    key: 'pizza2',
    label: 'Pizza',
    description: 'With ham and cheese',
    chips: [chips[5], chips[0]],
    version: '0.3.05',
  },
  {
    key: 'sushi2',
    label: 'Sushi',
    description: 'With ham and cheese',
    chips: chips.slice(0),
    version: '0.3.12',
  },
  {
    key: 'couscous2',
    label: 'Couscous',
    description: 'With ham and cheese',
    chips: chips.slice(0).reverse(),
    version: '0.4.00',
  },
  {
    key: 'dim-sum2',
    label: 'Dim Sum',
    description: 'With ham and cheese',
    chips: chips.slice(5).reverse(),
    version: '0.4.01',
  },
]

// Make sure any custom trigger button forwards ref to outermost element,
// otherwise it'll error
const CustomTriggerButton = styled(forwardRef<any, any>((props, ref) => (
  <Button
    ref={ref}
    medium
    primary
    endIcon={<DropdownArrowIcon className="dropdownIcon" />}
    {...props}
  >
    Click me!
  </Button>
)))<{ isOpen?: boolean }>(({ isOpen = false }) => ({
  '.dropdownIcon': {
    transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
    transition: 'transform 0.1s ease',
  },
}))

function Template() {
  const [selectedKey, setSelectedKey] = useState<Key>()
  const shownStep = 4
  const [shownLimit, setShownLimit] = useState<number>(shownStep)

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
          dropdownFooterFixed={
            <ListBoxFooterPlus>Create new</ListBoxFooterPlus>
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
          dropdownFooterFixed={
            <ListBoxFooterPlus>Create new</ListBoxFooterPlus>
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
          dropdownFooterFixed={
            <ListBoxFooterPlus>Create new</ListBoxFooterPlus>
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

      <Div maxWidth={224}>
        <Select
          label="Version"
          selectedKey={selectedKey}
          onSelectionChange={key => {
            setSelectedKey(key)
          }}
          onFooterClick={() => setShownLimit(shownLimit + shownStep)}
          onOpenChange={open => {
            if (!open) setShownLimit(shownStep)
          }}
          rightContent={
            curItem && (
              <ListBoxItemChipList
                maxVisible={0}
                showExtra
                chips={curItem.chips}
              />
            )
          }
          dropdownFooter={
            shownLimit < items.length && (
              <ListBoxFooterPlus>View more</ListBoxFooterPlus>
            )
          }
        >
          {items.slice(0, shownLimit).map(({ key, chips, version }) => (
            <ListBoxItem
              key={key}
              label={version}
              rightContent={(
                <ListBoxItemChipList
                  maxVisible={2}
                  showExtra
                  chips={chips}
                />
              )}
            />
          ))}
        </Select>
      </Div>
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {}
