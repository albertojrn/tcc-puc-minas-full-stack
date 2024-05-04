import { Drawer, styled } from '@mui/material'
import { DRAWER_WIDTH } from '../../../../constants/params'

export const MobileDrawerContainer = styled(Drawer)`
  box-sizing: border-box;
  display: block;
  width: ${DRAWER_WIDTH}px;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      display: none;
    }
  `}
`
