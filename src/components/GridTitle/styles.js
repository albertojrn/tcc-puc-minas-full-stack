import { styled, Typography } from '@mui/material'

export const Title = styled(Typography)`
  margin-left: 48px;
  font-size: 1.6rem;
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      margin-left: 0;
      font-size: 1.1rem;
      font-weight: bold;
    }
  `}
`
