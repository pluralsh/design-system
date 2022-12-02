import styled from 'styled-components'

import {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import Input from '../Input'
import { SearchIcon } from '../../icons'
import RepositoryChip from '../RepositoryChip'

import createIcon from '../icons/createIcon'

import WizardContext from './context'

const Picker = styled(PickerUnstyled)(({ theme: _theme }) => ({
  '.grid': {
    marginTop: '16px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px',
    maxHeight: '536px',
    overflow: 'auto',
  },

  '.scrollable': {
    paddingRight: '8px',
  },
}))

type PickerProps = {
  items: Array<Item>
  children?: any,
}

type Item = {
  key: string
  label?: string
  imageUrl?: string
  Icon?: ReturnType<typeof createIcon>
  isDefault?: boolean
  isPlaceholder?: boolean
  node?: ReactElement
}

function PickerUnstyled({ items, ...props }: PickerProps): JSX.Element {
  const { onSelect, steps } = useContext(WizardContext)
  const [search, setSearch] = useState(undefined)
  const [scrollable, setScrollable] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isScrollbarVisible = (el: HTMLDivElement) => el.scrollHeight > el.clientHeight
  const selected = steps.filter(step => !step.isDefault && !step.isPlaceholder)

  useEffect(() => {
    const { current } = scrollRef

    if (!current) return

    setScrollable(isScrollbarVisible(current))
  }, [scrollRef])

  return (
    <div {...props}>
      <Input
        startIcon={<SearchIcon />}
        placeholder="Filter applications"
        value={search}
        onChange={({ target: { value } }) => setSearch(value.toLowerCase())}
      />
      <div
        className={scrollable ? 'grid scrollable' : 'grid'}
        ref={scrollRef}
      >
        {items
          .filter(item => (search ? item.label.toLowerCase().includes(search) : true))
          .map(item => (
            <RepositoryChip
              label={item.label}
              imageUrl={item.imageUrl}
              onClick={() => onSelect(item)}
              checked={selected.findIndex(s => s.label === item.label) > -1}
            />
          ))}
      </div>
    </div>
  )
}

export type { PickerProps, Item }
export { Picker }
