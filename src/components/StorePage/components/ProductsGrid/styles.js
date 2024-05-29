import { IconButton, styled } from '@mui/material'

export const FilterButton = styled(IconButton)`
  ${({ theme }) => `
    ${theme.breakpoints.up('md')} {
      display: none;
    }
  `}
`
