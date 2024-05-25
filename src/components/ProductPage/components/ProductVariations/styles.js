import { styled } from '@mui/material'
import { COLORS } from '../../../../constants/theme'

export const ColorChip = styled('div', { shouldForwardProp: prop => !['isSize'].includes(prop) })`
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 4px 16px;
  text-align: center;
  user-select: none;
  &:hover, &.selected {
    background-color: ${({ isSize }) => (isSize ? COLORS.urbanBeige : 'rgba(0, 0, 0, 0.2)')};
  }
`
