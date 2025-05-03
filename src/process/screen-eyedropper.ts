const {
    getColorHexRGB,

    // for more control and customized checks
    DARWIN_IS_PLATFORM_PRE_CATALINA, // darwin only, undefined on other platform
    darwinGetColorHexRGB, // darwin only, throw error on other platform
    darwinGetScreenPermissionGranted, // darwin only, throw error on other platform
    darwinRequestScreenPermissionPopup // darwin only, throw error on other platform
} = require('electron-color-picker')

export const getScreenColor = async () => {
    const color = await getColorHexRGB().catch((error: any) => {
        return ''
    })
    return color;
}

// if (process.platform === 'darwin' && !DARWIN_IS_PLATFORM_PRE_CATALINA) {
//     const darwinScreenPermissionSample = async () => {
//         const isGranted = await darwinGetScreenPermissionGranted() // initial check
//         console.log('darwinGetScreenPermissionGranted:', isGranted)
//         if (!isGranted) { // request user for permission, no result, and will not wait for user click
//             await darwinRequestScreenPermissionPopup()
//             console.warn('no permission granted yet, try again')
//             return ''
//         }
//         const color = await darwinGetColorHexRGB().catch((error: any) => {
//             console.warn('[ERROR] getColor', error)
//             return ''
//         })
//         console.log(`getColor: ${color}`)
//         color && clipboard.writeText(color)
//     }
// }