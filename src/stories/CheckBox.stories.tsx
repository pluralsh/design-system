import Checkbox from '../components/Checkbox'

export default {
  title: 'Checkbox',
  component: Checkbox,
}

function Template(args: any) {
  console.log('args', args)

  return (
    <>
      <Checkbox>
        Implement design system
      </Checkbox>
      <Checkbox
        defaultChecked
        // {...args}
      >
        Party hard
      </Checkbox>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
}

export const Small = Template.bind({})
Small.args = {
  small: true,
}
