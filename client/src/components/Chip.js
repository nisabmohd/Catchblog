import React from 'react'
import { Link } from 'react-router-dom'

export const Chip = (props) => {
  return (
    <Link to={`/tags/${props.name}`} style={{color:'inherit',textDecoration:'none'}}><div style={{fontSize:props.fontbig?'12.5px':'11px',margin:'0 6px',background:props.dark?'#242424':'#f8f8f8',height:'24px',borderRadius:'4px',display:'flex',alignItems:'center',padding:'0 9px'}}><span style={{marginRight:'2px'}}>#</span>{props.name}</div></Link>
  )
}
