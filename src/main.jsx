import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App.jsx";
import theme from "./theme/theme.js";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
