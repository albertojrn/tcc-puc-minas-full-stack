import { styled } from '@mui/material'

export const CarouselContainer = styled('div')`
  & img {
    height: auto;
    max-width: 100%;
    object-fit: contain;
  }
  & .carousel-item {
    text-align: center;
  }
  & .MuiSvgIcon-root {
    fill: black;
  }
`
