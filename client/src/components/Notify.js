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
            <div className={`card cardnotify`} style={{ width: '95%', padding: '16px 16px', margin: '14px 0', paddingBottom: '10px', backgroundColor: context.dark ? '#282828' : '#ffff', paddingInline: '15px', borderRadius: '11px' }}>
                <div className="header">
                    <div className="textheader">
                        <div className='not-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Link to={`/user/${user && user.uid}`}>
                                <img className='notiimg' style={{ width: '36px', borderRadius: '35%', marginRight: '12px' }} src={user && user.img} alt="" />
                            </Link>
                            <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                        <p className='notiHp' style={{ margin: '0', marginRight: '5px', fontSize: '15px' }}>{user && user.username}</p>
                                    </Link>
                                    <Link to={`/post/${props.postid}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <p className='notiP' style={{ fontSize: '14px', color: 'rgb(161, 148, 148)' }}>{content}</p>
                                    </Link>
                                </div>
                                <p className='notiP' style={{ fontSize: '13px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px' }}><ReactTimeAgo date={Date.parse(props.date)} locale="en-US" /></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Link> :
            props.type === 3 ? <Link to={`/user/${props.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '-99' }}>
                <div className={`card cardnotify`} style={{ width: '95%', padding: '16px', margin: '14px 0', paddingBottom: '10px', backgroundColor: context.dark ? '#282828' : '#ffff', paddingInline: '15px', borderRadius: '11px' }}>
                    <div className="header">
                        <div className="textheader">
                            <div className='not-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Link to={`/user/${user && user.uid}`}>
                                    <img className='notiimg' style={{ width: '36px', borderRadius: '35%', marginRight: '12px' }} src={user && user.img} alt="" />
                                </Link>
                                <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                            <p className='notiHp' style={{ margin: '0', marginRight: '5px', fontSize: '15px', marginTop: '-2.5px' }}>{user && user.username}</p>
                                        </Link>
                                        <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            <p className='notiP' style={{ fontSize: '14px', color: 'rgb(161, 148, 148)' }}>{content}</p>
                                        </Link>
                                    </div>
                                    <p className='notiP' style={{ fontSize: '13px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px' }}><ReactTimeAgo date={Date.parse(props.date)} locale="en-US" /></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Link> : <div style={{ color: 'inherit', textDecoration: 'none', zIndex: '-99' }}>
                <div className={`card cardnotify`} style={{ width: '95%', padding: '16px', margin: '14px 0', paddingBottom: '10px', backgroundColor: context.dark ? '#282828' : '#ffff', paddingInline: '15px', borderRadius: '11px' }}>
                    <div className="header">
                        <div className="textheader">
                            <div className='not-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Link to={`/user/${user && user.uid}`}>
                                    <img className='notiimg' style={{ width: '36px', borderRadius: '35%', marginRight: '12px' }} src={user && user.img} alt="" />
                                </Link>
                                <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                            <p className='notiHp' style={{ margin: '0', marginRight: '5px', fontSize: '15px', marginTop: '-2.5px' }}>{user && user.username}</p>
                                        </Link>
                                        <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            <p className='notiP' style={{ fontSize: '14px', color: 'rgb(161, 148, 148)' }}>{content}</p>
                                        </Link>
                                    </div>
                                    <p className='notiP' style={{ fontSize: '13px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px' }}><ReactTimeAgo date={Date.parse(props.date)} locale="en-US" /></p>
                                </div>
                            </div>
                            <div className="postnotif" style={{ padding: '0 15px', borderRadius: '8px', marginTop: '10px', marginBlock: '8px', borderLeft: context.dark ? '8px solid #5e5d5d' : '8px solid red', }}>
                                {newNot && <PostCard showprofile={true} key={newNot.postid} not={true} summary={newNot.summary} id={newNot.postid} uid={newNot.uid} date={newNot.timestamp} content={newNot.title} fontSm={true} tags={[]} bgcolor={context.dark ? '#282828' : '#ffff'} />}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
}
