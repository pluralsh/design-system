import { Fragment, useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { normalizeColor } from 'grommet/utils'

import Avatar from './Avatar'
import CollapseIcon from './icons/CollapseIcon'

const Container = styled(Box)`
  transition: width 300ms ease;
`

const Item = styled(Box)`
  cursor: pointer;
  transition: all 150ms linear;
  user-select: none;

  &#active-item {
    font-weight: 600;
  }

  #sidebar-items:not(:hover) > &#active-item,
  #sidebar-items:not(:hover) > * > * > &#active-item,
  &:hover {
    color: ${({ theme }) => normalizeColor('text-strong', theme)};
    background-color: ${({ theme }) => normalizeColor('background-light', theme)};
    font-weight: 600;
  }

  & * {
    transition: all 150ms linear;
  }

  & > svg {
    flex-shrink: 0;
  }
`

const CollapseIconContainer = styled(Box)`
  cursor: pointer;
  transition: all 300ms ease;
  transform: ${({ collapsed }) => collapsed ? 'rotate(180deg)' : 'rotate(0deg)'};
`

const TransitionText = styled(Text)`
  display: block;
  opacity: ${({ collapsed }) => collapsed ? 0 : 1};
  visibility: ${({ collapsed }) => collapsed ? 'hidden' : 'visible'};
  transition: opacity ${({ collapsed }) => collapsed ? 200 : 500}ms ease ${({ collapsed }) => collapsed ? 0 : 50}ms, visibility 200ms linear;
`

const TransitionTextNoSelect = styled(TransitionText)`
  user-select: none;
`

const DeployIconContainer = styled(Box)`
  cursor: pointer;
  transition: all 300ms ease;
  transform: ${({ deployed }) => deployed ? 'rotate(0deg)' : 'rotate(180deg)'};
  opacity: ${({ collapsed }) => collapsed ? 0 : 1};
  visibility: ${({ collapsed }) => collapsed ? 'hidden' : 'visible'};
  transition: opacity ${({ collapsed }) => collapsed ? 200 : 500}ms ease ${({ collapsed }) => collapsed ? 0 : 100}ms, visibility 200ms linear, transform 300ms ease;
`

const ChildrenContainer = styled(Box)`
  transition: height 300ms ease;

  & > * {
    transform: ${({ deployed }) => deployed ? 'translate(0px, 0px)' : 'translate(-4px, -4px)'};
    opacity: ${({ deployed }) => deployed ? 1 : 0};
    visibility: ${({ deployed }) => deployed ? 'visible' : 'hidden'};
    transition: opacity ${({ deployed }) => deployed ? 500 : 200}ms ease ${({ deployed }) => deployed ? 0 : 0}ms, visibility 200ms linear, transform 300ms ease;
  }
`

function Sidebar({ items, activeUrl, user, onItemClick = () => null }) {
  const [collapsed, setCollapsed] = useState(false)
  const [deployedItems, setDeployedItems] = useState(activeUrl ? [activeUrl] : [])
  const [childrenHeights, setChildrenHeights] = useState({})

  useEffect(() => {
    const nextChildrenHeights = {}

    items
      .filter(({ items }) => Array.isArray(items) && items.length > 0)
      .forEach(({ url, name }) => {
        const id = url || name
        const element = document.getElementById(`sidebar-children-${id}`)
        const div = element.firstElementChild

        nextChildrenHeights[id] = div.clientHeight
      })

    setChildrenHeights(nextChildrenHeights)
  }, [items])

  function handleDeployItem(id) {
    if (deployedItems.includes(id)) {
      setDeployedItems(deployedItems.filter(item => item !== id))
    }
    else {
      setDeployedItems([...deployedItems, id])
    }
  }

  function renderItems(items, marginLeft = 0) {
    return items.map(({ name, url, Icon, items }) => {
      const id = url || name
      const hasChildren = Array.isArray(items) && items.length > 0

      return (
        <Fragment key={id}>
          <Item
            id={activeUrl === id ? 'active-item' : ''}
            active={activeUrl === id}
            direction="row"
            align="center"
            width="full"
            height="40px"
            round="4px"
            margin={{ left: `${marginLeft}px` }}
            pad={{ left: '12px' }}
            color="text-xweak"
            overflow="hidden"
            onClick={() => hasChildren && handleDeployItem(id) || onItemClick(id)}
          >
            <Icon
              size={14}
              color={activeUrl === id ? 'text-strong' : 'text-xweak'}
            />
            <TransitionText
              collapsed={collapsed}
              size="small"
              margin={{ left: '16px' }}
            >
              {name}
            </TransitionText>
            {hasChildren && (
              <>
                <Box flex="grow" />
                <DeployIconContainer
                  collapsed={collapsed}
                  deployed={deployedItems.includes(id)}
                  align="center"
                  justify="center"
                  flex={{ shrink: 0 }}
                >
                  <CollapseIcon
                    color="text-xweak"
                    size={6}
                  />
                </DeployIconContainer>
                <Box width="16px" />
              </>
            )}
          </Item>
          {hasChildren && (
            <ChildrenContainer
              id={`sidebar-children-${id}`}
              deployed={deployedItems.includes(id)}
              height={`${deployedItems.includes(id) ? childrenHeights[id] || 0 : 0}px`}
              overflow="hidden"
            >
              <div>
                {renderItems(items, marginLeft + 6)}
              </div>
            </ChildrenContainer>
          )}
        </Fragment>
      )
    })
  }

  return (
    <Container
      width={`${collapsed ? 74 : 208}px`}
      background="background-front"
      border={{
        color: 'border',
        size: 'small',
        side: 'right',
      }}
      pad="24px 16px 16px 16px"
    >
      <div id="sidebar-items">
        {renderItems(items)}
      </div>
      <Box flex="grow" />
      <Box
        direction="row"
        align="center"
        overflow="hidden"
      >
        <CollapseIconContainer
          collapsed={collapsed}
          background="background-light"
          round="full"
          align="center"
          justify="center"
          width="24px"
          height="24px"
          onClick={() => setCollapsed(x => !x)}
          flex={{ shrink: 0 }}
        >
          <CollapseIcon
            color="text-xweak"
            size={6}
          />
        </CollapseIconContainer>
        <TransitionTextNoSelect
          collapsed={collapsed}
          size="small"
          color="text-xweak"
          margin={{ left: '16px' }}
        >
          Collapse
        </TransitionTextNoSelect>
      </Box>
      <Box
        direction="row"
        align="center"
        margin={{ top: '16px' }}
      >
        <Avatar
          name={user.name}
          imageUrl={user.imageUrl}
        />
        <Box pad={{ left: '8px' }}>
          <TransitionText
            collapsed={collapsed}
            truncate
            weight="bold"
            size="small"
            color="text-xweak"
          >
            {user.name}
          </TransitionText>
          <TransitionText
            collapsed={collapsed}
            truncate
            size="xsmall"
            color="text-xweak"
          >
            {user.email}
          </TransitionText>
        </Box>
      </Box>
    </Container>
  )
}

export default Sidebar
