import React, { useEffect, useState } from 'react'
import { GridItem, MainGridContainer } from '../../../../../../../../styles'
import { COLUMNS } from './constants/gridParams'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import PleaseTryAgain from '../../../../../../../PleaseTryAgain'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import { loadUsers } from '../../../../../../../../utils/users'
import { useUserContext } from '../../../../../../../../contexts/UserContext'
import UsersListItem from '../UsersListItem'
import GridListHeader from '../../../GridListHeader'

function UsersList() {
  const [errFetch, setErrFetch] = useState('')
  const [loading, setLoading] = useState(false)
  const { users, setDashboardData } = useDashboardDataContext()
  const { usersPage, setDashboardParams } = useDashboardContext()
  const { token } = useUserContext()

  async function fetchParams() {
    setLoading(true)
    await loadUsers(users, usersPage, setDashboardData, token, setErrFetch)
    setLoading(false)
  }

  useEffect(() => {
    fetchParams()
    return (() => {
      if (usersPage !== 1) setDashboardParams({ usersPage: 1 })
    })
  }, [])

  return (
    <MainGridContainer container spacing={{ xs: 0.5, md: 2 }} alignItems='center'>
      <GridListHeader columns={COLUMNS} />
      <GridItem item xs={0.5} />
      {errFetch
        ? (
          <GridItem item xs={12}>
            <PleaseTryAgain
              onTryAgain={fetchParams}
              text={errFetch}
            />
          </GridItem>
        )
        : (
          users[usersPage]?.map(user => (
            <UsersListItem key={user.id} user={user} />
          ))
        )}
    </MainGridContainer>
  )
}

export default UsersList
