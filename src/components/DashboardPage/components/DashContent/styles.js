import { Box, styled } from '@mui/material'
import { DRAWER_WIDTH } from '../../constants/params'
import { NAVBAR_MIN_HEIGHT, NAVBAR_MIN_HEIGHT_MOBILE } from '../../../../constants/theme'

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
    ${theme.breakpoints.down('md')} {
      margin-top: ${NAVBAR_MIN_HEIGHT_MOBILE}px;
    }
  `}
  ${({ theme }) => `
    ${theme.breakpoints.up('md')} {
      margin-top: ${NAVBAR_MIN_HEIGHT}px;
      margin-left: ${DRAWER_WIDTH}px;
      /* width: calc(100vw - ${DRAWER_WIDTH}px - ${CONTAINER_PADDING}px - ${CONTAINER_PADDING}px); */
    }
  `}
`
