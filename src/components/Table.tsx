import { Div, FlexProps } from 'honorable'
import { forwardRef, useState } from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import styled from 'styled-components'

import Button from './Button'
import CaretUpIcon from './icons/CaretUpIcon'

export type TableProps = FlexProps

const propTypes = {}

const T = styled.table(({ theme }) => ({
  backgroundColor: theme.colors['fill-one'],
  border: theme.borders.default,
  borderRadius: theme.borderRadiuses.large,
  borderSpacing: 0,
  width: '100%',
}))

const Thead = styled.thead(({ theme }) => ({
  backgroundColor: theme.colors['fill-two'],
  position: 'sticky',
  top: 0,
}))

const Tbody = styled.tbody(() => ({
  overflow: 'scroll',
}))

const Tr = styled.tr(() => ({}))

const Th = styled.th(({ theme }) => ({
  height: 48,
  minHeight: 48,
  padding: '14px 12px',
  color: theme.colors.text,
}))

const Td = styled.td(({ theme }: any) => ({
  borderBottom: theme.borders['fill-one'], // TODO: Remove for last row.
  height: 52,
  minHeight: 52,
  padding: '16px 12px',
  color: theme.colors.text,
}))

function TableRef({ data: initialData, columns, ...props }: any) {
  const [data, _] = useState(() => [...initialData])
  const [hover, setHover] = useState(false)
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <Div
      position="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td
                  key={cell.id}
                  // last={i == a.length}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </T>
      {hover && (
        <Button
          small
          position="absolute"
          right="24px"
          bottom="24px"
          width="140px"
          floating
          endIcon={<CaretUpIcon />}
          onClick={() => {}}
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
