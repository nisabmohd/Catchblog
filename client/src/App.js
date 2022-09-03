import { Navbar } from "./components/Navbar";
import { Post } from "./Pages/Post";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { Reset } from "./Pages/Reset";
import { Home } from "./Pages/Home";
import { Edit } from "./Pages/Edit";
import { User } from "./Pages/User";
import { Saved } from "./Pages/Saved";
import {Tags} from './Pages/Tags'
import {Notifications} from './Pages/Notifications'
import { Search } from "./Pages/Search";
import { SearchUser } from "./Pages/SearchUser";
import { Setting } from "./Pages/Setting";


export const AppContext = React.createContext()
function App() {
  const [dark, setDark] = useState(true)
  const [auth, setAuth] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  });


  useEffect(()=>{
    const isDark=localStorage.getItem('dark')
    if(isDark){
      if(isDark==='true') setDark(true)
      else setDark(false)
    }
    const isAuth=localStorage.getItem('auth')
    if(isAuth){
      setAuth(JSON.parse(isAuth))
    }
  },[])

  function handlelogout(){
    setAuth(false)
    localStorage.removeItem('auth')
  }
  function handledark(){
    setDark(!dark)
    localStorage.setItem('dark',`${!dark}`)
  }

  const contextValue = { setDark, dark, auth, setAuth,handledark,handlelogout}
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
                      <Route path="/" element={<Home/>} />
                      <Route path="/search" element={<Search/>} />
                      <Route path="/settings" element={<Setting/>} />
                      <Route path="/searchuser" element={<SearchUser/>} />
                      <Route path="/notifications" element={<Notifications/>} />
                      <Route path="/tags/:tag"  element={<Tags/>} />
                      <Route path="/saved" element={<Saved />} />
                      <Route path="/editor" element={<Edit />} />
                      <Route path="/user/:uid" element={<User />} />
                      <Route path="/post/:postid" element={<Post />} />
                    </Routes>
                  </> :
                  <Routes>
                    <Route path="/register" element={<Signup />} />
                    <Route path="/reset" element={<Reset />} />
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
