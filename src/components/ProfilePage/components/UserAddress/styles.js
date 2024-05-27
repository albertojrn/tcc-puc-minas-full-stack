import { Box, styled } from '@mui/material'
import { COLORS } from '../../../../constants/theme'

export const CardContainer = styled(Box, { shouldForwardProp: prop => !['cursor', 'preventUserSelection', 'selected'].includes(prop) })`
  align-items: center;
  justify-self: stretch;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${COLORS.lightBorder};
  display: flex;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px;
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
