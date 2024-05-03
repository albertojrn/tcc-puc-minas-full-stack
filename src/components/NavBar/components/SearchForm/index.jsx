import React from 'react'
import { Search } from '@mui/icons-material'
import { SearchContainer, SearchInput } from './styles'

function SearchForm() {
  return (
    <SearchContainer>
      <SearchInput
        placeholder='Busque aqui seu produto'
        startAdornment={<Search />}
      />
    </SearchContainer>
  )
}

export default SearchForm
