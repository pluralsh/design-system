export const tableInteractiveTargetingProp =
  'data-plural-table-interactive' as const

export function TableInteractive({ children }: { children: React.ReactNode }) {
  return (
    <div
      {...{ [tableInteractiveTargetingProp]: '' }}
      style={{ display: 'contents' }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}
