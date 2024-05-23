import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../styles'
import SignUpFormFields from './components/SignUpFormFields'
import { CONSTRAINTS } from './constants/validationParams'
import { validateFields } from '../../utils/formMethods'

function SignUpPage() {
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
    <MainGridContainer
      alignItems='center'
      container
      drawBorder
      marginTop={{ md: '32px' }}
      maxWidth={{ md: '40%' }}
      spacing={2}
    >
      <GridItem item xs={12}>
        <Typography component='div' variant='h4' align='center'>
          Crie seu cadastro
        </Typography>
        <Typography component='div' variant='body2' align='center'>
          *campos obrigatórios
        </Typography>
      </GridItem>
      <SignUpFormFields
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        cpf={cpf}
        setCpf={setCpf}
        email={email}
        setEmail={setEmail}
        error={error}
        setError={setError}
        gender={gender}
        setGender={setGender}
        password={password}
        setPassword={setPassword}
        phone={phone}
        setPhone={setPhone}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        userName={userName}
        setUserName={setUserName}
      />
      <GridItem item xs={12}>
        <Button onClick={handleSignUp} variant='contained' fullWidth>Cadastrar</Button>
      </GridItem>
    </MainGridContainer>
  )
}

export default SignUpPage
