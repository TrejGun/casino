import {ComponentClass, FunctionComponent} from "react";
import {createRoot} from "react-dom/client";
import {createTheme, CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";

const theme = createTheme();

export default (App: ComponentClass<any> | FunctionComponent<any>): void => {
  const container = document.getElementById("app");
  const root = createRoot(container!);
  root.render(
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <App />
      </StyledEngineProvider>
    </ThemeProvider>,
  );
};
