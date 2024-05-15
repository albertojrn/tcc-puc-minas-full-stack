import { Dialog, styled } from '@mui/material'

export const DialogContainer = styled(Dialog)`
  & form { 
    width: 60%;
    max-width: unset;
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      height: 100%;
      margin: 0;
      max-height: unset;
      width: 100%;
    }
  `}
  }
`
