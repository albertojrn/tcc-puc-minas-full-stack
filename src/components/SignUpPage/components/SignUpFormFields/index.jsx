import React, { useState } from 'react'
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, InputAdornment, Radio, RadioGroup } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { GridItem } from '../../../../styles'
import FormField from '../../../FormField'
import { validateFields } from '../../../../utils/formMethods'
import { CONSTRAINTS } from './constants/validationParams'

function SignUpFormFields() {
  const [birthDate, setBirthDate] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState({})
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userName, setUserName] = useState('')

  function handleSignUp() {
    const validation = validateFields(
      {
        birthDate,
        cpf,
        email,
        gender,
        password,
        phone,
        userName,
      },
      CONSTRAINTS
    )
    setError(validation.error)
    if (validation.passed) {
      
    }
  }

  return (
    <>
      <GridItem item xs={12}>
        <FormField
          autoComplete='name'
          error={error}
          field='userName'
          fullWidth
          label='Nome Completo'
          required
          setError={setError}
          setField={setUserName}
          value={userName}
        />
      </GridItem>
      <GridItem item xs={12}>
        <FormControl required color='info' error={Boolean(error?.gender)}>
          <FormLabel>Gênero</FormLabel>
          <RadioGroup
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value='F' control={<Radio />} label='Feminino' />
            <FormControlLabel value='M' control={<Radio />} label='Masculino' />
          </RadioGroup>
          {error?.gender && <FormHelperText>{error.gender}</FormHelperText>}
        </FormControl>
      </GridItem>
      <GridItem item xs={12}>
        <FormField
          autoComplete='bday'
          error={error}
          field='birthDate'
          fullWidth
          keepLabelOnTop
          label='Data de Nascimento'
          required
          setError={setError}
          setField={setBirthDate}
          type='date'
          value={birthDate}
        />
      </GridItem>
      <GridItem item xs={12}>
        <FormField
          error={error}
          field='cpf'
          fullWidth
          label='CPF (somente números)'
          onlyNumbers
          pattern='999-999-999-99'
          placeholder='___-___-___-__'
          required
          setError={setError}
          setField={setCpf}
          type='text'
          value={cpf}
        />
      </GridItem>
      <GridItem item xs={12}>
        <FormField
          error={error}
          field='phone'
          fullWidth
          label='Telefone (somente números)'
          onlyNumbers
          pattern='(99) 99999-9999'
          placeholder='(__) _____-____'
          required
          setError={setError}
          setField={setPhone}
          type='text'
          value={phone}
        />
      </GridItem>
      <GridItem item xs={12}>
        <FormField
          autoComplete='email'
          error={error}
          field='email'
          fullWidth
          label='Email'
          required
          setError={setError}
          setField={setEmail}
          type='email'
          value={email}
        />
      </GridItem>
      <GridItem item xs={12}>
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
          fullWidth
          label='Senha'
          required
          setError={setError}
          setField={setPassword}
          type={showPassword ? 'text' : 'password'}
          value={password}
        />
      </GridItem>
      <GridItem item xs={12}>
        <Button onClick={handleSignUp} variant='contained' fullWidth>Cadastrar</Button>
      </GridItem>
    </>
  )
}

export default SignUpFormFields
