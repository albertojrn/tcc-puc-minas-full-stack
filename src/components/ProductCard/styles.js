import { Stack, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import { COLORS } from '../../constants/theme'

export const CardContainer = styled(Stack)`
  border: 1px solid ${COLORS.lightBorder};
  border-radius: 8px;
  padding: 20px;
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
    font-size: 0.95rem;
    line-height: 1.5rem;
    max-height: 3rem;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      text-decoration: underline;
    }
  }
  & .ProductCardPrice-root {
    margin-top: 6px;
    font-size: 1.3rem;
    line-height: 1.6rem;
    font-stretch: expanded;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  & .ProductCardPrice-label {
    font-size: 0.9rem;
    line-height: 1.1rem;
    color: ${COLORS.urbanBlack};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 20px;
  }
`

export const LinkContainer = styled(Link)`
text-decoration: none;
  &:active, &:hover, &:visited, &:link {
    color: black;
  }
`
