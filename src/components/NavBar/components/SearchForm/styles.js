import { Box, InputBase, styled } from '@mui/material'
import { COLORS } from '../../../../constants/theme'

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
  width: 100%;
  & svg {
    fill: ${COLORS.darkgray};
    z-index: 2;
    width: 0.95em;
    height: 0.95em;
    margin-right: 8px;
    cursor: pointer;
  }
  & .MuiInputBase-input {
    padding-left: 12px;
    color: ${COLORS.darkgray};
    width: 100%;
  }
`
