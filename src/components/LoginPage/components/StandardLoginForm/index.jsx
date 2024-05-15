import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { MinimalButton } from '../../../../styles'
import { CONSTRAINTS } from './constants/validationParams'
import { validateFields } from '../../../../utils/formMethods'
import FormField from '../../../FormField'

function StandardLoginForm() {
  const [error, setError] = useState({})
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')

  function handleLogin() {
    const validation = validateFields({ email, password }, CONSTRAINTS)
    setError(validation.error)
    if (validation.passed) {
      
    }
  }

  return (
    <>
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
      <FormField
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        autoComplete='current-password'
        error={error}
        field='password'
        label='Senha'
        required
        setError={setError}
        setField={setPassword}
        type={showPassword ? 'text' : 'password'}
        value={password}
      />
      <Button onClick={handleLogin} variant='contained'>Entrar</Button>
      <Link to='/password-recovery'>
        <MinimalButton edge='end'>Esqueci a minha senha</MinimalButton>
      </Link>
    </>
  )
}

export default StandardLoginForm
