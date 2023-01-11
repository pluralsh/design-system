import { Date } from '..'

export default {
  title: 'Date',
  component: Date,
}

function Template() {
  return (<Date date="2016-01-08T00:00:00-06:00" />)
}

export const Default = Template.bind({})

Default.args = {
  date: '2016-01-08T00:00:00-06:00',
}
