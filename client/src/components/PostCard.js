import React, { useContext } from 'react'
import { Postcarduser } from './Postcarduser'
import { AppContext } from "../App";
import { Chip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export const PostCard = (props) => {
    const context = useContext(AppContext)

    return (
        <div className={`card ${context.dark ? "" : "cardshadow"}`} style={{ width: '100%', backgroundColor: !context.dark ? 'white' : '#181818', padding: '22px 15px', borderRadius: '7px', margin: '20px 0' }}>
            <div className="header">
                <div className="textheader">
                    <Postcarduser img={props.img} name={props.name} date={props.date} />
                </div>
                <div className="imgheader">

                </div>
            </div>
            <div className="content" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <h3 style={{ marginLeft: '40px', marginTop: '12px' }}>{props.content}</h3>
                </Link>
                <div style={{ marginLeft: '40px' }} className="labels">
                    {props.tags?.map(item => {
                        return <Chip onClick={{}} sx={{ height: '22px', fontSize: '10px', marginRight: '8px' }} label={`#${item}`} />
                    })}
                </div>
            </div>
            <div className="handlethings" style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: '15px', justifyContent: 'space-between',alignItems:'center'}}>
                <div className="likes" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <IconButton style={{ marginLeft: '45px',marginRight:'6px'}} ><ThumbUpOffAltIcon style={{fontSize:'22px'}} /></IconButton>
                    <p style={{ fontSize: '11px', color: 'rgb(161, 148, 148)',margin:'0',marginTop:'4px' }}>170 Likes</p>

                </div>
                <div className="save" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <p style={{ fontSize: '11px', color: 'rgb(161, 148, 148)',margin:'0',marginTop:'4px',marginRight:'6px' }}>7 min read</p>
                    <IconButton style={{ marginRight: '10px' }}><BookmarkBorderIcon  style={{fontSize:'22px'}} /></IconButton>
                </div>
            </div>
        </div>
    )
}
