import { Children, type ReactElement, type Ref, forwardRef } from 'react'
import { Div, P } from 'honorable'

import Carousel, { type CarouselProps } from './Carousel'

function TipCarouselRef({ children, ...props }: CarouselProps, ref: Ref<any>) {
  return (
    <Carousel
      ref={ref}
      {...props}
    >
      {Children.map(children, (child: ReactElement) => (
        <Div
          width="100%"
          paddingTop="medium"
          paddingBottom="medium"
          paddingHorizontal="medium"
          mb={-0.5}
        >
          <P
            body2
            color="text-light"
            fontStyle="italic"
            textAlign="center"
            {...props}
          >
            {child}
          </P>
        </Div>
      ))}
    </Carousel>
  )
}

const TipCarousel = forwardRef(TipCarouselRef)

export default TipCarousel
