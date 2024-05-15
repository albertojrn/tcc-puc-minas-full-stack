import { Box, styled } from '@mui/material'

export const LogoContainer = styled(Box)`
  margin-left: 24px;
  & img {
    height: 58px;
  }
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      display: none;
    }
  `}
`
