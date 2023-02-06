import { Flex, Span } from 'honorable'
import { ReactElement } from 'react'

import Chip, { ChipProps } from './Chip'

type TransformFn<TValue> = (value: TValue) => string

export type ChipListProps<TValue> = {
  values: Array<TValue>
  transform?: TransformFn<TValue>
} & ChipProps

function ChipList<TValue = string>({ values = [], transform, ...props }: ChipListProps<TValue>): ReactElement {
  return (
    <Flex
      gap="xsmall"
      wrap
    >
      {values.length === 0 && (
        <Span body2>There is nothing to display here.</Span>
      )}
      {values.map(v => (
        <Chip {...props}>
          {transform ? transform(v) : `${v}`}
        </Chip>
      ))}
    </Flex>
  )
}

export default ChipList
