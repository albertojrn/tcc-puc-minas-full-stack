import React, { useState } from 'react'
import { Divider, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import GoogleLoginButton from './components/GoogleLoginButton'
import StandardLoginForm from './components/StandardLoginForm'
import CreateNewAccountLink from './components/CreateNewAccountLink'
import { useUserContext } from '../../contexts/UserContext'
import Redirect from '../Redirect'
import { StackedFormContainer, ViewboxContainer } from '../../styles'

function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false)
  const { token, setUser } = useUserContext()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  if (token) return <Redirect to='/' />
  const redirectUrl = searchParams.get('redirectUrl')

  function handleLoginSuccess(data) {
    if (data.token && data.id) {
      localStorage.setItem('token', data.token)
      setUser({ ...data })
      const urlToNavigate = redirectUrl ?? '/'
      navigate(urlToNavigate)
    }
  }

  return (
    <ViewboxContainer>
      <StackedFormContainer
        direction='column'
        spacing={2}
      >
        <Typography component='div' variant='h4' align='center'>
          Login
        </Typography>
        <StandardLoginForm handleLoginSuccess={handleLoginSuccess} rememberMe={rememberMe} setRememberMe={setRememberMe} />
        <Divider>OU</Divider>
        <GoogleLoginButton handleLoginSuccess={handleLoginSuccess} />
        <CreateNewAccountLink />
      </StackedFormContainer>
    </ViewboxContainer>
  )
}

export default LoginPage
