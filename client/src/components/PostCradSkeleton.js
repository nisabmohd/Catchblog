import { Skeleton } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../App'
import { PostcardUserSkeleton } from './PostcardUserSkeleton'

export const PostCradSkeleton = () => {
    const context = useContext(AppContext)

  return (
    <div className={`card`} style={{ width: '95%', padding: '22px 0px', margin: '8px 0', borderBottom: context.dark ? '1px solid rgb(39 39 39)' : '1px solid rgb(238 238 238)', paddingTop: '10px' }}>
    <div className="header">
        <div className="textheader">
            <PostcardUserSkeleton/>
        </div>
    </div>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '9px' }}>
        <div style={{ color: 'inherit', textDecoration: 'none' }}>
            <Skeleton style={{ fontSize: '19px', marginBottom: '3px', marginTop: '6px', fontWeight: '900',height:'28px',width:'95%' }}></Skeleton>
            <Skeleton style={{ fontSize: '13px',width:'89%' }}></Skeleton>
            <Skeleton style={{ fontSize: '13px',width:'75%' }}></Skeleton>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row',}}>
            <Skeleton style={{width:'75px'}}/>
            <Skeleton style={{width:'65px',marginLeft:'12px'}}/>
        </div>
    </div>
</div>
  )
}
