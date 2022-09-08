import { Flex } from 'honorable'

import { Divider, Highlight } from '..'

const goCode = `package main

import "fmt"
          
func main() {
  fmt.Println("Hello, 世界")
}`

const jsCode = `function reverseString(str) {
  let newString = "";
  for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i];
  }
  return newString;
}`

const tfCode = `vpc_name = {{ .Values.vpc_name | quote }}
cluster_name = {{ .Cluster | quote }}

map_roles = [
  {
    rolearn = "arn:aws:iam::{{ .Project }}:role/{{ .Cluster }}-console"
    username = "console"
    groups = ["system:masters"]
  }
]


{{- if .Values.database_subnets }}
database_subnets = yamldecode(<<EOT
{{ .Values.database_subnets | toYaml }}
EOT
)
{{- end }}`

export default {
  title: 'Highlight',
  component: Highlight,
}

function Template() {
  return (
    <Flex
      width="600px"
      direction="column"
      gap="medium"
    >
      <Divider text="Go" />
      <Highlight language="go">{goCode}</Highlight>
      <Divider text="JavaScript" />
      <Highlight language="js">{jsCode}</Highlight>
      <Divider text="Terraform" />
      <Highlight language="tf">{tfCode}</Highlight>
    </Flex>
  )
}

export const Default = Template.bind({})
