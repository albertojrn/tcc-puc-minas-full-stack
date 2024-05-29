import { Box, Stack, styled } from '@mui/material'

export const LogoContainer = styled(Box)`
  & img {
    height: 80px;
  }
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      & img {
        height: 40px;
        margin-left: 8px;
      }
    }
  `}
`

export const ContentContainer = styled(Stack)`
  flex-grow: 1;
`

export const MiddleContentContainer = styled(Stack)`
  flex-grow: 1;
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      & .MuiBox-root {
        display: none;
      }
    }
  `}
`

export const MobileSearchFormContainer = styled('div', { shouldForwardProp: prop => !['open'].includes(prop) })`
  display: ${({ open }) => (open ? 'block' : 'none')};
  width: 100%;
`
