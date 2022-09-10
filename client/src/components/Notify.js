import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import { url } from '../baseurl'
import ReactTimeAgo from 'react-time-ago'
import { PostCard } from './PostCard'


export const Notify = (props) => {
    const context = useContext(AppContext)
    const [user, setUser] = useState()
    const [content, setContent] = useState('')
    const [newNot, setNewNot] = useState()

    useEffect(() => {
        async function fetch() {
            const resp = await axios.get(`${url}/user/${props.uid}`)
            setUser(resp.data)
        }
        async function customPostNoti() {
            const resp = await axios.get(`${url}/post/${props.postid}`)
            setNewNot(resp.data)
            console.log(resp.data);
        }
        props.uid && fetch();
        if (props && props.type === 1) {
            setContent("Liked your Post")
        }
        if (props && props.type === 2) {
            setContent("Saved your Post")
        }
        if (props && props.type === 3) {
            setContent("Followed you")
        }
        if (props && props.type === 4) {
            customPostNoti()
            setContent("made a new post")
        }
    }, [props, props.uid])

    return (
        props &&
            (props.type === 1 || props.type === 2) ? <Link to={`/post/${props.postid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '-99' }}>
            <div className={`card cardnotify`} style={{ width: '95%', padding: '8px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)', paddingBottom: '10px' }}>
                <div className="header">
                    <div className="textheader">
                        <div className='not-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Link to={`/user/${user && user.uid}`}>
                                <img className='notiimg' style={{ width: '36px', borderRadius: '50%', marginRight: '12px' }} src={user && user.img} alt="" />
                            </Link>
                            <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                        <p className='notiHp' style={{ margin: '0', marginRight: '5px', fontSize: '14.5px', marginTop: '-2.5px' }}>{user && user.username}</p>
                                    </Link>
                                    <Link to={`/post/${props.postid}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <p className='notiP' style={{ fontSize: '13.65px', color: 'rgb(161, 148, 148)' }}>{content}</p>
                                    </Link>
                                </div>
                                <p className='notiP' style={{ fontSize: '11px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px' }}><ReactTimeAgo date={Date.parse(props.date)} locale="en-US" /></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Link> :
            props.type === 3 ? <Link to={`/user/${props.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '-99' }}>
                <div className={`card cardnotify`} style={{ width: '95%', padding: '8px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)', paddingBottom: '10px' }}>
                    <div className="header">
                        <div className="textheader">
                            <div className='not-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Link to={`/user/${user && user.uid}`}>
                                    <img className='notiimg' style={{ width: '36px', borderRadius: '50%', marginRight: '12px' }} src={user && user.img} alt="" />
                                </Link>
                                <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                            <p className='notiHp' style={{ margin: '0', marginRight: '5px', fontSize: '14.5px', marginTop: '-2.5px' }}>{user && user.username}</p>
                                        </Link>
                                        <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            <p className='notiP' style={{ fontSize: '13.65px', color: 'rgb(161, 148, 148)' }}>{content}</p>
                                        </Link>
                                    </div>
                                    <p className='notiP' style={{ fontSize: '11px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px' }}><ReactTimeAgo date={Date.parse(props.date)} locale="en-US" /></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Link> : <div style={{ color: 'inherit', textDecoration: 'none', zIndex: '-99' }}>
                <div className={`card cardnotify`} style={{ width: '95%', padding: '8px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)', paddingBottom: '10px' }}>
                    <div className="header">
                        <div className="textheader">
                            <div className='not-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Link to={`/user/${user && user.uid}`}>
                                    <img className='notiimg' style={{ width: '36px', borderRadius: '50%', marginRight: '12px' }} src={user && user.img} alt="" />
                                </Link>
                                <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                            <p className='notiHp' style={{ margin: '0', marginRight: '5px', fontSize: '14.5px', marginTop: '-2.5px' }}>{user && user.username}</p>
                                        </Link>
                                        <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            <p className='notiP' style={{ fontSize: '13.65px', color: 'rgb(161, 148, 148)' }}>{content}</p>
                                        </Link>
                                    </div>
                                    <p className='notiP' style={{ fontSize: '11px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px' }}><ReactTimeAgo date={Date.parse(props.date)} locale="en-US" /></p>
                                </div>
                            </div>
                            <div className="postnotif" style={{border:context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)',padding:'0 15px',borderRadius:'8px',marginTop:'10px',marginBlock:'8px'}}>
                               { newNot&& <PostCard showprofile={true} key={newNot.postid} summary={newNot.summary} id={newNot.postid} uid={newNot.uid} date={newNot.timestamp} content={newNot.title} tags={[]}/>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
}
