import {
  ComponentPropsWithoutRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import styled, { useTheme } from 'styled-components'
import Highlight from './Highlight'

const MERMAID_CDN_URL =
  'https://cdn.jsdelivr.net/npm/mermaid@11.12.1/dist/mermaid.min.js'
const NOT_LOADED_ERROR = 'Mermaid not loaded'

export type MermaidRefHandle = {
  isLoading: boolean
  error: Nullable<string>
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
  const [svgStr, setSvgStr] = useState<Nullable<string>>(null)
  const [error, setError] = useState<Nullable<string>>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { mode } = useTheme()

  useImperativeHandle(ref, () => ({
    isLoading,
    error,
    svgStr,
  }))

  useEffect(() => {
    if (!children) return
    let numRetries = 0
    // poll for when window.mermaid becomes available
    const checkAndRender = async () => {
      try {
        setIsLoading(true)
        setError(null)
        setSvgStr(await renderMermaid(children))
        setIsLoading(false)
      } catch (err) {
        // if not loaded yet, wait and retry
        if (
          err instanceof Error &&
          err.message.includes(NOT_LOADED_ERROR) &&
          numRetries < 100
        ) {
          setTimeout(checkAndRender, 150)
          numRetries++
        } else {
          console.error(
            'Error rendering Mermaid diagram:',
            err,
            'Falling back to plain text'
          )
          setIsLoading(false)
        }
      }
    }

    checkAndRender()
  }, [children, mode])

  if (typeof children !== 'string')
    throw new Error('Mermaid component expects a string as its children')

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
const initializeMermaid = () => {
  if (!window.mermaid) return null
  if (!initialized) {
    window.mermaid.initialize({ startOnLoad: false })
    initialized = true
  }
  return window.mermaid
}

const renderMermaid = async (code: string) => {
  const mermaid = initializeMermaid()
  if (!mermaid) throw new Error(NOT_LOADED_ERROR)
  // generate a unique ID for each render
  const { svg } = await mermaid.render(
    `mermaid-${Math.trunc(Math.random() * 1000000)}`,
    code
  )
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
