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
    iconContainer: {
        marginRight: 2 * vw,
    },
    bottomSheetBtn: {
        paddingVertical: 2.5 * vh
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        // marginHorizontal: 2 * vw,
        marginVertical: 0.5 * vh,
        backgroundColor: appTheme.commentBackgroundColor,
        borderRadius: 6 * vw,


    },
    footerParent: {
        elevation: 10,
        backgroundColor: appTheme.white
    },
    iconView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 1 * vw,
        paddingVertical: 1.5 * vh
    },
    inputField: {
        width: 75 * vw,
        height: 6 * vh,
        paddingHorizontal: 2 * vw,
        fontFamily: fonts.poppins.regular,
        fontSize: 1.6 * vh,
        color: appTheme.gray,
        textAlignVertical: 'top',
        paddingVertical: 1.5 * vh
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.6)',
 
    },
    content: {
        height: 88 * vh,
        backgroundColor: appTheme.white,
        borderTopLeftRadius: 7 * vw,
        borderTopRightRadius: 7 * vw,
        elevation: 5
    },
    backDrop: {
        height: 100 * vh,
        width: 100 * vw,
        position: 'absolute',
        left: 0,
        top: 0
    },
 

});