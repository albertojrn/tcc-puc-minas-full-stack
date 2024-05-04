import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'
import SignUpPage from '../components/SignUpPage'
import ForgetPasswordPage from '../components/ForgetPasswordPage'
import DashboardPage from '../components/DashboardPage'
import { ContentMainConatiner } from '../styles'

function EcommRoutes() {
  return (
    <Routes>
      <Route exact path='/' element={<ContentMainConatiner><HomePage /></ContentMainConatiner>} />
      <Route exact path='/login' element={<ContentMainConatiner><LoginPage /></ContentMainConatiner>} />
      <Route exact path='/sign-up' element={<ContentMainConatiner><SignUpPage /></ContentMainConatiner>} />
      <Route exact path='/password-recovery' element={<ContentMainConatiner><ForgetPasswordPage /></ContentMainConatiner>} />
      <Route exact path='/dashboard' element={<DashboardPage />} />
    </Routes>
  )
}

export default EcommRoutes
