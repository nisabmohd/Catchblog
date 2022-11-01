import { Box, Skeleton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../App'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'
import { url } from '../baseurl'
import { PostcardUserSkeleton } from '../components/PostcardUserSkeleton'
import Search from '../components/SearchBar';
import SearchBar from '../components/SearchBar';

const loadingarr = [1, 2, 3, 4]
export const SearchUser = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [users, setusers] = useState([])
    const context = useContext(AppContext)
    const [page, setPage] = useState(0)
    const [more, setMore] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPost() {
            const resp = await axios.get(`${url}/search/user/${searchParams.get("q")}?page=0&limit=9`)
            setusers(resp.data.users)
            if (resp.data.next) {
                setPage(resp.data.next.pageNumber)
                setMore(true)

            }
            setLoading(false)
        }
        fetchPost();
    }, [searchParams])

    async function fetchMoreUserData() {
        const resp = await axios.get(`${url}/search/user/${searchParams.get("q")}?page=${page}&limit=9`)
        setusers(prev => {
            return [...prev, ...resp.data.users]
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
        <div className='container' style={{marginTop:'32px'}}>
            <div className="container-left">
                <SearchBar/>
                {<>
                    <button onClick={() => navigate(`/searchuser?q=${searchParams.get("q")}`)} className='searchbtn ml-5' style={{ fontFamily: 'IBM Plex Sans', minWidth: 'fit-content', width: '125px', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '33px', borderRadius: '5px', cursor: 'pointer', marginRight: '15px' }} variant="outlined">Search User</button>
                    <button onClick={() => navigate(`/search?q=${searchParams.get("q")}`)} className='searchbtn' style={{ fontFamily: 'IBM Plex Sans', minWidth: 'fit-content', width: '125px', color: context.dark ? 'white' : 'black', border: 'none', outline: 'none', background: 'transparent', height: '33px', borderRadius: '5px', cursor: 'pointer', marginRight: '15px', marginBottom: '19px' }} variant="outlined">Search Post</button>
                </>}
                {users.length !== 0 && loading === false && <h4 style={{ marginBottom: '16px' }}>Showing Users Results for ' {searchParams.get("q")} '</h4>}
                {loading && <Skeleton style={{ height: '30px', width: '195px', marginBottom: '15px' }} />}

                {
                    loading && loadingarr.map(item => <div style={{ paddingBottom: '14px', paddingTop: '14px' }}><PostcardUserSkeleton imglength={40} /></div>)
                }


                {
                    loading === false && users.length === 0 ? <Box style={{ width: '100%', height: '10vh', display: 'flex', alignContent: 'center', marginTop: '10px' }}><h5 style={{ margin: 'auto' }} >Nothing to see here</h5></Box> : <></>
                }


                {users.length !== 0 && <div style={{ marginBottom: '45px' }}>
                    {

                    }
                    <InfiniteScroll
                        dataLength={users.length}
                        next={fetchMoreUserData}
                        hasMore={more}
                        loader={<></>}
                    >
                        {
                            users.map(item => {
                                return (
                                    <Link key={item.uid} to={`/user/${item.uid}`} style={{ color: 'inherit', textDecoration: 'none', zIndex: '99' }}>
                                        <div className={`card cardnotify`} style={{ width: '95%', padding: '2px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)', paddingBottom: '21.5px', paddingTop: '12px' }}>
                                            <div className="header" style={{ width: '100%' }}>
                                                <div className="textheader" style={{ width: '100%' }}>
                                                    <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                                                        <img style={{ width: '46px', borderRadius: '35%', marginRight: '16px', marginTop: '0px' }} src={item.img} alt="" />
                                                        <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                                                            <div className="firstbox" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                <div>
                                                                    <div className="userdet" style={{ display: 'flex', flexDirection: 'row', }}>
                                                                        <p style={{ margin: '0', marginRight: '1px', fontSize: '15px'}}>{item.username}</p>
                                                                        <p style={{ fontSize: '13px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '0px', minWidth: 'fit-content', marginLeft: '7px' }}><span>Joined</span> :{item.joined.slice(0, 10)}</p>
                                                                    </div>
                                                                    <div className="summary" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '12px', width: 'inherit' }}>
                                                                        <p style={{ fontSize: '14px', margin: 0, marginTop: '-6px', width: '120%' }}>{item.summary}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div></Link>)
                            })
                        } </InfiniteScroll>
                </div>}

            </div>
        </div>
    )
}
