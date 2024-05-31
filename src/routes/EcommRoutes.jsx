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
import OrderConfirmationPage from '../components/OrderConfirmationPage'
import ProfilePage from '../components/ProfilePage'
import StorePage from '../components/StorePage'

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
      <Route
        exact
        path='/my-profile'
        element={
          !token
            ? <Redirect to='/login?redirectUrl=/my-profile' />
            : <ContentMainConatiner><ProfilePage /></ContentMainConatiner>
      }
      />
      <Route exact path='/order-confirmation/:slug' element={<ContentMainConatiner><OrderConfirmationPage /></ContentMainConatiner>} />
      <Route exact path='/sign-up' element={<ContentMainConatiner><SignUpPage /></ContentMainConatiner>} />
      <Route exact path='/password-recovery' element={<ContentMainConatiner><ForgetPasswordPage /></ContentMainConatiner>} />
      <Route exact path='/store' element={<ContentMainConatiner><StorePage /></ContentMainConatiner>} />
      <Route exact path='/product/:id' element={<ContentMainConatiner><ProductPage /></ContentMainConatiner>} />
      <Route
        exact
        path='/dashboard'
        element={
          role === 'admin'
            ? <DashboardPage />
            : <Redirect to='/' />
        }
      />
    </Routes>
  )
}

export default EcommRoutes
