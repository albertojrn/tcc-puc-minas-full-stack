import React, { useEffect, useState } from 'react'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import PleaseTryAgain from '../../../../../PleaseTryAgain'
import { useUserContext } from '../../../../../../contexts/UserContext'
import OrdersListItem from '../OrdersListItem'
import { readOrders } from '../../../../../../services/api/orders'

function OrdersList() {
  const [errFetch, setErrFetch] = useState('')
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const { id, token } = useUserContext()

  async function fetchParams() {
    setLoading(true)
    const res = await readOrders(id, token)
    if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
      const newOrders = res.data
      setOrders(newOrders)
    }
    else setErrFetch('Não conseguimos carregar os seus pedidos.')
    setLoading(false)
  }

  useEffect(() => {
    fetchParams()
  }, [])

  return (
    <MainGridContainer container spacing={5} alignItems='center'>
      {errFetch
        ? (
          <GridItem item xs={12}>
            <PleaseTryAgain
              onTryAgain={fetchParams}
              text={errFetch}
            />
          </GridItem>
        )
        : (
          orders?.map(order => (
            <GridItem key={order.id} item xs={12}>
              <OrdersListItem order={order} />
            </GridItem>
          ))
        )}
    </MainGridContainer>
  )
}

export default OrdersList
