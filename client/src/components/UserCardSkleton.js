import { Skeleton } from '@mui/material'
import React from 'react'

export const UserCardSkleton = () => {
    return (
        <div className="user-card" style={{ marginTop: '12px', borderRadius: '10px', }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '79%', alignItems: 'center', marginBottom: '13px' }} className="userdetails">
            <Skeleton style={{ width: '40px',height:'40px', borderRadius: '50%', marginRight: '12px',marginBottom:'18px' }} variant="circular" width={36} height={40} />
                <div className="name">
                    <Skeleton style={{ color: 'inherit', textDecoration: 'none',width:'175px' ,marginTop:'-18px'}} ></Skeleton>
                </div>
            </div>
            <div className="other-details" style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '-19px' }}>
                <div className="followers" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Skeleton style={{
                        width:'75px',marginRight:'9px'
                    }}></Skeleton>
                    <Skeleton style={{
                        width:'25px',marginRight:'9px'
                    }}></Skeleton>
                </div>
                <div className="joined" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '9px' }}>
                    <Skeleton style={{
                        width:'75px',marginRight:'9px'
                    }}></Skeleton>
                    <Skeleton style={{
                        width:'25px',marginRight:'9px'
                    }}></Skeleton>
                </div>
            </div>
            <div className="summary" style={{ fontSize: '13px', width: '93%', color: 'rgb(161, 148, 148)' }}>
                <Skeleton />
                <Skeleton style={{width:'25%'}} />
            </div>
            <div className="button" style={{ width: '99%', marginTop: '13px' }}>
                <Skeleton style={{height:'38px'}} />
            </div>
        </div >
    )
}
