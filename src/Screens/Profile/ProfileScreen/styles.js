import { StyleSheet } from 'react-native'
import { vh, vw } from '../../../Units'
import { appTheme } from '../../../Utils'
import fonts from '../../../assets/fonts'

const styles = StyleSheet.create({

    container: {
        // flex: 1,
        backgroundColor: appTheme.white,
        paddingHorizontal: 2 * vw,

        // paddingVertical: 2 * vh
    },
    ActivityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        backgroundColor: appTheme.white
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
        marginTop: 4 * vh,
        paddingHorizontal: 2 * vw
    },

    poemTitle: {
        color: appTheme.black,
    },

    poemCount: {
        color: appTheme.gray,
        fontSize: 1.8 * vh
    },

    poemStats: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7 * vw,
        marginBottom: 2 * vh
    },

    likeTitle: {
        color: appTheme.black,
    },

    likeCount: {
        color: appTheme.gray,
        fontSize: 1.8 * vh
    },

    likeStats: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7 * vw,
        marginBottom: 2 * vh
    },

    username: {
        color: appTheme.black,
        marginTop: 2 * vh,
        marginBottom: 0.5 * vh,
        fontSize: 2.3 * vh
    },

    email: {
        color: appTheme.gray,
        marginBottom: 0.5 * vh,
        fontSize: 1.8 * vh
    },

    country: {
        color: appTheme.gray,
        fontSize: 1.6 * vh,
        maxWidth: 40 * vw,
        textAlign: 'center'
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

    statsContainer: {
        flexDirection: 'row',
        marginTop: 3 * vh
    },

    aboutContainer: {
        width: '95%',
        marginBottom: 2 * vh,
        paddingHorizontal: 1 * vw,
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
        width: '95%',
        backgroundColor: appTheme.skyWhite,
        alignSelf: 'center',
        height: 0.7 * vw
    },

    feedContainer: {
        alignItems: 'center',
        paddingTop: 0.8 * vh,
        paddingBottom: 1 * vh,

    },

    feedView: {
        // paddingTop: 1 * vh,
        backgroundColor: appTheme.white,
        flex: 1
    },

    dots: {
        color: appTheme.black,
        fontSize: 2.2 * vh,
        textAlign: 'center'
    },

    iconStyle: {
        width: 4 * vw,
        height: 4 * vw
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
        marginTop: 2 * vh
    },

    friendTitle: {
        color: appTheme.black,
        fontSize: 2.3 * vh
    },

    friendsImageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1 * vh
    },

    noFriends: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1 * vh
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
        fontSize: 1.8 * vh,
        width: 18 * vw,
        textAlign: 'center',
        marginTop: 0.5 * vh
    }
})

export default styles;