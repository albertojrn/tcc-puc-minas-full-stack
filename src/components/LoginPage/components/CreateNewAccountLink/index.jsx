import React from 'react'
import { Link } from 'react-router-dom'
import { MinimalButton, MinimalText } from '../../../../styles'

function CreateNewAccountLink() {
  return (
    <MinimalText align='center' component='div'>
      Não tem uma conta? Cadastre-se
      &nbsp;
      <Link to='/sign-up'>
        <MinimalButton
          noMinWidth
          noPadding
        >
          aqui
        </MinimalButton>
      </Link>
      .
    </MinimalText>
  )
}

export default CreateNewAccountLink
