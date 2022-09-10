import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { PostCard } from '../components/PostCard'
import { Recommended } from '../components/Recommended'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'
import { url } from '../baseurl'
import { useParams } from 'react-router-dom'
import { PostCradSkeleton } from '../components/PostCradSkeleton'

const loadingarr = [1, 2, 3, 4]

export const Tags = () => {
    const [post, setPost] = useState([])
    const [page, setPage] = useState(0)
    const [more, setMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const context = useContext(AppContext)
    const params = useParams()
    useEffect(() => {
        setPost([])
        async function fetch() {
            setLoading(true)
            const resp = await axios.get(`${url}/post/tags/${params.tag}?page=0&limit=5`)
            setPost(resp.data.data)
            if (resp.data.next) {
                setPage(resp.data.next.pageNumber)
                setMore(true)
            }
            setLoading(false)
        }
        fetch();
    }, [params.tag])

    async function fetchMoreData() {
        const resp = await axios.get(`${url}/post/tags/${params.tag}?page=${page}&limit=5`)
        setPost(prev => {
            return [...prev, ...resp.data.data]
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
                    loading && loadingarr.map(item => <PostCradSkeleton />)
                }
                {
                    loading === false && post.length === 0 ? <Box style={{ width: '100%',height:'80vh', display: 'flex', alignContent: 'center', marginTop: '10px' }}><h4 style={{ margin: 'auto' }} >Nothing to see here</h4></Box> : <></>
                }
                <InfiniteScroll
                    dataLength={post.length}
                    next={fetchMoreData}
                    hasMore={more}
                    loader={ loading && loadingarr.map(item => <PostCradSkeleton />)}
                >
                    {
                        post.map(item => {
                            return <PostCard summary={item.summary} key={item.postid} id={item.postid} uid={item.uid} date={item.timestamp} content={item.title} tags={item.tags} />
                        })
                    }
                </InfiniteScroll>
            </div>
            <div className="container-right">
                {/* <Top /> */}
                <Recommended uid={context.auth.uid} />
            </div>

        </div>
    )
}
