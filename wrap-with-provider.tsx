import React from "react";

/*Material UI custom theming*/
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { JsonPlaceholderProvider } from "./src/JSONPlaceholder/json-placeholder.context";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF003F",
    },
    secondary: {
      main: "#890022",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
  },
});

export default ({ element }) => (
  <JsonPlaceholderProvider>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </JsonPlaceholderProvider>
);
