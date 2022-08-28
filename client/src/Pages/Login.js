import { useContext } from 'react'
import { Link } from 'react-router-dom'
import loginimg from '../assets/login.png'
import '../css/login.css'
import {AppContext} from '../App'

export const Login = () => {
    const context=useContext(AppContext)
    return (
        <div className="containerlogin">
            <div className="leftlogin">
                <div className="headerlogin">
                    <h1>
                        Sign in to CatchBlog
                    </h1>
                    <p style={{marginTop:'19px',marginBottom:'-10px'}}>If you don't have an account</p>
                    <p style={{marginLeft:'5px'}}>You can <Link to="/register" style={{color:'rgb(109 109 109)',textDecoration:'none',marginBottom:'-2.5px',marginLeft:'3px'}}> Register here</Link></p>
                </div>
                <img src={loginimg} alt="" />
            </div>
            <div className="rightlogin">
                <input type="email" placeholder='Enter email' style={{background:context.dark?'rgb(66 66 66)':'rgb(248 248 248)',height:'47px',outline:'none',border:'none',borderRadius:'5px',color:'inherit',width:'325px',marginTop:'20px',paddingLeft:'14px'}} />
                <input type="password" placeholder='Enter password' style={{background:context.dark?'rgb(66 66 66)':'rgb(248 248 248)',height:'47px',outline:'none',border:'none',borderRadius:'5px',color:'inherit',width:'325px',marginTop:'20px',paddingLeft:'14px'}}/>
                <button style={{ fontFamily: 'Poppins', width: '320px', color: context.dark?'black':'white', border: 'none', outline: 'none', background: context.dark?'white':'rgb(66 66 66)', height: '44px', borderRadius: '5px', cursor: 'pointer',marginTop:'20px',fontWeight:'bold' }} variant="outlined">Login</button>
            </div>
        </div>
    )
}
