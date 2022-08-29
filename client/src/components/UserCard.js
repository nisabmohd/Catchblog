import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../baseurl";


export const UserCard = (props) => {
    const [user, setUser] = useState()
    useEffect(() => {
        async function fetch() {
            const resp = await axios.get(`${url}/user/${props.uid}`)
            console.log(resp.data);
            setUser(resp.data)
        }
        props.uid && fetch();
    }, [props.uid])
    return (
        <div className="user-card" style={{ marginTop: '12px', width: '297px', borderRadius: '10px', padding: '20px', }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '79%' }} className="userdetails">
                <img style={{ width: '40px', borderRadius: '50%' }} src={user && user.img} alt="" />
                <div className="name">
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '14px',
                        lineHeight: '24px',
                    }}>{user && user.username}</p>
                </div>
            </div>
            <div className="other-details" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '79%' }}>
                <div className="followers">
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '24px',
                    }}>Followers</p>
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '12px',
                        lineHeight: '24px',
                        marginTop:'-2px'
                    }}>{user && user.followers.length}</p>
                </div>
                <div className="joined">
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '24px'
                    }}>Joined</p>
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '12px',
                        lineHeight: '24px',
                        marginTop:'-2px'
                    }}>{user && user.joined.slice(0,10)}</p>
                </div>
            </div>
            <div className="button" style={{ width: '95%' }}>
                <button style={{ fontFamily: 'Poppins', width: 'inherit', marginTop: '9px', color: 'white', border: 'none', outline: 'none', background: 'rgb(66 66 66)', height: '33px', borderRadius: '5px', cursor: 'pointer' }} variant="outlined">Follow</button>
            </div>
        </div >
    )
}
