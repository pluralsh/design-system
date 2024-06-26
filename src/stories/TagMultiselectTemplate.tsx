import { type Key } from 'react'

import { TagMultiSelect } from '../components/TagMultiSelect'

export default function TagMultiSelectTemplate({
  loading,
  options,
  width,
  onSelectedTagsChange,
  onFilterChange,
  onChangeMatchType,
}: {
  loading: boolean
  options: string[]
  width: number
  onSelectedTagsChange?: (keys: Set<Key>) => void
  onFilterChange?: (value: string) => void
  onChangeMatchType?: (value: 'AND' | 'OR') => void
}) {
  return (
    <div style={{ width: `${width}%` }}>
      <TagMultiSelect
        loading={loading}
        options={options}
        onSelectedTagsChange={onSelectedTagsChange}
        onFilterChange={onFilterChange}
        onChangeMatchType={onChangeMatchType}
      />
    </div>
  )
}
