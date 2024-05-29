import React from 'react'
import { CustomLink } from '../../../../styles'
import { AppBarMenuContainer } from './styles'
import { COLORS } from '../../../../constants/theme'

function AppBarMenu() {
  return (
    <AppBarMenuContainer
      alignItems='center'
      direction='row'
      display={{ xs: 'none', md: 'flex' }}
      spacing={5}
    >
      <CustomLink color={COLORS.urbanBlack} to='/store' textDecoration='none' preventWrap>TODAS AS CATEGORIAS</CustomLink>
      <CustomLink color={COLORS.urbanBlack} to='/store?fv=81' textDecoration='none' preventWrap>MASCULINO</CustomLink>
      <CustomLink color={COLORS.urbanBlack} to='/store?fv=82' textDecoration='none' preventWrap>FEMININO</CustomLink>
      <CustomLink color={COLORS.urbanBlack} to='/store?fv=86' textDecoration='none' preventWrap>INFANTIL</CustomLink>
      <CustomLink color={COLORS.urbanBlack} to='/store?fv=5' textDecoration='none' preventWrap>TÊNIS CASUAL</CustomLink>
      <CustomLink color={COLORS.urbanBlack} to='/store?fv=11' textDecoration='none' preventWrap>TÊNIS PARA CORRIDA</CustomLink>
    </AppBarMenuContainer>
  )
}

export default AppBarMenu
