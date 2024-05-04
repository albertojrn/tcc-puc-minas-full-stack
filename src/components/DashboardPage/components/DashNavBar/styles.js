import { AppBar, IconButton, styled } from '@mui/material'
import { DRAWER_WIDTH } from '../../constants/params'

export const Container = styled(AppBar)`
${({ theme }) => `
  ${theme.breakpoints.up('sm')} {
    margin-left: ${DRAWER_WIDTH}px;
  }
`}
`

export const MenuIconButton = styled(IconButton)`
  margin-right: 8px;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      display: none;
    }
  `}
`
