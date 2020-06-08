import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appTheme.white
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
    }

});