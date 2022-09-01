import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../baseurl";
import { AppContext } from "../App";

export const UserCard = (props) => {
    const [user, setUser] = useState()
    const context = useContext(AppContext)

    useEffect(() => {
        async function fetch() {
            const resp = await axios.get(`${url}/user/${props.uid}`)
            setUser(resp.data)
        }
        props.uid && fetch();
    }, [props.uid])
    return (
        <div className="user-card" style={{ marginTop: '12px', width: '294px', borderRadius: '10px', }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '79%', alignItems: 'center', marginBottom: '13px' }} className="userdetails">
                <Link style={{ color: 'inherit', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }} to={`/user/${props.uid}`}><img style={{ width: '40px', borderRadius: '50%' }} src={user && user.img} alt="" /></Link>
                <div className="name">
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/user/${props.uid}`}><p style={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '14px',
                        lineHeight: '24px',
                        marginLeft: '20px'
                    }}>{user && user.username}</p></Link>
                </div>
            </div>
            <div className="other-details" style={{ display: 'flex', flexDirection: 'row', width: '79%', marginTop: '-19px' }}>
                <div className="followers" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '24px',
                    }}>Followers : </p>
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '12px',
                        lineHeight: '24px',
                        marginLeft: '7px'
                    }}>{user && user.followers.length}</p>
                </div>
                <div className="joined" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '9px' }}>
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '24px'
                    }}>Joined :</p>
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '12px',
                        lineHeight: '24px',
                        marginLeft: '7px'
                    }}>{user && user.joined.slice(0, 10)}</p>
                </div>
            </div>
            <div className="summary" style={{ fontSize: '13px', width: '87%', color: 'rgb(161, 148, 148)' }}>
                {user && user.summary}
            </div>
            <div className="button" style={{ width: '93%', marginTop: '23px' }}>
                {
                    props.uid === context.auth.uid ? <button className="followbtn" style={{ fontFamily: 'Poppins', width: 'inherit', marginTop: '-9px', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '33px', borderRadius: '5px', cursor: 'pointer' }} variant="outlined">Edit Profile</button>
                        : <button className="followbtn" style={{ fontFamily: 'Poppins', width: 'inherit', marginTop: '-9px', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '33px', borderRadius: '5px', cursor: 'pointer' }} variant="outlined">Follow</button>
                }
            </div>
        </div >
    )
}
