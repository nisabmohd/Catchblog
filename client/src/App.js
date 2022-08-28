import { Navbar } from "./components/Navbar";
import { Post } from "./Pages/Post";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";

export const AppContext = React.createContext()
function App() {
  const [dark, setDark] = useState(true)
  const darkTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  });
  const [auth, setAuth] = useState(false);
  const contextValue = { setDark, dark, auth, setAuth }
  return (
    <BrowserRouter>
      <AppContext.Provider value={contextValue} >
        <ThemeProvider theme={darkTheme}>
          <CssBaseline>
            <Box>
              {
                auth ?
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/post/:postid" element={<Post />} />
                    </Routes>
                  </> :
                  <Routes>
                    <Route path="/register" element={<Signup />} />
                    <Route path="/*" element={<Login />} />
                  </Routes>
              }
            </Box>
          </CssBaseline>
        </ThemeProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
