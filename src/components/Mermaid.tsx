import {
  ComponentPropsWithoutRef,
  Ref,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import Highlight from './Highlight'

const MERMAID_CDN_URL =
  'https://cdn.jsdelivr.net/npm/mermaid@11.12.1/dist/mermaid.min.js'
const NOT_LOADED_ERROR = 'Mermaid not loaded'

// helps prevent flickering (and potentially expensive recalculations) in virutalized lists
// need to do this outside of React lifecycle memoization (useMemo etc) so it can persist across component mounts/unmounts
const cachedRenders: Record<string, string | Error> = {}

export type MermaidRefHandle = {
  isLoading: boolean
  error: Nullable<Error>
  svgStr: Nullable<string>
}

export function Mermaid({
  ref,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  children: string
  ref: Ref<MermaidRefHandle>
}) {
  const [svgStr, setSvgStr] = useState<Nullable<string>>()
  const [error, setError] = useState<Nullable<Error>>(null)
  const [isLoading, setIsLoading] = useState(true)

  useImperativeHandle(ref, () => ({ isLoading, error, svgStr }))

  useLayoutEffect(() => {
    const id = getMermaidId(children)
    const cached = cachedRenders[id]
    if (cached) {
      setIsLoading(false)
      setSvgStr(typeof cached === 'string' ? cached : null)
      setError(cached instanceof Error ? cached : null)
      return
    }
    let numRetries = 0
    let pollTimeout: NodeJS.Timeout | null = null
    // poll for when window.mermaid becomes available
    const checkAndRender = async () => {
      try {
        setIsLoading(true)
        setError(null)
        setSvgStr(await renderMermaid(children))
        setIsLoading(false)
      } catch (caughtErr) {
        let err = caughtErr
        if (!(caughtErr instanceof Error)) err = new Error(caughtErr)
        // if not loaded yet, wait and retry
        if (err.message.includes(NOT_LOADED_ERROR) && numRetries < 50) {
          pollTimeout = setTimeout(checkAndRender, 150)
          numRetries++
        } else {
          console.error('Error parsing Mermaid (rendering plaintext):', err)
          setError(err)
          setIsLoading(false)
          cachedRenders[id] = err
        }
      }
    }
    checkAndRender()

    return () => clearTimeout(pollTimeout)
  }, [children, svgStr])

  if (error)
    return (
      <Highlight
        key={children}
        language="mermaid"
      >
        {children}
      </Highlight>
    )

  return (
    <>
      <script
        async
        src={MERMAID_CDN_URL}
      />
      <MermaidContainerSC {...props}>
        {isLoading && <div>Loading diagram...</div>}
        {svgStr && (
          <div
            dangerouslySetInnerHTML={{ __html: svgStr }}
            style={{
              display: isLoading ? 'none' : 'block',
              width: '100%',
              textAlign: 'center',
            }}
          />
        )}
      </MermaidContainerSC>
    </>
  )
}

const MermaidContainerSC = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing.medium,
  overflow: 'auto',
  width: '100%',
  height: '100%',
}))

let initialized = false
const getOrInitializeMermaid = () => {
  if (!window.mermaid) return null
  if (!initialized) {
    window.mermaid.initialize({ startOnLoad: false })
    initialized = true
  }
  return window.mermaid
}

const renderMermaid = async (code: string) => {
  const mermaid = getOrInitializeMermaid()
  if (!mermaid) throw new Error(NOT_LOADED_ERROR)
  const id = getMermaidId(code)
  const { svg } = await mermaid.render(id, code)
  cachedRenders[id] = svg
  return svg
}

export const downloadMermaidSvg = (svgStr: string) => {
  const img = new Image()
  img.src = `data:image/svg+xml,${encodeURIComponent(svgStr)}`

  img.onload = () => {
    // scale up to create high-resolution image (target ~4K width)
    const targetWidth = 3840
    const scale = Math.max(targetWidth / img.width, 4)

    const canvas = document.createElement('canvas')
    canvas.width = img.width * scale
    canvas.height = img.height * scale
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      if (!blob) return
      const pngUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = pngUrl
      link.download = 'mermaid-diagram.png'
      link.click()
      URL.revokeObjectURL(pngUrl)
    }, 'image/png')
  }
}

// simple djb2 hash to get id from mermaid string
const getMermaidId = (str: string) => {
  let hash = 5381
  for (let i = 0; i < str.length; i++)
    hash = (hash << 5) + hash + str.charCodeAt(i)
  return `mermaid-${hash >>> 0}`
}
