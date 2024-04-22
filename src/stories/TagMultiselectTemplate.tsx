import { type Key } from 'react'

import {
  type MultiSelectTag,
  TagMultiSelect,
} from '../components/TagMultiSelect'

export default function TagMultiSelectTemplate({
  loading,
  tags,
  width,
  onSelectedTagsChange,
  onFilterChange,
}: {
  loading: boolean
  tags: MultiSelectTag[]
  width: number
  onSelectedTagsChange?: (keys: Set<Key>) => void
  onFilterChange?: (value: string) => void
}) {
  return (
    <div style={{ width: `${width}%` }}>
      <TagMultiSelect
        loading={loading}
        tags={tags}
        onSelectedTagsChange={onSelectedTagsChange}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}
