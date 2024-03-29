import { Tag } from '@markdoc/markdoc'

import { CodeTabs } from '../components/CodeTabs'
import { type BaseSchema, isTag } from '../types'

export const codetabs: BaseSchema = {
  render: CodeTabs,
  description: 'Display horizontal tabs in a box',
  children: ['tab'],
  attributes: {
    title: { type: String, required: false },
  },
  transform(node, config) {
    const tabs = node
      .transformChildren(config)
      .filter((child): child is Tag => isTag(child) && child?.name === 'Fence')
      .map((fence) => ({
        ...fence.attributes,
        children: fence.children,
      }))

    return new Tag(
      this.render as any,
      { ...node.transformAttributes(config), tabs },
      node.transformChildren(config)
    )
  },
}
