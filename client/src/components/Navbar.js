import { IconButton } from '@mui/material'
import '../css/Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { AppContext } from "../App";
import { useContext } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import logo from '../assets/blogger.png'

export const Navbar = () => {
    const context = useContext(AppContext)
    return (
        <div className="container">
            <div className="navbar">
                <div className="left">
                    <div className="logo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img style={{ width: '36.5px', marginRight: '9px' }} src={logo} alt="" />
                        <h2>CatchBlog</h2>
                    </div>
                </div>
                <div className="middle">
                    <div className="searchbox" style={{ width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', border: context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)', paddingLeft: '16px', height: '36px', borderRadius: '7px' }}>
                        <SearchIcon sx={{ width: '19px', marginRight: '9px' }} />
                        <input type="text" placeholder="Search" style={{ height: '24px', width: '90%', outline: 'none', border: 'none', background: 'transparent', color: 'inherit' }} />
                    </div>
                </div>
                <div className="right">
                    <div className="tags">
                        <IconButton onClick={() => { context.setDark(!context.dark) }} sx={{margin:'0 15px'}}><Brightness4Icon sx={{ color: context.dark ? 'white' : 'black', width: '21px' }} /></IconButton>
                        <IconButton  sx={{margin:'0 15px'}}><BookmarkIcon sx={{ color: context.dark ? 'white' : 'black', width: '23px' }} /></IconButton>
                        <IconButton  sx={{margin:'0 15px'}}><NotificationsIcon sx={{ color: context.dark ? 'white' : 'black', width: '23px' }} /></IconButton>
                        <IconButton sx={{margin:'0 15px'}}><PersonIcon sx={{ color: context.dark ? 'white' : 'black', width: '23px' }} /></IconButton>
                    </div>
                </div>

            </div>
        </div>
    )
}
