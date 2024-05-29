import { ListItem, styled } from '@mui/material'
import { COLORS } from '../../constants/theme'

export const CollapsibleListItemContainer = styled(ListItem)`
  overflow-y: auto;
  overflow-x: hidden;
  align-items: start;
  & .MuiCollapse-root {
    width: 100%;
    & a {
      width: 100%;
    }
    & .MuiButtonBase-root {
      padding: 4px 16px 4px 24px;
    }
    & .MuiListItemText-root {
      margin: 0;
    }
  }
  ${({ theme }) => `
    ${theme.breakpoints.up('md')} {
      max-height: 250px;
    }
  `}
`

export const LabelContainer = styled(ListItem)`
  & > .MuiButtonBase-root {
    background-color: ${COLORS.mediumgray};
    width: 100%;
  }
`
