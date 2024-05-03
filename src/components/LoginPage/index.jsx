import React from 'react'
import {  Divider, Typography } from '@mui/material'
import { FormContainer, LoginContainer } from './styles'
import GoogleLoginButton from './components/GoogleLoginButton'
import GithubLoginButton from './components/GithubLoginButton'
import StandardLoginForm from './components/StandardLoginForm'
import CreateNewAccountLink from './components/CreateNewAccountLink'
import { useUserContext } from '../../contexts/UserContext'

function LoginPage() {
  const { isLoggedIn } = useUserContext()
  if (isLoggedIn) return null

  return (
    <LoginContainer>
      <FormContainer
        direction='column'
        spacing={2}
      >
        <Typography component='div' variant='h4' align='center'>
          Login
        </Typography>
        <StandardLoginForm />
        <Divider>OU</Divider>
        <GoogleLoginButton />
        <GithubLoginButton />
        <CreateNewAccountLink />
      </FormContainer>
    </LoginContainer>
  )
}

export default LoginPage
