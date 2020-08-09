
import { Dimensions, Platform } from 'react-native'
import { appTheme } from '../../Utils'

const vw = Dimensions.get('window').width * 0.01
const vh = Dimensions.get('window').height * 0.01

const styles = {
    image: {
        height: 4 * vw,
        width: 4 * vw, 
        resizeMode: 'contain'
    },
    imageContainer: { 
        // zIndex: 9999999, 
        elevation: 5,
        height: 10 * vw,
        width: 10 * vw, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appTheme.white,
        marginTop: 4*vh,
        borderRadius: 5*vw,
    },
}
export default styles