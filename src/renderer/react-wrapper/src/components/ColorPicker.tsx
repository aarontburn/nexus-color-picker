import iro from '@jaames/iro';
import { useEffect, useRef } from 'react';

interface ColorPickerProps {
    currentColor: iro.Color;
    onColorChange?: (hexColor: iro.Color) => void;
}


export default function ColorPicker({ currentColor, onColorChange }: ColorPickerProps) {
    const colorPickerRef = useRef<iro.ColorPicker | null>(null);

    useEffect(() => {
        const pickerElement: HTMLElement | null = document.getElementById("color-picker");
        if (pickerElement) {
            pickerElement.innerHTML = '';
            const colorPicker = iro.ColorPicker("#color-picker", { color: currentColor });
            colorPicker.on(['color:change', 'color:init'], (color: iro.Color) => {
                onColorChange?.(new iro.Color(color));

            });
            colorPickerRef.current = colorPicker;
        }
    }, []);

    useEffect(() => {
        if (colorPickerRef.current) {
            const currentHex: string = colorPickerRef.current.color.hexString;
            if (currentHex.toLowerCase() !== currentColor.hexString.toLowerCase()) {
                colorPickerRef.current.color.set(currentColor);
            }
        }
    }, [currentColor]);

    return <div id="color-picker" style={{ display: 'flex', justifyContent: "center" }}></div>
}