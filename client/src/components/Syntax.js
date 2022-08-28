import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula} from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Syntax = (props) => {
    const [state] = useState(props.children[0])
    console.log(props);
    return (
        <div style={{borderRadius:'5px',overflow:'hidden',fontSize:'14px',fontFamily:'Fira Code'}}>
            <SyntaxHighlighter language='java' style={darcula}>
                {state}
            </SyntaxHighlighter>
        </div>
    )
}
