import { styled } from '@mui/material'

export const LoadingScreen = styled('div')`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000000;
`

export const SpinnerContainer = styled('div')`
  align-items: center;
  background-color: white;
  border-radius: 16px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  padding: 32px;
`
