import React from 'react'
import { CircularProgress } from '@mui/material'
import { useLoadingContext } from '../../contexts/LoadingContext'
import { LoadingScreen, SpinnerContainer } from './styles'

function Loading() {
  const { show } = useLoadingContext()

  return (
    show
      ? (
        <LoadingScreen>
          <SpinnerContainer>
            <CircularProgress />
          </SpinnerContainer>
        </LoadingScreen>
      )
      : null
  )
}

export default Loading
