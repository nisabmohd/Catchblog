

export const UserCard = () => {
    return (
        <div className="user-card" style={{ marginTop: '12px',width:'297px',borderRadius:'10px',padding:'20px',}}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',width:'90%'}} className="userdetails">
                <img style={{ width: '40px', borderRadius: '50%' }} src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F76525761.jpg?alt=media&token=dbc95980-be1d-4f16-ae70-24ee874cd885" alt="" />
                <div className="name">
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '14px',
                        lineHeight: '24px', 
                    }}>Mohd Nisab</p>
                </div>
            </div>
            <div className="other-details" style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'90%'}}>
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
                    }}>1.5K</p>
                </div>
                <div className="joined">
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '13px',
                        lineHeight: '24px',
                    }}>Joined</p>
                    <p style={{
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '12px',
                        lineHeight: '24px',
                    }}>25 Oct,2022</p>
                </div>
            </div>
            <dib className="button" style={{width:'92%'}}>
                 <button style={{fontFamily:'Poppins',width:'inherit',marginTop:'9px',color:'white',border:'none',outline:'none',background:'rgb(66 66 66)',height:'33px',borderRadius:'5px',cursor:'pointer'}} variant="outlined">Follow</button>
            </dib>
        </div >
    )
}
