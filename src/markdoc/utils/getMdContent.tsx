import { parse, transform } from '@markdoc/markdoc'

export function getMdContent(raw: string | null | undefined, config = {}) {
  if (!raw) {
    return null
  }
  const ast = parse(raw)

  if (!ast) {
    return null
  }

  return transform(ast, config)
}
