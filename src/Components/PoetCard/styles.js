import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
    ripple: {
     
        marginVertical: 1.5 * vh,
        marginHorizontal: 3 * vw,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 3 * vw,
        shadowColor: 'black', 
       
    },

    imageStyle: {
        height: 25 * vh,
        width: 40 * vw,
        borderTopLeftRadius: 3 * vw,
        borderTopRightRadius: 3 * vw,
        justifyContent: 'flex-end',
        paddingBottom: 1*vh,
        paddingLeft: 1*vw
    },
  

    text: {
        color: appTheme.white,
        fontSize: 1.45 * vh,
        fontFamily: fonts.SSB,
        marginTop: 1.2*vh,
        textAlign: 'left',
        paddingHorizontal: 1*vw,
        width: 20*vw

    },


});