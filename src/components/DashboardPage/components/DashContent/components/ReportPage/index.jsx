import React, { useState } from 'react'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import ContentHeader from '../ContentHeader'
import ReportFields from './components/ReportFields'
import SalesReport from './components/SalesReport'

function ReportPage() {
  const [orders, setOrders] = useState([])
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()

  return (
    <MainGridContainer container spacing={2} alignItems='center'>
      <ContentHeader page='' title='Relatório de vendas' />
      <ReportFields
        setOrders={setOrders}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <GridItem item xs={12}>
        {!!orders?.length && <SalesReport orders={orders} from={fromDate} to={toDate} />}
      </GridItem>
    </MainGridContainer>
  )
}

export default ReportPage
