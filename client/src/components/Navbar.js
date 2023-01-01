import { Badge, IconButton, Menu, MenuItem } from '@mui/material'
import '../css/Navbar.css'
import { AppContext } from "../App";
import { useContext, useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useEffect } from 'react';
import axios from 'axios';
import { url } from '../baseurl';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SearchIcon from '@mui/icons-material/Search';

export const Navbar = () => {
    const context = useContext(AppContext)
    const navigate = useNavigate()
    // const [search, setSearch] = useState('')
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

    return (
        <div style={{ backgroundColor: context.dark ? "#282828" : 'white' }} >
            <div className="container">
                <div className="navbar">
                    <div className="left">
                        <Link to="/" className="logo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                            <h2 style={{ fontSize: '24px', width: '185px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '15px' }} >
                                <DataObjectIcon sx={{ marginBottom: '-2px', fontSize: '38px', marginRight: '10px', color: 'gray' }} />
                                <span className='logohide'><span >catch</span><span>blog</span></span><span className='hideshow'>cb</span> </h2>
                        </Link>
                    </div>

                    <div className="right rightnavresp">
                        <IconButton style={{ borderRadius: '50%', width: '40px' }} onClick={redirect} className='smicons' sx={{ margin: '0 5px' }}><i style={{ fontSize: '19px', marginBottom: '-4px' }} className="fi fi-rr-edit"></i></IconButton>

                        <div className="tags">
                            <IconButton className='smicons' onClick={() => navigate('/search')} sx={{ margin: '0 5px' }}><SearchIcon sx={{ fontSize: '26px' }} /></IconButton>
                            <IconButton className='smicons' onClick={() => context.handledark()} sx={{ margin: '0 5px' }}>{context.dark ? <WbSunnyOutlinedIcon sx={{ fontSize: '25px' }} /> : <NightlightOutlinedIcon sx={{ fontSize: '23px' }} />}</IconButton>

                            {
                                context.hasNotification ? <IconButton onClick={() => navigate('/notifications')} style={{ borderRadius: '50%', width: '40px' }}><Badge className='smicons' sx={{ margin: '0 5px' }} variant="dot" color="error" overlap="circular" >
                                    <NotificationsNoneIcon sx={{ fontSize: '22px' }} />
                                </Badge> </IconButton> : <IconButton onClick={() => navigate('/notifications')} style={{ borderRadius: '50%', width: '40px' }} ><Badge className='smicons' sx={{ margin: '0 5px' }} color="error" overlap="circular" >
                                    <NotificationsNoneIcon sx={{ fontSize: '26px' }} />
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
                                <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '13.8px', letterSpacing: '0.45px' }} onClick={() => { navigate(`/user/${context.auth.uid}`); handleClose() }}><AccountCircleIcon sx={{ marginRight: '8px', fontSize: '22px', color: context.dark ? 'white' : 'gray', marginLeft: '-6px' }} />Profile</MenuItem>
                                <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '13.8px', letterSpacing: '0.45px' }} onClick={() => { navigate(`/saved`); handleClose() }}><BookmarkAddedIcon sx={{ marginRight: '8px', fontSize: '22px', color: context.dark ? 'white' : 'gray', marginLeft: '-6px' }} />Saved</MenuItem>
                                <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '13.8px', letterSpacing: '0.45px' }} onClick={() => { navigate(`/settings`); handleClose() }}><SettingsIcon sx={{ marginRight: '8px', fontSize: '22px', color: context.dark ? 'white' : 'gray', marginLeft: '-6px' }} />Settings</MenuItem>
                                <MenuItem sx={{ fontFamily: 'Poppins', fontSize: '13.8px', letterSpacing: '0.45px' }} onClick={() => { context.handlelogout(); navigate('/login'); handleClose() }}><LogoutIcon sx={{ marginRight: '8px', fontSize: '21px', color: context.dark ? 'white' : 'gray', marginLeft: '-6px' }} />Logout</MenuItem>
                            </Menu>
                            <IconButton onClick={handleClick} className='smicons' sx={{ margin: '0 5px' }}><img style={{ width: '30px', borderRadius: '50%' }} src={context.auth.img} alt="" /></IconButton>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
