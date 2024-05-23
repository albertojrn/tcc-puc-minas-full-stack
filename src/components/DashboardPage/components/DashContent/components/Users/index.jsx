import React from 'react'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import ContentHeader from '../ContentHeader'
import UsersList from './components/UsersList'

function Users() {
  return (
    <MainGridContainer container spacing={2}>
      <>
        <ContentHeader page='users' title='Usuários' />
        <GridItem item xs={12}>
          <UsersList />
        </GridItem>
      </>
    </MainGridContainer>
  )
}

export default Users
