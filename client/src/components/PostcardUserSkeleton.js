import { Skeleton } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'

export const PostcardUserSkeleton = (props) => {
    const context = useContext(AppContext)
    return (
        <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: context.dark ? '#282828' : props.dialog ? '#e3e0e0' : '#ffff', borderRadius: '12px', marginTop: '-14px', padding: props.search && '18px' }}>
            <div >
                <Skeleton style={{ width: props.imglength || '40px', height: props.imglength || '40px', borderRadius: '35%', marginRight: '12px' }} variant="circular" width={36} height={36} />
            </div>
            <div style={{ color: 'inherit', textDecoration: 'none' }}>
                <div className="detailsposts" style={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
                    <Skeleton style={{ margin: '0', fontSize: '13.85px', fontWeight: '600', width: '225px', height: '25px' }}></Skeleton>
                    <Skeleton style={{ fontSize: '11px', color: 'rgb(161, 148, 148)', margin: '0', marginTop: '4px', width: '130px', }}></Skeleton>
                </div>
            </div>
        </div>
    )
}
