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
        fontSize: vh * 1.5
    },

    showMore: {
        color: appTheme.darkGray,
        fontSize: vh * 1.2,
        alignSelf: 'flex-end',
        fontFamily: fonts.poppins.light,
    }


});

export default styles;