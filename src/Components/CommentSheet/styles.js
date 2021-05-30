import { StyleSheet } from 'react-native'
import fonts from '../../assets/fonts';
import { vh, vw } from '../../Units';
import { appTheme } from '../../Utils';

export default Styles = StyleSheet.create({

    icon: {
        width: 6 * vw,
        height: 6 * vw,
        borderRadius: 3 * vw,
        resizeMode: 'contain',

    },
    bottomSheetBtn: {
        paddingVertical: 2.5 * vh
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 2 * vw,
        marginVertical: 0.5* vh,
        backgroundColor: appTheme.commentBackgroundColor,
        borderRadius: 6 * vw,
    },
    iconView:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 30 * vw,
        backgroundColor: 'red'
    },
    inputField: {
        width: 70 * vw,
       
        paddingVertical: 0,
        height: 6 * vh,
        paddingHorizontal: 2 * vw,
      
        fontFamily: fonts.poppins.light,
        fontSize: 1.6 * vh
    }

});