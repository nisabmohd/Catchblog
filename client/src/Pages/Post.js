import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Skeleton } from "@mui/material"
import Markdown from "markdown-to-jsx"
import { useContext, useEffect, useState } from "react"
import { Syntax } from "../components/Syntax"
import { UserCard } from "../components/UserCard"
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { MoreFrom } from "../components/MoreFrom"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { url } from "../baseurl"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { AppContext } from "../App"
import millify from "millify";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import toast, { Toaster } from "react-hot-toast"
import { UserCardSkleton } from "../components/UserCardSkleton"
import { RecommendedSketon } from "../components/RecommendedSketon"


export const Post = () => {
  const [loading, setLoading] = useState(true)
  const context = useContext(AppContext)
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [uid, setUID] = useState()
  const [postid, setpostid] = useState()
  const [likes, setLikes] = useState(0)
  const [saved, setSaved] = useState(0)
  const [tilte, setTitle] = useState('')
  const params = useParams()
  const [iSaved, setISaved] = useState(false)
  const [iLiked, setILiked] = useState(false)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetch() {
      const resp = await axios.get(`${url}/post/${params.postid}`)
      setLikes(resp.data.votes.length)
      setContent(resp.data.md)
      setpostid(resp.data.postid)
      setSaved(resp.data.saved.length)
      setUID(resp.data.uid)
      setTitle(resp.data.title)
      setILiked(resp.data.votes.includes(context.auth.uid))
      setISaved(resp.data.saved.includes(context.auth.uid))
      setLoading(false)
    }
    fetch();
  }, [context.auth.uid, params.postid])

  function share() {
    if (navigator.share) {
      navigator.share({
        title: tilte,
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      })
        .catch(console.error);
    } else {
      // fallback
    }
  }

  function like() {
    axios.put(`${url}/post/like`, {
      postid: postid,
      uid: context.auth.uid
    })
    setILiked(true)
    setLikes(prev => prev + 1)
  }
  function unlike() {
    axios.put(`${url}/post/unlike`, {
      postid: postid,
      uid: context.auth.uid
    })
    setILiked(false)
    setLikes(prev => prev - 1)
  }
  function save() {
    axios.put(`${url}/post/save`, {
      postid: postid,
      uid: context.auth.uid
    })
    setISaved(true)
    setSaved(prev => prev + 1)
  }
  function unsave() {
    axios.put(`${url}/post/undosave`, {
      postid: postid,
      uid: context.auth.uid
    })
    setISaved(false)
    setSaved(prev => prev - 1)
  }

  function deletepost() {
    axios.delete(`${url}/post/delete`, {
      data: {
        postid: postid,
        uid: context.auth.uid
      }
    }).then(() => {
      toast.success("Post deleted", {
        style: {
          fontSize: '12px'
        }
      })
      navigate(-1)
    })
  }

  return (
    <Box style={{ marginBottom: '39px' }} className="container">
      <Toaster />
      {loading ? <div className="complete-left" >
        <div className="posthandle posthandleskeleton" style={{ padding: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '167px', width: '3%', marginTop: '24px', }}>
          <Skeleton style={{ width: '22px', height: '40px',}} />
          <Skeleton style={{ width: '22px', height: '40px', }} />
          <Skeleton style={{ width: '22px', height: '40px'}} />
        </div>
      </div> : <div className="complete-left">
        <div className="posthandle" style={{ padding: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '167px', width: '3%', marginTop: '19px', }}>
          {uid && uid !== context.auth.uid ?
            <>
              {iLiked ?
                <><IconButton onClick={unlike}><ThumbUpAltIcon color="primary" /></IconButton><p className="resphandlebtns" style={{ margin: 0, fontSize: '11px', marginTop: '-14px', color: 'rgb(161, 148, 148)' }}>{millify(likes)}</p> </> :
                <><IconButton onClick={like}><ThumbUpOffAltIcon /></IconButton><p className="resphandlebtns" style={{ margin: 0, fontSize: '11px', marginTop: '-14px', color: 'rgb(161, 148, 148)' }}>{millify(likes)}</p></>
              }
            </>
            :
            <></>}
          {
            uid && uid === context.auth.uid ?
              <> <IconButton><EditIcon /></IconButton><IconButton onClick={handleClickOpen}><DeleteOutlineIcon /></IconButton></> : !iSaved ? <><IconButton onClick={save}> <BookmarkBorderIcon /></IconButton> <p className="resphandlebtns" style={{ margin: 0, fontSize: '11px', marginTop: '-14px', color: 'rgb(161, 148, 148)' }}>{millify(saved)}</p></> : <><IconButton onClick={unsave}> <BookmarkIcon color="primary" /></IconButton> <p className="resphandlebtns" style={{ margin: 0, fontSize: '11px', marginTop: '-14px', color: 'rgb(161, 148, 148)' }}>{millify(saved)}</p></>
          }
          <IconButton onClick={share}><ShareIcon /></IconButton>
        </div>
      </div>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontFamily: 'Poppins' }} id="alert-dialog-title">
          {"Delete This Post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '14px' }} id="alert-dialog-description">
            Are you sure you want to delete this post permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontFamily: 'Poppins', fontSize: '14px' }} color="error" onClick={() => { deletepost(); handleClose(); }}>Delete</Button>
          <Button sx={{ fontFamily: 'Poppins', color: 'inherit', fontSize: '14px' }} onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div className="container-left" style={{}}>
        <div className="markdown" style={{ width: '90%' }}>
          {
            loading ? <div style={{ marginTop: '22px' }}>
              <Skeleton style={{ width: '50%', height: '49px' }} />
              <Skeleton style={{ width: '99%' }} />
              <Skeleton style={{ width: '95%' }} />
              <Skeleton style={{ width: '85%' }} />
              <Skeleton style={{ width: '99%', height: '249px', marginTop: '-35px' }} />
            </div> :
              <Markdown options={{
                forceBlock: true,
                overrides: {
                  code: {
                    component: Syntax,
                    props: {
                      className: 'foo',
                    },
                  },
                },
              }}>
                {content}
              </Markdown>
          }
        </div>
        <div className="header-blog">

        </div>
      </div>
      <div className="container-right">
        {loading ? <UserCardSkleton /> :
          <UserCard uid={uid} />
        }
        {
          loading ?
            <div style={{ marginTop: '30px' }}>
              <RecommendedSketon />
            </div> :

            <MoreFrom uid={uid} prev={postid} />
        }
      </div>

    </Box>
  )
}
