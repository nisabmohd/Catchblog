import React, { useContext } from 'react'
import { Postcarduser } from './Postcarduser'
import { AppContext } from "../App";
import { Link } from 'react-router-dom';
import { Chip } from './Chip';


export const PostCard = (props) => {
    const context = useContext(AppContext)

    return (
        <div className={`card`} style={{ width: '100%', padding: '22px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)' }}>
            <div className="header">
                <div className="textheader">
                    <Postcarduser uid={props.uid} img={props.img} name={props.name} date={props.date} />
                </div>

            </div>
            <div className="content" style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '9px' }}>
                <Link to="/post/987fgdjkfdfudfgdigf" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <h1 style={{fontSize:'19px'}}>{props.content}</h1>
                    <p style={{fontSize:'13px',width:'95%'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eos maxime impedit, recusandae animi distinctio perspiciatis nobis! Eaque quia nulla natus architecto nam deserunt incidunt sapiente rerum ullam quod nihil sunt mollitia, magnam, quas eos commodi sint.</p>
                </Link>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto' }} className="labels">
                    {props.tags?.map(item => {
                        return <Chip dark={context.dark} name={item} />
                    })}
                </div>
            </div>
        </div>
    )
}
