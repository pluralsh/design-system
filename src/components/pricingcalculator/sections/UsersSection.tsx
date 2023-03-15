import { Dispatch } from 'react'

import Radio from '../../../components/Radio'
import RadioGroup from '../../../components/RadioGroup'
import Section from '../Section'

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

export type UsersSectionProps = {
  users: number
  setUsers: Dispatch<number>
}

export default function UsersSection({
  users,
  setUsers,
}: UsersSectionProps) {
  return (
    <Section
      header="How many users will access your clusters?"
      caption="Open-source users are free, but the professional plan has a $39/user fee."
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
    </Section>
  )
}
