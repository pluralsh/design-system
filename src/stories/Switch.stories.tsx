import { Switch } from '..'

export default {
  title: 'Switch',
  component: Switch,
}

function Template(args: any) {
  return (
    <Switch
      {...args}
      onChange={(val) => {
        console.log('Switched changed to', val)
      }}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  children: 'Email notifications',
  disabled: false,
  readOnly: false,
}
