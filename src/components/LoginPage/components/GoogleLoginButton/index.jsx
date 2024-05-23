import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Stack, Typography } from '@mui/material'
import { Color } from '../../../../styles'
import { loginGoogleUser } from '../../../../utils/auth'
import { useLoadingContext } from '../../../../contexts/LoadingContext'

function GoogleLoginButton({ handleLoginSuccess }) {
  const [error, setError] = useState('')
  const { setLoading } = useLoadingContext()

  async function onGooglePageLoginSuccess(credentialData) {
    setLoading({ show: true })
    const loginRes = await loginGoogleUser(credentialData.credential, setError)
    setLoading({ show: false })
    if (loginRes?.token) handleLoginSuccess(loginRes)
  }

  return (
    <Stack direction='column' alignItems='center' justifyContent='center'>
      <GoogleLogin
        onSuccess={onGooglePageLoginSuccess}
        onError={() => setError('Não foi possível logar com o Google.')}
      />
      {error && <Typography align='center' variant='body2'><Color color='red'>{error}</Color></Typography>}
    </Stack>
  )
}

export default GoogleLoginButton
