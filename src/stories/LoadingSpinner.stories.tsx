import LoadingSpinner from '../components/LoadingSpinner'

export default {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Template(args: any) {
  return (
    <LoadingSpinner />
  )
}

export const Primary = Template.bind({})

Primary.args = {
}
