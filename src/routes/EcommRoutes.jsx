import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'

function EcommRoutes() {
  return (
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route exact path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default EcommRoutes
