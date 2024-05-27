import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import EcommRoutes from './routes/EcommRoutes'
import { StoreContextProvider } from './contexts/StoreContext'
import NavBar from './components/NavBar'
import CUSTOM_THEME from './constants/theme'
import { LoadingContextProvider } from './contexts/LoadingContext'
import Loading from './components/Loading'
import 'bootstrap/dist/css/bootstrap.min.css'
import DialogRoot from './components/DialogRoot'

function App() {
  const theme = createTheme(CUSTOM_THEME)

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StoreContextProvider>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
            <LoadingContextProvider>
              <div id='app-main'>
                <NavBar />
                <EcommRoutes />
                <Loading />
                <DialogRoot />
              </div>
            </LoadingContextProvider>
          </GoogleOAuthProvider>
        </StoreContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
