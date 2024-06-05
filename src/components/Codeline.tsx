import { type Ref, forwardRef, useCallback, useEffect, useState } from 'react'
import { type CssProps, Div, Flex, type FlexProps } from 'honorable'
import { useTheme } from 'styled-components'

import Tooltip from '../components/Tooltip'

import CopyIcon from './icons/CopyIcon'

type CodelineProps = FlexProps & {
  displayText?: string
  onCopyClick?: (text: string) => Promise<void>
}

function CodelineRef(
  { children, displayText, onCopyClick, ...props }: CodelineProps,
  ref: Ref<any>
) {
  const [copied, setCopied] = useState(false)
  const theme = useTheme()

  const handleCopy = useCallback(() => {
    if (onCopyClick) {
      onCopyClick(children as string).then(() => setCopied(true))

      return
    }

    window.navigator.clipboard
      .writeText(children as string)
      .then(() => setCopied(true))
  }, [children, onCopyClick])

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000)

      return () => clearTimeout(timeout)
    }
  }, [copied])

  return (
    <Flex
      ref={ref}
      border="1px solid border-input"
      borderRadius="medium"
      {...props}
    >
      <Flex
        align="center"
        paddingVertical="xsmall"
        paddingHorizontal="medium"
        overflowX="auto"
        flexGrow={1}
        position="relative"
      >
        <Div
          body2
          {...(theme.partials.text.code as CssProps)}
          color="text-light"
          flexGrow={1}
          whiteSpace="pre"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {displayText || children}
        </Div>
      </Flex>
      <Flex
        width={38}
        height={38}
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Tooltip
          offset={8}
          label="Copied!"
          color="text-success-light"
          placement="top"
          displayOn="manual"
          dismissable
          onOpenChange={(open) => {
            if (!open && copied) setCopied(false)
          }}
          manualOpen={copied}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            width={32}
            height={32}
            cursor="pointer"
            borderRadius="medium"
            _hover={{ backgroundColor: 'fill-zero-hover' }}
            _active={{ backgroundColor: 'fill-zero-selected' }}
            onClick={handleCopy}
          >
            <CopyIcon
              color="text-light"
              {...{ '& svg': { display: 'block' } }}
            />
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

const Codeline = forwardRef(CodelineRef)

export default Codeline
