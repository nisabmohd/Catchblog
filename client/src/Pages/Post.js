import { Box } from "@mui/material"
import Markdown from "markdown-to-jsx"
import { useEffect, useState } from "react"
import { Syntax } from "../components/Syntax"
import { UserCard } from "../components/UserCard"
import md from '../default.md'

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
    <Box style={{ backgroundColor: 'palette.text.primary' }} className="container">
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
        <div className="posthandle">

        </div>
        <UserCard />
      </div>
    </Box>
  )
}
