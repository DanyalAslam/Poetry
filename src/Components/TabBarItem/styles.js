import { StyleSheet, Platform } from 'react-native' 
import { vw, vh } from './../../Units/index';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({

    buttonStyles: {
        width: 25 * vw,
        height: 7 * vh,
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: 1 * vw
    },
    imageStyle: {
        width: '55%',
        height: '45%',
        resizeMode: 'contain',
        marginBottom: 1 * vw
    },
    labelStyle: {
        fontSize: 2 * vh,
        marginTop: 0.2*vh,
        fontFamily: fonts.SSB ,
         ...Platform.select({
             ios:{
                fontSize: 3 * vw,
                lineHeight: 3.3*vw 
             }
         })
    }
});