import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { CarouselContainer } from '../../../ProductImage/styles'

function BigCarousel() {
  const [sliderIndex, setSliderIndex] = useState(0)
  let controlsColor = 'white'
  if ([2].includes(sliderIndex)) controlsColor = 'black'
  return (
    <CarouselContainer controlsColor={controlsColor}>
      <Carousel
        activeIndex={sliderIndex}
        prevIcon={<ArrowBackIos />}
        nextIcon={<ArrowForwardIos />}
        onSelect={(selectedIndex) => setSliderIndex(selectedIndex)}
      >
        <Carousel.Item>
          <img src={`${process.env.PUBLIC_URL}/big_carousel_images/Banner_Keep_Running.jpg`} alt='banner_img' />
        </Carousel.Item>
        <Carousel.Item>
          <img src={`${process.env.PUBLIC_URL}/big_carousel_images/Banner_Nike.jpg`} alt='banner_img' />
        </Carousel.Item>
        <Carousel.Item>
          <img src={`${process.env.PUBLIC_URL}/big_carousel_images/Banner_Sale.jpg`} alt='banner_img' />
        </Carousel.Item>
      </Carousel>
    </CarouselContainer>
  )
}

export default BigCarousel
