import { Button, styled } from '@mui/material'
import { COLORS } from '../../../../constants/theme'

export const CheckoutButton = styled(Button)`
  background-color: ${COLORS.urbanBlack};
  color: white;
  margin-top: 18px;
  &:hover {
    background-color: ${COLORS.urbanBlack};
    opacity: 0.8;
  }
`
