import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'
import fonts from '../../assets/fonts'

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topCard: {

        width: 100 * vw,
        marginTop: 3 * vh,
        // paddingLeft: 5 * vw,
    },
    categroyScroll: {
        paddingHorizontal: 5 * vw,
        paddingBottom: 3 * vh,
        marginTop: 0.5 * vh,
        flexDirection: 'row'
    },
    categoryCardStyle: {
        width: 28.5 * vw,
        height: 15 * vh,
        marginRight: 3 * vw,
    },
    topCardChild: {

        borderTopLeftRadius: 5 * vw,
        borderBottomLeftRadius: 5 * vw,
        // paddingLeft: 2 * vw,
        paddingTop: 2 * vh,
        // paddingBottom: 4 * vh,
        // elevation: 3,
        // backgroundColor: appTheme.white,

    },
    topCardChildRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 3 * vw,
        paddingLeft: 5 * vw,
        // marginBottom:1.5*vh,
        alignItems: 'baseline',
        marginRight: 2 * vw,
    },
    Heading: {
        fontFamily: fonts.SSB,
        fontSize: 2.5 * vh,
    },
    HeadingSeeAll: {
        fontFamily: fonts.SSR,
        fontSize: 1.8 * vh,
        color: appTheme.darkGray
    },
    textStyle: {
        fontSize: 3 * vh,
        marginTop: vh * 1
    },
    scrollView: {
        width: '100%',
    },

    profileImage: {
        width: 15 * vw,
        height: 15 * vw,
        borderRadius: 7.5 * vw,
        // resizeMode: 'contain',
    },

    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 2,
        width: 15 * vw,
        height: 15 * vw,
        borderRadius: 7.5 * vw,
        backgroundColor: appTheme.white,
        marginBottom: 1.5 * vh
    },

    message: {
        color: appTheme.black,
        fontSize: 1.7 * vh,
        textAlign: 'center'
    },

    status: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2 * vh,
        marginBottom: 2 * vh,
        backgroundColor: appTheme.white
    }
})

export default styles