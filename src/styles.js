import { Button, Typography, styled } from '@mui/material'

export const AppContent = styled('div')`
  padding: 8px;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      padding: 24px;
    }
  `}
`

export const MinimalButton = styled(Button, {
  shouldForwardProp: prop => !['noMinWidth', 'noPadding'].includes(prop)
})`
  color: black;
  font-size: 0.68rem;
  padding-bottom: 0;
  padding-top: 0;
  width: fit-content;
  &.MuiButtonBase-root {
    margin-left: auto;
    margin-right: 0;
  }
  &:hover {
    background-color: unset;
    text-decoration: underline;
  }
  ${({ noMinWidth }) => noMinWidth && 'min-width: unset;'}
  ${({ noPadding }) => noPadding && 'padding: 0;'}
`

export const MinimalText = styled(Typography)`
  color: black;
  font-size: 0.85rem;
`
