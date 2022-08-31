import { Box } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { url } from "../baseurl"
import { PostCard } from "../components/PostCard"
import { Recommended } from "../components/Recommended"


export const Home = () => {
    const[post,setPost]=useState([])
    useEffect(() => {
        async function fetch() {
            const resp = await axios.get(`${url}/post/allpost?limit=15`)
            console.log(resp.data.data);
            setPost(resp.data.data)
        }
        fetch();
    }, [])

    return (
        <Box style={{ backgroundColor: 'palette.text.primary', marginBottom: '39px' }} className="container">
            <div className="container-left">
                {
                    post.map(item=>{
                        return <PostCard key={item.postid} id={item.postid}  uid={item.uid} date={item.timestamp.slice(0,10)} content={item.title} tags={item.tags} />
                    })
                }
            </div>
            <div className="container-right">
                {/* <Top /> */}
                <Recommended />
            </div>

        </Box>
    )
}
