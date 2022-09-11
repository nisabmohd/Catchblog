import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { PostCard } from '../components/PostCard'
import { UserCard } from '../components/UserCard'
import axios from 'axios';
import { url } from '../baseurl';
import { Box } from '@mui/system';
import { UserCardSkleton } from '../components/UserCardSkleton';
import { PostCradSkeleton } from '../components/PostCradSkeleton';

const loadingarr = [1, 2, 3, 4]

export const Saved = () => {
  const context = useContext(AppContext)
  const [user] = useState(context.auth.uid)
  const [post, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    async function fetch() {
      const resp = await axios.get(`${url}/post/saved?uid=${context.auth.uid}`)
      setPosts(resp.data)
      setLoading(false)
    }
    fetch();
  }, [context.auth.uid, user])



  return (
    <div className='container homecontainer'>
      <div className="container-left">
        {
           loading && loadingarr.map(item => <PostCradSkeleton />)
        }
        {
          loading === false && post.length === 0 ? <Box style={{ width: '100%', height: '10vh', display: 'flex', alignContent: 'center', marginTop: '10px' }}><h4 style={{ margin: 'auto' }} >Nothing to see here</h4></Box> : <></>
        }
        {
          post && post.map(item => {
            return <PostCard summary={item.summary} key={item.postid} id={item.postid} uid={item.uid} date={item.timestamp} content={item.title} tags={item.tags} />
          })
        }
      </div>
      <div className="container-right">
        {loading && <UserCardSkleton />}
        {user && loading === false && <UserCard uid={user} />}
      </div>
    </div>
  )
}
