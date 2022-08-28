import React, { useContext } from 'react'
import { AppContext } from "../App";

export const MoreFrom = () => {
    const context = useContext(AppContext)

    return (
        <div className="user-card" style={{ marginTop: '12px', width: '287px', borderRadius: '10px', padding: '20px',}}>
            <p style={{
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '15px',
                        lineHeight: '24px',
                        borderBottom:context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)' ,
                        paddingBottom:'12px'
                    }}>More From <span style={{color:'rgb(161 148 148)'}}>Mohd Nisab</span></p>

                    <div style={{borderBottom:context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)'}}>
                        <p style={{fontSize:'0.85rem'}}>Create React App in HTML</p>
                        <p style={{fontSize:'0.75rem',color:'rgb(161, 148, 148)',marginTop:'-9px'}}>npx create react app command ...</p>
                    </div>
                    <div style={{borderBottom:context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)'}}>
                        <p style={{fontSize:'0.85rem'}}>SingleTon Class In Java</p>
                        <p style={{fontSize:'0.75rem',color:'rgb(161, 148, 148)',marginTop:'-9px'}}>Lorem ipsum, dolor sit amet consectetur adipis ...</p>
                    </div>
                    <div style={{borderBottom:context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)'}}>
                        <p style={{fontSize:'0.85rem'}}>How MaxHeap works?</p>
                        <p style={{fontSize:'0.75rem',color:'rgb(161, 148, 148)',marginTop:'-9px'}}>Lorem ipsum, dolor sit amet consectetur ...</p>
                    </div>
        </div >
    )
}