import { type Key } from 'react'

import {
  type MultiSelectTag,
  TagMultiSelect,
} from '../components/TagMultiSelect'

export default function TagMultiSelectTemplate({
  loading,
  tags,
  width,
  onChange,
}: {
  loading: boolean
  tags: MultiSelectTag[]
  width: number
  onChange?: (keys: Set<Key>) => void
}) {
  return (
    <div style={{ width: `${width}%` }}>
      <TagMultiSelect
        loading={loading}
        tags={tags}
        onSelectedTagsChange={onChange}
      />
    </div>
  )
}
