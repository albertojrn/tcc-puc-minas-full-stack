import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material'
import { CarouselContainer } from '../../styles'
import { DeleteImageIcon } from './styles'

function ThumbsContainer({ isRegistry, selectedImages, setSelectedImages, sliderIndex, setSliderIndex }) {
  function handleDeleteImage(name, index) {
    setSelectedImages(prev => {
      const newSelectedImages = prev.filter(img => img.name !== name)
      const newLength = newSelectedImages.length
      setSliderIndex(prevIndex => {
        if (newLength === 0 && index === 0 && prevIndex !== 0) return 0
        if (index > newLength - 1 && newLength > 0) return newLength - 1
        return prev
      })
      return newSelectedImages
    })
  }

  useEffect(() => {
    const thumbsContainer = document.getElementById('thumbs-container')
    const innerCarrousel = thumbsContainer.getElementsByClassName('carousel-inner')[0]
    const childs = innerCarrousel.children
    if (childs[sliderIndex]) {
      innerCarrousel.scrollTo({
        top: 0,
        left: childs[sliderIndex].offsetLeft,
        behavior: 'smooth',
      })
    }
  }, [sliderIndex])

  return (
    <CarouselContainer id='thumbs-container' height='80px' sideBySide>
      <Carousel
        activeIndex={sliderIndex}
        indicators={false}
        interval={null}
        nextIcon={<ArrowForwardIos />}
        onSelect={(selectedIndex) => setSliderIndex(selectedIndex)}
        prevIcon={<ArrowBackIos />}
        touch={true}
        slide={false}
      >
        {selectedImages.length
          ? (
            selectedImages.map((img, i) => (
              <Carousel.Item key={img.name}>
                <img src={img.dataUrl ?? `${process.env.PUBLIC_URL}/images/${img}`} alt={img.name ?? img} />
                {isRegistry && (
                <DeleteImageIcon onClick={() => handleDeleteImage(img.name, i)}>
                  <Close />
                </DeleteImageIcon>
                )}
              </Carousel.Item>
            ))
          )
          : (
            <Carousel.Item />
          )}
      </Carousel>
    </CarouselContainer>
  )
}

export default ThumbsContainer
