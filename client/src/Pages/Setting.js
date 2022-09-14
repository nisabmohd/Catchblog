import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { url } from '../baseurl';
import Resizer from "react-image-file-resizer";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../firebase';

export const Setting = () => {
  const context = useContext(AppContext)
  const [email, setEmail] = useState(context.auth.email)
  const [username, setUsername] = useState(context.auth.username)
  const [bio, setBio] = useState(context.auth.summary)
  const [img, setImg] = useState(context.auth.img)
  const [pass, setPass] = useState()
  const navigate = useNavigate()

  const saveProfile = () => {
    if (!email) {
      toast.error("Email required", {
        style: {
          fontSize: '12px'
        }
      })
      if (!username) {
        toast.error("Email required", {
          style: {
            fontSize: '12px'
          }
        })
      }
    }
    axios.put(`${url}/user/edit/${context.auth.uid}`, {
      email, password: pass, summary: bio, img, username
    }).then((resp) => {
      if (resp.data) {
        toast.success("Profile updated", {
          style: {
            fontSize: '12px'
          }
        })
        console.log(resp.data);
        localStorage.setItem('auth', JSON.stringify(resp.data))
        context.setAuth(resp.data)
        navigate(`/user/${context.auth.uid}`)
      }
    })
  }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  const onChangeImage = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      console.log(image);
      const storageRef = ref(storage, 'images/' + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
          toast.error("Some error occured", {
            style: {
              fontSize: '12px'
            }
          })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImg(downloadURL)
          });
        }
      );
    } catch (err) {
      toast.error("Some error occured", {
        style: {
          fontSize: '12px'
        }
      })
    }
  };

  return (
    <div className='container '>
      <Toaster />
      <div className="container">
        <div className="useredit" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '15px 0', marginBottom: '35px' }}>Settings</h3>

          <p style={{ margin: '0', fontSize: '13px' }}>Enter Username</p>
          <input type="text" placeholder='Enter Username' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', marginTop: '5px', paddingLeft: '14px', width: '95%', marginBottom: '14px' }} value={username} onChange={e => setUsername(e.target.value)} />
          <p style={{ margin: '0', fontSize: '13px', marginTop: '12px' }}>Enter Email</p>

          <input type="text" placeholder='Enter Email' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', marginTop: '5px', paddingLeft: '14px', width: '95%', marginBottom: '14px' }} value={email} onChange={e => setEmail(e.target.value)} />
          <p style={{ margin: '0', fontSize: '13px', marginTop: '12px' }}>Enter Bio</p>

          <textarea placeholder='Enter Bio' style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '147px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', marginTop: '5px', paddingLeft: '10px', paddingTop: '9px', resize: 'none', width: '95%', marginBottom: '14px' }} value={bio} spellCheck="false" onChange={e => setBio(e.target.value)} />
          <p style={{ margin: '0', fontSize: '13px', marginTop: '12px', color: 'red' }}>Enter Password (FIll only incase you want to reset password)</p>
          <input onChange={e => setPass(e.target.value)} type="text" placeholder='Enter password' value={pass ? pass : ''} style={{ background: context.dark ? 'rgb(66 66 66)' : 'rgb(248 248 248)', height: '47px', outline: 'none', border: 'none', borderRadius: '5px', color: 'inherit', marginTop: '5px', paddingLeft: '14px', width: '95%', marginBottom: '14px' }} />
          <p style={{ margin: '0', fontSize: '13px', marginTop: '23px' }}>Profile img</p>

          <input onChange={(e) => onChangeImage(e)} type="file" id='imgup' hidden />
          <div className="imgupload" style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img style={{ width: '35px', borderRadius: "50%", marginTop: '15px', marginRight: '19px' }} src={img} alt="" />
            <label style={{ margin: '0', fontSize: '13px', marginTop: '15px', cursor: 'pointer' }} htmlFor="imgup">Upload an image</label>
          </div>
          <button onClick={() => saveProfile()} style={{ fontFamily: 'Poppins', width: '220px', color: context.dark ? 'black' : 'white', border: 'none', outline: 'none', background: context.dark ? 'white' : 'rgb(66 66 66)', height: '40px', borderRadius: '5px', cursor: 'pointer', marginTop: '50px', marginBottom: '35px' }} variant="outlined">Save</button>
        </div>
      </div>
    </div>
  )
}
