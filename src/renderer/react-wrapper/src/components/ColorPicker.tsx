import iro from '@jaames/iro';
import { useEffect, useRef } from 'react';

interface ColorPickerProps {
    currentColor: string;
    onColorChange?: (hexColor: string) => void;
}


export default function ColorPicker({ currentColor, onColorChange }: ColorPickerProps) {
    const colorPickerRef = useRef<iro.ColorPicker | null>(null);

    useEffect(() => {
        const pickerElement = document.getElementById("picker");
        if (pickerElement) {
            pickerElement.innerHTML = '';
            const colorPicker = iro.ColorPicker("#picker", { color: currentColor });
            colorPicker.on(['color:change', 'color:init'], (color: iro.Color) => {
                onColorChange?.(color.hexString);
            });
            colorPickerRef.current = colorPicker;
        }
    }, []);

    useEffect(() => {
        if (colorPickerRef.current) {
            const currentHex: string = colorPickerRef.current.color.hexString;
            if (currentHex.toLowerCase() !== currentColor.toLowerCase()) {
                colorPickerRef.current.color.set(currentColor);
            }
        }
    }, [currentColor]);

    return <div id="picker" style={{ display: 'flex', justifyContent: "center" }}></div>
}