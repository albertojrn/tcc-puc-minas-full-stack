import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import EcommRoutes from './routes/EcommRoutes'
import NavBar from './components/NavBar'
import CUSTOM_THEME from './constants/theme'
import { LoadingContextProvider } from './contexts/LoadingContext'
import Loading from './components/Loading'
import { DashboardContextProvider } from './contexts/DashboardContext'
import { DashboardDataContextProvider } from './contexts/DashboardDataContext'

function App() {
  const theme = createTheme(CUSTOM_THEME)

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LoadingContextProvider>
          <DashboardContextProvider>
            <DashboardDataContextProvider>
              <div id='app-main'>
                <NavBar />
                <EcommRoutes />
                <Loading />
              </div>
            </DashboardDataContextProvider>
          </DashboardContextProvider>
        </LoadingContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
