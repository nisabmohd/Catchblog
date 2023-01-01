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
        <div className={`card`} style={{ width: '100%', padding: '20px 20px', margin: props.not ? '1px 0' : '25px 0', backgroundColor: context.dark ? '#282828' : '#ffff', borderRadius: '12px', paddingTop: '23px', paddingBottom: '9px', }}>
            <div className="header">
                <div className="textheader">
                    {!props.showprofile && <Postcarduser uid={props.uid} img={user && user.img} name={user && user.username} date={props.date} />}
                </div>
            </div>
            <div className="content" style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '7px' }}>
                <Link to={`/post/${props.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <p style={{ fontSize: props.not ? '19px' : '25px', marginBottom: '1px', marginTop: '6px', fontWeight: '800' }}>{props.content}</p>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-6px', marginTop: '8px' }} className="labels">
                        {props.tags?.map(item => {
                            return item ? <Chip key={new Date() + item} dark={context.dark} name={item} /> : <></>
                        })}
                    </div>
                    <p className='pararesp' style={{ fontSize: props.not ? '14.5px' : '15.25px', letterSpacing: '0.5px', }}>{props.summary && props.summary}</p>
                </Link>

            </div>
        </div>
    )
}
