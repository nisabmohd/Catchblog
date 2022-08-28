import { Button } from '@mui/material'
import '../css/Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { AppContext } from "../App";
import { useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const Navbar = () => {
    const context = useContext(AppContext)
    return (
        <div className="container">
            <div className="navbar">
                <div className="left">
                    <div className="logo">
                        <h2>CatchBlog</h2>
                    </div>
                </div>
                <div className="middle">
                    <div className="searchbox" style={{ width: '80%',display:'flex',flexDirection:'row',alignItems:'center',border:context.dark ? '1px solid #353535':'1px solid rgb(227 223 223)',paddingLeft:'16px',height:'36px',borderRadius:'10px' }}>
                        <SearchIcon sx={{width:'19px',marginRight:'9px'}}/>
                        <input type="text" placeholder="Search" style={{ height: '24px', width: '90%', outline: 'none', border: 'none', background: 'transparent', color: 'inherit' }} />
                    </div>
                </div>
                <div className="right">
                    <div className="tags">
                        <Button onClick={() => { context.setDark(!context.dark) }} variant="text"><Brightness4Icon sx={{ color: context.dark ? 'white' : 'black',width:'21px' }} /></Button>
                        <Button variant="text"><BookmarkIcon sx={{ color: context.dark ? 'white' : 'black',width:'23px' }} /></Button>
                        <Button variant="text"><NotificationsIcon sx={{ color: context.dark ? 'white' : 'black',width:'23px' }} /></Button>
                        <Button variant="text"><PersonIcon sx={{ color: context.dark ? 'white' : 'black',width:'23px' }} /></Button>
                    </div>
                </div>

            </div>
        </div>
    )
}
