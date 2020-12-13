import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
    ripple: {
        height: 25 * vh,
        width: 90 * vw,
        marginVertical: 1 * vh,
        marginHorizontal: 2*vw,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 3 * vw,
        shadowColor: 'black',
        paddingHorizontal: 2 * vw,
        justifyContent: 'space-around'
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
        fontSize: 2.1 * vh,
        fontFamily: fonts.SSB
    },
    text: {
        color: appTheme.darkGray,
        fontSize: 1.8 * vh,
        fontFamily: fonts.SSR
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});