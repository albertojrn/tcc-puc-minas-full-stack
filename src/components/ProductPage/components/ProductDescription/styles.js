import { Stack, styled } from '@mui/material'
import { COLORS } from '../../../../constants/theme'

export const DescriptionContainer = styled(Stack)`
  & button {
    color: ${COLORS.urbanBlack};
    font-size: 0.7rem;
    padding-left: 0;
    padding-right: 0;
    width: fit-content;
  }
`
