import Slider from '../components/Slider'

export default {
  title: 'Slider',
  component: Slider,
}

function Template(args: any) {
  return <Slider {...args} />
}

export const Default = Template.bind({})
Default.args = {
  label: 'Applications',
  defaultValue: 30,
  minValue: 1,
  maxValue: 100,
  tooltip: true,
}
