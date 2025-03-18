import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { createTheme, ThemeProvider } from '@mui/material';
import { appColors } from './configs/layout.config';
import { Provider } from 'react-redux';
import { store } from './store/store';
import GlobalSnackbar from './components/GlobalSnackbar';
const theme = createTheme({
  palette: {
    primary: {
      main: appColors.primary,
      contrastText: '#fff',
    },
    secondary: {
      main: appColors.secondary,
      contrastText: '#000',
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <GlobalSnackbar />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
