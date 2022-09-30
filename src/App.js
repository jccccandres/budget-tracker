import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LandingRoutes from './routes/LandingRoutes';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#222f3e",
      light: "#576574",
      text: "#ffffff"
    },
    secondary: {
      main: "#8395a7",
      light: "#c8d6e5"
    },
    background: {
      default: "#1b242e"
    }
  }
});

const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <LandingRoutes />
        </ThemeProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;