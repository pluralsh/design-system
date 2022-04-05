import Token from './Token'

export default {
  title: 'Token',
  component: Token,
}

function Template(args) {
  return (
    <Token
      {...args}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  children: 'jane.smith@plural.sh',
}
