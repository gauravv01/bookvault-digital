import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5E56E7",
      contrastText: "#F8F7FF",
    },
    background: {
      default: "#F8F7FF",
      paper: "#FFFFFF",
    },
    grey: {
      100: "#F0F0F6",
      500: "#A0A0A0",
      900: "#333333",
    },
    text: {
      primary: "#333333",
      secondary: "#A0A0A0",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h1: {
      fontSize: "48px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "30px",
      fontWeight: 600,
    },
    h3:{
      fontSize: "20px",
      fontWeight: 600,
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "12px",
      fontWeight: 400,
    },
    button: {
      fontSize: "20px",
      fontWeight: 400,
      textTransform: "uppercase",
      
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#333333",
          fontWeight:"bold",
          borderRadius: "4px",
          backgroundColor:"#FFF",
          padding: "0 10px",
          height: "40px",
          boxShadow: "0 2px 5px 0 rgba(211, 209, 238, 0.5)",
          width:"200px"
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: "114px",
          height: "162px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px 0 rgba(211, 209, 238, 0.5)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: 400,
        },
      },
    },
  },
});

export default theme;
