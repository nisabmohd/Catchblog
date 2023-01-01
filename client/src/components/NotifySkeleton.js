import { Skeleton } from '@mui/material'
import React, { } from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'

export const NotifySkeleton = () => {
    const context = useContext(AppContext)
    return (
        <div className='post-usercard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', paddingBottom: '19px', paddingTop: '19px', backgroundColor: context.dark ? '#282828' : '#ffff', borderRadius: '12px', margin: '18px 0', padding: '22px 15px' }}>
            <div >
                <Skeleton style={{ width: '40px', height: '40px', borderRadius: '35%', marginRight: '12px' }} variant="circular" width={36} height={36} />
            </div>
            <div style={{ color: 'inherit', textDecoration: 'none' }}>
                <div className="detailsposts" style={{ display: 'flex', flexDirection: 'row', width: 'inherit', alignItems: 'center' }}>
                    <Skeleton style={{ margin: '0', fontSize: '13.85px', fontWeight: '600', width: '195px', height: '27px' }}></Skeleton>
                </div>
            </div>
            <Skeleton style={{ marginLeft: 'auto', width: '75px', marginTop: '-3px' }} />
        </div>
    )
}
