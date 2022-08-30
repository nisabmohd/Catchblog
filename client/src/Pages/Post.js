import { Box, IconButton } from "@mui/material"
import Markdown from "markdown-to-jsx"
import { useEffect, useState } from "react"
import { Syntax } from "../components/Syntax"
import { UserCard } from "../components/UserCard"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { MoreFrom } from "../components/MoreFrom"
import { useParams } from "react-router-dom"
import axios from "axios"
import { url } from "../baseurl"

export const Post = () => {
  const [content, setContent] = useState('')
  const [uid,setUID]=useState()
  const params = useParams()
  useEffect(() => {
    async function fetch(){
      const resp = await axios.get(`${url}/post/${params.postid}`)
      setContent(resp.data.md)
      setUID(resp.data.uid)
    }
    fetch();
  }, [params.postid])

  return (
    <Box style={{ backgroundColor: 'palette.text.primary', marginBottom: '39px' }} className="container">
      <div className="complete-left">
        <div className="posthandle" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '207px', marginTop: '5px', width: '3%',paddingRight:'9px' }}>
          <IconButton><ThumbUpOffAltIcon /></IconButton>
          <IconButton><ShareIcon /></IconButton>
          <IconButton> <BookmarkBorderIcon /></IconButton>
        </div>
      </div>
      <div className="container-left">
        <div className="markdown" style={{width:'96%'}}>
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
        <MoreFrom />
      </div>

    </Box>
  )
}
