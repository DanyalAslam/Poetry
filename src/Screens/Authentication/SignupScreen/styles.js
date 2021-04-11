import { StyleSheet } from 'react-native';
import { vw, vh } from '../../../Units';
import { appTheme } from '../../../Utils';

export default styles = StyleSheet.create({
    backgroundStyle: {
        paddingTop: 6 * vh,
        width: 100 * vw,
        height: 100 * vh,
        alignItems: 'center',

    },
    logoStyle: {
        width: 60 * vw,
        height: 10 * vh,
        resizeMode: 'contain',
    },
    profilePicStyle: {
        width: 20 * vw,
        height: 20 * vw,
        borderRadius: 10 * vw,
        borderColor: '#fff',
        borderWidth: 0.8 * vw,
    },
    profilePicContainerStyle: {
        marginVertical: 3 * vh
    },
    cameraStyle: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',

    },
    cameraContainerStyle: {
        borderRadius: 4 * vw,
        width: 8 * vw,
        height: 8 * vw,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0 * vw,
        right: -2 * vw,
        borderColor: appTheme.black,
        borderWidth: 0.5 * vw,
        elevation: 3,
    },
    scrollViewStyle: {

        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10 * vh,
        paddingHorizontal: 10 * vw
    },
    addressDetailsHeading: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginVertical: 1.7 * vh
    },
    signupText: {
        // fontWeight: 'bold', 
        fontSize: 3 * vh,
        marginBottom: 2 * vh,
        marginTop: 10 * vh
    },
    btnStyle: {
        marginTop: 3 * vh,
        marginBottom: 3.5 * vh,
        backgroundColor: appTheme.white
    },
    btnText: {
        fontSize: 2.2 * vh,
        color: appTheme.black
    },
    login: {
        fontSize: 2 * vh,
        marginBottom: 1 * vh
    },
    title: {
        marginBottom: 3 * vh,
        marginTop: 2 * vh,
        fontSize: 3 * vh
    },
    RadioButton:{
        flexDirection: 'row',
        width:  50 * vw,
        justifyContent: 'space-between',
     
    }

});