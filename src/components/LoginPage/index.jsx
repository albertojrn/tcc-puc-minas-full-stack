import React from 'react'
import { Divider, Typography } from '@mui/material'
import GoogleLoginButton from './components/GoogleLoginButton'
import GithubLoginButton from './components/GithubLoginButton'
import StandardLoginForm from './components/StandardLoginForm'
import CreateNewAccountLink from './components/CreateNewAccountLink'
import { useUserContext } from '../../contexts/UserContext'
import Redirect from '../Redirect'
import { StackedFormContainer, ViewboxContainer } from '../../styles'

function LoginPage() {
  const { token } = useUserContext()
  if (token) return <Redirect to='/' />

  function handleLoginSuccess(data) {
    console.log({data})
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
        <StandardLoginForm handleLoginSuccess={handleLoginSuccess} />
        <Divider>OU</Divider>
        <GoogleLoginButton handleLoginSuccess={handleLoginSuccess} />
        <CreateNewAccountLink />
      </StackedFormContainer>
    </ViewboxContainer>
  )
}

export default LoginPage
