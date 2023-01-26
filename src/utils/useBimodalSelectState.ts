/*
Modified from:
https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts
*;/
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { MenuTriggerState, useMenuTriggerState } from '@react-stately/menu'
import { SelectProps } from '@react-types/select'
import { SingleSelectListState, useListState } from '@react-stately/list'
import {
  Key,
  useCallback,
  useRef,
  useState,
} from 'react'
import { useControlledState } from '@react-stately/utils'
import { Node, Selection, SelectionMode } from '@react-types/shared'

export interface SelectState<T>
  extends SingleSelectListState<T>,
    MenuTriggerState {
  /** Whether the select is currently focused. */
  readonly isFocused: boolean

  /** Sets whether the select is focused. */
  setFocused(isFocused: boolean): void
}

/**
 * Provides state management for a select component. Handles building a collection
 * of items from props, handles the open state for the popup menu, and manages
 * multiple selection state.
 */
export function useSelectState<T extends object>({
  selectionMode = 'single',
  onSelectionChange,
  ...props
}: Omit<SelectProps<T>, 'onSelectionChange'> & {
  selectionMode?: SelectionMode
  selectedKeys?: Iterable<Key>
  onSelectionChange?: (keys: Key | Set<Key>) => any
}): SelectState<T> & { selectedKeys: Set<Key>; setSelectedKeys: any, selectedItems: Node<T>[], } {
  const [selectedKey, setSelectedKey] = useControlledState<Key>(selectionMode === 'multiple'
    ? props.selectedKeys?.values()?.next()?.value
    : props.selectedKey,
  props.defaultSelectedKey ?? null,
  selectionMode === 'single' ? onSelectionChange : undefined)
  const listStateRef = useRef<ReturnType<typeof useListState>>()

  const getAllKeys = useCallback(() => new Set<Key>(listStateRef.current?.collection?.getKeys() ?? []),
    [])

  const selectedKeys
    = selectionMode === 'multiple' ? props.selectedKeys : new Set([selectedKey])

  const triggerState = useMenuTriggerState(props)
  const listState = useListState({
    disallowEmptySelection: true,
    allowDuplicateSelectionEvents: true,
    ...props,
    selectionMode,
    selectedKeys,
    onSelectionChange: keys => {
      if (selectionMode === 'single' && keys !== 'all') {
        const key = keys.values().next().value

        // Always fire onSelectionChange, even if the key is the same
        // as the current key (useControlledState does not).
        if (key === selectedKey && onSelectionChange) {
          onSelectionChange(key)
        }

        setSelectedKey(key)
        triggerState.close()
      }
      if (selectionMode === 'multiple') {
        onSelectionChange(keys === 'all' ? getAllKeys() : keys)
      }
    },
  })

  listStateRef.current = listState

  const selectedItem
    = selectedKey != null ? listState.collection.getItem(selectedKey) : null

  const selectedItems = Array.from(selectedKeys).map(key => listState.collection.getItem(key))

  const [isFocused, setFocused] = useState(false)

  return {
    ...listState,
    ...triggerState,
    selectedKey,
    setSelectedKey,
    selectedItem,
    selectedKeys: listState.selectionManager.selectedKeys,
    selectedItems,
    setSelectedKeys: listState.selectionManager.setSelectedKeys,
    open() {
      // Don't open if the collection is empty.
      if (listState.collection.size !== 0) {
        triggerState.open()
      }
    },
    toggle(focusStrategy) {
      if (listState.collection.size !== 0) {
        triggerState.toggle(focusStrategy)
      }
    },
    isFocused,
    setFocused,
  }
}
