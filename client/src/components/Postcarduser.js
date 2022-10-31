import { Link } from 'react-router-dom'
import React from 'react'
import dateFormat from "dateformat";


export const Postcarduser = (props) => {
    return (
        <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Link to={`/user/${props.uid}`}>
                <img style={{ width: '38px', borderRadius: '28%', marginRight: '12px',marginBottom:'-3px' }} src={props.img} alt="" />
            </Link>
            <Link to={`/user/${props.uid}`} style={{color:'inherit',textDecoration:'none'}}>
                <div className="detailsposts" style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ margin: '0',fontSize:'14.55px',fontWeight:'600',letterSpacing:'0.5px'}}>{props.name}</p>
                    <p style={{ fontSize: '12.7px', margin: '0', marginTop: '0px',color:'gray' }}>{dateFormat(props.date).slice(0,15)}</p>
                </div>
            </Link>
        </div>
    )
}
