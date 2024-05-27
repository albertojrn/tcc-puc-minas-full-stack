import { Link } from 'react-router-dom'
import { Box, Button, Divider, Grid, Stack, TextField, Typography, styled } from '@mui/material'
import { COLORS, NAVBAR_HEIGHT } from './constants/theme'
import { formatCssProp } from './utils/cssMethods'

export const AppBarContainer = styled(Box)`
  background-color: ${COLORS.urbanBeige};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
`

export const CenterModalContainer = styled(Box, { shouldForwardProp: prop => !['height', 'width'].includes(prop) })`
  background-color: white;
  left: 50%;
  padding: 24px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => width ?? '400px'};
  ${({ height }) => height && `height: ${height};`}
  overflow-x: hidden;
  overflow-y: auto;
  ${({ theme }) => `
    ${theme.breakpoints.down('md')} {
      height: 100%;
      width: 100%;
    }
  `}
`

export const Color = styled('span', { shouldForwardProp: prop => !['color'].includes(prop) })`
  ${({ color }) => color && `color: ${color}`}
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
export const CustomDivider = styled(Divider, { shouldForwardProp: prop => !['color', 'margin', 'thickness'].includes(prop) })`
  border-color: ${({ color }) => color ?? COLORS.lightBorder};
  border-bottom-width: ${({ thickness }) => thickness ?? '2px'};
  ${({ margin }) => margin && `margin: ${margin}`};
`
export const CustomLink = styled(Link, { shouldForwardProp: prop => !['color', 'textDecoration'].includes(prop) })`
  &:active, &:hover, &:visited, &:link {
    color: ${({ color }) => color ?? 'black'};
    ${({ textDecoration }) => textDecoration && `text-decoration: ${textDecoration};`}
  }
`

export const FormContainer = styled(Box, { shouldForwardProp: prop => !['height', 'maxHeight'].includes(prop) })`
  border: 1px solid ${COLORS.inputBorderColor};
  border-radius: 4px;
  padding: 8px;
  overflow: auto;
  ${({ height }) => height && `height: ${height};`}
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
`

export const FormTextField = styled(TextField, { shouldForwardProp: prop => !['helperTextColor', 'padding'].includes(prop) })`
  & .MuiInputAdornment-root button.MuiButtonBase-root {
    padding: 0;
  }
  & .MuiFormHelperText-root {
    color: ${({ helperTextColor }) => helperTextColor};
  }
  & input {
    ${({ padding }) => padding && `padding: ${padding};`}
  }
`
export const GridItem = styled(Grid, { shouldForwardProp: prop => !['align', 'alignItems', 'backgroundColor', 'direction', 'isFlex', 'hideInMobile', 'justifyContent'].includes(prop) })`
  ${({ align }) => align && `text-align: ${align};`}
  ${({ alignItems }) => alignItems && `align-tems: ${alignItems};`}
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ isFlex }) => isFlex && 'display: flex;'}
  ${({ theme, hideInMobile }) => `
    ${theme.breakpoints.down('sm')} {
      ${hideInMobile && 'display: none;'}
    }
  `}
`

export const ListImgThumb = styled('img')`
  height: auto;
  padding: 8px;
  object-fit: cover;
  width: 100%;
`

export const MainGridContainer = styled(Grid, { shouldForwardProp: prop => !['backgroundColor', 'disabled', 'drawBorder', 'height', 'marginTop', 'maxWidth', 'minWidth', 'width'].includes(prop) })`
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
  ${({ height, theme }) => height && formatCssProp('height', height, theme)}
  ${({ maxWidth, theme }) => maxWidth && formatCssProp('max-width', maxWidth, theme)}
  ${({ minWidth, theme }) => minWidth && formatCssProp('min-width', minWidth, theme)}
  ${({ width, theme }) => width && formatCssProp('width', width, theme)}
  ${({ marginTop, theme }) => marginTop && formatCssProp('margin-top', marginTop, theme)}
  ${({ backgroundColor, drawBorder }) => drawBorder && `
    border: 1px solid ${backgroundColor ?? COLORS.lightBorder};
    border-radius: 8px;
    padding: 8px;
  `}
  ${({ disabled }) => disabled && `
    user-select: none;
    pointer-events: none;
    opacity: 0.5;
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
