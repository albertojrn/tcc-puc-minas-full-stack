import React from 'react'
import { Button, Divider, List, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { v4 } from 'uuid'
import { FormContainer } from '../../../../../../../../../../styles'
import VariationItem from '../VariationItem'
import { useDashboardContext } from '../../../../../../../../../../contexts/DashboardContext'

function ProductVariations({ setVariations, variations }) {
  const { setDashboardData } = useDashboardContext()

  return (
    <FormContainer>
      <Typography
        component='div'
        variant='h6'
      >
        Variações*
      </Typography>
      <List>
        <Divider />
        {variations.map((variation, i) => (
          <React.Fragment key={v4()}>
            <VariationItem
              index={i}
              setVariations={setVariations}
              variation={variation}
            />
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Stack direction='row' justifyContent='end'>
        <Button
          color='standard'
          endIcon={<Add />}
          onClick={() => setDashboardData({ dialogPage: 0, openDialog: true, dialogData: { setVariations, variations } })}
        >
          Adicionar
        </Button>
      </Stack>
    </FormContainer>
  )
}

export default ProductVariations
