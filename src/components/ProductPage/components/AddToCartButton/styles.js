import { styled } from '@mui/material'
import { COLORS } from '../../../../constants/theme'

export const CartButtonContainer = styled('div', { shouldForwardProp: prop => !['showAddedIcon'].includes(prop) })`
  & button {
    &:hover {
      background-color: ${({ showAddedIcon, theme }) => (showAddedIcon ? theme.palette.success : COLORS.urbanBlack)};
      color: white;
    }
  }
`
