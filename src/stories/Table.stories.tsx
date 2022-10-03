import { createColumnHelper } from '@tanstack/react-table'

import { Table } from '..'

type Person = {
  function: string
  inputType: string
  returnedValue: string
  description: string
}

const defaultData: Person[] = [
  {
    function: 'fileExists',
    inputType: 'Path (string)',
    returnedValue: 'Boolean',
    description: 'Joins parts of a path',
  },
  {
    function: 'pathJoin',
    inputType: 'Object (interface{}), Path (string), Value (interface{})',
    returnedValue: 'String',
    description: 'Allows for getting values from other applications...',
  },
  {
    function: 'repoRoot',
    inputType: 'fileExists',
    returnedValue: 'String',
    description: 'Allows for getting values from other applications stored in the contex file. For   example, to use the hostname configured for Grafana in another application {{ .Configuration.grafana.hostname }} can be used.',
  },
  {
    function: 'repoName',
    inputType: 'Object (interface{}), Path (string), Value (interface{})',
    returnedValue: 'String',
    description: 'Allows for getting values from other applications...',
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor(row => row.function, {
    id: 'function',
    cell: (info: any) => info.getValue(),
    header: () => <span>Function</span>,
  }),
  columnHelper.accessor(row => row.inputType, {
    id: 'inputType',
    cell: (info: any) => <span>{info.getValue()}</span>,
    header: () => <span>Input (type)</span>,
  }),
  columnHelper.accessor(row => row.returnedValue, {
    id: 'returnedValue',
    cell: (info: any) => <span>{info.getValue()}</span>,
    header: () => <span>Returned value</span>,
  }),
  columnHelper.accessor(row => row.description, {
    id: 'description',
    cell: (info: any) => <span>{info.getValue()}</span>,
    header: () => <span>Description</span>,
  }),
]

export default {
  title: 'Table',
  component: Table,
}

function Template(args: any) {
  return (
    <Table
      data={Array(70).fill(defaultData).flat()}
      columns={columns}
      {...args}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  width: '800px',
  height: '320px',
}
