import { Flex } from 'honorable'

import { Code } from '..'

export default {
  title: 'Code',
  component: Code,
}

function Template() {
  return (
    <Flex
      direction="column"
      gap="medium"
    >
      <Code language="js">
        {`
          function reverseString(str) {
            let newString = "";
            for (let i = str.length - 1; i >= 0; i--) {
                newString += str[i];
            }
            return newString;
          }
        `}
      </Code>
      <Code language="go">
        {`
          package main

          import "fmt"
          
          func main() {
            fmt.Println("Hello, 世界")
          }
        `}
      </Code>
    </Flex>
  )
}

export const Default = Template.bind({})
