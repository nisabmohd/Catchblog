import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginimg from '../assets/forgot.png'
import '../css/login.css'
import { AppContext } from '../App'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { url } from '../baseurl'


export const Reset = () => {
    const context = useContext(AppContext)
    const navigate = useNavigate()
    const [otp, setOpt] = useState('')
    const [email, setEmail] = useState('')
    const [disable, setDisable] = useState(false)
    const [pass, setPass] = useState('')


    async function sendOtp() {
        setDisable(true)
        if (!email)
            toast.error("Email required", {
                style: {
                    fontSize: '12px'
                }
            })
        const resp = await axios.put(`${url}/user/password/otp`, {
            email
        })
        if (resp.data.status) {
            toast.success("OTP sent", {
                style: {
                    fontSize: '12px'
                }
            })
        }
        setDisable(false)
    }
    async function changePass() {
        if (!email)
            toast.error("Email required", {
                style: {
                    fontSize: '12px'
                }
            })
        if (!pass)
            toast.error("Password required", {
                style: {
                    fontSize: '12px'
                }
            })
        if (!otp)
            toast.error("OTP required", {
                style: {
                    fontSize: '12px'
                }
            })
        await axios.put(`${url}/user/verifyotp`, {
            email, password: pass, otp
        }).then((resp) => {
            console.log(resp);
            if (resp.data.message === "done") {
                toast.success(`${resp.data.message}`, {
                    style: {
                        fontSize: '12px'
                    }
                })
                navigate('/login')
            }
        }).catch(err => {
            toast.error(`Wrong OTP`, {
                style: {
                    fontSize: '12px'
                }
            })
        })
    }
    return (
        <div className="containerlogin">
            <Toaster />
            <div className="leftlogin">
                <img style={{ marginTop: '-40px', minWidth: '400px', zIndex: '-99', width: '85%' }} src={loginimg} alt="" />
            </div>
            <div className="rightlogin">
                <div className="headerlogin">
                    <h1 className='hrespreset'>
                        Reset Password
                    </h1>
                    <p style={{ marginTop: '-10px', marginBottom: '5px', fontSize: '14px', marginLeft: '5px', minWidth: '320px' }}>Remember your password <Link to="/login" style={{ color: 'rgb(109 109 109)', textDecoration: 'none', marginBottom: '-2.5px', marginLeft: '3px' }}> Login here</Link></p>
                </div>
                <div className="same-line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '325px', marginTop: '20px', }}>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Enter email' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', paddingLeft: '14px', width: '78%' }} />
                    {
                        !disable ? <button onClick={() => sendOtp()} style={{ fontFamily: 'IBM Plex Sans', color: context.dark ? 'black' : 'white', border: 'none', outline: 'none', background: context.dark ? 'white' : 'rgb(66 66 66)', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px', height: '45px', width: '21%', marginLeft: '8px' }}>OTP</button> :
                            <button disabled={true} style={{ fontFamily: 'IBM Plex Sans', color: context.dark ? 'black' : 'white', border: 'none', outline: 'none', background: context.dark ? 'white' : 'rgb(66 66 66)', cursor: 'not-allowed', fontWeight: 'bold', borderRadius: '5px', height: '45px', width: '21%', marginLeft: '8px' }}>OTP</button>
                    }

                </div>
                <input value={otp} onChange={e => setOpt(e.target.value)} type="text" placeholder='Enter OTP' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} />
                <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder='Enter new password' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', width: '325px', marginTop: '20px', paddingLeft: '14px' }} />
                <button onClick={() => changePass()} style={{ fontFamily: 'IBM Plex Sans', width: '320px', color: context.dark ? 'black' : 'white', border: 'none', outline: 'none', background: context.dark ? 'white' : 'rgb(66 66 66)', height: '44px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }} variant="outlined">Done</button>
            </div>
        </div>
    )
}
