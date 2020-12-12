import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: appTheme.white,
        paddingHorizontal: 2 * vw,
        elevation: 5,
        borderRadius: 2 * vw, 
        borderWidth: 0.04 * vw,
        borderColor: appTheme.lightGray,  
    },
    imageStyle: {
        width: 5 * vw,
        height: 5 * vw,
        resizeMode: 'contain',
        marginLeft: 2 * vw
    },
    inputField: {
        width: '87%',
        marginLeft: 2 * vw,
        fontFamily: fonts.SSR,
        fontSize: 2.0 * vh, 
    },
    textField: {
        width: '87%',
        marginLeft: 2 * vw,
        paddingVertical: 1.5*vh
    },
    text:{
        fontFamily: fonts.SSR,
        fontSize: 2.0 * vh,
        color: appTheme.lightGray
    }
});