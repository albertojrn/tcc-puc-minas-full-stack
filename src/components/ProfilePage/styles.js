import { Tabs, styled } from '@mui/material'
import { COLORS } from '../../constants/theme'

export const TabsOptions = styled(Tabs)`
  & button {
    color: ${COLORS.urbanBlack};
    &.Mui-selected {
      color: black;
    }
  }
`
