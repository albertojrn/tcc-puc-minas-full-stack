import { Box, styled } from '@mui/material'
import { COLORS } from '../../../../constants/theme'

export const CardContainer = styled(Box, { shouldForwardProp: prop => !['cursor', 'preventUserSelection', 'selected'].includes(prop) })`
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${COLORS.lightBorder};
  display: flex;
  justify-content: center;
  justify-self: stretch;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 12px;
  position: relative;
  width: 100%;
  ${({ cursor }) => cursor && `cursor: ${cursor};`}
  ${({ preventUserSelection }) => preventUserSelection && 'user-select: none;'}
  &:hover {
    background-color: ${COLORS.lightgray};
  }
  ${({ selected }) => selected && `
    background-color: ${COLORS.lightgray};
    border: 3.5px solid green;
  `}
`
