import { useContext, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord,darcula} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AppContext } from "../App";

export const Syntax = (props) => {
    const context=useContext(AppContext)
    const [state] = useState(props.children[0])
    console.log(props);
    return (
        <div style={{borderRadius:'5px',overflow:'hidden',fontSize:'14px',fontFamily:'Fira Code'}}>
            <SyntaxHighlighter language='java' style={context.dark?darcula:nord}>
                {state}
            </SyntaxHighlighter>
        </div>
    )
}
