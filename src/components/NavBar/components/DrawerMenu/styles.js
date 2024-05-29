import { Drawer, styled } from '@mui/material'

export const MenuContainer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 250px;
    ${({ theme }) => `
      ${theme.breakpoints.down('md')} {
        width: 95%;
      }
    `}
  }
  & .MenuHeader-root {
    width: 100%;
  }
`
