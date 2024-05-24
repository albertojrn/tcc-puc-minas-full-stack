import { Stack, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import { COLORS } from '../../constants/theme'

export const CardContainer = styled(Stack)`
  border: 1px solid ${COLORS.lightBorder};
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  & .ProductCardImg-root {
    height: 164px;
    width: 100%;
    overflow: hidden;
    & img {
      aspect-ratio: 1 / 1;
      object-fit: contain;
      width: 100%;
    }
  }
  & .ProductCardTitle-root {
    font-size: 1rem;
    line-height: 1.5;
    word-break: break-all;
    &:hover {
      text-decoration: underline;
    }
  }
  & .ProductCardPrice-root {
    margin-top: 18px;
    font-size: 1.3rem;
    line-height: 1.2;
    font-stretch: expanded;
  }
  & .MuiDivider-root {
    border-color: ${COLORS.lightBorder};
    border-bottom-width: 2px;
  }
  & .ProductCardPrice-label {
    font-size: 1.0;
    color: ${COLORS.urbanBlack};
  }
`

export const LinkContainer = styled(Link)`
text-decoration: none;
  &:active {
    color: black;
  }
  &:visited {
    color: black;
  }
`
