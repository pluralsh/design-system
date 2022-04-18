import { Box } from 'grommet'
import styled from 'styled-components'

const Container = styled(Box)`
  border-radius: 4px;
  overflow: hidden;
`

function Menu(props) {
  return (
    <Container
      direction="column"
      justify="stretch"
      background="background-contrast"
      {...props}
    />
  )
}

export default Menu
