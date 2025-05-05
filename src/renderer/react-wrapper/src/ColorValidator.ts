

export function isValidHexValue(hex: string) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

export function isValidRGBValue(rgbValue: string) {
    return parseInt(rgbValue) >= 0 && parseInt(rgbValue) <= 255;
}

export function isValidSLValue(slValue: string) {
    return parseInt(slValue) >= 0 && parseInt(slValue) <= 100;
}
export function isValidHValue(hValue: string) {
    return parseInt(hValue) >= 0 && parseInt(hValue) <= 360;
}