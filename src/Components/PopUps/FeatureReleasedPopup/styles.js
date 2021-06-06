import {
    StyleSheet
} from 'react-native'
import fonts from '../../../assets/fonts';
import { vh, vw } from '../../../Units';
import { appTheme } from '../../../Utils';
const styles = StyleSheet.create({
    container: {
        minHeight: 50 * vh,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 30 * vw,
        height: 25 * vh,
        marginTop: 1 * vh
    },
    message: {
        fontSize: 2 * vh,
        textAlign: 'center',
        paddingHorizontal: 8 * vw,
        marginVertical: 1 * vh,
        fontFamily: fonts.poppins.medium,
        color: appTheme.darkGray,
        marginBottom: 3 * vh
    },
    buttonText: {
        color: appTheme.darkGray,
        fontSize: 3.2 * vw,
        fontFamily: fonts.poppins.regular,
        margin: 0,
        padding: 0
    },
    button: {
        backgroundColor: appTheme.white,
        paddingVertical: 1 * vw,
        borderRadius: 7 * vw,
        marginTop: 1 * vw,
        flexDirection: 'row',
        alignItems: 'center',
        width: 35 * vw,
        justifyContent: 'center',
        borderWidth: vw * .3,
        borderColor: appTheme.darkGray,
        marginBottom: 1 * vh
    }
})
export default styles;