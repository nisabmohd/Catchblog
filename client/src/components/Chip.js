import React from 'react'
import { Link } from 'react-router-dom'
import { titleCase } from "title-case";


export const Chip = (props) => {
  return (
    <Link to={`/tags/${props.name}`} style={{color:'inherit',textDecoration:'none'}}><div style={{fontSize:props.fontbig?'14.95px':'12.85px',margin:'0 6px',background:props.dark?'#242424':'#f8f8f8',height:'27px',borderRadius:'5px',display:'flex',alignItems:'center',padding:'0 9px',letterSpacing:'0.48px'}}>{titleCase(props.name)}</div></Link>
  )
}
