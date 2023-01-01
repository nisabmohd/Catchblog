import React, { useContext, useEffect, useState } from 'react'
import md from '../default.md'
import { AppContext } from '../App'
import { Syntax } from '../components/Syntax'
import Markdown from 'markdown-to-jsx'
import axios from 'axios'
import { url } from '../baseurl'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Chip } from '../components/Chip'

export const Edit = () => {
    const [value, setValue] = useState('')
    const context = useContext(AppContext)
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [tags, setTags] = useState("")
    const [preview, setPreview] = useState(false)
    const nav = useNavigate()
    const params = useParams()
    useEffect(() => {
        console.log(params);
        if (params.postid === "newpost") {
            fetch(md).then(resp => {
                return resp.text()
            }).then(data => {
                setValue(data)
            })
        } else {
            axios.get(`${url}/post/${params.postid}`).then((resp) => {
                setTitle(resp.data.title)
                setSummary(resp.data.summary)
                setValue(resp.data.md)
                setTags(resp.data.tags.toString())
            })
        }
    }, [params])

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
        if (!value) {
            toast.error("Post required", {
                style: {
                    fontSize: '12px'
                }
            })
            return;
        }
        const paramsurl = new URLSearchParams();
        paramsurl.append('md', value);
        paramsurl.append('uid', context.auth.uid);
        paramsurl.append('tags', tags.split(','));
        paramsurl.append('title', title);
        paramsurl.append('summary', summary);
        const resp = await axios.post(`${url}/post/new`, paramsurl)
        resp && nav(`/post/${resp.data.postid}`)
    }
    const savepost = async () => {
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
        if (!value) {
            toast.error("Post required", {
                style: {
                    fontSize: '12px'
                }
            })
            return;
        }
        const paramsurl = new URLSearchParams();
        paramsurl.append('md', value);
        paramsurl.append('uid', context.auth.uid);
        paramsurl.append('tags', tags.split(','));
        paramsurl.append('title', title);
        paramsurl.append('summary', summary);
        const resp = await axios.put(`${url}/post/edit/${params.postid}`, paramsurl)
        resp && toast.success("Saved Post", {
            style: {
                fontSize: '12px'
            }
        })
        resp && nav(`/post/${params.postid}`)
    }

    return (
        <>
            <div className="container " style={{ marginTop: '22px' }}>
                <div className="txts" style={{ width: '70%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 'auto', marginBottom: '9px' }}>
                    <div className="boxins" style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto' }}>
                        {
                            preview ?
                                <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '19px' }}>Preview Panel :  </p>
                                :
                                <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '19px' }}>Markdown Editor : </p>
                        }


                        <div className="btnsofposthandle" style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'end', marginBottom: '18px' }}>

                            {!preview ? <button onClick={() => setPreview(prev => !prev)} className='followbtn boxins' style={{ fontFamily: 'Poppins', width: '29%', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '34px', borderRadius: '5px', cursor: 'pointer', marginRight: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} variant="outlined"><RemoveRedEyeIcon sx={{ width: '22px', marginRight: '7px', marginTop: '-2px' }} /><p className='hideright'>Preview</p></button> :
                                <button onClick={() => setPreview(prev => !prev)} className='followbtn boxins' style={{ fontFamily: 'Poppins', width: '29%', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '34px', borderRadius: '5px', cursor: 'pointer', marginRight: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} variant="outlined"><VisibilityOffIcon sx={{ width: '22px', marginRight: '7px', marginTop: '-2px' }} /><p className='hideright'>Editor</p></button>}
                            {
                                params && params.postid === "newpost" ?
                                    <button onClick={newpost} className='followbtn boxins' style={{ fontFamily: 'Poppins', width: '29%', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '34px', borderRadius: '5px', cursor: 'pointer', marginRight: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} variant="outlined"> <PresentToAllIcon sx={{ width: '22px', marginRight: '5px', marginTop: '-2px' }} /><p className='hideright'>Share Post</p></button> :
                                    <button onClick={savepost} className='followbtn boxins' style={{ fontFamily: 'Poppins', width: '29%', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '34px', borderRadius: '5px', cursor: 'pointer', marginRight: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} variant="outlined"><SaveIcon sx={{ width: '22px', marginRight: '5px', marginTop: '-2px' }} /> <p className='hideright'>Save Post</p> </button>
                            }
                        </div>

                    </div>

                </div>
            </div>
            <div className="container" style={{ paddingBottom: '29px', marginTop: '-15px' }}>
                <Toaster />

                {
                    preview ? <div className="container50" style={{ width: '70%', margin: 'auto', backgroundColor: context.dark ? '#282828' : '#ffff', borderRadius: '11px', paddingInline: '18px' }}>
                        <h1>{title}</h1>
                        <div className="tags" style={{ marginTop: '-8px', marginLeft: '-6px' }}>

                            {
                                tags && tags.split(',').map(item =>
                                    <Chip name={item} dark={context.dark} />
                                )

                            }
                        </div>
                        <div style={{ height: '99.8vh', overflow: 'auto' }}>
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
                    </div> : <div className="container50" style={{ width: '70%', margin: 'auto' }}>
                        <textarea value={title} onChange={e => setTitle(e.target.value)} style={{ backgroundColor: !context.dark ? 'white' : '#202020', color: 'inherit', padding: '15px', border: 'none', borderRadius: '5px', outline: 'none', resize: 'none', width: '100%', height: '78px', fontSize: '17px', marginBottom: '-1.2px' }} placeholder='Title of the blog *'></textarea>
                        <textarea value={tags} onChange={e => { setTags(e.target.value); }} className='boxins' style={{ backgroundColor: !context.dark ? 'white' : '#202020', color: 'inherit', padding: '15px', border: 'none', borderRadius: '5px', outline: 'none', resize: 'none', width: '100%', height: '55px', fontSize: '15.5px', marginBottom: '-1.2px' }} placeholder='Enter tags (eg : javscript,typescript)'></textarea>
                        <textarea value={summary} onChange={e => setSummary(e.target.value)} className='boxins' style={{ backgroundColor: !context.dark ? 'white' : '#202020', color: 'inherit', padding: '15px', border: 'none', borderRadius: '5px', outline: 'none', resize: 'none', width: '100%', height: '135px', fontSize: '15.5px', marginBottom: '-1.2px' }} placeholder='Summary of the post *'></textarea>
                        <textarea style={{ width: '100%', backgroundColor: !context.dark ? 'white' : '#202020', color: 'inherit', padding: '15px', border: 'none', borderRadius: '5px', outline: 'none', minHeight: '84vh', resize: 'none', fontSize: '15.5px' }} value={value} onChange={e => setValue(e.target.value)} spellCheck="false"></textarea>
                    </div>
                }

            </div>
        </>
    )
}
