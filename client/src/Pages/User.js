import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { AppContext } from '../App'
import { url } from '../baseurl'
import { PostCard } from '../components/PostCard'
import { UserCard } from '../components/UserCard'
export const User = () => {
    // const context = useContext(AppContext)
    const params = useParams()
    const [user, setUser] = useState()
    const[post,setPosts]=useState([])
    useEffect(() => {
        async function fetch() {
            const resp = await axios.get(`${url}/user/${params.uid}`)
            setUser(resp.data)
        }
        params.uid && fetch();
    }, [params])
    useEffect(() => {
        if (!user) return
        async function fetch() {
            const resp = await axios.get(`${url}/post/userpost/${params.uid}`)
            // console.log(resp.data);
            setPosts(resp.data)
        }
        fetch();
    }, [params.uid, user])
    return (
        <div className='container'>
            <div className="container-left">
                {
                    post.map(item=>{
                        return <PostCard key={item.postid} id={item.postid} uid={item.uid} date={item.timestamp.slice(0,10)} content={item.title} tags={item.tags} />
                    })
                }
            </div>
            <div className="container-right">
                {user && <UserCard uid={user.uid} />}
            </div>
        </div>
    )
}
