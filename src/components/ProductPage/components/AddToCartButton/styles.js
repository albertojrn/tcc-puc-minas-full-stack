import { styled } from '@mui/material'
import { COLORS } from '../../../../constants/theme'

export const CartButtonContainer = styled('div')`
  & button {
    &:hover {
      background-color: ${COLORS.urbanBlack};
      color: white;
    }
  }
`
