import { Card, styled } from '@mui/material'

export const CardContainer = styled(Card)`
  border-radius: 8px;
  height: 100%;
  & .MuiCardContent-root {
    margin-bottom: 16px;
    height: 280px;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 0px;
  }
  & .MuiCardHeader-content span {
    text-transform: uppercase;
  }
  & .MuiCardActions-root {
    justify-content: end;
  }
  & .MuiListItemSecondaryAction-root {
    right: 0;
    & svg {
      height: 0.8em;
      width: 0.8em;
    }
  }
`
