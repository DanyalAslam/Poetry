import { StyleSheet } from 'react-native';
import { vw, vh } from '../../../Units';
import { appTheme } from '../../../Utils';

export default styles = StyleSheet.create({
    backgroundStyle: {
        paddingTop: 8 * vh,
        width: 100 * vw,
        height: 100 * vh,
        alignItems: 'center',
      
    },

    lottieView: {
        height: 20 * vh,
        width: 80 * vw,
        marginBottom: 2 * vh
    },


    scrollViewStyle: {

        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10 * vh,
        paddingHorizontal: 10 * vw,


    },

    signup: {
        fontSize: 1.8 * vh,
        marginBottom: 2 * vh,

    },
    btnStyle: {
        marginTop: 3 * vh,
        marginBottom: 3.5 * vh,
        backgroundColor: appTheme.white
    },
    btnText: {
        fontSize: 2.0 * vh,
        color: appTheme.black
    },
    login: {
        fontSize: 1.6 * vh,
        marginBottom: 1 * vh
    },
    forgotPassword: {
        fontSize: 1.4 * vh,

    },
    forgotView: {
        width: '100%',
        alignItems: 'flex-end',

    },
    title: {
        marginBottom: 3 * vh,
        marginTop: 5 * vh,
        fontSize: 2.5 * vh
    },


});