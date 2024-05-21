import React from 'react'
import { useUserContext } from '../../contexts/UserContext'

function HomePage() {
  const { id } = useUserContext()
  return (
    <p>Home Page</p>
  )
}

export default HomePage
