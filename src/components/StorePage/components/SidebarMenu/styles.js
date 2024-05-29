import { List, styled } from '@mui/material'

export const MenuContainer = styled(List, { shouldForwardProp: prop => !['spacing'].includes(prop) })`
  & .CollapsibleMenuLabel-root {
    & .MuiListItemText-root {
      margin: 0;
      & .MuiTypography-root {
        font-size: 0.9rem;
        font-weight: bold;
      }
    }
    & .MuiButtonBase-root {
      padding-top: 4px;
      padding-bottom: 4px;
    }
  }
  & .MuiListItemIcon-root  {
    min-width: auto;
    & .MuiButtonBase-root {
      padding: 0 8px 0 0;
    }
  }
  ${({ spacing }) => spacing && `
    & .CollapsibleMenuLabel-root:not(:first-of-type) {
      margin-top: ${spacing * 2}px;
    }
  `}
`
