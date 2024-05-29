import { Drawer, styled } from '@mui/material'

export const MenuContainer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 95%;
  }
  & .MenuHeader-root {
    width: 100%;
  }
  ${({ theme }) => `
    ${theme.breakpoints.up('md')} {
      display: none;
    }
  `}
`
