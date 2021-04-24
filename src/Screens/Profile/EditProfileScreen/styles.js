import { StyleSheet } from 'react-native'
import { vh, vw } from '../../../Units'
import { appTheme } from '../../../Utils'
import fonts from '../../../assets/fonts'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: appTheme.white,
        paddingHorizontal: 2 * vw,
        // paddingVertical: 2 * vh
    },

    profileContainer: {
        alignItems: 'center',
        marginTop: 5 * vh,
        // alignItems: 'flex-end'
    },

    profileImage: {
        width: 30 * vw,
        height: 30 * vw,
        borderRadius: 15 * vw,
        // resizeMode: 'contain',
    },

    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        width: 30 * vw,
        height: 30 * vw,
        borderRadius: 15 * vw,
        backgroundColor: appTheme.white,
        
    },

    headerIcon: {
        width: 6 * vw,
        height: 6 * vw,
        resizeMode: 'contain',
        tintColor: appTheme.black
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 3 * vh,
        paddingHorizontal: 2 * vw
    },
 

    username: {
        color: appTheme.black,
        marginTop: 2 * vh,
        fontSize: 2.3 * vh
    },

    email: {
        color: appTheme.gray,
        fontSize: 1.8 * vh,
        marginTop: 2 * vh,
    },
    name: {
        color: appTheme.gray,
        marginBottom: 2 * vh,
        fontSize: 1.8 * vh,

    },
    country: {
        color: appTheme.gray,
        fontSize: 1.6 * vh,

    },

    age: {
        color: appTheme.gray,
        fontSize: 1.6 * vh,
    },

    male: {
        color: appTheme.gray,
        fontSize: 1.6 * vh,
    },

    ageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

  
    aboutContainer: {
        width: '100%',
        marginBottom: 2 * vh,
        paddingHorizontal: 4 * vw,
    },

    aboutInfo: {
        fontSize: 1.6 * vh
    },

    separator: {
        width: 0.8 * vw,
        height: 0.8 * vw,
        borderRadius: 0.4 * vw,
        backgroundColor: appTheme.grayish,
        marginHorizontal: 2 * vw,

    },

    border: {
        width: '100%',
        backgroundColor: appTheme.skyWhite,
        alignSelf: 'center',
        height: 0.7 * vw
    },

    aboutField:{
        textAlignVertical: 'top',
        maxHeight: 25 * vh,
        fontFamily: fonts.poppins.light,
        color: appTheme.gray
    },
    inputField:{
        fontFamily: fonts.poppins.light,
        color: appTheme.gray
    },

    nameContainer:{
        width: '100%',
        paddingHorizontal: 4 * vw,
    },

    RadioButton:{
        flexDirection: 'row',
        width:  50 * vw,
        justifyContent: 'space-between',
        marginBottom: 1 *vh
    },
    radioText:{
        color: appTheme.darkGray,
        fontFamily: fonts.poppins.light
    },

    btnStyle: {
        marginTop: 3 * vh,
        marginBottom: 3.5 * vh,
        backgroundColor: appTheme.black
    },
    btnText: {
        fontSize: 2.0 * vh,
        color: appTheme.white
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
        right: 0 * vw,
        borderColor: appTheme.black,
        borderWidth: 0.5 * vw,
        elevation: 3,
    },

    iconStyle: {
        width: 4 * vw,
        height: 4 * vw
    }
})

export default styles;