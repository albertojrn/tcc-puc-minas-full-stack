import React from 'react'
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import FeatureCardToolbox from '../FeatureCardToolbox'
import { CardContainer } from './styles'
import EditRemoveFeatureButtons from '../EditRemoveFeatureButtons'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { SPECIAL_FEATURES } from '../../../../../../constants/params'
import AddFeatureValues from '../AddFeatureValues'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'

function FeatureCard({ feature }) {
  const { featureValues } = useDashboardDataContext()
  const { setDashboardParams } = useDashboardContext()

  function onAddFeatureValueClick() {
    setDashboardParams({
      dialogChild: <AddFeatureValues feature={feature} />,
      openDialog: true,
    })
  }

  return (
    <CardContainer>
      <CardHeader
        action={
          SPECIAL_FEATURES.includes(feature.name)
            ? null
            : <EditRemoveFeatureButtons feature={feature} />
        }
        title={feature.name}
      />
      <CardContent>
        <List dense>
          {featureValues[feature.id]?.map(value => (
            <ListItem
              key={value.id}
              secondaryAction={<FeatureCardToolbox featureValue={value} />}
            >
              <ListItemText primary={value.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <Button color='standard' endIcon={<Add />} onClick={onAddFeatureValueClick}>
          Adicionar
        </Button>
      </CardActions>
    </CardContainer>
  )
}

export default FeatureCard
