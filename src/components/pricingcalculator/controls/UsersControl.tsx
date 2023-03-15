import { Dispatch } from 'react'

import Radio from '../../Radio'
import RadioGroup from '../../RadioGroup'

import Control from './Control'

const OPTIONS = [
  {
    value: '4',
    label: '4',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '30',
    label: '30',
  },
  {
    value: '60',
    label: '60*',
  },
]

type UsersControlProps = {
  users: number
  setUsers: Dispatch<number>
}

export default function UsersControl({
  users,
  setUsers,
}: UsersControlProps) {
  return (
    <Control
      header="How many users will access your clusters?"
      caption="Open-source users are free, but the professional plan has a $49/user fee."
    >
      <RadioGroup
        defaultValue={`${users}`}
        onChange={(s: string) => setUsers(parseInt(s))}
        display="flex"
        gap="medium"
      >
        {OPTIONS.map(({ value, label }) => (
          <Radio
            value={value}
            small
          >
            {label}
          </Radio>
        ))}
      </RadioGroup>
    </Control>
  )
}
