import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appTheme.white,

    },
    Title: {
        color: appTheme.white,
        fontSize: 3.3 * vh,
        fontFamily: fonts.SSR,
        alignSelf: 'center'
    },
    backContainer: {
        height: 6 * vw,
        width: 6 * vw,
        marginLeft: 5 * vw,
    },
    backImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    header: { 
        elevation: 5,
        borderBottomWidth: 0.4 * vw,
        borderBottomColor: appTheme.lightGray,
        height: 10 * vh,
        backgroundColor: appTheme.black,
   
    },

    headerRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 2 * vh,
        width: '60%'
    }

});