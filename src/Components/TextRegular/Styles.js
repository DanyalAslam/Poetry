import { StyleSheet } from 'react-native'
import fonts  from './../../assets/fonts/index';
import { appTheme } from './../../Utils/index';
import { vh, vw } from '../../Units';

export default Styles = StyleSheet.create({

    text: {
        fontSize: 2 * vh,
        fontFamily: fonts.SSR,
        color: appTheme.white,
        // marginBottom: 1 * vw
    }
});