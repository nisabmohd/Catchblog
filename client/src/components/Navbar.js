import { Badge, IconButton, Menu, MenuItem } from '@mui/material'
import '../css/Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { AppContext } from "../App";
import { useContext, useState } from 'react';
// import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import logo from '../assets/blogger.png'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export const Navbar = () => {
    const context = useContext(AppContext)
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    function redirect() {
        navigate('/editor')
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSearch = () => {
        console.log(search);
        if (!search){
            toast.error("Enter keyword to search", {
                style: {
                    fontSize: '12px'
                }
            })
            return;
        }
        setSearch('')
        navigate(`/searchuser?q=${search}`)
    }
    return (
        <div className="container">
            <Toaster />
            <div className="navbar">
                <div className="left">
                    <Link to="/" className="logo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                        <img style={{ width: '36.5px', marginRight: '9px' }} src={logo} alt="" />
                        <h2 className='logohide'>CatchBlog</h2>
                    </Link>
                </div>
                <div className="middle">
                    <div className="searchbox" style={{ width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', border: context.dark ? '1px solid #353535' : '2px solid rgb(248, 248, 248)', paddingLeft: '16px', height: '36px', borderRadius: '7px' }}>
                        <SearchIcon sx={{ width: '19px', marginRight: '9px' }} />
                        <input onKeyDown={(e) => e.key === "Enter" && handleSearch()} value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" style={{ height: '24px', width: '90%', outline: 'none', border: 'none', background: 'transparent', color: 'inherit' }} />
                    </div>
                </div>
                <div className="right">
                    <button className='newpostbtn' onClick={redirect} style={{ fontFamily: 'Poppins', minWidth: 'fit-content', width: '128px', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '33px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }} variant="outlined">New Post</button>
                    <div className="tags">
                        <IconButton className='smicons' onClick={() => context.handledark()} sx={{ margin: '0 5px' }}><Brightness4Icon /></IconButton>
                        {/* <IconButton sx={{ margin: '0 15px' }}><BookmarkBorderIcon /></IconButton> */}
                        <Badge onClick={() => navigate('/notifications')} className='smicons' sx={{ margin: '0 5px' }} color="error" overlap="circular" >
                            <IconButton sx={{ marginTop: '0px' }}><NotificationsNoneIcon /></IconButton>
                        </Badge>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '12px' }} onClick={() => { navigate(`/user/${context.auth.uid}`); handleClose() }}><AccountCircleIcon sx={{marginRight:'8px',fontSize:'20px',color:context.dark?'white':'gray'}}/>Profile</MenuItem>
                            <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '12px' }} onClick={() => { navigate(`/settings`); handleClose() }}><SettingsIcon sx={{marginRight:'8px',fontSize:'20px',color:context.dark?'white':'gray'}}/>Settings</MenuItem>
                            <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '12px' }} onClick={() => { context.handlelogout(); navigate('/login'); handleClose() }}><LogoutIcon sx={{marginRight:'8px',fontSize:'20px',color:context.dark?'white':'gray'}}/>Logout</MenuItem>
                        </Menu>
                        <IconButton onClick={handleClick} className='smicons' sx={{ margin: '0 5px' }}><img style={{ width: '28px', borderRadius: '50%' }} src={context.auth.img} alt="" /></IconButton>

                    </div>
                </div>

            </div>
        </div>
    )
}
