import { Box, Button, Grid, Stack, TextField, Typography, styled } from '@mui/material'
import { COLORS, NAVBAR_HEIGHT } from './constants/theme'
import { formatCssProp } from './utils/cssMethods'

export const AppBarContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
`

export const ContentMainConatiner = styled('div')`
  display: flex;
  justify-content: center;
  padding: 8px;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      padding: 24px;
    }
  `}
`

export const FormTextField = styled(TextField)`
  & .MuiInputAdornment-root button.MuiButtonBase-root {
    padding: 0;
  }
  & .MuiFormHelperText-root {
    color: red;
  }
`
export const GridItem = styled(Grid, { shouldForwardProp: prop => !['alignItems', 'direction', 'justifyContent', 'isFlex'].includes(prop) })`
  ${({ alignItems }) => alignItems && `align-tems: ${alignItems};`}
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ isFlex }) => isFlex && 'display: flex;'}
`

export const MainGridContainer = styled(Grid, { shouldForwardProp: prop => !['drawBorder', 'height', 'marginTop', 'maxWidth', 'minWidth', 'width'].includes(prop) })`
  ${({ height, theme }) => height && formatCssProp('height', height, theme)}
  ${({ maxWidth, theme }) => maxWidth && formatCssProp('max-width', maxWidth, theme)}
  ${({ minWidth, theme }) => minWidth && formatCssProp('min-width', minWidth, theme)}
  ${({ width, theme }) => width && formatCssProp('width', width, theme)}
  ${({ drawBorder }) => drawBorder && `
    border: 1px solid ${COLORS.lightBorder};
    border-radius: 8px;
    padding: 8px;
  `}
  ${({ marginTop, theme }) => marginTop && formatCssProp('margin-top', marginTop, theme)}
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

export const StackedFormContainer = styled(Stack)`
  border: 1px solid ${COLORS.lightBorder};
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      min-width: 370px;
      padding: 24px;
      width: 25%;
    }
  `}
`
export const ViewboxContainer = styled(Box)`
  --menu-height: ${NAVBAR_HEIGHT}px;
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      height: calc(100vh - var(--menu-height) - (2 * 24px));
    }
  `}
`
