import { Flex, H1 } from 'honorable'

import Button from '../components/Button'
import DownloadIcon from '../components/icons/DownloadIcon'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    padding: {
      options: ['', 'none'],
      control: {
        type: 'select',
        labels: {
          // Can't have empty string as key for labels
          // Breaks controls for every other component that appears after this
          // '': 'Enabled',
          none: 'none',
        },
      },
    },
  },
}

function TemplateBase(args: any) {
  return (
    <Flex
      direction="row"
      gap="medium"
      wrap="wrap"
      alignItems="center"
    >
      <Button
        large
        {...args}
      />
      <Button
        large
        startIcon={<DownloadIcon />}
        endIcon={<DownloadIcon />}
        {...args}
      />
      <Button {...args} />
      <Button
        startIcon={<DownloadIcon />}
        endIcon={<DownloadIcon />}
        {...args}
      />
      <Button
        small
        {...args}
      />
      <Button
        small
        startIcon={<DownloadIcon />}
        endIcon={<DownloadIcon />}
        {...args}
      />
    </Flex>
  )
}

function Template(args: any) {
  return (
    <>
      <H1
        subtitle2
        marginBottom="small"
      >
        Enabled
      </H1>
      <TemplateBase {...args} />
      <H1
        subtitle2
        marginTop="large"
        marginBottom="small"
      >
        Disabled
      </H1>
      <TemplateBase
        {...args}
        disabled
      />
    </>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  disabled: false,
  loading: false,
  pulse: false,
  children: 'Primary Button',
}

export const SecondaryFloating = Template.bind({})

SecondaryFloating.args = {
  disabled: false,
  loading: false,
  children: 'Floating Button',
  floating: true,
}

export const SecondaryOutline = Template.bind({})

SecondaryOutline.args = {
  disabled: false,
  loading: false,
  children: 'Secondary Button',
  secondary: true,
}

export const Tertiary = Template.bind({})

Tertiary.args = {
  disabled: false,
  loading: false,
  children: 'Tertiary Button',
  tertiary: true,
  padding: '',
}

export const TertiaryNoPadding = Template.bind({})

TertiaryNoPadding.args = {
  disabled: false,
  loading: false,
  children: 'Tertiary Button',
  tertiary: true,
  padding: 'none',
}

export const Destructive = Template.bind({})

Destructive.args = {
  disabled: false,
  loading: false,
  children: 'Destructive Button',
  destructive: true,
}
