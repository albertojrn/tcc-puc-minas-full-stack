import React, { useState } from 'react'
import { COLUMNS } from '../UsersList/constants/gridParams'
import { GridItem } from '../../../../../../../../styles'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import UsersListItemToolbox from '../UsersListItemToolbox'

function UsersListItem({ user }) {
  const [collapse, setSollapse] = useState(true)
  const { usersPage } = useDashboardContext()

  return (
    <>
      {COLUMNS.map(column => (
        <GridItem item key={column.id} align={column.align} hideInMobile={column.hideInMobile} {...column.sizes}>
          {user[column.id]}
        </GridItem>
      ))}
      <GridItem item align='center' xs={0.5}>
        <UsersListItemToolbox page={usersPage} user={user} />
      </GridItem>
    </>
  )
}

export default UsersListItem
