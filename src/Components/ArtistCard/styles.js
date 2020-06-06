import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
    ripple: {
        width: 30 * vw, 
        height: 25 * vh ,
        marginVertical: 1 * vh,
        // marginHorizontal: 2 * vw, 
        backgroundColor: 'white',  
        // alignItems: 'center'
    },

    imageStyle: {
        width: 30 * vw, 
        height: 20*vh,
        borderRadius: 3 * vw, 
        marginBottom: 1.5*vh,
    },
  
    title: {
        color: appTheme.black,
        fontSize: 2 * vh,
        fontFamily: fonts.SSB, 
        textAlign: 'left',
        marginLeft: 1*vw

    },
    text: {
        color: appTheme.darkGray,
        fontSize: 1.7 * vh,
        fontFamily: fonts.SSR, 
        textAlign: 'left',
        marginLeft: 1*vw

    },


});