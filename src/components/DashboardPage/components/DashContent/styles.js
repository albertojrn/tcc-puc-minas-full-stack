import { Box, styled } from '@mui/material'
import { DRAWER_WIDTH } from '../../constants/params'

const CONTAINER_PADDING = 24

export const ContentContainer = styled(Box)`
  display: flex;
  flex-grow: 1;
`

export const DashboardContentContainer = styled(Box)`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding: ${CONTAINER_PADDING}px;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      margin-left: ${DRAWER_WIDTH}px;
      width: calc(100% - ${DRAWER_WIDTH}px - ${CONTAINER_PADDING}px - ${CONTAINER_PADDING}px);
    }
  `}
`
