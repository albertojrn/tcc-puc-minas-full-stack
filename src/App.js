import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material';
import './App.css'
import EcommRoutes from './routes/EcommRoutes'
import NavBar from './components/NavBar';
import CUSTOM_THEME from './constants/theme';
import { AppContent } from './styles';

function App() {
  const theme = createTheme(CUSTOM_THEME)

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div id='app-main'>
          <NavBar />
          <AppContent>
            <EcommRoutes />
          </AppContent>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
