import {
  ComponentProps,
  Key,
  ReactNode,
  RefObject,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import { Button, Div, Flex } from 'honorable'
import styled, { useTheme } from 'styled-components'

import useResizeObserver from '../hooks/useResizeObserver'

import CopyIcon from './icons/CopyIcon'
import Card, { CardProps } from './Card'
import CheckIcon from './icons/CheckIcon'
import Highlight from './Highlight'
import {
  FillLevel,
  FillLevelProvider,
  toFillLevel,
  useFillLevel,
} from './contexts/FillLevelContext'
import FileIcon from './icons/FileIcon'
import { TabList, TabListStateProps } from './TabList'
import { SubTab } from './SubTab'
import TabPanel from './TabPanel'
import { Select } from './Select'
import { ListBoxItem } from './ListBoxItem'

type CodeProps = Omit<CardProps, 'children'> & {
  children?: string
  language?: string
  showLineNumbers?: boolean
  showHeader?: boolean
  tabs?: CodeTabData[]
  title?: ReactNode
}

const propTypes = {
  language: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  showHeader: PropTypes.bool,
}

type Measurements = {
  headerWidth?: number
  tabsWidth?: number
  tabsWrapWidth?: number
}
type CodeContextT = {
  props: Pick<
    CodeProps,
    'language' | 'showLineNumbers' | 'title' | 'showHeader'
  >
  measurements: Measurements
  setMeasurements: (arg0: Partial<Measurements>) => void
  tabInterface: 'tabs' | 'dropdown'
}
const CodeContext = createContext<CodeContextT>({
  props: {},
  measurements: {},
  setMeasurements: () => {},
  tabInterface: 'tabs',
})
const useCodeContext = () => useContext(CodeContext)

const CodeHeader = styled(({ fillLevel, ...props }) => {
  const { measurements, setMeasurements } = useCodeContext()
  const ref = useRef<HTMLDivElement>()

  useResizeObserver(ref,
    useCallback(rect => {
      if (measurements.headerWidth !== rect.width) {
        console.log('settingMeasurements',
          measurements.headerWidth,
          rect.width)
        setMeasurements({
          ...measurements,
          headerWidth: rect.width,
        })
      }
    },
    [measurements, setMeasurements]))

  return (
    <FillLevelProvider value={toFillLevel(fillLevel + 2)}>
      <div
        ref={ref}
        {...props}
      />
    </FillLevelProvider>
  )
})<{ fillLevel: FillLevel }>(({ fillLevel, theme }) => ({
  ...theme.partials.text.overline,
  minHeight: theme.spacing.xlarge + theme.spacing.xsmall * 2,
  padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
  borderBottom:
    fillLevel >= 1 ? theme.borders['fill-three'] : theme.borders['fill-two'],
  color: 'text-light',
  backgroundColor:
    fillLevel >= 1 ? theme.colors['fill-three'] : theme.colors['fill-two'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing.medium,
  borderTopLeftRadius: theme.borderRadiuses.medium + 2,
  borderTopRightRadius: theme.borderRadiuses.medium + 2,
}))

function CopyButtonBase({
  copied,
  handleCopy,
  className,
}: {
  copied: boolean
  handleCopy: () => any
  className?: string
}) {
  return (
    <Button
      className={className}
      position="absolute"
      floating
      small
      startIcon={copied ? <CheckIcon /> : <CopyIcon />}
      onClick={handleCopy}
    >
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
}
const CopyButton = styled(CopyButtonBase)<{ verticallyCenter: boolean }>(({ verticallyCenter, theme }) => ({
  position: 'absolute',
  right: theme.spacing.medium,
  top: verticallyCenter ? '50%' : theme.spacing.medium,
  transform: verticallyCenter ? 'translateY(-50%)' : 'none',
  boxShadow: theme.boxShadows.slight,
}))

type CodeTabData = {
  key: Key
  label?: string
  language?: string
  content: string
}

const TitleArea = styled.div(({ theme }) => ({
  display: 'flex',
  minWidth: 100,
  flexShrink: 0,
  flexGrow: 1,
  gap: theme.spacing.xsmall,
}))

const tabsWrapMargin = 5
const TabsWrap = styled.div<{ $isDisabled: boolean }>(({ $isDisabled, theme }) => ({
  flexShrink: 1,
  overflow: 'hidden',
  margin: -tabsWrapMargin,
  padding: tabsWrapMargin,
  ...($isDisabled ? { opacity: 0.0, height: 0 } : {}),
}))

const SelectWrap = styled.div<{ $isDisabled?: boolean }>(({ $isDisabled, theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  paddingTop: theme.spacing.xxsmall - 1,
  paddingRight: theme.spacing.medium,
  minWidth: 150,
}))

function CodeTabs({
  tabStateRef,
  tabs,
  selectedKey,
  onSelectionChange,
}: {
  tabStateRef: RefObject<any>
  tabs: CodeTabData[]
  selectedKey: Key
  onSelectionChange: (key: Key) => any
}) {
  const { measurements, setMeasurements, tabInterface } = useCodeContext()
  const tabsRef = useRef<HTMLDivElement>()
  const tabsWrapRef = useRef<HTMLDivElement>()
  const tabListStateProps: TabListStateProps = {
    keyboardActivation: 'manual',
    orientation: 'horizontal',
    selectedKey,
    onSelectionChange,
    isDisabled: tabInterface !== 'tabs',
  }

  useResizeObserver(tabsRef,
    useCallback(() => {
      if (
        typeof tabsRef?.current?.scrollWidth === 'number'
        && typeof tabsRef?.current?.clientWidth === 'number'
        && (tabsRef?.current.scrollWidth !== measurements.tabsWidth
          || tabsRef?.current?.clientWidth !== measurements.tabsWrapWidth)
      ) {
        setMeasurements({
          ...measurements,
          tabsWidth: tabsRef?.current?.scrollWidth || measurements.tabsWidth,
          tabsWrapWidth:
            tabsRef?.current?.clientWidth || measurements.tabsWrapWidth,
        })
      }
    }, [measurements, setMeasurements]))

  console.log('isDisabled', tabListStateProps.isDisabled)

  return (
    <>
      <TabsWrap
        ref={tabsWrapRef}
        $isDisabled={tabListStateProps.isDisabled}
      >
        <TabList
          className="my-tab-list"
          stateRef={tabStateRef}
          stateProps={tabListStateProps}
          ref={tabsRef}
        >
          {tabs.map(tab => {
            if (typeof tab.content !== 'string') {
              throw new Error('Code component expects a string for tabs[].content')
            }

            return (
              <SubTab
                key={tab.key}
                size="small"
                textValue={tab.label || tab.language}
              >
                {tab.label || tab.language}
              </SubTab>
            )
          })}
        </TabList>
      </TabsWrap>
      {tabListStateProps.isDisabled && (
        <SelectWrap>
          <Select
            selectedKey={selectedKey}
            onSelectionChange={key => {
              onSelectionChange(key)
            }}
            placement="right"
          >
            {tabs.map(tab => {
              console.log('tab', tab)

              return (
                <ListBoxItem
                  key={tab.key}
                  label={tab.label || tab.language}
                  textValue={tab.label || tab.language}
                />
              )
            })}
          </Select>
        </SelectWrap>
      )}
    </>
  )
}

function CodeContent({
  children,
  hasSetHeight,
  ...props
}: ComponentProps<typeof Highlight> & { hasSetHeight: boolean }) {
  const [copied, setCopied] = useState(false)
  const codeString = children?.trim() || ''
  const multiLine = !!codeString.match(/\r?\n/) || hasSetHeight
  const handleCopy = useCallback(() => window.navigator.clipboard
    .writeText(codeString)
    .then(() => setCopied(true)),
  [codeString])

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000)

      return () => clearTimeout(timeout)
    }
  }, [copied])

  if (typeof children !== 'string') {
    throw new Error('Code component expects a string as its children')

    return null
  }

  return (
    <Div
      height="100%"
      overflow="auto"
      alignItems="center"
    >
      <CopyButton
        copied={copied}
        handleCopy={handleCopy}
        verticallyCenter={!multiLine}
      />
      <Div
        paddingHorizontal="medium"
        paddingVertical={multiLine ? 'medium' : 'small'}
      >
        <Highlight {...props}>{codeString}</Highlight>
      </Div>
    </Div>
  )
}

function CodeRef({
  children,
  language,
  showLineNumbers,
  showHeader,
  tabs,
  title,
  onSelectedTabChange,
  ...props
}: CodeProps,
ref: RefObject<any>) {
  const parentFillLevel = useFillLevel()
  const tabStateRef = useRef()
  const [selectedTabKey, setSelectedTabKey] = useState<Key>((tabs && tabs[0]?.key) || '')
  const theme = useTheme()
  const [measurements, setMeasurements] = useState<Measurements>({})
  const tabInterface
    = measurements?.tabsWrapWidth
    && measurements?.tabsWidth
    && measurements.tabsWrapWidth - measurements.tabsWidth < 0
      ? 'dropdown'
      : 'tabs'

  console.log(
    'tabInterface',
    tabInterface,
    measurements?.tabsWrapWidth,
    measurements?.tabsWidth
  )

  props.height = props.height || undefined
  const hasSetHeight = !!props.height || !!props.minHeight

  showHeader = tabs ? true : showHeader === undefined ? !!language : showHeader

  const context: CodeContextT = useMemo(() => ({
    props: {
      tabs,
      selectedTabKey,
      title,
      showLineNumbers,
      language,
    },
    measurements,
    setMeasurements,
    tabInterface,
  }),
  [
    tabs,
    selectedTabKey,
    title,
    showLineNumbers,
    language,
    measurements,
    tabInterface,
  ])

  return (
    <CodeContext.Provider value={context}>
      <Card
        ref={ref}
        // overflow="hidden"
        fillLevel={toFillLevel(Math.min(parentFillLevel + 1, 2))}
        borderColor={
          parentFillLevel >= 1
            ? theme.colors['border-fill-three']
            : theme.colors['border-fill-two']
        }
        {...props}
      >
        <Flex
          position="relative"
          direction="column"
          height="100%"
        >
          {showHeader && (
            <CodeHeader fillLevel={parentFillLevel}>
              {((tabs && title) || !tabs) && (
                <TitleArea>
                  <FileIcon />
                  {(title || language) && <div>{title || language}</div>}
                </TitleArea>
              )}
              {tabs && (
                <CodeTabs
                  tabs={tabs}
                  tabStateRef={tabStateRef}
                  selectedKey={selectedTabKey}
                  onSelectionChange={key => {
                    setSelectedTabKey(key)
                    if (typeof onSelectedTabChange === 'function') {
                      onSelectedTabChange(key)
                    }
                  }}
                />
              )}
            </CodeHeader>
          )}
          {tabs ? (
            tabs.map(tab => (
              <TabPanel
                key={tab.key}
                tabKey={tab.key}
                mode="multipanel"
                stateRef={tabStateRef}
                as={(
                  <Div
                    position="relative"
                    height="100%"
                    overflow="hidden"
                  />
                )}
              >
                <CodeContent
                  language={tab.language}
                  showLineNumbers={showLineNumbers}
                  hasSetHeight={hasSetHeight}
                >
                  {tab.content}
                </CodeContent>
              </TabPanel>
            ))
          ) : (
            <Div
              position="relative"
              height="100%"
              overflow="hidden"
            >
              <CodeContent
                language={language}
                showLineNumbers={showLineNumbers}
                hasSetHeight={hasSetHeight}
              >
                {children}
              </CodeContent>
            </Div>
          )}
        </Flex>
      </Card>
    </CodeContext.Provider>
  )
}

const Code = styled(forwardRef(CodeRef))(_ => ({
  [CopyButton]: {
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease',
  },
  [`&:hover ${CopyButton}`]: {
    opacity: 1,
    pointerEvents: 'auto',
    transition: 'opacity 0.2s ease',
  },
}))

Code.propTypes = propTypes

export default Code
export { CodeProps }
