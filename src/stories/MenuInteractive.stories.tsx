import { Div } from 'honorable'

import { Item, ListBox } from '../components/ListBox'

export default {
  title: 'Menu Interactive',
  component: ListBox,
}

const items = ['Ratatouille', 'Pizza', 'Sushi', 'Couscous', 'Dim Sum']

function Template() {
  return (
    <Div maxWidth={256}>
      <ListBox
        label="Choose an option"
        selectionMode="single"
        width="100%"
      >
        {items.map(item => (
          <Item key={item}>{item}</Item>
        ))}
      </ListBox>
    </Div>
  )
}

export const Default = Template.bind({})

Default.args = {}
