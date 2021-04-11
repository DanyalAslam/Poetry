import { StyleSheet } from 'react-native'
import { appTheme } from './../../Utils/index';
import { vh, vw } from '../../Units';
import fonts  from './../../assets/fonts/index';

export default Styles = StyleSheet.create({

    Container: {
        width: '100%',
        marginVertical: 1.5 * vh, 
        // backgroundColor: 'red',
        // paddingHorizontal: 2 * vw
    },
    iconStyle: {
        width: 3.5 * vw,
        height:  3.5 * vw,
        resizeMode: 'contain',
        marginRight: 1*vw
    },
    endIconStyle: {
        right: -2 * vw,
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    inputFieldContainer: {
        width: '100%',
        height: 6.5 * vh, 
        backgroundColor: 'rgba(85,85,85,0.5)',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 2 * vw,
        paddingLeft: 3 * vw,

        borderRadius: 0.7 * vw,
        //  elevation: 1,
        marginBottom: 0.7 * vh,
        // shadowColor: appTheme.darkGray,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 4,
            height:2.5
        },
        shadowRadius: 2*vw,
    },
    inputField: {
        width: '80%',
        height: '100%',
        paddingVertical:0,
        fontSize:1.5*vh,
        fontFamily: fonts.SSR,
        color: appTheme.white
    },
    label: {
        fontSize: 1.5 * vh,
        marginBottom: 0.8 * vh
    }
});