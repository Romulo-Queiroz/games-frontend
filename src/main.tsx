import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';

 const theme = createTheme({
   palette: {
     mode: 'light',       // ou 'dark'
     primary: { main: '#1976d2' },
     secondary: { main: '#dc004e' },
   },
 });

ReactDOM.createRoot(document.getElementById('root')!).render(
 <ThemeProvider theme={theme}>
   <CssBaseline />    
    <App />
 </ThemeProvider>
);
