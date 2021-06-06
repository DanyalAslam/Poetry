import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
    ripple: {
        minHeight: 25 * vh,
        width: 90 * vw,
        marginVertical: 1 * vh,
        marginHorizontal: 2 * vw,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 3 * vw,
        shadowColor: 'black',
        paddingHorizontal: 2 * vw,
        justifyContent: 'space-between',
        paddingVertical: 1 * vh,
        paddingLeft: 3 * vw
    },
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 3 * vw,
    },
    heading: {
        color: appTheme.black,
        fontSize: 1.8 * vh,
        // fontFamily: fonts.SSB
        fontFamily: fonts.poppins.regular
    },
    name: {
        color: appTheme.black,
        fontSize: 1.7 * vh,
        // fontFamily: fonts.SSB
        fontFamily: fonts.poppins.regular
    },
    likers: {
        fontSize: 1.3 * vh,
    },
    likeView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 2 * vh
    },
    date: {
        color: appTheme.darkGray,
        fontSize: 1.2 * vh,
        // fontFamily: fonts.SSR
        fontFamily: fonts.poppins.light,
        lineHeight: 1.5 * vh
    },
    text: {
        color: appTheme.darkGray,
        fontSize: 1.8 * vh,
        fontFamily: fonts.poppins.light
        // fontFamily: fonts.SSR
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 6 * vw,
        height: 6 * vw,
        marginRight: 2 * vw,
        resizeMode: 'contain',
        tintColor: appTheme.gray
    },
    likeImage: {
        width: 4 * vw,
        height: 4 * vw,
        resizeMode: 'contain'
    },
    threeDots: {
        width: 5 * vw,
        height: 5 * vw,
        marginRight: 2 * vw,
        resizeMode: 'contain'
    },
    profileImage: {
        width: 10 * vw,
        height: 10 * vw,
        borderRadius: 5 * vw,
        marginRight: 2 * vw,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    bottomRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 2 * vh,
        marginBottom: 0.8 * vh
        // justifyContent: 'space-between'
    },

    profileRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    bubble:{
        position: 'absolute',
        top: 0.7 * vh,
        right: -2 * vw,
        
        // backgroundColor: appTheme.darkGray
    },
    bubbleText:{
        fontSize: 1 * vh,
        color: appTheme.darkGray,
        fontFamily: fonts.poppins.light
    }

});