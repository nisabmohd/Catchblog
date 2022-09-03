import { Box, IconButton } from "@mui/material"
import Markdown from "markdown-to-jsx"
import { useContext, useEffect, useState } from "react"
import { Syntax } from "../components/Syntax"
import { UserCard } from "../components/UserCard"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { MoreFrom } from "../components/MoreFrom"
import { useParams } from "react-router-dom"
import axios from "axios"
import { url } from "../baseurl"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { AppContext } from "../App"

export const Post = () => {
  const [content, setContent] = useState('')
  const context=useContext(AppContext)
  const [uid,setUID]=useState()
  const [postid,setpostid]=useState()
  const params = useParams()
  useEffect(() => {
    async function fetch(){
      const resp = await axios.get(`${url}/post/${params.postid}`)
      setContent(resp.data.md)
      setpostid(resp.data.postid)
      setUID(resp.data.uid)
    }
    fetch();
  }, [params.postid])

  return (
    <Box style={{ marginBottom: '39px' }} className="container">
      <div className="complete-left">
        <div className="posthandle" style={{ padding: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height:'167px',width: '3%' , marginTop: '19px', }}>
          {uid && uid!==context.auth.uid?<IconButton><ThumbUpOffAltIcon /></IconButton>:<></>}
          {
            uid && uid===context.auth.uid?
            <> <IconButton><EditIcon /></IconButton><IconButton><DeleteOutlineIcon /></IconButton></>  : <IconButton> <BookmarkBorderIcon /></IconButton>
          }
          <IconButton><ShareIcon /></IconButton>
        </div>
      </div>
      <div className="container-left" style={{ }}>
        <div className="markdown" style={{width:'90%'}}>
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
        </div>
        <div className="header-blog">

        </div>
      </div>
      <div className="container-right">
        <UserCard uid={uid} />
        <MoreFrom uid={uid} prev={postid} />
      </div>

    </Box>
  )
}
