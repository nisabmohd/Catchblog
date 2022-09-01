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
        <div className={`card`} style={{ width: '100%', padding: '22px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)' }}>
            <div className="header">
                <div className="textheader">
                    <Postcarduser uid={props.uid} img={user && user.img} name={user && user.username} date={props.date} />
                </div>

            </div>
            <div className="content" style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '9px' }}>
                <Link to={`/post/${props.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <h1 style={{ fontSize: '19px' }}>{props.content}</h1>
                    <p className='pararesp' style={{ fontSize: '13px', width: '95%' }}>{props.summary && props.summary}</p>
                </Link>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto' }} className="labels">
                    {props.tags?.map(item => {
                        return item ? <Chip key={new Date() + item } dark={context.dark} name={item} /> : <></>
                    })}
                </div>
            </div>
        </div>
    )
}
