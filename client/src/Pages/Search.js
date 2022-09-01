import React, { useContext, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { url } from '../baseurl'
import { PostCard } from '../components/PostCard'
import { AppContext } from '../App'
import { Recommended } from '../components/Recommended'

export const Search = () => {
    const [searchParams] = useSearchParams()
    const [post, setPost] = useState([])
    const [users, setusers] = useState([])
    const context = useContext(AppContext)


    useEffect(() => {
        async function fetch() {
            const resp = await axios.get(`${url}/search/${searchParams.get("q")}`)
            console.log(resp.data);
            setPost(resp.data.posts)
            setusers(resp.data.users)
        }
        fetch();
    }, [searchParams])
    return (
        <div className='container'>
            <div className="container-left">
                {users.length !== 0 && <h3 style={{ marginBottom: '33px' }}>Users Results for ' {searchParams.get("q")} '</h3>}
                {users.length !== 0 && <div style={{ marginBottom: '45px' }}>
                    {
                        users.map(item => {
                            return (
                                <Link to={`/user/${item.uid}`}  style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                <div className={`card cardnotify`} style={{ width: '100%', padding: '2px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)', paddingBottom: '21.5px', paddingTop: '12px' }}>
                                    <div className="header" style={{ width: '100%' }}>
                                        <div className="textheader" style={{ width: '100%' }}>
                                            <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                                                    <img style={{ width: '40px', borderRadius: '50%', marginRight: '16px', marginTop: '4px' }} src={item.img} alt="" />
                                                <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                                                    <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                        <div>
                                                            <div className="userdet" style={{ display: 'flex', flexDirection: 'row', }}>
                                                                <p style={{ margin: '0', marginRight: '5px', fontSize: '15px' }}>{item.username}</p>
                                                                <p style={{ fontSize: '11px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px', minWidth: 'fit-content', marginLeft: '7px' }}><span>Joined</span> :{item.joined.slice(0, 10)}</p>
                                                            </div>
                                                            <div className="summary" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '12px', width: 'inherit' }}>
                                                                <p style={{ fontSize: '12px', margin: 0, marginTop: '-6px', width: '120%' }}>{item.summary}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></Link>)
                        })
                    }</div>}
                {post.length !== 0 && <h3 style={{ marginBottom: '11px' }}> Posts Results for ' {searchParams.get("q")} '</h3>}
                {
                    post && post.map(item => {
                        return <PostCard key={item.postid} summary={item.summary} id={item.postid} uid={item.uid} date={item.timestamp.slice(0, 10)} content={item.title} tags={item.tags} />

                    })
                }
            {users.length=== 0 && post.length===0 && <h3 style={{ marginBottom: '33px' }}>No Results for ' {searchParams.get("q")} '</h3>}

            </div>
            <div className="container-right">
                {/* <Top /> */}
                <Recommended uid={context.auth.uid} />
            </div>
        </div>
    )
}
