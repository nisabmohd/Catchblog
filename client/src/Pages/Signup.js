import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginimg from '../assets/blog.png'
import '../css/login.css'
import { AppContext } from '../App'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { url } from '../baseurl'
import { provider } from '../firebaseconfig'
import { getAuth, signInWithPopup } from 'firebase/auth'
import googleico from '../assets/google.png'


export const Signup = () => {
  const context = useContext(AppContext)
  const navigate = useNavigate()
  const authgoogle = getAuth();
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
      const resp = await axios.post(`${url}/auth/signup`,)
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

  function handleGoogleAuth() {
    signInWithPopup(authgoogle, provider).then((result) => {
      const user = result.user;
      return axios.post(`${url}/auth/googleauth`, { email: user.email, img: user.photoURL, username: user.displayName, uid: user.uid })
    }).then((res) => {
      console.log(res);
      localStorage.setItem('auth', JSON.stringify(res.data))
      navigate('/')
      context.setAuth(res.data)
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="containerlogin">
      <Toaster />
      <div className="leftlogin">
        <div className="headerlogin">
          <h1>
            Sign up to CatchBlog
          </h1>
          <p style={{ marginTop: '19px', marginBottom: '0px' }}>Have an account <Link to="/login" style={{ color: 'rgb(109 109 109)', textDecoration: 'none', marginBottom: '-2.5px', marginLeft: '3px' }}> Login here</Link></p>
        </div>
        <img style={{ marginTop: '-40px', minWidth:'400px',zIndex:'-99' }} src={loginimg} alt="" />
      </div>
      <div className="rightlogin">
        <input type="email" placeholder='Enter email' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} value={email} onChange={(e) => setemail(e.target.value)} />
        <input type="text" placeholder='Enter username' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} value={username} onChange={(e) => setusername(e.target.value)} />
        <input type="password" placeholder='Enter password' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signup} style={{ fontFamily: 'Poppins', width: '325px', color: context.dark ? 'black' : 'white', border: 'none', outline: 'none', background: context.dark ? 'white' : 'rgb(66 66 66)', height: '44px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold', marginBottom: '25px' }} variant="outlined">Register</button>
        <button style={{ backgroundColor:context.dark?'#2D3748':'rgb(233 233 233)', color:context.dark?'white':'black', width: '325px', height: '44px', border: 'none', outline: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onClick={() => handleGoogleAuth()}><img style={{ width: "20px", marginRight: '14px' }} src={googleico} alt=""></img>Continue with Google</button>
      </div>
    </div>
  )
}
