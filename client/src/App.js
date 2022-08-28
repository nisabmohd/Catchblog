import { Navbar } from "./components/Navbar";
import { Post } from "./Pages/Post";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from "react";
import { Box } from "@mui/material";

export const AppContext = React.createContext()
function App() {
  const [dark, setDark] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  });

  const contextValue = { setDark, dark }
  return (
    <AppContext.Provider value={contextValue} >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Box>
            <Navbar />
            <Post />
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
