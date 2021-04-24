import { StyleSheet, Platform } from 'react-native'
import { vw, vh } from './../../Units/index';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({

    buttonStyles: {
        width: 25 * vw,
        height: 6 * vh,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingBottom: 1 * vw
    },
    imageStyle: {
        width: 6.5 * vw,
        height: 6.5 * vw,
        resizeMode: 'contain',
        marginBottom: 0.1 * vh
    },
    labelStyle: {
        fontSize: 1.7 * vh,
        marginTop: 0.2 * vh,
        fontFamily: fonts.SSB,
        ...Platform.select({
            ios: {
                fontSize: 3 * vw,
                lineHeight: 3.3 * vw
            }
        })
    }
});