import React, { useContext } from 'react'
import { AppContext } from "../App";


export const Recommended = () => {
  const context = useContext(AppContext)

  return (
    <div className="user-card" style={{ marginTop: '12px', borderRadius: '10px' }}>
      <p style={{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '24px',
      }}>Posts <span style={{ color: 'rgb(161 148 148)' }}>Trending</span></p>

      <div style={{ borderTop: context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)' }}>
        <h3 style={{ fontSize: '0.8rem' }}>Create React App in HTML</h3>
        <p style={{ fontSize: '0.78rem', color: 'rgb(161, 148, 148)', marginTop: '-9px' }}>npx create react app command ...</p>
      </div>
      <div style={{ borderTop: context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)' }}>
        <h3 style={{ fontSize: '0.8rem' }}>SingleTon Class In Java</h3>
        <p style={{ fontSize: '0.78rem', color: 'rgb(161, 148, 148)', marginTop: '-9px' }}>Lorem ipsum, dolor sit amet consectetur adipis ...</p>
      </div>
      <div style={{ borderTop: context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)' }}>
        <h3 style={{ fontSize: '0.8rem' }}>How MaxHeap works?</h3>
        <p style={{ fontSize: '0.78rem', color: 'rgb(161, 148, 148)', marginTop: '-9px' }}>Lorem ipsum, dolor sit amet consectetur ...</p>
      </div>
      <div style={{ borderTop: context.dark ? '1px solid #353535' : '1px solid rgb(227 223 223)' }}>
        <h3 style={{ fontSize: '0.8rem' }}>Create React App in HTML</h3>
        <p style={{ fontSize: '0.78rem', color: 'rgb(161, 148, 148)', marginTop: '-9px' }}>npx create react app command ...</p>
      </div>
    </div >
  )
}
