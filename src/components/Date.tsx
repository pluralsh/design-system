import { Flex, Span } from 'honorable'

import moment from 'moment'

export default function Date({ date }: {date: moment.MomentInput}) {
  if (!date) return (<Span>n/a</Span>)

  return (
    <Flex direction="column">
      <Span whiteSpace="nowrap">{moment(date).format('ll')}</Span>
      <Span
        caption
        color="text-xlight"
        whiteSpace="nowrap"
      >
        {moment(date).format('h:mm A')}
      </Span>
    </Flex>
  )
}
