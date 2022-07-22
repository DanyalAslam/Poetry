import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'
import fonts from '../../assets/fonts'

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    spinner: {
        height: 15 * vh,
        width: 15 * vh,
        resizeMode: 'contain'
    },
    header: {
        alignItems: 'center',
        marginTop: 6 * vh

    },
    button: {
        backgroundColor: appTheme.black,
        borderRadius: 5 * vw,
        width: 30 * vw,
        height: 4.5 * vh,
        marginTop: 4 * vh,
        marginBottom: 3 * vh
        
    },
    headerIcon: {
        width: 6 * vw,
        height: 6 * vw,
        resizeMode: 'contain',
        tintColor: appTheme.black
    },
})

export default styles