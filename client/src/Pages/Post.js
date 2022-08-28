import { Box, IconButton } from "@mui/material"
import Markdown from "markdown-to-jsx"
import { useEffect, useState } from "react"
import { Syntax } from "../components/Syntax"
import { UserCard } from "../components/UserCard"
import md from '../default.md'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { MoreFrom } from "../components/MoreFrom"

export const Post = () => {
  const [content, setContent] = useState('')
  useEffect(() => {
    fetch(md).then(res => {
      return res.text()
    }).then(data => {
      setContent(data)
    })
  }, [])

  return (
    <Box style={{ backgroundColor: 'palette.text.primary', marginBottom: '39px' }} className="container">
      <div className="complete-left">
        <div className="posthandle" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '207px', marginTop: '5px', width: '10%' }}>
          <IconButton><ThumbUpOffAltIcon /></IconButton>
          <IconButton><ShareIcon /></IconButton>
          <IconButton> <BookmarkBorderIcon /></IconButton>
        </div>
      </div>
      <div className="container-left">
        <div className="markdown">
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
        <UserCard />
        <MoreFrom />
      </div>

    </Box>
  )
}
