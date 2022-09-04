import { Box } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AppContext } from '../App'
import { url } from '../baseurl'
import { Notify } from '../components/Notify'
import { UserCard } from '../components/UserCard'

export const Notifications = () => {
  const context = useContext(AppContext)
  const [not,setNot]=useState([])
  useEffect(() => {
    async function fetch(){
      const resp = await axios.get(`${url}/user/notifications/${context.auth.uid}`)
      console.log(resp);
      setNot(resp.data)
    }
    fetch();
  }, [context.auth.uid])
  

  return (
    <div className='container'>
      <div className="container-left">
        <h3 style={{ marginBottom: '33px' }}>Notifications</h3>
        {
          not.map(item=>{
            return <Notify key={item.id} type={item.type} postid={item.postid} date={item.date} uid={item.uid}/>
          })
        }
        {
          not.length===0 && <Box style={{ width: '100%', display: 'flex', alignContent: 'center', marginTop: '10px' }}><h4 style={{ margin: 'auto' }} >Nothing to see here</h4></Box>
        }
      </div>
      <div className="container-right">
        {<UserCard uid={context.auth.uid} />}
      </div>
    </div>
  )
}
