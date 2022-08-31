import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula,oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AppContext } from "../App";
import { useContext } from 'react';

export const Syntax = (props) => {
    const context = useContext(AppContext)
    const [state] = useState(props.children[0])
    return (
        <div style={{borderRadius:'5px',overflow:'hidden',fontSize:'14px',fontFamily:'Fira Code'}}>
            <SyntaxHighlighter language='java' style={context.dark?darcula:oneLight}>
                {state}
            </SyntaxHighlighter>
        </div>
    )
}
