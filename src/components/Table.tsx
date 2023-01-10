import { Div, DivProps } from 'honorable'
import {
  ComponentProps,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import styled from 'styled-components'
import { useVirtual } from 'react-virtual'

import type { VirtualItem } from 'react-virtual'
import type { Row } from '@tanstack/react-table'

import Button from './Button'
import CaretUpIcon from './icons/CaretUpIcon'
import { FillLevelProvider } from './contexts/FillLevelContext'

export type TableProps =
  | Omit<
      DivProps,
      | 'data'
      | 'columns'
      | 'getRowCanExpand'
      | 'renderExpanded'
      | 'loose'
      | 'stickyColumn'
      | 'scrollTopMargin'
      | 'virtualizeRows'
      | 'virtualizerOptions'
      | 'reactTableOptions'
    > & {
      data: any[]
      columns: any[]
      getRowCanExpand: any
      renderExpanded: any
      loose: boolean
      stickyColumn: boolean
      scrollTopMargin: number
      virtualizeRows: boolean
      reactVirtualOptions: Omit<
        Parameters<typeof useVirtual>,
        'parentRef' | 'size'
      >
      reactTableOptions: Omit<
        Parameters<typeof useReactTable>,
        'data' | 'columns'
      >
    }

const propTypes = {}

const T = styled.table(({ theme }) => ({
  backgroundColor: theme.colors['fill-one'],
  borderSpacing: 0,
  width: '100%',
  ...theme.partials.text.body2LooseLineHeight,
}))

const TheadUnstyled = forwardRef<
  HTMLTableSectionElement,
  ComponentProps<'thead'>
>((props, ref) => (
  <FillLevelProvider value={2}>
    <thead
      {...props}
      ref={ref}
    />
  </FillLevelProvider>
))

const Thead = styled(TheadUnstyled)(({ theme }) => ({
  backgroundColor: theme.colors['fill-two'],
  position: 'sticky',
  top: 0,
  zIndex: 3,
}))

const TbodyUnstyled = forwardRef<
  HTMLTableSectionElement,
  ComponentProps<'tbody'>
>((props, ref) => (
  <FillLevelProvider value={1}>
    <tbody
      ref={ref}
      {...props}
    />
  </FillLevelProvider>
))

const Tbody = styled(TbodyUnstyled)(({ theme }) => ({
  backgroundColor: theme.colors['fill-one'],
}))

const Tr = styled.tr(() => ({
  backgroundColor: 'inherit',
}))

const Th = styled.th<{ stickyColumn: boolean }>(({ theme, stickyColumn }) => ({
  borderBottom: theme.borders['fill-three'],
  color: theme.colors.text,
  height: 48,
  minHeight: 48,
  whiteSpace: 'nowrap',
  padding: '14px 12px',
  textAlign: 'left',
  '&:first-child': stickyColumn
    ? {
      backgroundColor: 'inherit',
      boxShadow: theme.boxShadows.slight,
      position: 'sticky',
      left: 0,
      zIndex: 5,
    }
    : {},
}))

// TODO: Set vertical align to top for tall cells (~3 lines of text or more). See ENG-683.
const Td = styled.td<{
  firstRow?: boolean
  lighter: boolean
  loose?: boolean
  stickyColumn: boolean
}>(({
  theme, firstRow, lighter, loose, stickyColumn,
}) => ({
  backgroundColor: lighter
    ? theme.colors['fill-one']
    : theme.colors['fill-one-hover'],
  borderTop: firstRow ? '' : theme.borders.default,
  color: theme.colors.text,
  height: 52,
  minHeight: 52,
  padding: loose ? '16px 12px' : '8px 12px',
  '&:first-child': stickyColumn
    ? {
      boxShadow: theme.boxShadows.slight,
      position: 'sticky',
      left: 0,
      zIndex: 1,
    }
    : {},
}))

const TdExpand = styled.td<{ lighter: boolean }>(({ theme, lighter }) => ({
  backgroundColor: lighter
    ? theme.colors['fill-one']
    : theme.colors['fill-one-hover'],
  color: theme.colors.text,
  height: 52,
  minHeight: 52,
  padding: '16px 12px',
}))

function isRow<T>(row: Row<T> | VirtualItem): row is Row<T> {
  return typeof (row as Row<T>).getVisibleCells === 'function'
}

function TableRef({
  data,
  columns,
  getRowCanExpand,
  renderExpanded,
  loose = false,
  stickyColumn = false,
  scrollTopMargin = 500,
  width,
  virtualizeRows = false,
  reactVirtualOptions: virtualizerOptions,
  reactTableOptions,
  ...props
}: TableProps) {
  const tableContainerRef = useRef<HTMLDivElement>()
  const [hover, setHover] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    ...reactTableOptions,
  })
  const dataHasId = data && data.length > 0 && !!data[0]?.id

  console.log('dataHasId', dataHasId)

  const { rows: tableRows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: tableRows.length,
    overscan: 40,
    ...virtualizerOptions,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  console.log('totalSize', totalSize)

  const { paddingTop, paddingBottom } = useMemo(() => ({
    paddingTop:
        virtualizeRows && virtualRows.length > 0
          ? virtualRows?.[0]?.start || 0
          : 0,
    paddingBottom:
        virtualizeRows && virtualRows.length > 0
          ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
          : 0,
  }),
  [totalSize, virtualRows, virtualizeRows])

  const headerGroups = useMemo(() => table.getHeaderGroups(), [table])

  const rows = virtualizeRows ? virtualRows : tableRows

  return (
    <Div
      position="relative"
      width={width}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Div
        backgroundColor="fill-two"
        border="1px solid border-fill-two"
        borderRadius="large"
        overflow="auto"
        ref={tableContainerRef}
        onScroll={({ target }: { target: HTMLDivElement }) => setScrollTop(target?.scrollTop)}
        width={width}
        {...props}
      >
        <T>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th
                    key={header.id}
                    stickyColumn={stickyColumn}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header,
                        header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {paddingTop > 0 && (
              <>
                <Tr>
                  {/* Extra row to ensure any :nth-child() styling remains stable */}
                  <Td
                    stickyColumn={stickyColumn}
                    lighter={rows[0].index % 2 === 0}
                    style={{ height: '0' }}
                  />
                </Tr>
                <Tr>
                  <Td
                    stickyColumn={stickyColumn}
                    lighter={rows[0].index % 2 !== 0}
                    style={{ height: `${paddingTop}px` }}
                  />
                </Tr>
              </>
            )}
            {rows.map(maybeRow => {
              const row: Row<unknown> = isRow(maybeRow)
                ? maybeRow
                : tableRows[maybeRow.index]
              const i = row.index

              return (
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
                        {flexRender(cell.column.columnDef.cell,
                          cell.getContext())}
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
              )
            })}
            {paddingBottom > 0 && (
              <>
                <Tr>
                  <Td
                    stickyColumn={stickyColumn}
                    lighter={rows[rows.length - 1].index % 2 !== 0}
                    style={{ height: `${paddingBottom}px` }}
                  />
                </Tr>
                <Tr>
                  {/* Extra row to ensure any :nth-child() styling remains stable */}
                  <Td
                    stickyColumn={stickyColumn}
                    lighter={rows[rows.length - 1].index % 2 === 0}
                    style={{ height: '0' }}
                  />
                </Tr>
              </>
            )}
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
          onClick={() => tableContainerRef?.current?.scrollTo({
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
