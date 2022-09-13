import { Badge, IconButton, Menu, MenuItem } from '@mui/material'
import '../css/Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
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
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useEffect } from 'react';
import axios from 'axios';
import { url } from '../baseurl';
import PostAddIcon from '@mui/icons-material/PostAdd';

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
                            <img style={{ width: '36.5px', marginRight: '9px' }} src={logo} alt="" />
                            <h2 className='logohide'>CatchBlog</h2>
                        </Link>
                    </div>
                    <div className="middle">
                        <div className="searchbox" style={{ width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', border: context.dark ? '1px solid rgb(45 45 45)' : '1px solid rgb(233 233 233)', paddingLeft: '16px', height: '35px', borderRadius: '7px', backgroundColor: context.dark ? '#121212' : '#ffff' }}>
                            <SearchIcon sx={{ width: '19px', marginRight: '9px' }} />
                            <input onKeyDown={(e) => e.key === "Enter" && handleSearch()} value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" style={{ height: '24px', width: '90%', outline: 'none', border: 'none', background: 'transparent', color: 'inherit' }} />
                        </div>
                    </div>
                    <div className="right rightnavresp">
                        <button className='newpostbtn' onClick={redirect} style={{ fontFamily: 'Poppins', minWidth: 'fit-content', width: '128px', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '33px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} variant="outlined">New Post </button>
                        <div className="tags">
                            <IconButton onClick={redirect} className='smicons hiddennavtab' sx={{}}><PostAddIcon /></IconButton>
                            <IconButton className='smicons' onClick={() => context.handledark()} sx={{ margin: '0 5px' }}>{context.dark ? <WbSunnyOutlinedIcon /> : <NightlightOutlinedIcon />}</IconButton>

                            {
                                context.hasNotification ? <IconButton onClick={() => navigate('/notifications')} style={{ borderRadius: '50%', width: '40px' }}><Badge className='smicons' sx={{ margin: '0 5px' }} variant="dot" color="error" overlap="circular" >
                                    <NotificationsNoneIcon />
                                </Badge> </IconButton> : <IconButton onClick={() => navigate('/notifications')} style={{ borderRadius: '50%', width: '40px' }} ><Badge className='smicons' sx={{ margin: '0 5px' }} color="error" overlap="circular" >
                                    <NotificationsNoneIcon />
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
