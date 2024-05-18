import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { CarouselContainer, NoImageContainer } from '../../styles'

function ImageSlider({ options, selectedImages, sliderIndex, setSliderIndex }) {
  return (
    <CarouselContainer height='350px'>
      <Carousel
        activeIndex={sliderIndex}
        prevIcon={<ArrowBackIos />}
        nextIcon={<ArrowForwardIos />}
        onSelect={(selectedIndex) => setSliderIndex(selectedIndex)}
        {...options}
      >
        {selectedImages.length
          ? (
            selectedImages.map(img => (
              <Carousel.Item key={img.name}>
                <img src={img.dataUrl} alt={img.name} />
              </Carousel.Item>
            ))
          )
          : (
            <Carousel.Item>
              <NoImageContainer component='div' variant='h6'>
                Não há imagens do produto
              </NoImageContainer>
            </Carousel.Item>
          )}
      </Carousel>
    </CarouselContainer>
  )
}

export default ImageSlider