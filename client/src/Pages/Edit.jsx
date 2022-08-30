import React, { useContext, useEffect, useState } from 'react'
import {Help} from '../components/Help'
import { Editor } from 'react-editor'
import md from '../default.md'
import { AppContext } from '../App'


export const Edit = () => {
    const [value, setValue] = useState('')
    const context = useContext(AppContext)

useEffect(() => {
    fetch(md).then(resp=>{
        return resp.text()
    }).then(data=>{
        setValue(data)
    })
}, [])

    return (
        <div className="container" style={{ }}>
            <div className="container-left">

                <Editor
                    placeholder="# MarkDown Title"
                    value={value}
                    onChange={setValue}
                    style={{ backgroundColor: !context.dark?'rgb(246 246 246)':'#202020', padding: '14px', borderRadius: '6px',  }}
                />
            </div>
            <div className="container-right">
                <Help/>
            </div>
        </div>
    )
}
