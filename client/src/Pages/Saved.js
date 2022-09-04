import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { PostCard } from '../components/PostCard'
import { UserCard } from '../components/UserCard'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import { url } from '../baseurl';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';


export const Saved = () => {
  const context = useContext(AppContext)
  const [user] = useState(context.auth.uid)
  const [post, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [more, setMore] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    async function fetch() {
        const resp = await axios.get(`${url}/post/saved/${context.auth.uid}?page=1&limit=5`)
        // console.log(resp.data);
        setPosts(resp.data.data)
        if (resp.data.next) {
            setPage(resp.data.next.pageNumber)
            setMore(true)
        }
    }
    fetch();
    setLoading(false)
}, [context.auth.uid, user])



  async function fetchMoreData() {
    const resp = await axios.get(`${url}/post/saved/${context.auth.uid}?page=${page}&limit=5`)
    if (!resp.data.next) {
        setMore(false)
    }
    else {
        setPage(resp.data.next.pageNumber)
    }
    setPosts(prev => {
        return [...prev, ...resp.data.data]
    })
}

  return (
    <div className='container'>
      <div className="container-left">
        {
          loading && <Box style={{ width: '100%', display: 'flex', alignContent: 'center', marginTop: '10px' }}><CircularProgress size='10' thickness={4} style={{ margin: 'auto' }} color="inherit" /></Box>
        }
        {
          loading === false && post.length === 0 ? <Box style={{ width: '100%', display: 'flex', alignContent: 'center', marginTop: '10px' }}><h4 style={{ margin: 'auto' }} >Nothing to see here</h4></Box> : <></>
        }
        <InfiniteScroll
          dataLength={post.length}
          next={fetchMoreData}
          hasMore={more}
          loader={<Box style={{ width: '100%', display: 'flex', alignContent: 'center', marginTop: '10px' }}><CircularProgress size='10' thickness={4} style={{ margin: 'auto' }} color="inherit" /></Box>}
        >
          {
            post && post.map(item => {
              return <PostCard summary={item.summary} key={item.postid} id={item.postid} uid={item.uid} date={item.timestamp} content={item.title} tags={item.tags} />
            })
          }
        </InfiniteScroll>
      </div>
      <div className="container-right">
        {user && <UserCard uid={user} />}
      </div>
    </div>
  )
}
