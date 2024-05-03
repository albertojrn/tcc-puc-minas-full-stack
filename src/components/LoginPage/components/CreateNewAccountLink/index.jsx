import React from 'react'
import { MinimalButton, MinimalText } from '../../../../styles'

function CreateNewAccountLink() {
  return (
    <MinimalText align='center' component='div'>
      Não tem uma conta? Cadastre-se
      &nbsp;
      <MinimalButton
        noMinWidth
        noPadding
      >
        aqui
      </MinimalButton>
      .
    </MinimalText>
  )
}

export default CreateNewAccountLink
