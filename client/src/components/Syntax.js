import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AppContext } from "../App";
import { useContext } from 'react';

export const Syntax = (props) => {
    const context = useContext(AppContext)
    const [state, setState] = useState("")
    useEffect(() => {
        setState(props.children[0])
    }, [props.children])
    try {
        return (
            <div style={{ borderRadius: '5px', overflow: 'hidden', fontSize: '14px', fontFamily: 'Fira Code' }}>
                <SyntaxHighlighter language='java' style={context.dark ? darcula : oneLight}>
                    {JSON.parse(JSON.stringify(state))}
                </SyntaxHighlighter>
            </div>
        )
    } catch (err) {
        <div style={{ borderRadius: '5px', overflow: 'hidden', fontSize: '14px', fontFamily: 'Fira Code' }}>
            <p>some error in code</p>
        </div>
    }

}
