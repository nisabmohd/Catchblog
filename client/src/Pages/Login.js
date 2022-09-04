import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginimg from '../assets/login.png'
import '../css/login.css'
import { AppContext } from '../App'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { url } from '../baseurl'
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

export const Login = () => {
    const context = useContext(AppContext)

    useGoogleOneTapLogin({
        onError: error => console.log(error),
        onSuccess: response => handleGoogleAuth(response),
        googleAccountConfigs: {
            client_id: "201428169433-rheoo1csuo1e7r7714s5mbjljj44tvvk.apps.googleusercontent.com"
        },
    });

    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    async function login() {
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
            const resp = await axios.post(`${url}/auth/login`, { email, password })
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
    function handleGoogleAuth(user) {
        axios.post(`${url}/auth/googleauth`, { email: user.email, img: user.picture, username: user.name, uid: user.sub})
            .then((res) => {
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
                        Sign in to CatchBlog
                    </h1>
                    <p style={{ marginTop: '19px', marginBottom: '-5px' }}>Don't have an account <Link to="/register" style={{ color: 'rgb(109 109 109)', textDecoration: 'none', marginBottom: '-2.5px', marginLeft: '3px' }}> Register here</Link></p>
                </div>
                <img style={{ marginTop: '-40px', minWidth: '400px', zIndex: '-99' }} src={loginimg} alt="" />
            </div>
            <div className="rightlogin">
                <input type="email" placeholder='Enter email' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} value={email} onChange={(e) => setemail(e.target.value)} />
                <input type="password" placeholder='Enter password' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={login} style={{ fontFamily: 'Poppins', width: '320px', color: context.dark ? 'black' : 'white', border: 'none', outline: 'none', background: context.dark ? 'white' : 'rgb(66 66 66)', height: '44px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }} variant="outlined">Login</button>
                <Link style={{ textDecoration: 'none', color: 'inherit', fontSize: '12.75px', marginTop: '12px', marginBottom: '25px' }} to="/reset"><p>Forgot Password ?</p></Link>
            </div>
        </div>
    )
}
