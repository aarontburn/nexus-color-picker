import { useEffect, useState } from 'react'
import './App.css'
import { addProcessListener, sendToProcess } from './ModulesBridge';
import ColorPicker from './components/ColorPicker';

function App() {
    const [color, setColor] = useState<string>('#ffffff')
    useEffect(() => {
        const listener = addProcessListener((eventType: string, data: any[]) => {
            switch (eventType) {
                case "accent-color-changed": {
                    document.documentElement.style.cssText = "--accent-color: " + data[0];
                    break;
                }
                case 'set-color': {
                    setColor((data[0] as string).toLowerCase());
                    break;  
                }
                default: {
                    console.log("Uncaught message: " + eventType + " | " + data)
                    break;
                }
            }
        });
        sendToProcess("init");


        return () => window.removeEventListener("message", listener);
    }, []);


    return (
        <>
            <h1>{color}</h1>
            <ColorPicker currentColor={color} onColorChange={setColor}/>
            <button onClick={() => sendToProcess("pick-from-screen")}>Pick from screen</button>
        </>
    )
}

export default App
