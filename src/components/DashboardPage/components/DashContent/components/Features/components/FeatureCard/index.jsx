import React from 'react'
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import features_values from '../../../../../../../../mock/features_values.json'
import FeatureCardToolbox from '../FeatureCardToolbox'
import { CardContainer } from './styles'

function FeatureCard({ feature, featureId }) {
  const values = features_values.filter(value => value.feature_id === featureId)

  return (
    <CardContainer>
      <CardHeader title={feature} />
      <CardContent>
        <List dense>
          {values.map(value => (
            <ListItem
              key={value.id}
              secondaryAction={<FeatureCardToolbox featureValueId={value.id} name={value.name} />}
            >
              <ListItemText primary={value.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <Button color='standard' endIcon={<Add />}>
          Adicionar
        </Button>
      </CardActions>
    </CardContainer>
  )
}

export default FeatureCard
