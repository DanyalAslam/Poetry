import { StyleSheet } from 'react-native'
import { vh, vw } from '../../../Units'
import { appTheme } from '../../../Utils'
import fonts from '../../../assets/fonts'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: appTheme.white,
        paddingHorizontal: 5 * vw,
        paddingVertical: 2 * vh
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
        justifyContent: 'space-between'
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
        marginBottom: 0.5 * vh,
        fontSize: 1.6 * vh,

    },

    age: {
        color: appTheme.gray,
        marginBottom: 0.5 * vh,
        fontSize: 1.6 * vh,
    },

    male: {
        color: appTheme.gray,
        marginBottom: 0.5 * vh,
        fontSize: 1.6 * vh,
    },

    ageRow: {
        flexDirection: 'row',
    
    },

    statsContainer: {
        flexDirection: 'row',
        marginTop: 3 * vh
    },

    aboutContainer: {
        width: '100%'
    },

    aboutInfo: {
        fontSize: 1.6 * vh
    },

    separator:{
        // width: 0.5 * vw,
        // backgroundColor: appTheme.grayish,
        marginHorizontal: 2 * vw,
  
    }


})

export default styles;