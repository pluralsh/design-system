import PricingCalculator from '../components/PricingCalculator'

export default {
  title: 'PricingCalculator',
  component: PricingCalculator,
}

function Template(args: any) {
  return (
    <PricingCalculator
      {...args}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  expandedDefault: true,
}
