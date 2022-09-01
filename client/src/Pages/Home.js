import { Box, CircularProgress } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { url } from "../baseurl"
import { PostCard } from "../components/PostCard"
import { Recommended } from "../components/Recommended"
import InfiniteScroll from "react-infinite-scroll-component";
import { AppContext } from "../App"

export const Home = () => {
    const [post, setPost] = useState([])
    const [page, setPage] = useState(0)
    const [more, setMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const context=useContext(AppContext)
    useEffect(() => {
        async function fetch() {
            setLoading(true)
            const resp = await axios.get(`${url}/post/allpost?page=0&limit=5`)
            setPost(resp.data.data)
            if (resp.data.next) {
                setPage(resp.data.next.pageNumber)
                setMore(true)
            }
            setLoading(false)
        }
        fetch();
    }, [])

    async function fetchMoreData() {
        const resp = await axios.get(`${url}/post/allpost?page=${page}&limit=5`)
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
        <Box style={{ backgroundColor: 'palette.text.primary', marginBottom: '39px' }} className="container">
            <div className="container-left">
                {
                    loading && <Box style={{ width: '100%', display: 'flex', alignContent: 'center', marginTop: '10px' }}><CircularProgress size='10' thickness={4} style={{ margin: 'auto' }} color="inherit" /></Box>
                }
                {
                    loading===false && post.length===0 ?<Box style={{ width: '100%', display: 'flex', alignContent: 'center', marginTop: '10px' }}><h4 style={{ margin: 'auto' }} >Nothing to see here</h4></Box>:<></>
                }
                <InfiniteScroll
                    dataLength={post.length}
                    next={fetchMoreData}
                    hasMore={more}
                    loader={<Box style={{ width: '100%', display: 'flex', alignContent: 'center', marginTop: '10px' }}><CircularProgress size='10' thickness={4} style={{ margin: 'auto' }} color="inherit" /></Box>}
                >
                    {
                        post.map(item => {
                            return <PostCard key={item.postid} id={item.postid} uid={item.uid} date={item.timestamp.slice(0, 10)} content={item.title} tags={item.tags} />
                        })
                    }
                </InfiniteScroll>
            </div>
            <div className="container-right">
                {/* <Top /> */}
                <Recommended uid={context.auth.uid}/>
            </div>

        </Box>
    )
}
