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
     
        tintColor: appTheme.gray
    },
    iconContainer:{
        marginRight: 2 *vw,
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
    footerParent:{
        elevation: 10,
        backgroundColor: appTheme.white
    },
    iconView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 1 * vw
    },
    inputField: {
        width: 75 * vw,
        height: 6 * vh,
        paddingHorizontal: 2 * vw,
        fontFamily: fonts.poppins.regular,
        fontSize: 1.6 * vh,
        color: appTheme.gray,
        textAlignVertical: 'top'
    }

});