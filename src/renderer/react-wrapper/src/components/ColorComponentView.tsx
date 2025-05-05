import { KeyboardEvent, useEffect, useState } from "react";

interface ColorComponentViewProps {
    label: string;
    value: string | number;
    onChange: (newValue: string | number) => void;
    colorValidator: (value: string) => boolean
    maxLength?: number;

}

export default function ColorComponentView({ label, value, onChange, colorValidator, maxLength = 3 }: ColorComponentViewProps) {
    const [previousValue, setPreviousValue] = useState<string | number>(value);
    const [inputValue, setInputValue] = useState<string | number>(value);

    const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (colorValidator(String(inputValue))) {
                onChange(inputValue);
                setPreviousValue(inputValue);
            } else {
                onChange(previousValue);
                setInputValue(previousValue);
            }
        }
    }

    useEffect(() => {
        setInputValue(value);
        setPreviousValue(value);
    }, [value]);

    return <div className="cc-view">
        <span style={{ color: "gray" }}>{label}:</span>
        &#9;
        <input
            type="text"
            value={inputValue}
            onChange={(value) => setInputValue(value.target.value)}
            onKeyDown={handleKey}
            maxLength={maxLength} />
    </div>
}   