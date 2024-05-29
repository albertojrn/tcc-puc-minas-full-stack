import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from '@mui/icons-material'
import { SearchContainer, SearchInput } from './styles'
import { useStoreContext } from '../../../../contexts/StoreContext'

function SearchForm() {
  const searchInput = useRef(null)
  const navigate = useNavigate()
  const { openMobileSearchField, setStorePersistent } = useStoreContext()

  function handleFormSubmit(e) {
    e.preventDefault()
    const searchQuery = searchInput.current.firstChild.value
    let navigateTo = '/store'
    if (searchQuery) {
      navigateTo = `/store?searchquery=${searchQuery}`
    }
    if (openMobileSearchField) setStorePersistent({ openMobileSearchField: false })
    navigate(navigateTo)
  }

  function enterPresed(e) {
    if (e.key === 'Enter') {
      handleFormSubmit(e)
    }
  }

  return (
    <SearchContainer>
      <SearchInput
        ref={searchInput}
        onKeyDown={enterPresed}
        placeholder='o que você procura?'
        endAdornment={<Search onClick={handleFormSubmit}/>}
      />
    </SearchContainer>
  )
}

export default SearchForm
