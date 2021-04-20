import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units';

export default Styles = StyleSheet.create({

    image: {
        width: 8 * vw,
        height: 8 * vw,
        borderRadius: 4 * vw,
        resizeMode: 'cover'
    },
    bottomSheetBtn: {
        paddingVertical: 2.5 * vh
    }
});