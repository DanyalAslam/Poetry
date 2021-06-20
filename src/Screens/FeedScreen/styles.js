import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'
import fonts from '../../assets/fonts'

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.white,
        flex: 1,
        alignItems: 'center',

   
        // justifyContent: 'center'
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

    dots: {
        color: appTheme.black,
        fontSize: 2.2 * vh,
        textAlign: 'center'
    },

    status: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2 * vh,
        marginBottom: 2 * vh,
        backgroundColor: appTheme.white
    },
    skeletonContainer:{
        alignItems: 'flex-start',
        minHeight: 22 * vh,
        width: 90 * vw,
        marginVertical: 1 * vh,
        marginHorizontal: 2 * vw,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 3 * vw,
        shadowColor: 'black',
        paddingHorizontal: 2 * vw,
        // justifyContent: 'space-between',
        paddingVertical: 1 * vh,
        paddingLeft: 3 * vw
    },

    friendsContainer: {
        width: '95%',
        marginBottom: 2 * vh,
        paddingHorizontal: 1 * vw,
 
    },


    friendsTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2 * vh,
        paddingLeft: 3 * vw
    },

    friendTitle: {
        color: appTheme.black,
        fontSize: 2.0 * vh
    },

    friendsImageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 1 * vh,
        paddingLeft: 5 * vw
    },


    friendImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 3 * vw,
        backgroundColor: appTheme.white,
        overflow: 'hidden'
    },

    friendImageView: {

    },

    friendImage: {
        width: 18 * vw,
        height: 18 * vw,
        borderRadius: 9 * vw,
    },

    friendName: {
        color: appTheme.gray,
        fontSize: 1.5 * vh,
        width: 18 * vw,
        textAlign: 'center',
        marginTop: 0.5 * vh
    },


    aboutInfo: {
        fontSize: 1.6 * vh
    },

})

export default styles