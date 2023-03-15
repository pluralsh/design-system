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
  minValue: 0,
  maxValue: 100,
  tickStep: 10,
  tooltip: true,
  size: 600,
}
