import { Tag } from '@markdoc/markdoc'

import Code from '../components/Code'
import { type BaseSchema } from '../types'

export const code: BaseSchema = {
  render: Code,
  attributes: {
    content: { type: String, render: false, required: true },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)

    return new Tag(this.render as any, attributes, [node.attributes.content])
  },
}
