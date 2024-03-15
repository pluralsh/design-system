import { Flex, Span } from 'honorable'
import isEmpty from 'lodash-es/isEmpty'
import { type ComponentProps, type ReactElement, useState } from 'react'

import { HamburgerMenuCollapseIcon } from '../icons'

import Chip, { type ChipProps } from './Chip'

type TransformFn<TValue> = (
  value: TValue
) => ComponentProps<typeof Chip>['children']

export type ChipListProps<TValue> = {
  values: TValue[]
  transformValue?: TransformFn<TValue>
  limit: number
  emptyState?: JSX.Element
} & ChipProps

function ChipList<TValue = string>({
  values = [],
  transformValue,
  limit = 4,
  emptyState,
  ...props
}: ChipListProps<TValue>): ReactElement {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Flex
      gap="xsmall"
      wrap
    >
      {isEmpty(values) &&
        (emptyState !== undefined ? (
          emptyState
        ) : (
          <Span body2>There is nothing to display here.</Span>
        ))}
      {values.slice(0, collapsed ? limit : undefined).map((v, i) => (
        <Chip
          key={(v as any).key || i}
          {...props}
        >
          {transformValue ? transformValue(v) : `${v}`}
        </Chip>
      ))}
      {values.length > limit && (
        <>
          {collapsed && (
            <Chip
              onClick={() => setCollapsed(false)}
              {...props}
              clickable
            >
              {`+${values.length - limit}`}
            </Chip>
          )}
          {!collapsed && (
            <Chip
              onClick={() => setCollapsed(true)}
              {...props}
              clickable
            >
              <HamburgerMenuCollapseIcon />
            </Chip>
          )}
        </>
      )}
    </Flex>
  )
}

export default ChipList
