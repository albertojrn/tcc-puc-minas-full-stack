import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../styles'
import SignUpFormFields from './components/SignUpFormFields'
import { CONSTRAINTS } from './constants/validationParams'
import { validateFields } from '../../utils/formMethods'
import { createUsers } from '../../services/api/users'
import { useStoreContext } from '../../contexts/StoreContext'
import DialogRetry from '../DialogRetry'
import DialogOk from '../DialogOk'
import { useLoadingContext } from '../../contexts/LoadingContext'

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
  const { setStorePersistent } = useStoreContext()
  const { setLoading } = useLoadingContext()
  const navigate = useNavigate()

  async function handleSignUp() {
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
      const fields = {
        birth_date: birthDate,
        cpf,
        email,
        gender,
        password,
        phone,
        name: userName,
      }
      setLoading({ show: true })
      const res = await createUsers(fields)
      setLoading({ show: false })
      if (res.status === 201) {
        setStorePersistent({
          dialogChild: (
            <DialogOk
              title='Confirmação'
              text='Sua conta foi cadastrada com sucesso. Por favor, entre com a sua conta.'
              setDialogParams={setStorePersistent}
              onOk={handleOnOk}
            />
          ),
          openDialog: true
        })
      }
      else {
        setStorePersistent({
          dialogChild: (
            <DialogRetry
              title='Erro'
              text='Não foi possível realizar o cadastro.'
              onRetry={handleTryAgain}
              setDialogParams={setStorePersistent}
            />
          ),
          openDialog: true
        })
      }
    }
  }

  function handleTryAgain() {
    handleSignUp()
    setStorePersistent({ openDialog: false })
  }

  function handleOnOk() {
    navigate('/login')
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
