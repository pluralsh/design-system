import { Div } from 'honorable'

import { ListBox, ListItemBasic } from '../components/ListBox'

export default {
  title: 'Menu Interactive',
  component: ListItemBasic,
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
          <ListItemBasic
            key={item}
            label={`label: ${item}`}
          >
            {item}
          </ListItemBasic>
        ))}
      </ListBox>
    </Div>
  )
}

export const Default = Template.bind({})

Default.args = {}
