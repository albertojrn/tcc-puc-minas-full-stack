import React, { useState } from 'react'
import { Button } from '@mui/material'
import { GridItem } from '../../../../../../../../styles'
import FormField from '../../../../../../../FormField'
import { validateFields } from '../../../../../../../../utils/formMethods'
import { CONSTRAINTS } from './constants/validationParams'
import { readReport } from '../../../../../../../../services/api/report'
import { useUserContext } from '../../../../../../../../contexts/UserContext'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'

function ReportFields({
  setOrders,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  const [error, setError] = useState({})
  const { token } = useUserContext()
  const { setLoading } = useLoadingContext()

  async function getReport() {
    const validation = validateFields({ fromDate, toDate }, CONSTRAINTS)
    setError(validation.error)
    if (validation.passed) {
      setLoading({ show: true })
      const res = await readReport(null, token, { from: fromDate, to: toDate })
      if (res?.status === 200 && Array.isArray(res?.data) && res?.data?.length) {
        setOrders(res.data)
      }
      setLoading({ show: false })
    }
  }

  return (
    <>
      <GridItem item xs={12} sm={3}>
        <FormField
          error={error}
          field='fromDate'
          fullWidth
          keepLabelOnTop
          label='De'
          required
          setError={setError}
          setField={setFromDate}
          type='date'
          value={fromDate}
        />
      </GridItem>
      <GridItem item xs={12} sm={3}>
        <FormField
          error={error}
          field='toDate'
          fullWidth
          keepLabelOnTop
          label='Até'
          required
          setError={setError}
          setField={setToDate}
          type='date'
          value={toDate}
        />
      </GridItem>
      <GridItem item xs={12} sm={2}>
        <Button fullWidth onClick={getReport} variant='contained'>
          Gerar
        </Button>
      </GridItem>
    </>
  )
}

export default ReportFields
