import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { PostCard } from '../components/PostCard'
import axios from 'axios';
import { url } from '../baseurl';
import { Box } from '@mui/system';
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
    <div className='container homecontainer' style={{ marginTop: '12px' }}>
      <div className="container-left">
        <h3 style={{ marginTop: '3vh', marginBottom: '-5px' }}>Saved Posts</h3>
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
    </div>
  )
}
