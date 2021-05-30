import { StyleSheet } from 'react-native'
import fonts from '../../assets/fonts';
import { vh, vw } from '../../Units';
import { appTheme } from '../../Utils';

export default Styles = StyleSheet.create({

    image: {
        width: 8 * vw,
        height: 8 * vw,
        borderRadius: 4 * vw,
        resizeMode: 'cover',

    },

    commentContainer: {
        flexDirection: 'row',
        marginLeft: 2 * vw,
        marginTop: 2.5 * vh
    },
    commentView: {
        marginLeft: 2 * vw
    },
    nameCommentView: {
        backgroundColor: appTheme.commentBackgroundColor,
        padding: 2 * vw,
        borderRadius: 4 * vw,
    },
    name: {
        fontFamily: fonts.poppins.medium,
        fontSize: 1.8 * vh,
        color: appTheme.darkGray
    },

    time: {
        fontFamily: fonts.poppins.light,
        fontSize: 1.5 * vh,
        color: appTheme.gray
    },

    edit: {
        fontFamily: fonts.poppins.light,
        fontSize: 1.5 * vh,
        color: appTheme.gray,
        marginRight: 2 * vw
    },

    delete: {
        fontFamily: fonts.poppins.light,
        fontSize: 1.5 * vh,
        color: appTheme.gray,
        marginRight: 2 * vw
    },
    commentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0.5 * vh
    },
    btnRow: {
        flexDirection: 'row',
    }
});