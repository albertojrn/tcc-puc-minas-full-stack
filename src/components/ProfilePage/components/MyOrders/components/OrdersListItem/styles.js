import { Collapse, Stack, styled } from '@mui/material'
import { COLORS } from '../../../../../../constants/theme'

export const Thumb = styled('img')`
  height: auto;
  padding: 8px;
  object-fit: cover;
  width: 100%;
`

export const CollapseContainer = styled(Collapse)`
  padding: 0 16px 0px 16px;
`

export const OrderListItemContainer = styled(Stack)`
  background-color: ${COLORS.lightgray};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${COLORS.lightgray};
  box-shadow: 0px -1px 10px 0px rgba(0,0,0,0.1);
  padding: 8px;
  & > .MuiStack-root {
    cursor: pointer;
  }
  & .OrdersListItem-status {
    color: ${COLORS.urbanBlack};
    font-size: 1.1rem;
  }
`
