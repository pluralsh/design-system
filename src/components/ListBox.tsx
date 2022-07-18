import { useListBox, useOption } from '@react-aria/listbox'
import { useListState } from '@react-stately/list'
import { Item } from '@react-stately/collections'
import { useFocusRing } from '@react-aria/focus'
import { mergeProps } from '@react-aria/utils'
import { useRef } from 'react'
import { Menu, MenuItem, MenuProps } from 'honorable'

type ListBoxProps = MenuProps;

type Renderer = (
  props: HTMLAttributes<HTMLElement>,
  ref: RefObject<any>,
  state: TabListState<any>
) => JSX.Element;

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

type TabListItemProps = ComponentPropsWithRef<typeof Tab> &
  MakeOptional<ItemProps<void>, 'children'> & {
    renderer?: Renderer;
  };

const TabListItem = Item as (props: TabListItemProps) => JSX.Element

function ListBox(props:ListBoxProps) {
  // Create state based on the incoming props
  const state = useListState(props)

  // Get props for the listbox element
  const ref = useRef()
  const { listBoxProps, labelProps } = useListBox(props, state, ref)

  return (

    <Menu
      {...listBoxProps}
      ref={ref}
      {...props}

    >
      {[...state.collection].map(item => (
        <Option
          key={item.key}
          item={item}
          state={state}
        />
      ))}
    </Menu>
  )
}

function Option({ item, state }:any) {
  // Get props for the option element
  const ref = useRef()
  const { optionProps, isSelected, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  )

  console.log('isDisabled', isDisabled)

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  const { isFocusVisible, focusProps } = useFocusRing()

  return (
    <MenuItem
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      _hover={{ backgroundColor: 'fill-one-hover' }}
      backgroundColor={isSelected ? 'red' : 'none'}
    >
      {item.rendered}
    </MenuItem>
  )
}

export { ListBox, Item }
