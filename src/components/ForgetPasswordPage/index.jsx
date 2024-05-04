import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useUserContext } from '../../contexts/UserContext'
import { StackedFormContainer, ViewboxContainer } from '../../styles'
import Redirect from '../Redirect'
import FormField from '../FormField'
import { validateFields } from '../../utils/formMethods'
import { CONSTRAINTS } from './constants/validationParams'

function ForgetPasswordPage() {
  const { isLoggedIn } = useUserContext()
  if (isLoggedIn) return <Redirect to='/' />

  const [error, setError] = useState({})
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  function handleSendRecoveryUrl() {
    const validation = validateFields({ email }, CONSTRAINTS)
    setError(validation.error)
  }
  console.log(process.env.REACT_APP_EMAIL)

  return (
    <ViewboxContainer>
      <StackedFormContainer
        direction='column'
        spacing={2}
      >
        <Typography component='div' variant='h4' align='center'>
          Esqueci a minha senha
        </Typography>
        <FormField
          autoComplete='email'
          error={error}
          field='email'
          label='Email'
          required
          setError={setError}
          setField={setEmail}
          type='email'
          value={email}
        />
        <Button onClick={handleSendRecoveryUrl} variant='contained'>Recuperar senha</Button>
        {emailSent
          && (
            <Typography fontWeight='bold' component='div' variant='body' align='center'>
              Um link para recuperação de senha foi enviado para o seu e-mail. Ele ficará disponível por 48h.
            </Typography>
          )}
      </StackedFormContainer>
    </ViewboxContainer>
  )
}

export default ForgetPasswordPage
