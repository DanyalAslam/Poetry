
import { Dimensions, Platform } from 'react-native'

const vw = Dimensions.get('window').width * 0.01
const vh = Dimensions.get('window').height * 0.01

const styles = {
    wishIcon: {
        height: 30 * vw,
        width: 30 * vw, 
        top: -3.65 * vh,
        right: 6 * vw,
        zIndex: 10000,

    },
    wishImageCon: {
        position: 'absolute',
        top: 3 * vh,
        right: 4 * vw,
        zIndex: 9999999, 
        elevation: 5,
        height: 10 * vw,
        width: 10 * vw,
        ...Platform.select({
            ios:{
                top: -13 * vh,
                right: -4 * vw,
            }
        })
    },
}
export default styles