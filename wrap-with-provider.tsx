import React from 'react';

/*Material UI custom theming*/
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
// import { SampleCityProvider } from './src/stores/city-context';
// import { SampleMapProvider } from './src/stores/map-context';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#99c93c',
    },
    secondary: {
      main: '#698d29',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export type AppTheme = typeof theme;

export default ({ element }) => (
  // <SampleCityProvider>
  //   <SampleMapProvider>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
  //   </SampleMapProvider>
  // </SampleCityProvider>
);


// sample abstraction: <AllMobxProviders> <ThemeProvider theme={theme}>{element}</ThemeProvider></AllMobxProviders>