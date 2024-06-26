import { Box, styled } from '@mui/material'

export const IconsContainer = styled(Box)`
  display: none;
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      display: flex;
    }
  `}
`
