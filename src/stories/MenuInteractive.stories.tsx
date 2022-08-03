import { Div } from 'honorable'

import { ListBox } from '../components/ListBox'
import { ListBoxItem } from '../components/ListBoxItem'

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
          <ListBoxItem
            key={item}
            label={`label: ${item}`}
          >
            {item}
          </ListBoxItem>
        ))}
      </ListBox>
    </Div>
  )
}

export const Default = Template.bind({})

Default.args = {}
