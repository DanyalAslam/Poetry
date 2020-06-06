import { StyleSheet } from 'react-native'
import { vw, vh } from '../Units';
import { appTheme } from '../Utils';
import fonts from '../assets/fonts'

export default Styles = StyleSheet.create({

    header: {
        elevation: 5,
        borderBottomWidth: 0.4 * vw,
        borderBottomColor: appTheme.lightGray,
        height: 10 * vh,
        backgroundColor: appTheme.black
    },
    headerTitle: {
        color: appTheme.white,
        fontSize: 3.3 * vh,
        fontFamily: fonts.CR,
    },
    headerTitle_1: {
        color: appTheme.white,
        fontSize: 3.3 * vh,
        fontFamily: fonts.CR,
        marginTop: 3 * vh
    },

    tabStyle: {
        paddingTop: 0,
        paddingLeft: 0,
        height: 7.5 * vh,

    },
    tabBarStyle: {
        backgroundColor: appTheme.white,
        height: 8.7 * vh,
        elevation: 14,
        borderTopWidth: 0.3 * vw,
        borderColor: appTheme.lightGray,
        shadowColor: appTheme.darkGray,
        shadowOffset: {
            width: 1 * vw,
            height: 1 * vw
        },
        shadowOpacity: 0.2,
    },
    iconStyle: {
        width: 10 * vw,
    },
    indicatorStyle: {
        height: 0.4 * vh,
        backgroundColor: appTheme.black
    }
});