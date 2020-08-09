import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
    ripple: {
        height: 25 * vh,
        width: 40 * vw,
        marginVertical: 1.5 * vh,
        marginHorizontal: 3 * vw,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 3 * vw,
        shadowColor: 'black',
        alignItems: 'center'
    },

    imageStyle: {
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 3 * vw,
        borderTopRightRadius: 3 * vw,
    },
  

    text: {
        color: appTheme.darkGray,
        fontSize: 1.65 * vh,
        fontFamily: fonts.SSB,
        marginTop: 1.2*vh,
        textAlign: 'center',
        paddingHorizontal: 1*vw,
        

    },


});