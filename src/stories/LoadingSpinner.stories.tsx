import LoadingSpinner, { LoadingSpinnerProps } from '../components/LoadingSpinner'

export default {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Template(args: LoadingSpinnerProps) {
  return (
    <LoadingSpinner {...args} />
  )
}

export const Primary = Template.bind({})

Primary.args = {
  show: true,
  spinnerDelay: 200,
}
