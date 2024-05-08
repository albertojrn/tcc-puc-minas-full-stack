import { List, ListItem, styled } from '@mui/material'
import { DRAWER_WIDTH } from '../../../../constants/params'

export const ItemsList = styled(List, { shouldForwardProp: prop => !['indentation'].includes(prop) })`
  ${({ indentation }) => indentation && `
    & .MuiListItem-root .MuiButtonBase-root {
      padding-left: ${indentation * 32}px;
    }
  `}
`

export const ItemsContainer = styled('div')`
  width: ${DRAWER_WIDTH}px;
`

export const ListItemCustom = styled(ListItem, { shouldForwardProp: prop => !['bgColor'].includes(prop) })`
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`
