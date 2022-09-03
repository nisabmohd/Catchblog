import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import { url } from '../baseurl'

export const Notify = (props) => {
    const context = useContext(AppContext)
    const [user, setUser] = useState()
    const[content,setContent]=useState('')


    useEffect(() => {
        async function fetch() {
            const resp = await axios.get(`${url}/user/${props.uid}`)
            setUser(resp.data)
        }
        props.uid && fetch();
        if(props && props.type===1){
            setContent("Liked your Post")
        }
        if(props && props.type===2){
            setContent("Saved your Post")
        }
        if(props && props.type===3){
            setContent("Followed you")
        }
    }, [props, props.uid])

    return (
        props && (props.type===1 || props.type===2) ?<Link to={`/post/${props.postid}`} style={{ color: 'inherit', textDecoration: 'none',zIndex:'-99'}}>
            <div className={`card cardnotify`} style={{ width: '95%', padding: '8px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)', paddingBottom: '10px' }}>
                <div className="header">
                    <div className="textheader">
                        <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Link to={`/user/${user && user.uid}`}>
                                <img style={{ width: '36px', borderRadius: '50%', marginRight: '12px' }} src={user && user.img} alt="" />
                            </Link>
                            <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none',zIndex:'99' }}>
                                        <p style={{ margin: '0', marginRight: '5px', fontSize: '14.5px',marginTop:'-2.5px' }}>{user && user.username}</p>
                                    </Link>
                                    <Link to={`/post/${props.postid}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <p style={{ fontSize: '13.65px', color: 'rgb(161, 148, 148)'}}>{content}</p>
                                    </Link>
                                </div>
                                <p style={{ fontSize: '11px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px' }}>{props.date}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Link>:
        <Link to={`/user/${props.uid}`} style={{ color: 'inherit', textDecoration: 'none',zIndex:'-99'}}>
        <div className={`card cardnotify`} style={{ width: '95%', padding: '8px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)', paddingBottom: '10px' }}>
            <div className="header">
                <div className="textheader">
                    <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Link to={`/user/${user && user.uid}`}>
                            <img style={{ width: '36px', borderRadius: '50%', marginRight: '12px' }} src={user && user.img} alt="" />
                        </Link>
                        <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none',zIndex:'99' }}>
                                    <p style={{ margin: '0', marginRight: '5px', fontSize: '14.5px',marginTop:'-2.5px' }}>{user && user.username}</p>
                                </Link>
                                <Link to={`/user/${user && user.uid}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <p style={{ fontSize: '13.65px', color: 'rgb(161, 148, 148)'}}>{content}</p>
                                </Link>
                            </div>
                            <p style={{ fontSize: '11px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px' }}>{props.date}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </Link>
    )
}
