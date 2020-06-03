import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.white,
        flex: 1,
        alignItems: 'center',
        paddingTop: 4 * vh
    },
    innerContainer: {
        height: 30 * vh,
        width: 90 * vw, 
    },
    textStyle: {
        fontSize: 3 * vh
    }
})

export default styles