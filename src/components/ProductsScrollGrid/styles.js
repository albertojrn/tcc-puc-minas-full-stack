import { Grid, styled } from '@mui/material'

export const Container = styled('div')`
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
`

export const ControlsContainer = styled('div', { shouldForwardProp: prop => !['isRight'].includes(prop) })`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  top: 0;
  ${({ isRight }) => (isRight ? 'right: 0;' : 'left: 0;')}
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      display: none;
    }
  `}
`
export const MainContainer = styled('div')`
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0 45px;
  position: relative;
  width: 100%;
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      overflow-x: auto;
      padding: 0;
    }
  `}
`

export const ScrollContainer = styled(Grid)`
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: hidden;
  width: max-content;
  & .MuiGrid-root.MuiGrid-item {
    min-width: 200px;
    max-width: 250px;
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
    min-width: 150px;
    max-width: 200px;
    }
  `}
  }
`
