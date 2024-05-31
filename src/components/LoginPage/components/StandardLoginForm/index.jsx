import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { MinimalButton } from '../../../../styles'
import { CONSTRAINTS } from './constants/validationParams'
import { validateFields } from '../../../../utils/formMethods'
import FormField from '../../../FormField'
import { loginUser } from '../../../../utils/auth'
import { useLoadingContext } from '../../../../contexts/LoadingContext'

function StandardLoginForm({ handleLoginSuccess, rememberMe, setRememberMe }) {
  const [error, setError] = useState({})
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const { setLoading } = useLoadingContext()

  async function handleLogin() {
    const validation = validateFields({ email, password }, CONSTRAINTS)
    setError(validation.error)
    if (validation.passed) {
      setLoading({ show: true })
      const loginRes = await loginUser({ email, password }, setError)
      setLoading({ show: false })
      if (loginRes?.token) handleLoginSuccess(loginRes)
    }
  }

  function enterPresed(e) {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <>
      <FormField
        autoComplete='email'
        error={error}
        field='email'
        label='Email'
        onKeyDown={enterPresed}
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
        onKeyDown={enterPresed}
        required
        setError={setError}
        setField={setPassword}
        type={showPassword ? 'text' : 'password'}
        value={password}
      />
      <FormGroup>
        <FormControlLabel
          control={(
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
      )}
          label='Lembrar de mim'
        />
      </FormGroup>
      <Button onClick={handleLogin} variant='contained'>Entrar</Button>
      <Link to='/password-recovery'>
        <MinimalButton edge='end'>Esqueci a minha senha</MinimalButton>
      </Link>
    </>
  )
}

export default StandardLoginForm
