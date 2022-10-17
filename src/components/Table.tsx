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
  borderSpacing: 0,
  width: '100%',
}))

const Thead = styled.thead(({ theme }) => ({
  backgroundColor: theme.colors['fill-two'],
  position: 'sticky',
  top: 0,
  zIndex: 3,
}))

const Tbody = styled.tbody(({ theme }) => ({
  backgroundColor: theme.colors['fill-one'],
}))

const Tr = styled.tr(() => ({
  backgroundColor: 'inherit',
}))

const Th = styled.th<{stickyColumn: boolean}>(({ theme, stickyColumn }) => ({
  borderBottom: theme.borders['fill-three'],
  color: theme.colors.text,
  height: 48,
  minHeight: 48,
  whiteSpace: 'nowrap',
  padding: '14px 12px',
  textAlign: 'left',
  '&:first-child': stickyColumn ? {
    backgroundColor: 'inherit',
    boxShadow: theme.boxShadows.slight,
    position: 'sticky',
    left: 0,
    zIndex: 5,
  } : {},
}))

const Td = styled.td<{firstRow?: boolean, lighter: boolean, loose?: boolean, stickyColumn: boolean}>(({
  theme, firstRow, lighter, loose, stickyColumn,
}) => ({
  backgroundColor: lighter ? theme.colors['fill-one'] : theme.colors['fill-one-hover'],
  borderTop: firstRow ? '' : theme.borders.default,
  color: theme.colors.text,
  height: 52,
  minHeight: 52,
  padding: loose ? '16px 12px' : '6px 12px',
  verticalAlign: 'top',
  '&:first-child': stickyColumn ? {
    boxShadow: theme.boxShadows.slight,
    position: 'sticky',
    left: 0,
    zIndex: 1,
  } : {},
}))

const TdExpand = styled.td<{lighter: boolean}>(({ theme, lighter }) => ({
  backgroundColor: lighter ? theme.colors['fill-one'] : theme.colors['fill-one-hover'],
  color: theme.colors.text,
  height: 52,
  minHeight: 52,
  padding: '16px 12px',
}))

function TableRef({
  data, columns, getRowCanExpand, renderExpanded, loose = false,
  stickyColumn = false, scrollTopMargin = 500, width, ...props
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
                  <Th
                    key={header.id}
                    stickyColumn={stickyColumn}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row, i) => (
              <>
                <Tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <Td
                      key={cell.id}
                      firstRow={i === 0}
                      lighter={i % 2 === 0}
                      loose={loose}
                      stickyColumn={stickyColumn}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
                {row.getIsExpanded() && (
                  <Tr>
                    <TdExpand lighter={i % 2 === 0} />
                    <TdExpand
                      colSpan={row.getVisibleCells().length - 1}
                      lighter={i % 2 === 0}
                    >
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
