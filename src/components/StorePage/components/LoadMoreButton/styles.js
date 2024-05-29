import { Button, styled } from '@mui/material'
import { COLORS } from '../../../../constants/theme'

export const LoadButton = styled(Button)`
  background-color: ${COLORS.lightgray};
  margin-top: 32px;
  width: 60%;
  &:hover {
  background-color: ${COLORS.mediumgray};
  }
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      margin-top: 0;
      width: 100%;
    }
  `}
`
