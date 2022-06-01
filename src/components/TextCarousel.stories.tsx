import { A } from 'honorable'

import Carousel, { TextCarousel } from './TextCarousel'

export default {
  title: 'Text Carousel',
  component: Carousel,
  argTypes: { progress: { control: { type: 'range', min: 0, max: 1, step: 0.05 } } },
}

function Template(args: any) {
  return (
    <TextCarousel
      {...args}
    >
      <>You can use service accounts to have an entire team manage a set of installations for one of your plural clusters, learn more <A href="#">here</A>.</>
      <>You can use <b>plural shell sync</b> to transfer your state from the Plural Cloud Shell to the command line.</>
      <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</>
      <>Sed ut perspiciatis unde <b>omnis</b> iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</>
    </TextCarousel>
  )
}

export const Default = Template.bind({})
Default.args = {

}
