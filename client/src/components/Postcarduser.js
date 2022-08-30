import { Link } from 'react-router-dom'
import React from 'react'

export const Postcarduser = (props) => {
    return (
        <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Link to={`/user/${props.uid}`}>
                <img style={{ width: '36px', borderRadius: '50%', marginRight: '12px' }} src={props.img} alt="" />
            </Link>
            <Link to={`/user/${props.uid}`} style={{color:'inherit',textDecoration:'none'}}>
                <div className="detailsposts" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h5 style={{ margin: '0' }}>{props.name}</h5>
                    <p style={{ fontSize: '11px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px' }}>{props.date}</p>
                </div>
            </Link>
        </div>
    )
}
