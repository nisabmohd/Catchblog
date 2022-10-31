import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../baseurl";
import { AppContext } from "../App";
import millify from "millify";
import { Dialog } from "@mui/material";
import { PostcardUserSkeleton } from "./PostcardUserSkeleton";

const loadingarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const UserCard = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const context = useContext(AppContext)
    const [iFollow, setIFollow] = useState(false)
    const [followers, setFollwers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [showFollings, setShowFollings] = useState([])
    const [showFoll, setShowFoll] = useState([])
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [loading, setLoading] = useState(true)

    const handleClickOpen = async () => {
        setOpen(true);
        const resp = await axios.get(`${url}/user/followers/${props.uid}`)
        console.log(resp.data);
        setShowFoll(resp.data)
        setLoading(false)
    };
    const handleClickOpen1 = async () => {
        setOpen1(true);
        const resp = await axios.get(`${url}/user/followings/${props.uid}`)
        console.log(resp.data);
        setShowFollings(resp.data)
        setLoading(false)
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(false)
        setOpen1(false)
        async function fetch() {
            const resp = await axios.get(`${url}/user/${props.uid}`)
            setFollwers(resp.data.followers.length)
            setFollowing(resp.data.followings.length)
            if (resp.data.followers.includes(context.auth.uid)) {
                setIFollow(true)
            }
            setUser(resp.data)
        }
        props.uid && fetch();
    }, [context.auth.uid, props.uid])

    const follow = async () => {
        const resp = await axios.put(`${url}/user/follow`, {
            currUser: context.auth.uid,
            fUser: user.uid
        })
        if (resp.data.message) {
            setIFollow(true)
            setFollwers(followers + 1)
        }

    }
    const unfollow = async () => {
        const resp = await axios.put(`${url}/user/unfollow`, {
            currUser: context.auth.uid,
            fUser: user.uid
        })
        if (resp.data.message) {
            setIFollow(false)
            setFollwers(followers - 1)
        }
    }

    return (
        <div className="user-card" style={{ marginTop: '12px', borderRadius: '10px', width: '490px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: '13px' }} className="userdetails">
                <Link style={{ color: 'inherit', textDecoration: 'none', display: 'flex',  }} to={`/user/${props.uid}`}><img style={{ width: '45px', borderRadius: '35%' }} src={user && user.img} alt="" /></Link>
                <div className="name" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/user/${props.uid}`}>
                        <p style={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '15.85px',
                        lineHeight: '24px',
                        marginLeft: '21px',
                        whiteSpace:'nowrap',
                        marginTop:'-10px'
                    }}>{user && user.username}</p></Link>
                    <div className="button" style={{ width: '99%',marginTop:'-25px',marginLeft:'2px' }}>
                        {
                            props.uid === context.auth.uid ? <button onClick={() => navigate('/settings')} className="followbtn" style={{ fontFamily: 'IBM Plex Sans', width: 'inherit', marginTop: '0px', color: 'gray', outline: 'none', cursor: 'pointer', fontSize: '13.45px',marginLeft:'9px',border:'none',background:'transparent',height:'27px',borderRadius:'5px', }} variant="outlined">Edit Profile</button>
                                :
                                !iFollow ? <button onClick={follow} className="followbtn" style={{ fontFamily: 'IBM Plex Sans', width: 'inherit', marginTop: '0px', color: 'inherit', outline: 'none', cursor: 'pointer', fontSize: '13.45px',marginLeft:'9px',border:'none',background:'transparent',height:'27px',borderRadius:'5px',}} variant="outlined">Follow</button> :
                                    <button onClick={unfollow} className="followbtn" style={{ fontFamily: 'IBM Plex Sans', width: 'inherit', marginTop: '0px', color: 'inherit', outline: 'none', cursor: 'pointer', fontSize: '13.45px',marginLeft:'9px',border:'none',background:'transparent',height:'27px',borderRadius:'5px',}} variant="outlined">Unfollow</button>
                        }
                    </div>
                </div>
            </div>
                <p style={{marginLeft:'65px',marginTop:'-33px',fontSize:'13.75px',color:'inherit'}}>{user && user.summary}</p>
            <div className="other-details" style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '-13px' }}>
                <div className="followings" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '14px',
                        lineHeight: '24px',
                    }}>Followings : </p>
                    <p onClick={() => handleClickOpen1()} style={{
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '13px',
                        lineHeight: '24px',
                        marginLeft: '7px',
                        cursor: 'pointer'
                    }}>{user && millify(following)}</p>
                    <span style={{ marginLeft: '11.5px', color: context.dark ? '#444444' : '#d4d3d3' }}>|</span>
                    <Dialog
                        open={open1}
                        onClose={handleClose1}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div style={{ width: '500px', height: '700px', padding: '18px 18px' }} className="width500">
                            <h4>Followings</h4>
                            {
                                loading ? loadingarr.map(item => <div style={{ marginTop: '26px', marginBottom: '23px' }}><PostcardUserSkeleton key={item} /></div>) : showFollings.length !== 0 && showFollings.map(item => {
                                    return <Link key={item.uid} to={`/user/${item.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                        <div className={`card cardnotify`} style={{ width: '95%', padding: '2px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(72 72 72)' : '1px solid rgb(238 238 238)', paddingBottom: '11.5px', paddingTop: '11px' }}>
                                            <div className="header" style={{ width: '100%' }}>
                                                <div className="textheader" style={{ width: '100%' }}>
                                                    <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                                                        <img style={{ width: '46px', borderRadius: '35%', marginRight: '16px', marginTop: '0px' }} src={item.img} alt="" />
                                                        <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                                                            <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                <div>
                                                                    <div className="userdet" style={{ display: 'flex', flexDirection: 'row', }}>
                                                                        <p style={{ margin: '0', marginRight: '5px', fontSize: '15px' }}>{item.username}</p>
                                                                        <p style={{ fontSize: '12.55px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '0px', minWidth: 'fit-content', marginLeft: '7px' }}><span>Joined</span> :{item.joined.slice(0, 10)}</p>
                                                                    </div>
                                                                    <div className="summary" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '12px', width: 'inherit' }}>
                                                                        <p style={{ fontSize: '13.95px', margin: 0, marginTop: '-8px', width: '120%' }}>{item.summary}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                })
                            }
                        </div>
                    </Dialog>
                </div>
                <div className="followers" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '12px' }}>
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '14px',
                        lineHeight: '24px',
                    }}>Followers : </p>
                    <p onClick={() => handleClickOpen()} style={{
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '13px',
                        lineHeight: '24px',
                        marginLeft: '7px',
                        cursor: 'pointer'
                    }}>{user && millify(followers)}</p>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div style={{ width: '500px', height: '700px', padding: '18px 18px' }} className="width500">
                        <h4>Followers</h4>
                        {
                            loading ? loadingarr.map(item => <div style={{ marginTop: '26px', marginBottom: '23px' }}><PostcardUserSkeleton key={item} /></div>) : showFoll.length !== 0 && showFoll.map(item => {
                                return <Link key={item.uid} to={`/user/${item.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                    <div className={`card cardnotify`} style={{ width: '95%', padding: '2px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(72 72 72)' : '1px solid rgb(238 238 238)', paddingBottom: '11.5px', paddingTop: '11px' }}>
                                        <div className="header" style={{ width: '100%' }}>
                                            <div className="textheader" style={{ width: '100%' }}>
                                                <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                                                    <img style={{ width: '46px', borderRadius: '35%', marginRight: '16px', marginTop: '0px' }} src={item.img} alt="" />
                                                    <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                                                        <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                            <div>
                                                                <div className="userdet" style={{ display: 'flex', flexDirection: 'row', }}>
                                                                    <p style={{ margin: '0', marginRight: '5px', fontSize: '15px' }}>{item.username}</p>
                                                                    <p style={{ fontSize: '12.55px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '0px', minWidth: 'fit-content', marginLeft: '7px' }}><span>Joined</span> :{item.joined.slice(0, 10)}</p>
                                                                </div>
                                                                <div className="summary" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '12px', width: 'inherit' }}>
                                                                    <p style={{ fontSize: '13.95px', margin: 0, marginTop: '-6px', width: '120%' }}>{item.summary}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </Dialog>
            </div>

            

        </div >
    )
}
