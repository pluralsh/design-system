/* eslint-disable @typescript-eslint/no-explicit-any */
import { Div, DivProps, Flex, FlexProps } from 'honorable'
import { Item } from '@react-stately/collections'
import { useTab, useTabList, useTabPanel } from '@react-aria/tabs'
import { TabListState } from '@react-stately/tabs'
import { ItemProps, Node } from '@react-types/shared'
import {
  ComponentPropsWithRef,
  HTMLAttributes,
  RefObject,
  useRef,
} from 'react'

import Tab from './Tab'

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

type TabListProps = {
  tabState: TabListState<object>;
  tabProps: any;
  renderer?: Renderer;
};
function TabList({
  tabState,
  tabProps,
  renderer,
  ...props
}: TabListProps & FlexProps) {
  tabProps = {
    ...{
      keyboardActivation: 'manual',
      orientation: 'horizontal',
    },
    ...tabProps,
  }
  const ref = useRef<HTMLDivElement>(null)
  const { tabListProps } = useTabList(tabProps, tabState, ref)
  const tabChildren = [...tabState.collection].map(item => (
    <TabRenderer
      key={item.key}
      item={item as any}
      tabState={tabState}
      tabProps={tabProps}
    />
  ))
  if (renderer) {
    return renderer(
      { ...props, ...tabListProps, ...{ children: tabChildren } },
      ref,
      tabState
    )
  }

  return (
    <Flex
      {...tabListProps}
      {...props}
      flexDirection={tabProps.orientation === 'vertical' ? 'column' : 'row'}
      alignItems={
        tabProps.orientation === 'vertical' ? 'flex-start' : 'flex-end'
      }
      ref={ref}
    >
      {tabChildren}
    </Flex>
  )
}

type TabRendererProps = {
  item: Node<typeof TabListItem>;
  tabState: TabListState<any>;
  tabProps: any;
};
function TabRenderer({ item, tabState, tabProps }: TabRendererProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { tabProps: props } = useTab({ key: item.key }, tabState, ref)

  if (item.props.renderer) {
    if (item.rendered) {
      props.children = (
        <Tab
          active={tabState.selectedKey === item.key}
          vertical={tabProps.orientation === 'vertical'}
          width={tabProps.orientation === 'vertical' ? '100%' : 'auto'}
          {...item.props}
        >
          {item.rendered}
        </Tab>
      )
    }

    return item.props.renderer(props, ref, tabState)
  }

  return (
    <Tab
      ref={ref}
      {...props}
      active={tabState.selectedKey === item.key}
      vertical={tabProps.orientation === 'vertical'}
      {...item.props}
    >
      {item.rendered}
    </Tab>
  )
}

type TabPanelProps = {
  tabState: TabListState<object>;
  tabProps: any;
  renderer?: Renderer;
};

function TabPanel({
  tabState,
  tabProps,
  renderer,
  ...props
}: TabPanelProps & DivProps) {
  const ref = useRef<any>()
  const { tabPanelProps } = useTabPanel(tabProps, tabState, ref)
  if (renderer) {
    return renderer({ ...tabPanelProps, ...props }, ref, tabState)
  }

  return (
    <Div
      {...tabPanelProps}
      {...props}
      ref={ref}
    />
  )
}

export {
  TabList,
  TabListProps,
  TabListItem,
  TabListItemProps,
  TabPanel,
  TabPanelProps,
}
