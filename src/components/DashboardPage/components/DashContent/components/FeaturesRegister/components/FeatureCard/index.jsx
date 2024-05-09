import React from 'react'
import { CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemText } from '@mui/material'
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
        <IconButton>
          <Add />
        </IconButton>
      </CardActions>
    </CardContainer>
  )
}

export default FeatureCard
