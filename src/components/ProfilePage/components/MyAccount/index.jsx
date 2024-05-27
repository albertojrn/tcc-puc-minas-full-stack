import React, { useState } from 'react'
import { Button, Stack } from '@mui/material'
import SignUpFormFields from '../../../SignUpPage/components/SignUpFormFields'
import { useUserContext } from '../../../../contexts/UserContext'
import { useLoadingContext } from '../../../../contexts/LoadingContext'
import { useStoreContext } from '../../../../contexts/StoreContext'
import { CONSTRAINTS } from './constants/validationParams'
import { validateFields } from '../../../../utils/formMethods'
import { updateUsers } from '../../../../services/api/users'
import DialogRetry from '../../../DialogRetry'
import DialogOk from '../../../DialogOk'
import SQL_ERROR_STATUS_DICT from '../../../../constants/sqlErrorStatusDict'

function MyAccount() {
  const {
    birth_date: userBirthDate,
    cpf: userCpf,
    email: userEmail,
    gender: userGender,
    id: userId,
    name,
    phone: userPhone,
    token,
    setUser,
    logoutUser
  } = useUserContext()
  const { setLoading } = useLoadingContext()
  const { setStorePersistent } = useStoreContext()
  const [error, setError] = useState({})
  const [birthDate, setBirthDate] = useState(
    userBirthDate
      ?.substring(0, userBirthDate.includes('T')
        ? userBirthDate.indexOf('T')
        : userBirthDate.length)
        ?? ''
  )
  const [cpf, setCpf] = useState(userCpf ?? '')
  const [email, setEmail] = useState(userEmail ?? '')
  const [gender, setGender] = useState(userGender ?? '')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState(userPhone ?? '')
  const [showPassword, setShowPassword] = useState(false)
  const [userName, setUserName] = useState(name ?? '')

  async function handleOnOkClick() {
    const fields = {
      birthDate,
      gender,
      password: password || null,
      phone,
      userName,
    }
    const constraints = CONSTRAINTS
    const validation = validateFields(fields, constraints)
    setError(validation.error)
    if (validation.passed) {
      const body = {
        birth_date: birthDate,
        gender,
        password: password || null,
        phone,
        name: userName,
      }
      if (body.birth_date === userBirthDate) delete body.birth_date
      if (body.gender === userGender) delete body.gender
      if (!body.password) delete body.password
      if (body.phone === userPhone) delete body.phone
      if (body.name === name) delete body.name
      if (Object.keys(body).length) {
        setLoading({ show: true })
        const res = await updateUsers(userId, body, token)
        setLoading({ show: false })
        if (res.status === 200 && res.data) {
          if (res.data.id) delete res.data.id
          setUser({ ...res.data })
          let dialogChild = (
            <DialogOk
              title='Confirmação'
              text='Seus dados foram atualizados.'
              setDialogParams={setStorePersistent}
            />
          )
          if (body.password) {
            dialogChild = (
              <DialogOk
                title='Confirmação'
                text='Seus dados foram atualizados. Como a senha foi alterada, entre novamente.'
                setDialogParams={setStorePersistent}
                onOk={() => logoutUser('/login')}
              />
            )
          }
          setStorePersistent({
            dialogChild,
            openDialog: true
          })
        }
        else if (res?.data?.error) {
          const errorStatus = res.data.error.status
          const errorMessage = SQL_ERROR_STATUS_DICT[errorStatus]
          setStorePersistent({
            dialogChild: (
              <DialogRetry
                title='Erro'
                text={errorMessage ?? 'Não foi possível atualizar os seus dados.'}
                onRetry={handleOnOkClick}
                setDialogParams={setStorePersistent}
              />
            ),
            openDialog: true
          })
        }
      }
    }
  }

  return (
    <Stack direction='column' rowGap={2}>
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
        isMyAccountPage
      />
      <Button onClick={handleOnOkClick} fullWidth={false} variant='contained'>Salvar</Button>
    </Stack>
  )
}

export default MyAccount
