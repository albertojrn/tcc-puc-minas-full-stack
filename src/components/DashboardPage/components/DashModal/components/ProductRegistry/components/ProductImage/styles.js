import { styled } from '@mui/material'

export const CarouselContainer = styled('div', { shouldForwardProp: prop => !['height'].includes(prop)})`
  ${({ height }) => height && `height: ${height};`}
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
