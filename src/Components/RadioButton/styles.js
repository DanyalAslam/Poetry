import { StyleSheet } from 'react-native';
import { vh, vw } from '../../Units';
import { appTheme } from '../../Utils'

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1 * vh,
  
    },
    text: {
        marginLeft: 3 * vw
    },
    radioBtn: {
        height: 6 * vw,
        width: 6 * vw,
        borderRadius: 3 * vw,
        borderWidth: 0.2 * vw,
        borderColor: appTheme.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    radioChecked: {

        height: 4 * vw,
        width: 4 * vw,
        borderRadius: 2 * vw,
        backgroundColor: appTheme.gray

    }
})

export default styles;