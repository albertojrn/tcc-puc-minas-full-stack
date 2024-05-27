import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'
import SignUpPage from '../components/SignUpPage'
import ForgetPasswordPage from '../components/ForgetPasswordPage'
import DashboardPage from '../components/DashboardPage'
import { ContentMainConatiner } from '../styles'
import { useUserContext } from '../contexts/UserContext'
import ProductPage from '../components/ProductPage'
import CartPage from '../components/CartPage'
import Redirect from '../components/Redirect'
import CheckoutPage from '../components/CheckoutPage'

function EcommRoutes() {
  const { role, token } = useUserContext()
  return (
    <Routes>
      <Route exact path='/' element={<ContentMainConatiner><HomePage /></ContentMainConatiner>} />
      <Route exact path='/login' element={<ContentMainConatiner><LoginPage /></ContentMainConatiner>} />
      <Route
        exact
        path='/cart'
        element={
          !token
            ? <Redirect to='/login?redirectUrl=/cart' />
            : <ContentMainConatiner><CartPage /></ContentMainConatiner>
      }
      />
      <Route
        exact
        path='/checkout'
        element={
          !token
            ? <Redirect to='/login?redirectUrl=/checkout' />
            : <ContentMainConatiner><CheckoutPage /></ContentMainConatiner>
      }
      />
      <Route exact path='/sign-up' element={<ContentMainConatiner><SignUpPage /></ContentMainConatiner>} />
      <Route exact path='/password-recovery' element={<ContentMainConatiner><ForgetPasswordPage /></ContentMainConatiner>} />
      <Route exact path='/product/:id' element={<ContentMainConatiner><ProductPage /></ContentMainConatiner>} />
      {role === 'admin'
        && (
          <Route exact path='/dashboard' element={<DashboardPage />} />
        )}
    </Routes>
  )
}

export default EcommRoutes
