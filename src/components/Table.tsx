import { Div, DivProps } from 'honorable'
import { forwardRef, useRef, useState } from 'react'
import {
  flexRender, getCoreRowModel, getExpandedRowModel, useReactTable,
} from '@tanstack/react-table'
import styled from 'styled-components'

import Button from './Button'
import CaretUpIcon from './icons/CaretUpIcon'

export type TableProps = DivProps

const propTypes = {}

const T = styled.table(({ theme }) => ({
  backgroundColor: theme.colors['fill-one'],
  // Added to avoid sticky header jumping while scrolling table.
  borderCollapse: 'collapse',
  borderSpacing: 0,
  width: '100%',
}))

const Thead = styled.thead(({ theme }) => ({
  backgroundColor: theme.colors['fill-two'],
  // Using shadow instead of border to work well with "border-collapse: collapse" property.
  boxShadow: `inset 0 -1px ${theme.colors['border-fill-three']}`,
  position: 'sticky',
  top: 0,
  zIndex: 1,
}))

const Tbody = styled.tbody(() => ({}))

const Tr = styled.tr(({ theme }) => ({
  '&:not(:first-child)': {
    borderTop: theme.borders['fill-one'],
  },
  '&:nth-child(even)': {
    backgroundColor: theme.colors['fill-one-hover'],
  },
}))

const Th = styled.th(({ theme }) => ({
  height: 48,
  minHeight: 48,
  padding: '14px 12px',
  color: theme.colors.text,
}))

const Td = styled.td(({ theme }) => ({
  color: theme.colors.text,
  height: 52,
  minHeight: 52,
  padding: '16px 12px',
}))

const TdExpand = styled.td(({ theme }) => ({
  backgroundColor: theme.colors['fill-two'],
  color: theme.colors.text,
  height: 52,
  minHeight: 52,
  padding: '16px 12px',
}))

function TableRef({
  data, columns, getRowCanExpand, renderExpanded, scrollTopMargin = 2500, width, ...props
}: any) {
  const ref = useRef<HTMLDivElement>()
  const [hover, setHover] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    <Div
      position="relative"
      width={width}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Div
        backgroundColor="fill-two"
        border="1px solid border"
        borderRadius="large"
        overflow="auto"
        ref={ref}
        onScroll={({ target }: {target: HTMLDivElement}) => setScrollTop(target?.scrollTop)}
        width={width}
        {...props}
      >
        <T>
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <>
                <Tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
                {row.getIsExpanded() && (
                  <Tr>
                    <TdExpand colSpan={row.getVisibleCells().length}>
                      {renderExpanded({ row })}
                    </TdExpand>
                  </Tr>
                )}
              </>
            ))}
          </Tbody>
        </T>
      </Div>
      {hover && scrollTop > scrollTopMargin && (
        <Button
          small
          position="absolute"
          right="24px"
          bottom="24px"
          width="140px"
          floating
          endIcon={<CaretUpIcon />}
          onClick={() => ref?.current?.scrollTo({
            top: 0,
            behavior: 'smooth',
          })}
        >
          Back to top
        </Button>
      )}
    </Div>
  )
}

const Table = forwardRef(TableRef)

Table.propTypes = propTypes

export default Table
