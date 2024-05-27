import React, { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { validateFields } from '../../../../../../../../utils/formMethods'
import { CONSTRAINTS } from './constants/validationParams'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import SQL_ERROR_STATUS_DICT from '../../../../../../../../constants/sqlErrorStatusDict'
import SignUpFormFields from '../../../../../../../SignUpPage/components/SignUpFormFields'
import { createUsers, readUsers, updateUsers } from '../../../../../../../../services/api/users'
import { useUserContext } from '../../../../../../../../contexts/UserContext'
import DialogOk from '../../../../../../../DialogOk'
import { updateListPagesOnEdit } from '../../../../utils/updateListPagesOnEdit'
import DialogRetry from '../../../../../../../DialogRetry'
import { GridItem, MainGridContainer } from '../../../../../../../../styles'

function AddUser({ user }) {
  const isUpdate = user !== undefined
  const [error, setError] = useState({})
  const [birthDate, setBirthDate] = useState(
    user?.birth_date
      ?.substring(0, user.birth_date.includes('T')
        ? user.birth_date.indexOf('T')
        : user.birth_date.length)
        ?? ''
  )
  const [cpf, setCpf] = useState(user?.cpf ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [gender, setGender] = useState(user?.gender ?? '')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [showPassword, setShowPassword] = useState(false)
  const [userName, setUserName] = useState(user?.name ?? '')
  const { usersPage, setDashboardParams } = useDashboardContext()
  const { users, setDashboardData } = useDashboardDataContext()
  const { setLoading } = useLoadingContext()
  const { token } = useUserContext()

  async function handleOnOkClick() {
    const fields = {
      birth_date: birthDate,
      cpf,
      email,
      gender,
      password,
      phone,
      name: userName,
    }
    const constraints = CONSTRAINTS
    if (isUpdate) {
      delete fields.password
      delete constraints.password
    }
    const validation = validateFields(fields, constraints)
    setError(validation.error)
    if (validation.passed) {
      setLoading({ show: true })
      const res = (
        isUpdate
          ? await updateUsers(user.id, fields, token)
          : await createUsers(fields)
      )
      setLoading({ show: false })
      if (res.status === 201) {
        const newUsers = { ...users }
        newUsers[usersPage] = [...newUsers[usersPage], res.data]
        setDashboardData({ users: newUsers })
        setDashboardParams({ openModal: false })
      }
      else if (res.status === 200) {
        const newUsers = await updateListPagesOnEdit(users, usersPage, user, readUsers, token)
        if (newUsers) {
          setDashboardData({ users: newUsers })
          setDashboardParams({ openModal: false })
        }
        else {
          setLoading({ show: false })
          return (
            setDashboardParams({
              dialogChild: (
                <DialogOk
                  title='Erro'
                  text='O usuário foi editado mas houve um erro ao tentar atualizar a lista.'
                  setDialogParams={setDashboardParams}
                />
              ),
              openDialog: true
            })
          )
        }
      }
      else if (res?.data?.error) {
        const errorStatus = res.data.error.status
        const errorMessage = SQL_ERROR_STATUS_DICT[errorStatus]
        setDashboardParams({
          dialogChild: (
            <DialogRetry
              title='Erro'
              text={errorMessage ?? `Não foi possível ${isUpdate ? 'editar' : 'criar'} o usuário.`}
              onRetry={handleOnOkClick}
              setDialogParams={setDashboardParams}
            />
          ),
          openDialog: true
        })
      }
    }
  }

  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12}>
        <Typography variant='h5'>{`${isUpdate ? 'Editar' : 'Novo'} Usuário`}</Typography>
      </GridItem>
      <GridItem item xs={12}>
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
          hidePassword={isUpdate}
        />
      </GridItem>
      <GridItem item xs={12}>
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='end'>
          <Button color='standard' onClick={() => setDashboardParams({ openModal: false })}>Cancelar</Button>
          <Button color='standard' onClick={handleOnOkClick}>Ok</Button>
        </Stack>
      </GridItem>
    </MainGridContainer>
  )
}

export default AddUser
