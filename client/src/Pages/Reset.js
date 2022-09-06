import { useContext } from 'react'
import { Link } from 'react-router-dom'
import loginimg from '../assets/forgot.png'
import '../css/login.css'
import { AppContext } from '../App'

export const Reset = () => {
    const context = useContext(AppContext)

    return (
        <div className="containerlogin">
            <div className="leftlogin">
                <img style={{ marginTop: '-40px', minWidth: '400px', zIndex: '-99',width:'85%' }} src={loginimg} alt="" />
            </div>
            <div className="rightlogin">
                <div className="headerlogin">
                    <h1 className='hrespreset'>
                        Reset Password
                    </h1>
                    <p style={{ marginTop: '-10px', marginBottom: '5px' ,fontSize:'14px',marginLeft:'5px',minWidth:'320px'}}>Remember your password <Link to="/login" style={{ color: 'rgb(109 109 109)', textDecoration: 'none', marginBottom: '-2.5px', marginLeft: '3px' }}> Login here</Link></p>
                </div>
                <input type="email" placeholder='Enter email' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} />
                <input type="password" placeholder='Enter new password' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} />
                <button style={{ fontFamily: 'Poppins', width: '320px', color: context.dark ? 'black' : 'white', border: 'none', outline: 'none', background: context.dark ? 'white' : 'rgb(66 66 66)', height: '44px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }} variant="outlined">Done</button>
            </div>
        </div>
    )
}
