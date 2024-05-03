import { Box, styled } from '@mui/material'
import { NAVBAR_HEIGHT } from '../../constants/theme'

export const BarContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
`

export const LogoContainer = styled(Box)`
  margin-left: 24px;
  & img {
    height: 32px;
  }
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      display: none;
    }
  `}
`
