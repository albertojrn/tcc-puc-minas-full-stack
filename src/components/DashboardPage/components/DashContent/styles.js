import { Box, styled } from '@mui/material'
import { DRAWER_WIDTH } from '../../constants/params'

export const ContentContainer = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      margin-left: ${DRAWER_WIDTH}px;
      width: calc(100% - ${DRAWER_WIDTH}px);
    }
  `}
`
