import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from "../App";
import { url } from '../baseurl';


export const Recommended = (props) => {
  const context = useContext(AppContext)
  const [more, setMore] = useState([])
  useEffect(() => {
    async function fetch() {
      const resp = await axios.get(`${url}/post/trends/${props.uid}`)
      setMore(resp.data)
    }
    props.uid && fetch();
  }, [props])
  return (
    <div className="user-card" style={{ marginTop: '12px', borderRadius: '10px' }}>
      {
        more.length !== 0 &&
        <p style={{
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '15px',
          lineHeight: '24px',
          borderBottom: context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)',
          paddingBottom: '12px'
        }}>Posts <span style={{ color: 'rgb(161 148 148)' }}>Trending</span></p>
      }
      {
        more.map(item => {
          return <Link key={item.postid} style={{ textDecoration: 'none', color: 'inherit' }} to={`/post/${item.postid}`}><div style={{ borderBottom: context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)' }}>
            <p style={{ fontSize: '0.82rem' }}>{item.title.length > 36 ? item.title.slice(0, 35) : item.title}</p>
            <p style={{ fontSize: '0.75rem', color: 'rgb(161, 148, 148)', marginTop: '-9px' }}>{item.summary.length > 36 ? item.summary.slice(0, 35) + "..." : item.summary}</p>
          </div></Link>
        })
      }
    </div >
  )
}
