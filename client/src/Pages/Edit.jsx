import React, { useContext, useEffect, useState } from 'react'
import md from '../default.md'
import { AppContext } from '../App'
import { Syntax } from '../components/Syntax'
import Markdown from 'markdown-to-jsx'
import axios from 'axios'
import { url } from '../baseurl'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export const Edit = () => {
    const [value, setValue] = useState('')
    const context = useContext(AppContext)
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [tags, setTags] = useState("")
    const nav=useNavigate()

    useEffect(() => {
        fetch(md).then(resp => {
            return resp.text()
        }).then(data => {
            setValue(data)
        })
    }, [context])

    async function newpost() {
        if (!title) {
            toast.error("Title required", {
                style: {
                    fontSize: '12px'
                }
            })
            return;
        }
        if (!summary) {
            toast.error("Summary required", {
                style: {
                    fontSize: '12px'
                }
            })
            return;
        }
        const params = new URLSearchParams();
        params.append('md', value);
        params.append('uid', context.auth.uid);
        params.append('tags', tags.split(','));
        params.append('title', title);
        params.append('summary', summary);
        const resp = await axios.post(`${url}/post/new`, params)
        resp && nav(`/post/${resp.data.postid}`)
    }

    return (
        <>
            <div className="container" style={{ marginBottom: '29px', marginTop: '-15px' }}>
                <Toaster />
                <div className="container50" style={{ width: '40%' }}>
                    <p style={{ fontSize: '13px', fontWeight: 'bold' }}>Markdown Editor : </p>
                    <textarea style={{ width: '100%', backgroundColor: !context.dark ? 'rgb(248, 248, 248)' : '#202020', color: 'inherit', padding: '15px', border: 'none', borderRadius: '5px', outline: 'none', minHeight: '84vh', resize: 'none' }} value={value} onChange={e => setValue(e.target.value)} spellCheck="false"></textarea>
                </div>
                <div className="container50" style={{ width: '56%' }}>
                    <p style={{ fontSize: '13px', fontWeight: 'bold' }}>Preview Panel : </p>
                    <div style={{ height: '84vh', overflow: 'scroll' }}>
                        <Markdown options={{
                            forceBlock: true,
                            overrides: {
                                code: {
                                    component: Syntax,
                                    props: {
                                        className: 'foo',
                                    },
                                },
                            },
                        }}>
                            {value}
                        </Markdown>
                    </div>
                </div>
            </div>
            <div className="container">

                <p style={{ fontSize: '13px', fontWeight: 'bold' }}>Post Info : </p>
            </div>
            <div className="container ">
                <div className="txts" style={{ width: '100%', marginBottom: '29px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div className="boxins" style={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <textarea value={title} onChange={e => setTitle(e.target.value)} style={{ backgroundColor: !context.dark ? 'rgb(248, 248, 248)' : '#202020', color: 'inherit', padding: '15px', border: 'none', borderRadius: '5px', outline: 'none', resize: 'none', width: '100%', height: '78px', fontSize: '14px' }} placeholder='Enter Title *'></textarea>
                        <textarea value={tags} onChange={e => setTags(e.target.value)} className='boxins' style={{ backgroundColor: !context.dark ? 'rgb(248, 248, 248)' : '#202020', color: 'inherit', padding: '15px', border: 'none', borderRadius: '5px', outline: 'none', resize: 'none', width: '100%', height: '75px', fontSize: '14px' }} placeholder='Enter tags you want to mention'></textarea>
                        <button onClick={newpost} className='followbtn boxins' style={{ fontFamily: 'Poppins', width: '100%', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '43px', borderRadius: '5px', cursor: 'pointer' }} variant="outlined">Share Post</button>
                    </div>
                    <textarea value={summary} onChange={e => setSummary(e.target.value)} className='boxins' style={{ backgroundColor: !context.dark ? 'rgb(248, 248, 248)' : '#202020', color: 'inherit', padding: '15px', border: 'none', borderRadius: '5px', outline: 'none', resize: 'none', width: '56%', height: '235px', fontSize: '14px' }} placeholder='Enter Summary of the post *'></textarea>
                </div>
            </div>
        </>
    )
}
