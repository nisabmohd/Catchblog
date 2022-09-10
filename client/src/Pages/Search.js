import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { url } from '../baseurl'
import { PostCard } from '../components/PostCard'
import { AppContext } from '../App'
import { Recommended } from '../components/Recommended'
import { Box, CircularProgress } from '@mui/material'
import InfiniteScroll from "react-infinite-scroll-component";


export const Search = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [post, setPost] = useState([])
    const context = useContext(AppContext)
    const [page, setPage] = useState(0)
    const [more, setMore] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPost() {
            const resp = await axios.get(`${url}/search/post/${searchParams.get("q")}?page=0&limit=6`)
            setPost(resp.data.posts)
            if (resp.data.next) {
                setPage(resp.data.next.pageNumber)
                setMore(true)

            }
            setLoading(false)
        }
        fetchPost();
    }, [searchParams])



    async function fetchMorePostData() {
        const resp = await axios.get(`${url}/search/post/${searchParams.get("q")}?page=${page}&limit=6`)
        setPost(prev => {
            return [...prev, ...resp.data.posts]
        })
        if (resp.data.next) {
            setPage(resp.data.next.pageNumber)
            setMore(true)
        }
        else {
            setMore(false)
        }
    }
    return (
        <div className='container'>
            <div className="container-left">

                {
                    <>
                        <button onClick={() => navigate(`/searchuser?q=${searchParams.get("q")}`)} className='newpostbtn ml-5' style={{ fontFamily: 'Poppins', minWidth: 'fit-content', width: '125px', color: context.dark?'white':'black', border: 'none', outline: 'none', background: 'transparent', height: '33px', borderRadius: '5px', cursor: 'pointer', marginRight: '15px' }} variant="outlined">Serach User</button>
                        <button onClick={() => navigate(`/search?q=${searchParams.get("q")}`)} className='newpostbtn' style={{ fontFamily: 'Poppins', minWidth: 'fit-content', width: '125px', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '33px', borderRadius: '5px', cursor: 'pointer', marginRight: '15px', marginBottom: '19px' }} variant="outlined">Serach Post</button>
                    </>
                }
                {
                    loading && <Box style={{ width: '100%',height:'80vh',  display: 'flex', alignContent: 'center', marginTop: '10px' }}><CircularProgress style={{ margin: 'auto' }} color="inherit" /></Box>
                }

                {
                    loading === false && post.length === 0 ? <Box style={{ width: '100%',height:'80vh', display: 'flex', alignContent: 'center', marginTop: '10px' }}><h5 style={{ margin: 'auto' }} >Nothing to see here</h5></Box> : <></>
                }

                {post.length !== 0 && <h4 style={{ marginBottom: '11px' }}> Showing Posts Results for ' {searchParams.get("q")} '</h4>}

                <InfiniteScroll
                    dataLength={post.length}
                    next={fetchMorePostData}
                    hasMore={more}
                    loader={<Box style={{ width: '100%', display: 'flex', alignContent: 'center', marginTop: '10px' }}><CircularProgress style={{ margin: 'auto' }} color="inherit" /></Box>}
                >
                    {post && post.map(item => {
                        return <PostCard key={item.postid} summary={item.summary} id={item.postid} uid={item.uid} date={item.timestamp} content={item.title} tags={item.tags} />

                    })}
                </InfiniteScroll>

            </div>
            <div className="container-right">
                {/* <Top /> */}
                <Recommended uid={context.auth.uid} />
            </div>
        </div>
    )
}
