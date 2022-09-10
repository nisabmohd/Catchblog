import { Skeleton } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../App'

export const RecommendedSketon = (props) => {
    const context = useContext(AppContext)
    const arr = [1, 2, 3,4]
    return (
        <div className="user-card" style={{ marginTop: '12px', borderRadius: '10px' }}>
            {
                <Skeleton style={{ height: '27px', width: '45%', marginBottom: '8px',}} />
            }
            {
                arr.map(item =>
                    <div style={{ textDecoration: 'none', color: 'inherit', borderTop: context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)' }}>
                        <div style={{paddingBottom:'10px',paddingTop:'8px'}}>
                            <Skeleton style={{ fontSize: '0.82rem', height: '24px' }}></Skeleton>
                            <Skeleton style={{ fontSize: '0.75rem', color: 'rgb(161, 148, 148)', marginTop: '2px', width: '85%' }}></Skeleton>
                        </div>
                    </div>)

            }
        </div >
    )
}
