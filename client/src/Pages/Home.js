import { Box } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { url } from "../baseurl"
import { PostCard } from "../components/PostCard"
import { Recommended } from "../components/Recommended"
import InfiniteScroll from "react-infinite-scroll-component";
import { AppContext } from "../App"
import { PostCradSkeleton } from "../components/PostCradSkeleton"
import { RecommendedSketon } from "../components/RecommendedSketon"

const loadingarr = [1, 2, 3, 4]
export const Home = () => {
    const [post, setPost] = useState([])
    const [page, setPage] = useState(0)
    const [more, setMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const context = useContext(AppContext)
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
        <Box style={{ backgroundColor: 'palette.text.primary', marginBottom: '39px' }} className="container homecontainer">
            <div className="container-left">
                {
                    loading && loadingarr.map(item => <PostCradSkeleton />)
                }
                {
                    loading === false && post.length === 0 ? <Box style={{ width: '100%', height: '10vh', display: 'flex', alignContent: 'center', marginTop: '10px' }}><h4 style={{ margin: 'auto' }} >Nothing to see here</h4></Box> : <></>
                }

                <InfiniteScroll
                    dataLength={post.length}
                    next={fetchMoreData}
                    hasMore={more}
                    loader={<></>}
                >
                    {
                        post.map(item => {
                            return <PostCard key={item.postid} summary={item.summary} id={item.postid} uid={item.uid} date={item.timestamp} content={item.title} tags={item.tags} />
                        })
                    }
                </InfiniteScroll>
            </div>
            <div className="container-right hideright">
                {/* <Top /> */}
                {
                    loading ?
                        <RecommendedSketon /> :
                        <Recommended uid={context.auth.uid} />
                }
            </div>

        </Box>
    )
}
