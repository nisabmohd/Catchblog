import { Badge, IconButton, Menu, MenuItem } from '@mui/material'
import '../css/Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from "../App";
import { useContext, useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import logo from '../assets/CB-logos_black.png'
import darklogo from '../assets/CB-logos_white.png'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useEffect } from 'react';
import axios from 'axios';
import { url } from '../baseurl';

export const Navbar = () => {
    const context = useContext(AppContext)
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    function redirect() {
        navigate(`/editor/newpost`)
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        async function fetch() {
            const resp = await axios.get(`${url}/user/hasnotification/${context.auth.uid}`)
            context.setHaveNotification(resp.data)
        }
        fetch();
    }, [context])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSearch = () => {
        console.log(search);
        if (!search) {
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
        <div className={context.dark ? "bg" : "bg-light"}>
            <div className="container">
                <Toaster />
                <div className="navbar">
                    <div className="left">
                        <Link to="/" className="logo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                            <img style={{ width: '45.5px', marginRight: '2px', marginLeft: '-5px' }} src={context.dark ? darklogo : logo} alt="" />
                            <h2 style={{ fontSize: '23px' }} className='logohide'>catchblog</h2>
                        </Link>
                    </div>
                    <div className="middle">
                        <div className="searchbox" style={{ width: '85%', display: 'flex', flexDirection: 'row', alignItems: 'center', border: context.dark ? '1px solid rgb(83 82 82)' : '1px solid rgb(200 200 200)', paddingLeft: '16px', height: '38px', borderRadius: '18px', }}>
                            <SearchIcon sx={{ width: '17px', marginRight: '9px' }} />
                            <input onKeyDown={(e) => e.key === "Enter" && handleSearch()} value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" style={{ height: '24px', width: '90%', outline: 'none', border: 'none', background: 'transparent', color: 'inherit', fontSize: '13.5px' }} />
                        </div>
                    </div>
                    <div className="right rightnavresp">
                        <IconButton style={{ borderRadius: '50%', width: '40px'}} onClick={redirect} className='smicons' sx={{ margin: '0 5px' }}><i style={{ fontSize: '17px', marginBottom: '-4px' }} class="fi fi-rr-edit"></i></IconButton>

                        <div className="tags">
                            <IconButton className='smicons' onClick={() => context.handledark()} sx={{ margin: '0 5px' }}>{context.dark ? <WbSunnyOutlinedIcon sx={{ fontSize: '22px' }} /> : <NightlightOutlinedIcon sx={{ fontSize: '22px' }} />}</IconButton>

                            {
                                context.hasNotification ? <IconButton onClick={() => navigate('/notifications')} style={{ borderRadius: '50%', width: '40px' }}><Badge className='smicons' sx={{ margin: '0 5px' }} variant="dot" color="error" overlap="circular" >
                                    <NotificationsNoneIcon sx={{ fontSize: '22px' }} />
                                </Badge> </IconButton> : <IconButton onClick={() => navigate('/notifications')} style={{ borderRadius: '50%', width: '40px' }} ><Badge className='smicons' sx={{ margin: '0 5px' }} color="error" overlap="circular" >
                                    <NotificationsNoneIcon sx={{ fontSize: '22px' }} />
                                </Badge></IconButton>
                            }
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '12px' }} onClick={() => { navigate(`/user/${context.auth.uid}`); handleClose() }}><AccountCircleIcon sx={{ marginRight: '8px', fontSize: '20px', color: context.dark ? 'white' : 'gray', marginLeft: '-6px' }} />Profile</MenuItem>
                                <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '12px' }} onClick={() => { navigate(`/saved`); handleClose() }}><BookmarkAddedIcon sx={{ marginRight: '8px', fontSize: '20px', color: context.dark ? 'white' : 'gray', marginLeft: '-6px' }} />Saved</MenuItem>
                                <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '12px' }} onClick={() => { navigate(`/settings`); handleClose() }}><SettingsIcon sx={{ marginRight: '8px', fontSize: '20px', color: context.dark ? 'white' : 'gray', marginLeft: '-6px' }} />Settings</MenuItem>
                                <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '12px' }} onClick={() => { context.handlelogout(); navigate('/login'); handleClose() }}><LogoutIcon sx={{ marginRight: '8px', fontSize: '20px', color: context.dark ? 'white' : 'gray', marginLeft: '-6px' }} />Logout</MenuItem>
                            </Menu>
                            <IconButton onClick={handleClick} className='smicons' sx={{ margin: '0 5px' }}><img style={{ width: '30px', borderRadius: '50%' }} src={context.auth.img} alt="" /></IconButton>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
