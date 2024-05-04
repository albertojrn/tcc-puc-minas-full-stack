import { Drawer, styled } from '@mui/material'
import { DRAWER_WIDTH } from '../../../../constants/params'

export const DesktopDrawerContainer = styled(Drawer)`
  box-sizing: border-box;
  display: none;
  width: ${DRAWER_WIDTH}px;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      display: block;
    }
  `}
`
