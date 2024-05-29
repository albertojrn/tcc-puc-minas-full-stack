import { Box, InputBase, styled } from '@mui/material'

export const SearchContainer = styled(Box)`
  align-items: center;
  background-color: white;
  border-radius: 8px;
  border: 1px solid white;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  position: relative;
`

export const SearchInput = styled(InputBase)`
  color: white;
  & svg {
    fill: black;
    margin-left: 8px;
    z-index: 2;
  }
  & .MuiInputBase-input {
    color: black;
    padding-left: 24px;
    width: 100%;
  }
`
