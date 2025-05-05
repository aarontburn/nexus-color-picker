import { useState } from "react";
import { sendToProcess } from "../ModulesBridge";






export default function CopyableColor({ value }: { value: string }) {
    const [copyMessageShown, setCopyMessageShown] = useState<boolean>(false);


    const onClick = () => {
        sendToProcess('copy', value);
        setTimeout(() => {
            setCopyMessageShown(false)
        }, 1000)
        setCopyMessageShown(true)
    }


    return <h2
        className="copyable"
        onClick={onClick}
    >
        <span className="copy-message" style={{opacity: copyMessageShown ? '1' : '0'}}>Copied</span>
        {value}
        <span className="icon"></span>
    </h2>
}