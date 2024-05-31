import { Box, Stack, Typography, styled } from '@mui/material'

export const IconsContainer = styled(Box)`
  display: flex;
  & .hideInMobile {
    ${({ theme }) => `
      ${theme.breakpoints.down('md')} {
        display: none;
      }
    `}
  }
  & .hideInDesktop {
    ${({ theme }) => `
      ${theme.breakpoints.up('md')} {
        display: none;
      }
    `}
  }
`
export const LoginContainer = styled(Stack)`
  cursor: pointer;
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `}
`

export const LoginText = styled(Typography)`
  font-size: 0.75rem;
  line-height: 1;
  &:hover {
    text-decoration: underline;
  }
`
