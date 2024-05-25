import { Typography, styled } from '@mui/material'

export const PriceLabel = styled(Typography)`
  font-size: 2.4rem;
  font-stretch: condensed;
  margin-top: 24px;
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      margin-top: 0;
    }
  `}
`
