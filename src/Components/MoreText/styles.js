import {
    StyleSheet
} from 'react-native'

import fonts from '../../assets/fonts'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils';

const styles = StyleSheet.create({
    text: {
        color: appTheme.darkGray,
        fontFamily: fonts.poppins.light,
        fontSize: vh * 1.5,
        maxWidth: 71 * vw,
    },

    showMore: {
        color: appTheme.darkGray,
        fontSize: vh * 1.0,
        fontFamily: fonts.poppins.light,
    },
    container:{
        flexDirection: 'row',
        alignItems: 'flex-end'
    }


});

export default styles;