import { Box, Stack, styled } from '@mui/material'

export const LogoContainer = styled(Box)`
  & img {
    height: 72px;
  }
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      display: none;
    }
  `}
`

export const ContentContainer = styled(Stack)`
  flex-grow: 1;
`

export const MiddleContentContainer = styled(Stack)`
  flex-grow: 1;
`
