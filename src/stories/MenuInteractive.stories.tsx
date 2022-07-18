import { Item, ListBox } from '../components/ListBox'

export default {
  title: 'Menu Interactive',
  component: ListBox,
}

const items = ['Ratatouille', 'Pizza', 'Sushi', 'Couscous', 'Dim Sum']

function Template() {
  return (
    <ListBox
      label="Choose an option"
      selectionMode="single"
    >
      {items.map(item => (
        <Item key={item}>{item}</Item>
      ))}
    </ListBox>
  )
}

export const Default = Template.bind({})

Default.args = {}
