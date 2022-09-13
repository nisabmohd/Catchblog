import React, { useContext } from 'react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TuneIcon from '@mui/icons-material/Tune';
import { AppContext } from '../App';

export const Setting = () => {
  const context = useContext(AppContext)
  return (
    <div className='container homecontainer'>
      <div className="container-left">
        <div className="useredit" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '15px 0', marginBottom: '35px' }}>User</h3>

          <p style={{ margin: '0', fontSize: '13px' }}>Enter Username</p>
          <input type="text" placeholder='Enter Username' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', marginTop: '5px', paddingLeft: '14px',width:'95%',marginBottom:'14px' }} value={context.auth.username} />
          <p style={{ margin: '0', fontSize: '13px', marginTop: '12px' }}>Enter Email</p>

          <input type="text" placeholder='Enter Email' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', marginTop: '5px', paddingLeft: '14px' ,width:'95%',marginBottom:'14px'}} value={context.auth.email} />
          <p style={{ margin: '0', fontSize: '13px', marginTop: '12px' }}>Enter Bio</p>

          <textarea  placeholder='Enter Bio' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '147px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', marginTop: '5px', paddingLeft: '10px',paddingTop:'9px',resize:'none',width:'95%',marginBottom:'14px'  }} value={context.auth.summary} spellCheck="false" />
          <p style={{ margin: '0', fontSize: '13px', marginTop: '23px' }}>Profile img</p>

          <input type="file" id='imgup' hidden />
          <div className="imgupload" style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img style={{ width: '35px', borderRadius: "50%", marginTop: '15px', marginRight: '19px' }} src={context.auth.img} alt="" />
            <label style={{ margin: '0', fontSize: '13px', marginTop: '15px', cursor: 'pointer'}} htmlFor="imgup">Upload an image</label>
          </div>

        </div>
        <div className="cust">

        </div>
        <div className="acc">

        </div>
        <button style={{ fontFamily: 'Poppins', width: '220px', color: context.dark ? 'black' : 'white', border: 'none', outline: 'none', background: context.dark ? 'white' : 'rgb(66 66 66)', height: '40px', borderRadius: '5px', cursor: 'pointer', marginTop: '50px',marginBottom:'35px' }} variant="outlined">Save</button>
      </div>
      <div className="container-right">
        <div className="navigation-setting" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginLeft:'9px' }}>
          <EmojiEmotionsIcon sx={{ marginRight: '6px',fontSize:'20px' }} />
          <p style={{ fontSize: '13px' }}>profile</p>
        </div>
        <div className="navigation-setting" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginLeft:'9px' }}>
          <TuneIcon sx={{ marginRight: '6px',fontSize:'20px' }} />
          <p style={{ fontSize: '13px' }}>Customization</p>
        </div>
        <div className="navigation-setting" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginBottom:'25px',marginLeft:'9px' }}>
          <ManageAccountsIcon sx={{ marginRight: '6px',fontSize:'20px' }} />
          <p style={{ fontSize: '13px' }}>Account</p>
        </div>

      </div>
    </div>
  )
}
