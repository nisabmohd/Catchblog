import React, { useContext, useEffect, useState } from 'react'
import { Postcarduser } from './Postcarduser'
import { AppContext } from "../App";
import { Link } from 'react-router-dom';
import { Chip } from './Chip';
import axios from 'axios';
import { url } from '../baseurl';

export const PostCard = (props) => {
    const context = useContext(AppContext)
    const [user, setUser] = useState()
    useEffect(() => {
        async function fetch() {
            const resp = await axios.get(`${url}/user/${props.uid}`)
            setUser(resp.data)
        }
        props.uid && fetch();
    }, [props.uid])

    return (
        <div className={`card`} style={{ width: '95%', padding: '22px 0px', margin: '8px 0', borderBottom: props.showprofile?"":context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)', paddingTop: '10px' }}>
            <div className="header">
                <div className="textheader">
                   {!props.showprofile && <Postcarduser uid={props.uid} img={user && user.img} name={user && user.username} date={props.date} />}
                </div>
            </div>
            <div className="content" style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '9px' }}>
                <Link to={`/post/${props.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <p style={{ fontSize: '19px', marginBottom: '3px', marginTop: '6px', fontWeight: '600' }}>{props.content}</p>
                    <p className='pararesp' style={{ fontSize: '13px', }}>{props.summary && props.summary}</p>
                </Link>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-6px'}} className="labels">
                    {props.tags?.map(item => {
                        return item ? <Chip key={new Date() + item} dark={context.dark} name={item} /> : <></>
                    })}
                </div>
            </div>
        </div>
    )
}
