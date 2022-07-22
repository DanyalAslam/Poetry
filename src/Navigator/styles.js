import { StyleSheet } from 'react-native'
import { vw, vh } from '../Units';
import { appTheme } from '../Utils';
import fonts from '../assets/fonts'

export default Styles = StyleSheet.create({

    header: {
        elevation: 5,
        // borderBottomWidth: 0.4 * vw,
        // borderBottomColor: appTheme.lightGray,
        height: 12 * vh,
        backgroundColor: appTheme.black,

    },
    headerTitle: {
        color: appTheme.white,
        fontSize: 3.5 * vh,
        fontFamily: fonts.SSR,
        marginLeft: 5 * vw
    },
    headerTitle_1: {
        color: appTheme.white,
        fontSize: 2.8 * vh,
        fontFamily: fonts.SSR,
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
        // borderTopWidth: 0.1 * vw,
        // borderColor: appTheme.lightGray,
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
        height: 0 * vh,
        backgroundColor: appTheme.black
    },
    imageStyle: {
        width: 6 * vw,
        height: 6 * vw,
        resizeMode: 'contain',
        tintColor: appTheme.white

    },
    leftContainer: {
        marginLeft: 0.5 * vw,
        marginTop: 2.5 * vh
    },
    rightContainer: {
        marginRight: 5 * vw,
        marginTop: 2 * vh
    },
    spinImage: {
        height: 5 * vw,
        width: 5 * vw,
        resizeMode: 'contain'
    },
    spinButton: {
        height: 12 * vw,
        width: 12 * vw,
        borderRadius: 6 *vw,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appTheme.skyWhite,
       
    },
    spinParent: {
        position: 'absolute',
        bottom: 20 * vh,
        right: 5 * vw,
        elevation: 3
    }
});