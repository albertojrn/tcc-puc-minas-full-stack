import React, { useState } from 'react'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { MinimalButton } from '../../../../styles'
import { LoginField } from './styles'

function StandardLoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <LoginField
            color='info'
            label='Email'
            required
            type='email'
      />
      <LoginField
        autoComplete='current-password'
        color='info'
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
      />
      <Button variant='contained'>Entrar</Button>
      <MinimalButton edge='end'>Esqueci a minha senha</MinimalButton>
    </>
  )
}

export default StandardLoginForm
