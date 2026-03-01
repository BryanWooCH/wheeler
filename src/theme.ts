import { createTheme } from "@mui/material/styles"

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#663399",
    },
    secondary: {
      main: "#00897b",
    },
    background: {
      default: "#f8f7fb",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
  },
})
