import { Skeleton } from '@mui/material'
import { PostcardUserSkeleton } from './PostcardUserSkeleton'

export const PostCradSkeleton = () => {

    return (
        <div className={`card`} style={{ width: '95%', padding: '15px 0px', margin: '8px 0', paddingTop: '32px' }}>
            <div className="header">
                <div className="textheader">
                    <PostcardUserSkeleton />
                </div>
            </div>
            <Skeleton style={{ fontSize: '19px', marginBottom: '3px', marginTop: '13px', fontWeight: '900', height: '38px', width: '95%' }}></Skeleton>
            <div style={{ display: 'flex', flexDirection: 'row',marginTop:'11px' }}>
                <Skeleton style={{ width: '75px' }} />
                <Skeleton style={{ width: '65px', marginLeft: '12px' }} />
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '9px' }}>
                <div style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Skeleton style={{ fontSize: '13px', width: '89%' }}></Skeleton>
                    <Skeleton style={{ fontSize: '13px', width: '75%' }}></Skeleton>
                </div>

            </div>
        </div>
    )
}
