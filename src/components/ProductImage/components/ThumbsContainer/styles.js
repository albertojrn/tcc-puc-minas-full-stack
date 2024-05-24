import { IconButton, styled } from '@mui/material'

export const DeleteImageIcon = styled(IconButton)`
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0.4;
  padding: 2px;
  position: absolute;
  right: 0;
  top: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
  & svg {
    height: 0.7em;
    width: 0.7em;
  }
`
