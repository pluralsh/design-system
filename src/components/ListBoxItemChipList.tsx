import {
  type HTMLAttributes,
  type ReactElement,
  cloneElement,
  forwardRef,
  useMemo,
} from 'react'
import styled from 'styled-components'

import Tooltip from './Tooltip'
import Chip from './Chip'

type ChipListProps = HTMLAttributes<HTMLDivElement> & {
  chips: ReactElement<any>[]
  maxVisible?: number
  showExtra?: boolean
}

const ChipListUnstyled = forwardRef<HTMLDivElement, ChipListProps>(
  ({ chips, maxVisible = 3, showExtra = true, ...props }, ref) => {
    if (!Array.isArray(chips)) {
      chips = []
    }
    chips = chips.filter((chip) => !!chip)
    const firstChips = useMemo(
      () =>
        chips
          .slice(0, maxVisible)
          .map((chip, i) => cloneElement(chip, { key: i })),
      [chips, maxVisible]
    )
    const restChips = useMemo(
      () => chips.slice(maxVisible),
      [chips, maxVisible]
    )

    const extra = useMemo(
      () =>
        showExtra && restChips.length > 0 ? (
          <Tooltip
            key="extra"
            placement="top"
            label={
              <>
                {restChips.map((n, i) => (
                  <div
                    key={i}
                    className="tooltip"
                  >
                    {n?.props?.children}
                    <br />
                  </div>
                ))}
              </>
            }
          >
            <Chip size="small">{`+${restChips.length}`}</Chip>
          </Tooltip>
        ) : null,
      [restChips, showExtra]
    )

    return (
      <div
        ref={ref}
        {...props}
      >
        {[...firstChips, extra]}
      </div>
    )
  }
)

const ChipList = styled(ChipListUnstyled)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'end',
  gap: theme.spacing.xxsmall,
  '.tooltip': {
    ...theme.partials.text.caption,
  },
}))

export default ChipList
