import { styled } from '@mui/material'
import { MainGridContainer } from '../../../../styles'

export const DetailsContainer = styled(MainGridContainer)`
  padding: 32px 128px;
  & .ProductDetailsTitle-root {
    font-size: 1.6rem;
  }
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      padding: 8px;
    }
  `}
`
