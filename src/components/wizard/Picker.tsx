import styled from 'styled-components'

import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import Input from '../Input'
import { SearchIcon } from '../../icons'
import RepositoryChip from '../RepositoryChip'

import { StepConfig, WizardContext } from './context'
import { usePicker } from './hooks'

const Picker = styled(PickerUnstyled)(({ theme: _theme }) => ({
  height: '100%',
  minHeight: 0,

  '.grid': {
    marginTop: '16px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
    gridAutoRows: 'minmax(auto, 40px)',
    gap: '16px',
    maxHeight: '536px',
    height: 'calc(100% - 56px)',
    overflow: 'auto',
  },

  '.scrollable': {
    paddingRight: '8px',
  },
}))

type PickerProps = {
  items: Array<StepConfig>
}

function PickerUnstyled({ items, ...props }: PickerProps): JSX.Element {
  const { steps } = useContext(WizardContext)
  const { onSelect } = usePicker()
  const [search, setSearch] = useState<string>(undefined)
  const [scrollable, setScrollable] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isScrollbarVisible = (el: HTMLDivElement) => el?.scrollHeight > el?.clientHeight
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

export type { PickerProps, StepConfig }
export { Picker }
