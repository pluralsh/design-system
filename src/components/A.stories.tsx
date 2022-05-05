import { A, Div } from 'honorable'

export default {
  title: 'A',
  component: A,
}

function Template(args: any) {
  return (
    <Div xflex="y1">
      <A {...args} />
      <A
        mt={1}
        href="https://github.com"
        {...args}
      />
    </Div>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  children: 'Click me',
}
