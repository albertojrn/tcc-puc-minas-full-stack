import React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { GridItem, MainGridContainer } from '../../../../styles'
import FormField from '../../../FormField'

function SignUpFormFields({
  birthDate,
  setBirthDate,
  cpf,
  setCpf,
  email,
  setEmail,
  error,
  setError,
  gender,
  setGender,
  password,
  setPassword,
  phone,
  setPhone,
  showPassword,
  setShowPassword,
  userName,
  setUserName,
  hidePassword,
  isMyAccountPage
}) {

  return (
    <MainGridContainer
      container
      spacing={2}
    >
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
            <FormControlLabel value='feminino' control={<Radio />} label='Feminino' />
            <FormControlLabel value='masculino' control={<Radio />} label='Masculino' />
          </RadioGroup>
          {error?.gender && <FormHelperText>{error.gender}</FormHelperText>}
        </FormControl>
      </GridItem>
      <GridItem item xs={12} md={isMyAccountPage ? 4 : 12}>
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
      <GridItem item xs={12} md={isMyAccountPage ? 4 : 12}>
        <FormField
          disabled={isMyAccountPage}
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
      <GridItem item xs={12} md={isMyAccountPage ? 4 : 12}>
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
      <GridItem item xs={12} md={isMyAccountPage ? 6 : 12}>
        <FormField
          autoComplete='email'
          disabled={isMyAccountPage}
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
      {!hidePassword
        && (
          <GridItem item xs={12} md={isMyAccountPage ? 6 : 12}>
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
              required={!isMyAccountPage}
              setError={setError}
              setField={setPassword}
              type={showPassword ? 'text' : 'password'}
              value={password}
            />
          </GridItem>
        )}
    </MainGridContainer>
  )
}

export default SignUpFormFields
