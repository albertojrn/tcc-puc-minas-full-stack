import React from 'react'
import { Button, Divider, List, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { v4 } from 'uuid'
import { FormContainer } from '../../../../../../../../../../styles'
import VariationItem from '../VariationItem'
import { useDashboardContext } from '../../../../../../../../../../contexts/DashboardContext'
import AddProductVariation from '../../../AddProductVariation'
import groupVariations from './utils/groupVariations'

function ProductVariations({ setVariations, variations }) {
  const { setDashboardParams } = useDashboardContext()
  const groupedVariations = groupVariations(variations)

  return (
    <FormContainer maxHeight='250px'>
      <Typography
        component='div'
        variant='h6'
      >
        Variações*
      </Typography>
      <List>
        <Divider />
        {groupedVariations.map(groupedVariation => (
          <React.Fragment key={v4()}>
            <VariationItem
              setVariations={setVariations}
              groupedVariation={groupedVariation}
            />
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Stack direction='row' justifyContent='end'>
        <Button
          color='standard'
          endIcon={<Add />}
          onClick={
            () => setDashboardParams({
              dialogChild: <AddProductVariation setVariations={setVariations} variations={variations} />,
              openDialog: true,
            })
          }
        >
          Adicionar
        </Button>
      </Stack>
    </FormContainer>
  )
}

export default ProductVariations
