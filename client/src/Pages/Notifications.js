import { CircularProgress } from '@mui/material'
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
  const [not, setNot] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const resp = await axios.get(`${url}/user/notifications/${context.auth.uid}`)
      const resp1 = await axios.put(`${url}/user/readnotification/${context.auth.uid}`)
      setLoading(false)
      if (resp1.data.message) context.setHaveNotification(false)
      setNot(resp.data)
    }
    fetch();
  }, [context])


  return (
    <div className='container'>
      <div className="container-left">
        <h3 style={{ marginBottom: '33px' }}>Notifications</h3>
        {
          loading && <Box style={{ width: '100%', height: '80vh', display: 'flex', alignContent: 'center', marginTop: '10px' }}><CircularProgress style={{ margin: 'auto' }} color="inherit" /></Box>
        }
        {
          loading === false && not.length === 0 ? <Box style={{ width: '100%', height: '80vh', display: 'flex', alignContent: 'center', marginTop: '10px' }}><h4 style={{ margin: 'auto' }} >Nothing to see here</h4></Box> : <></>
        }
        {
          not.map(item => {
            return <Notify key={item.id} type={item.type} postid={item.postid} date={item.date} uid={item.uid} />
          })
        }
      </div>
      <div className="container-right notification-page-resp">
        {<UserCard uid={context.auth.uid} />}
      </div>
    </div>
  )
}
