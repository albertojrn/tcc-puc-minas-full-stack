import { Stack, styled } from '@mui/material'

export const ChipsContainer = styled(Stack)`
  flex-wrap: wrap;
  row-gap: 8px;
  & svg {
    height: 0.6em;
    width: 0.6em;
  }
`

export const SelectedFilters = styled(Stack)`
  padding-left: 12px;
  padding-right: 12px;
`
