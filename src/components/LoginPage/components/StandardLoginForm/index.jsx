import React, { useState } from 'react'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import validate from 'validate.js'
import { FormField, MinimalButton } from '../../../../styles'
import { CONSTRAINTS } from './constants/validationParams'

function StandardLoginForm() {
  const [error, setError] = useState({})
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')

  function handleOnUserTyping(field, setFunc, value) {
    if (error[field]) {
      setError(prev => {
        const newError = { ...prev }
        delete newError[field]
        return newError
      })
    }
    setFunc(value)
  }

  function validateFields() {
    const validation = validate({ email, password }, CONSTRAINTS)
    const newError = {}
    console.log({ validation })
    if (Array.isArray(validation?.email)) newError.email = validation.email[0]
    if (Array.isArray(validation?.password)) newError.password = validation.password[0]
    setError(newError)
    return !Object.keys(newError).length
  }

  function handleLogin() {
    const validationPassed = validateFields()
    if (validationPassed) {
      console.log('Passed')
    }
  }

  return (
    <>
      <FormField
        color='info'
        error={Boolean(error.email)}
        helperText={error.email ?? ''}
        label='Email'
        onChange={(e) => handleOnUserTyping('email', setEmail, e.target.value)}
        required
        type='email'
        value={email}
      />
      <FormField
        autoComplete='current-password'
        color='info'
        helperText={error.password ?? ''}
        error={Boolean(error.password)}
        label='Senha'
        required
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => handleOnUserTyping('password', setPassword, e.target.value)}
        value={password}
      />
      <Button onClick={handleLogin} variant='contained'>Entrar</Button>
      <MinimalButton edge='end'>Esqueci a minha senha</MinimalButton>
    </>
  )
}

export default StandardLoginForm
