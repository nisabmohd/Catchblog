import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginimg from '../assets/hand.png'
import '../css/login.css'
import { AppContext } from '../App'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { url } from '../baseurl'


export const Signup = () => {
  const context = useContext(AppContext)
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  async function signup() {
    if (!email) {
      toast.error("Email required", {
        style: {
          fontSize: '12px'
        }
      })
      return;
    }
    if (!password) {
      toast.error("Password required", {
        style: {
          fontSize: '12px'
        }
      })
      return;
    }
    try {
      const resp = await axios.post(`${url}/auth/signup`, { email, password, username })
      localStorage.setItem('auth', JSON.stringify(resp.data))
      navigate('/')
      context.setAuth(resp.data)
    }
    catch (err) {
      toast.error(err.response.data.message, {
        style: {
          fontSize: '12px'
        }
      })
    }
  }

  return (
    <div className="containerlogin">
      <Toaster />
      <div className="leftlogin">
        <img style={{ marginTop: '45px', minWidth: '400px', zIndex: '-99' ,width:'74%' }} src={loginimg} alt="" />
      </div>
      <div className="rightlogin">
        <div className="headerlogin">
          <h1>
            Sign up to CatchBlog
          </h1>
          <p style={{ marginTop: '-10px', marginBottom: '5px' ,fontSize:'14px',marginLeft:'5px',minWidth:'320px'}}>Already have an account <Link to="/login" style={{ color: 'rgb(109 109 109)', textDecoration: 'none', marginBottom: '-2.5px', marginLeft: '3px' }}> Login here</Link></p>
        </div>
        <input type="email" placeholder='Enter email' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} value={email} onChange={(e) => setemail(e.target.value)} />
        <input type="text" placeholder='Enter Name' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} value={username} onChange={(e) => setusername(e.target.value)} />
        <input type="password" placeholder='Enter password' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signup} style={{ fontFamily: 'IBM Plex Sans', width: '325px', color: context.dark ? 'black' : 'white', border: 'none', outline: 'none', background: context.dark ? 'white' : 'rgb(66 66 66)', height: '44px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold', marginBottom: '25px' }} variant="outlined">Register</button>
      </div>
    </div>
  )
}
