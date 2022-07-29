import styled, { useTheme } from 'styled-components'

import Divider from '../components/Divider'

import { mixins } from '../GlobalStyle'

export default {
  title: 'Semantic System',
  component: null,
}

const ItemLabel = styled.div`
  ${mixins.text.caption}
  margin-top: var(--space-xxsmall);
`

const BlockWrapper = styled.div`
  margin-bottom: var(--space-large);
`

const FilledBox = styled.div`
  width: 64px;
  height: 64px;
  background-color: var(--color-fill-one);
`

function Template({ exampleText }: { exampleText?: string }) {
  return (
    <>
      <Divider
        text="Colors"
        marginVertical="xxlarge"
      />
      <Colors />
      <Divider
        text="Shadows"
        marginVertical="xxlarge"
      />
      <Shadows />
      <Divider
        text="Border radiuses"
        marginVertical="xxlarge"
      />
      <BoxRadiuses />
      <Divider
        text="Spacing"
        marginVertical="xxlarge"
      />
      <Spacing />
      <Divider
        text="Typography"
        marginVertical="xxlarge"
      />
      <Typography exampleText={exampleText} />
    </>
  )
}

const ColorBox = styled(FilledBox)<{ color: string }>`
  box-shadow: var(--box-shadow-moderate);
  background-color: var(--color-${({ color }) => color});
`

const ColorBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-large);
  margin-right: var(--space-large);
  width: 64px;
`
const ColorsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function Colors() {
  const theme = useTheme()

  const colors = { ...theme.colors }

  delete colors.blue
  delete colors.grey
  delete colors.green
  delete colors.yellow
  delete colors.red

  return (
    <ColorsWrap>
      {Object.entries(colors).map(([key]) => (
        <ColorBoxWrap key={key}>
          <ColorBox color={`${key}`} />
          <ItemLabel>{key}</ItemLabel>
        </ColorBoxWrap>
      ))}
    </ColorsWrap>
  )
}

const ShadowedBox = styled(FilledBox)<{ shadow: string }>`
  box-shadow: var(--box-shadow-${({ shadow }) => shadow});
`

const ShadowsWrap = styled.div`
  background-color: var(--color-fill-three);
  padding: var(--space-large);
`

function Shadows() {
  return (
    <ShadowsWrap>
      {['slight', 'moderate', 'modal', 'focused'].map(key => (
        <BlockWrapper key={key}>
          <ShadowedBox shadow={key} />
          <ItemLabel>{key}</ItemLabel>
        </BlockWrapper>
      ))}
    </ShadowsWrap>
  )
}

const RadiusedBox = styled(FilledBox)<{ radius: 'medium' | 'large' }>`
  border-radius: var(--radius-${({ radius }) => radius});
`

function BoxRadiuses() {
  const radii: ('medium' | 'large')[] = ['medium', 'large']

  return (
    <>
      {radii.map(key => (
        <BlockWrapper key={key}>
          <RadiusedBox radius={key} />
          <ItemLabel>{key}</ItemLabel>
        </BlockWrapper>
      ))}
    </>
  )
}

const SpacingBox = styled.div<{ space: string }>`
  border-radius: 0;
  background-color: var(--color-action-primary);
  margin: 0;
  background-color: var(--color-action-primary);
  padding-right: ${({ space }) => `var(--space-${space})`};
  padding-top: ${({ space }) => `var(--space-${space})`};
  width: min-content;
  ${p => {
    console.log(p.theme.colors)
    console.log(p.theme.boxShadows)

    return ''
  }}
`

function Spacing() {
  return (
    <>
      {[
        'xxxsmall',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
        'xxxlarge',
        'xxxxlarge',
      ].map(key => (
        <BlockWrapper key={key}>
          <SpacingBox space={key} />
          <ItemLabel>{key}</ItemLabel>
        </BlockWrapper>
      ))}
    </>
  )
}

const SemanticText = styled.div<{ typeStyle?: keyof typeof mixins.text }>`
  ${({ typeStyle }) => [mixins.text[typeStyle]]}
  margin-bottom: var(--space-large);
`

function Typography({
  exampleText: txt = 'Lorem ipsum dolor sit amet',
}: {
  exampleText: string
}) {
  return (
    <>
      <SemanticText typeStyle="h1">H1 - {txt}</SemanticText>
      <SemanticText typeStyle="h2">H2 - {txt}</SemanticText>
      <SemanticText typeStyle="h3">H3 - {txt}</SemanticText>
      <SemanticText typeStyle="h4">H4 - {txt}</SemanticText>
      <SemanticText typeStyle="title1">Title 1 - {txt}</SemanticText>
      <SemanticText typeStyle="title2">Title 2 - {txt}</SemanticText>
      <SemanticText typeStyle="subtitle1">Subtitle 1 - {txt}</SemanticText>
      <SemanticText typeStyle="subtitle2">Subtitle 2 - {txt}</SemanticText>
      <SemanticText typeStyle="body1Bold">Body 1 (Bold) - {txt}</SemanticText>
      <SemanticText typeStyle="body1">Body 1 - {txt}</SemanticText>
      <SemanticText typeStyle="body2Bold">Body 2 (Bold) - {txt}</SemanticText>
      <SemanticText typeStyle="body2">Body 2 - {txt}</SemanticText>
      <SemanticText typeStyle="caption">Caption - {txt}</SemanticText>
      <SemanticText typeStyle="badgeLabel">Badge Label - {txt}</SemanticText>
      <SemanticText typeStyle="buttonLarge">Large Button - {txt}</SemanticText>
      <SemanticText typeStyle="buttonSmall">Small Button - {txt}</SemanticText>
      <SemanticText typeStyle="overline">Overline - {txt}</SemanticText>
    </>
  )
}

export const SemanticSystem = Template.bind({})
SemanticSystem.args = {
  exampleText: 'Lorem ipsum dolor sit amet',
}
