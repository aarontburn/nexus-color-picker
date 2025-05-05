import { useEffect, useState } from 'react'
import './App.css'
import { addProcessListener, sendToProcess } from './ModulesBridge';
import ColorPicker from './components/ColorPicker';
import iro from '@jaames/iro';
import ColorComponentView from './components/ColorComponentView';
import { isValidHexValue, isValidSLValue, isValidRGBValue, isValidHValue } from './ColorValidator';
import CopyableColor from './components/CopyableColor';

const defaultColor: string = '#ffffff'

function App() {
    const [color, setColor] = useState<iro.Color>(new iro.Color(defaultColor))
    const [useAlpha, setUseAlpha] = useState<boolean>(false);
    useEffect(() => {
        const listener = addProcessListener((eventType: string, data: any[]) => {
            switch (eventType) {
                case "use_alpha": {
                    setUseAlpha(data[0]);
                    break;
                }

                case "accent-color-changed": {
                    document.documentElement.style.cssText = "--accent-color: " + data[0];
                    break;
                }
                case 'set-color': {
                    setColor(new iro.Color(data[0]));
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

            <div id="color-container">
                <div id="left-panel">
                    <div id='color-copy'>
                        <CopyableColor value={useAlpha ? color.hex8String : color.hexString} />
                        <CopyableColor value={useAlpha ? color.rgbaString : color.rgbString} />
                        <CopyableColor value={useAlpha ? color.hslaString : color.hslString} />
                    </div>
                </div>


                <div id="color-picker-wrapper">
                    <ColorPicker currentColor={color} onColorChange={setColor} />
                </div>


                <div id="right-panel">
                    <div id='color-info'>
                        <div className='icon-container' onClick={() => sendToProcess("pick-from-screen")}>
                            <span className="eyedropper-icon "></span>
                        </div>


                        <div style={{ backgroundColor: `${color.hexString}` }} id='color-preview'></div>

                        <div style={{ padding: "1em" }}>
                            <ColorComponentView
                                label="#"
                                onChange={(hexValue) => setColor(new iro.Color(String(hexValue)))} maxLength={6}
                                colorValidator={isValidHexValue}
                                value={color.hexString.replace("#", '')} />


                            <div className='spacer'></div>

                            <ColorComponentView
                                label="r"
                                onChange={(redValue) => {
                                    color.red = typeof redValue === 'string' ? parseInt(redValue) : redValue;
                                    setColor(new iro.Color(color))
                                }}
                                colorValidator={isValidRGBValue}
                                value={color.rgb.r} />

                            <ColorComponentView
                                label="g"
                                onChange={(greenValue) => {
                                    color.green = typeof greenValue === 'string' ? parseInt(greenValue) : greenValue;
                                    setColor(new iro.Color(color))
                                }}
                                colorValidator={isValidRGBValue}
                                value={color.rgb.g} />

                            <ColorComponentView label="b" value={color.rgb.b} colorValidator={isValidRGBValue}
                                onChange={(blueValue) => {
                                    color.blue = typeof blueValue === 'string' ? parseInt(blueValue) : blueValue;
                                    setColor(new iro.Color(color))
                                }}
                            />

                            <div className='spacer'></div>

                            <ColorComponentView
                                label="h"
                                onChange={(hValue) => {
                                    color.hue = typeof hValue === 'string' ? parseInt(hValue) : hValue;
                                    setColor(new iro.Color(color))
                                }}
                                colorValidator={isValidHValue}
                                value={color.hsl.h} />

                            <ColorComponentView label="s"
                                onChange={(sValue) => {
                                    color.saturation = typeof sValue === 'string' ? parseInt(sValue) : sValue;
                                    setColor(new iro.Color(color))
                                }}
                                colorValidator={isValidSLValue}
                                value={color.hsl.s} />

                            <ColorComponentView label="l"
                                onChange={(lValue) => {
                                    color.hsl = { h: color.hsl.h, s: color.hsl.s, l: typeof lValue === 'string' ? parseInt(lValue) : lValue }
                                    setColor(new iro.Color(color))
                                }}
                                colorValidator={isValidSLValue}
                                value={color.hsl.l} />

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default App
