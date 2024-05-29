import { Box, styled } from '@mui/material'
import { DRAWER_WIDTH } from '../../constants/params'
import { NAVBAR_MIN_HEIGHT } from '../../../../constants/theme'

export const DrawerContainer = styled(Box)`
  ${({ theme }) => `
    ${theme.breakpoints.up('md')} {
      flex-shrink: 0;
      width: ${DRAWER_WIDTH}px;
      & .MuiDrawer-paper {
        margin-top: ${NAVBAR_MIN_HEIGHT + 12}px;
      }
    }
  `}
`
