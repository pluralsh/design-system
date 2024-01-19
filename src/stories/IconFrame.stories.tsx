import { Div, Flex, H1, P } from 'honorable'

import {
  Card,
  IconFrame,
  type IconFrameProps,
  TrashCanIcon,
  WrapWithIf,
} from '../index'
import { type FillLevel } from '../components/contexts/FillLevelContext'

export default {
  title: 'Icon Frame',
  component: IconFrame,
  argTypes: {
    hue: {
      options: [undefined, 'default', 'lighter', 'lightest'],
      control: {
        type: 'select',
      },
    },
    onFillLevel: {
      options: [0, 1, 2, 3],
      control: {
        type: 'select',
        labels: {
          0: '0',
          1: '1',
          2: '2',
          3: "3 - Shouldn't be used",
        },
      },
    },
  },
}

type Type = 'secondary' | 'tertiary' | 'floating'

const types: Type[] = ['secondary', 'tertiary', 'floating']

const sizes: IconFrameProps['size'][] = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
]

function Template({
  clickable,
  selected,
  icon,
  textValue,
  tooltip,
  tooltipProps,
  onFillLevel,
  ...props
}: Partial<IconFrameProps> & {
  onFillLevel: FillLevel | undefined | null
}) {
  return (
    <WrapWithIf
      condition={onFillLevel > 0}
      wrapper={
        <Card
          fillLevel={onFillLevel}
          padding="small"
        />
      }
    >
      {types.map((type) => (
        <Div key={type}>
          <H1
            caption
            marginBottom="xxsmall"
          >
            type="{type}"
          </H1>
          <Flex
            gap="xsmall"
            marginBottom="xlarge"
            alignItems="center"
            flexWrap="wrap"
          >
            {sizes.map((size) => (
              <>
                <P caption>size="{size}"</P>
                <IconFrame
                  size={size || 'medium'}
                  clickable={clickable === undefined ? true : clickable}
                  selected={selected}
                  icon={icon || <TrashCanIcon />}
                  textValue={textValue || 'Delete'}
                  tooltip={tooltip}
                  tooltipProps={tooltipProps}
                  type={type}
                  {...props}
                />
              </>
            ))}
          </Flex>
        </Div>
      ))}
    </WrapWithIf>
  )
}

export const Default = Template.bind({})
Default.args = {
  clickable: true,
  selected: false,
  tooltip: true,
  tooltipProps: {
    displayOn: 'hover',
    placement: 'top',
  },
  textValue: 'Delete',
  onFillLevel: 0,
}
