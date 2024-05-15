import { Stack, styled } from '@mui/material'

export const ToolboxContainer = styled(Stack)`
  display: none;
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      display: flex;
    }
  `}
`
