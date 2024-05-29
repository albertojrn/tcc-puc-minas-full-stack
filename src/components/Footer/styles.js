import { Stack, styled } from '@mui/material'
import { COLORS } from '../../constants/theme'

export const FooterContainer = styled(Stack)`
  padding: 12px 48px;
  background-color: ${COLORS.urbanBlack};
  box-shadow: 0px -1px 10px 0px rgba(0,0,0,0.1);
  color: ${COLORS.urbanBeige};
  & svg {
    fill: ${COLORS.urbanBeige};
  }
`
