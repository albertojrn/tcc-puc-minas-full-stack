import { Box, Button, styled } from '@mui/material'

export const IconsContainer = styled(Box)`
  display: flex;
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      display: none;
    }
  `}
`

export const LoginButton = styled(Button)`
  color: white;
  font-size: 0.8rem;
  &:hover {
    text-decoration: underline;
  }
`
