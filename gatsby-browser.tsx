import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { GatsbyBrowser } from "gatsby";
import { appTheme } from "./src/theme";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {element}
    </ThemeProvider>
  );
};
