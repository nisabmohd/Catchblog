import React from 'react'

export const Postcarduser = (props) => {
    return (
        <div className='post-usercard' style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <img style={{ width: '33px', borderRadius: '50%',marginRight:'12px' }} src={props.img} alt="" />
            <div className="detailsposts"  style={{display:'flex',flexDirection:'column'}}>
                <h5 style={{margin:'0'}}>{props.name}</h5>
                <p style={{ fontSize: '11px', color: 'rgb(161, 148, 148)',margin:'0',marginTop:'4px' }}>{props.date}</p>
            </div>
        </div>
    )
}
