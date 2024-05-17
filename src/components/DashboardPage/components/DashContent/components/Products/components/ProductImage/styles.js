import { Typography, styled } from '@mui/material'

export const CarouselContainer = styled('div', { shouldForwardProp: prop => !['height', 'sideBySide', 'width'].includes(prop) })`
  ${({ width }) => width && `width: ${width};`}
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
  ${({ height }) => height && `
    height: ${height};
    & img {
      height: ${height};
      width: ${height};
    }
    & .carousel-item {
      height: ${height};
    }
  `}
  ${({ sideBySide, height }) => sideBySide && `
    & .carousel {
      pading-left: 15%;
      padding-right: 15%;
      overflow: hidden;
    }
    & .carousel-inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 15%;
      margin-right: 15%;
      width: auto;
      overflow: hidden;
    }
    & .carousel-item {
      display: inline-block;
      margin-right: unset;
      padding: 4px;
      width: unset;
      ${height && `
        width: ${height};
      `}
      flex-shrink: 0;
    }
    & .carousel-item:not(.active) img {
      opacity: 0.2;
    }
  `}
`

export const NoImageContainer = styled(Typography)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`
